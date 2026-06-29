"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock }  from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
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
        grad.addColorStop(0, 'rgba(0, 212, 255, 0.9)');
        grad.addColorStop(1, 'rgba(0, 212, 255, 0)');
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

    setTimeout(() => {
      build();
      animId = requestAnimationFrame(animate);
    }, 50);

    const onResize = () => build();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">

      {/* Black Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Circuit Canvas */}
      <canvas
        ref={circuitCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top transition */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-500">Reach Out</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Touch
            </span>
          </h2>
          <div className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <p className="mt-5 text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Ready to innovate with us? Have questions about our projects? Let's connect and shape the future of IoT together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Address', text: 'VIT University, Vellore\nTamil Nadu, India - 632014', gradient: 'from-cyan-400 to-cyan-600' },
                  { icon: Mail, title: 'Email', text: 'iothincvitv@gmail.com', gradient: 'from-purple-400 to-purple-600' },
                  { icon: Phone, title: 'Phone', text: '+91 98765 43210', gradient: 'from-lime-400 to-lime-600' },
                  { icon: Clock, title: 'Office Hours', text: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM', gradient: 'from-pink-400 to-pink-600' },
                ].map(({ icon: Icon, title, text, gradient }) => (
                  <div key={title} className="flex items-start space-x-4 group">
                    <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                Quick Connect
              </h4>
              <div className="space-y-3">
                {[
                  'Join our Discord Community',
                  'Follow us on LinkedIn',
                  'Check our GitHub Projects',
                  'Read our Tech Blog',
                ].map(link => (
                  <a key={link} href="#"
                     className="block text-slate-500 text-sm hover:text-cyan-400 transition-colors duration-200">
                    → {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-8">
            <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Name</label>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-600
                               focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/[0.03] transition-all"
                    placeholder="Your Name" required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Email</label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-600
                               focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/[0.03] transition-all"
                    placeholder="your@email.com" required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Subject</label>
                <input
                  type="text" name="subject" value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-600
                             focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/[0.03] transition-all"
                  placeholder="What's this about?" required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Message</label>
                <textarea
                  name="message" value={formData.message}
                  onChange={handleInputChange} rows={6}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder-slate-600
                             focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/[0.03] transition-all resize-none"
                  placeholder="Tell us about your idea or question..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full relative overflow-hidden rounded-xl px-8 py-3 font-semibold text-slate-950 transition-all duration-500 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 transition-all duration-500 group-hover:scale-110" />
                <span className="relative flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;