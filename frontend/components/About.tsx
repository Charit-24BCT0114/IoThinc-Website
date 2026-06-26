"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Lightbulb, Zap } from 'lucide-react';

const About: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      {/* Black Background */}
<div className="absolute inset-0 bg-gray-950" />

{/* Hero → About Transition */}
<div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-gray-950/40 to-gray-950" />

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