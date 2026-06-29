"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Cpu,
  Code2,
  Wifi,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { TabId } from "@/components/TabLayout";

interface HeroProps {
  onTabChange: (tab: TabId) => void;
}

const WORDS = [
  "IoT",
  "Artificial Intelligence",
  "Robotics",
  "Embedded Systems",
  "Innovation",
  "Future Technology",
];

const Hero: React.FC<HeroProps> = ({ onTabChange }) => {
  const [text, setText] = useState("");
  const [isDeleting, setDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  useEffect(() => {
    const current = WORDS[loop % WORDS.length];

    const timer = setTimeout(() => {
      setText(
        isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setDeleting(true), 1000);
      }

      if (isDeleting && text === "") {
        setDeleting(false);
        setLoop((prev) => prev + 1);
      }
    }, isDeleting ? 40 : 100);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loop]);
  const opacity = Math.max(1 - scrollY / 500, 0);

  const translateY = scrollY * 0.25;

  const scale = Math.max(1 - scrollY / 2500, 0.95);
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-transparent">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
      {/* Cyan Orb */}
      <div
        className="absolute -top-32 -left-24 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse"
        style={{
          opacity: Math.max(1 - scrollY / 350, 0.15),
        }}
      />

      {/* Purple Orb */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[170px] animate-pulse"
        style={{
          animationDelay: "1s",
          opacity: Math.max(1 - scrollY / 350, 0.15),
        }}
      />

      {/* Small Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-cyan-400/5 blur-[120px]" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

      {/* Main Content */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-75"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >

        {/* Top Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-8">

          <Sparkles className="w-4 h-4 text-cyan-400" />

          <span className="text-xs tracking-[0.25em] uppercase text-cyan-300 font-medium">
            Innovating at VIT Vellore
          </span>

        </div>
        {/* Main Heading */}
        <div className="mb-6">

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-[-0.06em] leading-[0.9]">

            <span className="block bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              IoTHINC
            </span>

          </h1>

          <div className="mt-3 flex justify-center">
            <div className="h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
          </div>

        </div>

        {/* Subtitle */}
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-400 leading-8">

          Building intelligent systems through
          <span className="text-white font-medium"> IoT</span>,
          <span className="text-cyan-300 font-medium"> Artificial Intelligence</span>,
          <span className="text-purple-300 font-medium"> Robotics</span>,
          and next-generation embedded technologies.

        </p>

        {/* Typewriter */}
        <div className="mt-10 h-14 flex items-center justify-center">

          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-6 py-3 backdrop-blur-xl">

            <span className="text-slate-400 text-lg">
              Pioneering{" "}
            </span>

            <span className="font-semibold text-cyan-300">

              {text}

              <span className="ml-1 animate-pulse text-cyan-400">
                |
              </span>

            </span>

          </div>

        </div>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">

          {/* Primary */}
          <button
            onClick={() => onTabChange("projects")}
            className="group relative overflow-hidden rounded-full px-8 py-4 font-semibold text-slate-950 transition-all duration-500"
          >

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 transition-all duration-500 group-hover:scale-110" />

            <span className="relative flex items-center gap-2">

              Explore Projects

              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={18}
              />

            </span>

          </button>

          {/* Secondary */}
          <button
            onClick={() => onTabChange("contact")}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            Join IoTHINC
          </button>

        </div>

        {/* Floating Technology Chips */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">

          {[
            {
              icon: Cpu,
              label: "IoT",
              color:
                "text-cyan-300 border-cyan-400/20 bg-cyan-500/5",
            },
            {
              icon: Code2,
              label: "AI / ML",
              color:
                "text-purple-300 border-purple-400/20 bg-purple-500/5",
            },
            {
              icon: Wifi,
              label: "Connected Systems",
              color:
                "text-emerald-300 border-emerald-400/20 bg-emerald-500/5",
            },
          ].map(({ icon: Icon, label, color }) => (

            <div
              key={label}
              className={`group flex items-center gap-3 rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${color}`}
            >

              <Icon
                className="transition-transform duration-300 group-hover:rotate-12"
                size={18}
              />

              <span className="text-sm font-medium tracking-wide">

                {label}

              </span>

            </div>

          ))}

        </div>
        

        {/* Divider */}
        <div className="mt-20 flex justify-center">

          <div className="h-px w-44 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center">

          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">

            Explore • Learn • Build • Innovate

          </p>

        </div>
      </div>

      {/* Ambient bottom glow */}
      <div className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[160px]" />

      {/* Decorative blurred circles */}
      <div className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-cyan-400/40 blur-sm animate-pulse" />

      <div
        className="absolute right-[12%] bottom-[20%] h-4 w-4 rounded-full bg-purple-400/40 blur-sm animate-pulse"
        style={{ animationDelay: "1.2s" }}
      />

      <div
        className="absolute left-[25%] bottom-[12%] h-2 w-2 rounded-full bg-white/40 blur-sm animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      {/* Hero → About transition */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

    </section>
  );
};

export default Hero;
