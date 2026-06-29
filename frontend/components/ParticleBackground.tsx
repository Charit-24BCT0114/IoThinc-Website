"use client";
import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  gx: number; // grid col
  gy: number; // grid row
  pulseOffset: number;
  type: 'chip' | 'via' | 'junction'; // visual type
}

interface Trace {
  from: Node;
  to: Node;
  progress: number; // 0→1 animated draw
  speed: number;
  active: boolean;
  pulsePos: number; // signal pulse position
}

const GRID = 80; // grid cell size in px
const NODE_CHANCE = 0.32; // probability a grid intersection gets a node

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const tracesRef = useRef<Trace[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const build = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cols = Math.ceil(canvas.width / GRID) + 1;
      const rows = Math.ceil(canvas.height / GRID) + 1;

      // Build sparse grid of nodes
      const grid: (Node | null)[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
      );

      nodesRef.current = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < NODE_CHANCE) {
            const types: Node['type'][] = ['chip', 'via', 'junction'];
            const node: Node = {
              x: c * GRID + (Math.random() - 0.5) * 10,
              y: r * GRID + (Math.random() - 0.5) * 10,
              gx: c,
              gy: r,
              pulseOffset: Math.random() * Math.PI * 2,
              type: types[Math.floor(Math.random() * types.length)],
            };
            grid[r][c] = node;
            nodesRef.current.push(node);
          }
        }
      }

      // Connect nearby nodes with L-shaped or straight traces
      tracesRef.current = [];
      const connected = new Set<string>();

      nodesRef.current.forEach(node => {
        // Look right and down only (avoid duplicates)
        const neighbors = [
          grid[node.gy]?.[node.gx + 1],
          grid[node.gy]?.[node.gx + 2],
          grid[node.gy + 1]?.[node.gx],
          grid[node.gy + 2]?.[node.gx],
        ].filter(Boolean) as Node[];

        neighbors.forEach(other => {
          const key = `${Math.min(node.gx, other.gx)},${Math.min(node.gy, other.gy)}-${Math.max(node.gx, other.gx)},${Math.max(node.gy, other.gy)}`;
          if (connected.has(key)) return;
          connected.add(key);

          tracesRef.current.push({
            from: node,
            to: other,
            progress: Math.random(), // start mid-draw for variety
            speed: 0.002 + Math.random() * 0.003,
            active: Math.random() > 0.3,
            pulsePos: Math.random(),
          });
        });
      });
    };

    const drawNode = (ctx: CanvasRenderingContext2D, node: Node, t: number) => {
      const pulse = 0.4 + 0.3 * Math.sin(t * 0.8 + node.pulseOffset);
      const x = node.x;
      const y = node.y;

      if (node.type === 'chip') {
        // Small square chip pad
        const s = 5;
        ctx.strokeStyle = `rgba(0, 212, 255, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - s, y - s, s * 2, s * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse * 0.3})`;
        ctx.fillRect(x - s, y - s, s * 2, s * 2);
      } else if (node.type === 'via') {
        // Circle via (like a PCB via hole)
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse * 0.8})`;
        ctx.fill();
      } else {
        // Junction dot
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse * 0.6})`;
        ctx.fill();
      }
    };

    const drawTrace = (ctx: CanvasRenderingContext2D, trace: Trace, t: number) => {
      if (!trace.active) return;

      const { from, to } = trace;

      // L-shaped path: go horizontal first, then vertical
      const midX = to.x;
      const midY = from.y;

      // Full path points
      const path: [number, number][] = [
        [from.x, from.y],
        [midX, midY],
        [to.x, to.y],
      ];

      // Total path length (Manhattan)
      const seg1 = Math.abs(midX - from.x);
      const seg2 = Math.abs(to.y - midY);
      const total = seg1 + seg2;
      if (total < 1) return;

      const drawn = trace.progress * total;

      ctx.beginPath();
      ctx.lineWidth = 0.8;

      let remaining = drawn;
      let started = false;

      for (let i = 0; i < path.length - 1; i++) {
        const [x1, y1] = path[i];
        const [x2, y2] = path[i + 1];
        const segLen = Math.abs(x2 - x1) + Math.abs(y2 - y1);

        if (!started) {
          ctx.moveTo(x1, y1);
          started = true;
        }

        if (remaining >= segLen) {
          ctx.lineTo(x2, y2);
          remaining -= segLen;
        } else {
          const frac = remaining / segLen;
          ctx.lineTo(x1 + (x2 - x1) * frac, y1 + (y2 - y1) * frac);
          break;
        }
      }

      ctx.strokeStyle = `rgba(0, 212, 255, 0.12)`;
      ctx.stroke();

      // Animated signal pulse along the trace
      if (trace.progress >= 1) {
        trace.pulsePos = (trace.pulsePos + 0.004) % 1;
        const pulseDrawn = trace.pulsePos * total;
        let rem2 = pulseDrawn;
        let px = from.x, py = from.y;

        for (let i = 0; i < path.length - 1; i++) {
          const [x1, y1] = path[i];
          const [x2, y2] = path[i + 1];
          const segLen = Math.abs(x2 - x1) + Math.abs(y2 - y1);
          if (rem2 <= segLen) {
            const frac = rem2 / segLen;
            px = x1 + (x2 - x1) * frac;
            py = y1 + (y2 - y1) * frac;
            break;
          }
          rem2 -= segLen;
        }

        // Glowing dot moving along trace
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, 'rgba(0, 212, 255, 0.9)');
        grad.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    const animate = (ts: number) => {
      timeRef.current = ts * 0.001;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Advance trace drawing
      tracesRef.current.forEach(trace => {
        if (trace.progress < 1) trace.progress = Math.min(1, trace.progress + trace.speed);
      });

      // Draw traces first (behind nodes)
      tracesRef.current.forEach(trace => drawTrace(ctx, trace, t));

      // Draw nodes on top
      nodesRef.current.forEach(node => drawNode(ctx, node, t));

      animRef.current = requestAnimationFrame(animate);
    };

    build();
    animRef.current = requestAnimationFrame(animate);

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;