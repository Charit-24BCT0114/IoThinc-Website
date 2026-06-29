"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Lightbulb, Zap } from 'lucide-react';

const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const circuitCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = circuitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const GRID = 80;
    const NODE_CHANCE = 0.28;
  
    interface Node {
      x: number; y: number;
      gx: number; gy: number;
      pulseOffset: number;
      type: 'chip' | 'via' | 'junction';
    }
    interface Trace {
      from: Node; to: Node;
      progress: number; speed: number;
      active: boolean; pulsePos: number;
    }
  
    let nodes: Node[] = [];
    let traces: Trace[] = [];
    let animId: number;
  
    const build = () => {
      canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
  
      const cols = Math.ceil(canvas.width / GRID) + 1;
      const rows = Math.ceil(canvas.height / GRID) + 1;
      const grid: (Node | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  
      nodes = [];
      traces = [];
  
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() < NODE_CHANCE) {
            const types: Node['type'][] = ['chip', 'via', 'junction'];
            const node: Node = {
              x: c * GRID + (Math.random() - 0.5) * 10,
              y: r * GRID + (Math.random() - 0.5) * 10,
              gx: c, gy: r,
              pulseOffset: Math.random() * Math.PI * 2,
              type: types[Math.floor(Math.random() * types.length)],
            };
            grid[r][c] = node;
            nodes.push(node);
          }
        }
      }
  
      const connected = new Set<string>();
      nodes.forEach(node => {
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
          traces.push({
            from: node, to: other,
            progress: Math.random(), speed: 0.002 + Math.random() * 0.003,
            active: Math.random() > 0.3, pulsePos: Math.random(),
          });
        });
      });
    };
  
    const drawNode = (node: Node, t: number) => {
      const pulse = 0.4 + 0.3 * Math.sin(t * 0.8 + node.pulseOffset);
      const { x, y } = node;
  
      if (node.type === 'chip') {
        const s = 5;
        ctx.strokeStyle = `rgba(0, 212, 255, ${pulse})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - s, y - s, s * 2, s * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse * 0.3})`;
        ctx.fillRect(x - s, y - s, s * 2, s * 2);
      } else if (node.type === 'via') {
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
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse * 0.6})`;
        ctx.fill();
      }
    };
  
    const drawTrace = (trace: Trace) => {
      if (!trace.active) return;
      const { from, to } = trace;
      const midX = to.x, midY = from.y;
      const path: [number, number][] = [[from.x, from.y], [midX, midY], [to.x, to.y]];
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
        if (!started) { ctx.moveTo(x1, y1); started = true; }
        if (remaining >= segLen) { ctx.lineTo(x2, y2); remaining -= segLen; }
        else {
          const frac = remaining / segLen;
          ctx.lineTo(x1 + (x2 - x1) * frac, y1 + (y2 - y1) * frac);
          break;
        }
      }
      ctx.strokeStyle = `rgba(0, 212, 255, 0.12)`;
      ctx.stroke();
  
      if (trace.progress >= 1) {
        trace.pulsePos = (trace.pulsePos + 0.004) % 1;
        let rem2 = trace.pulsePos * total;
        let px = from.x, py = from.y;
        for (let i = 0; i < path.length - 1; i++) {
          const [x1, y1] = path[i];
          const [x2, y2] = path[i + 1];
          const segLen = Math.abs(x2 - x1) + Math.abs(y2 - y1);
          if (rem2 <= segLen) {
            px = x1 + (x2 - x1) * (rem2 / segLen);
            py = y1 + (y2 - y1) * (rem2 / segLen);
            break;
          }
          rem2 -= segLen;
        }
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        grad.addColorStop(0, 'rgba(74, 222, 128, 0.9)');
        grad.addColorStop(1, 'rgba(74, 222, 128, 0)');
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };
  
    let t = 0;
    const animate = (ts: number) => {
      t = ts * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      traces.forEach(trace => {
        if (trace.progress < 1) trace.progress = Math.min(1, trace.progress + trace.speed);
      });
      traces.forEach(trace => drawTrace(trace));
      nodes.forEach(node => drawNode(node, t));
      animId = requestAnimationFrame(animate);
    };
  
    build();
    animId = requestAnimationFrame(animate);
  
    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Community Driven',
      description: 'A thriving network of engineers, designers, and thinkers who collaborate across disciplines every week.',
      gradient: 'from-cyan-400 to-cyan-600',
      glow: 'shadow-cyan-500/20',
      border: 'hover:border-cyan-400/30',
    },
    {
      icon: Target,
      title: 'Mission Focused',
      description: 'Every project tackles a real-world problem. No toy demos — only systems that actually ship.',
      gradient: 'from-purple-400 to-purple-600',
      glow: 'shadow-purple-500/20',
      border: 'hover:border-purple-400/30',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Weekly workshops, hackathons, and mentorship sessions to keep ideas moving fast.',
      gradient: 'from-lime-400 to-lime-600',
      glow: 'shadow-lime-500/20',
      border: 'hover:border-lime-400/30',
    },
    {
      icon: Zap,
      title: 'Cutting Edge',
      description: 'From LoRaWAN to LLMs — we stay at the frontier of what\'s technically possible.',
      gradient: 'from-pink-400 to-pink-600',
      glow: 'shadow-pink-500/20',
      border: 'hover:border-pink-400/30',
    },
  ];

  const stats = [
    { num: '500+', label: 'Active Members', color: 'text-cyan-400' },
    { num: '50+',  label: 'Projects Built',  color: 'text-purple-400' },
    { num: '20+',  label: 'Awards Won',      color: 'text-lime-400'   },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-28 pb-0">
{/* Dark Green Background */}
<div className="absolute inset-0 bg-black" />
{/* Circuit Canvas */}
<canvas
  ref={circuitCanvasRef}
  className="absolute inset-0 w-full h-full pointer-events-none"
/>
{/* Hero → About Transition */}
<div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-950 via-black/80 to-black" />

{/* Left Glow */}
<div className="absolute -left-40 top-32 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[180px]" />

{/* Right Glow */}
<div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[180px]" />

{/* Bottom Glow */}
<div className="absolute bottom-[-180px] left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[180px]" />
{/* About → Team transition */}
<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-gray-500 leading-7 tracking-widest uppercase">Who We Are</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              IoTHINC
            </span>
          </h2>
          <p className="text-lg text-gray-500 leading-7 max-w-2xl mx-auto leading-relaxed font-light">
            IoTHINC VIT Vellore is a premier student organization dedicated to exploring and advancing
            the Internet of Things ecosystem — bringing passionate minds together to build the future
            of connected technology.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative bg-white/[0.03] backdrop-blur-sm p-6 rounded-2xl border border-white/10 ${f.border} hover:shadow-xl ${f.glow} transition-all duration-500 hover:-translate-y-1 cursor-default ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-500 leading-7 transition-colors">
                {f.description}
              </p>

              {/* Hover glow corner */}
              <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.015] border border-white/5 backdrop-blur-sm transition-all duration-700 delay-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {stats.map(({ num, label, color }) => (
              <div key={label} className="py-10 text-center group">
                <div className={`text-4xl font-black ${color} mb-1 group-hover:scale-110 transition-transform duration-300 inline-block`}>
                  {num}
                </div>
                <div className="text-sm text-gray-500 font-mono tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;