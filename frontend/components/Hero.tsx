"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Code, Cpu, Wifi } from 'lucide-react';
import type { TabId } from '@/components/TabLayout';

interface HeroProps {
  onTabChange: (tab: TabId) => void;
}

const Hero: React.FC<HeroProps> = ({ onTabChange }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Innovation', 'Technology', 'Future', 'IoT Solutions', 'Smart Systems'];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-400/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border border-purple-400/20 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-lime-400/20 -rotate-45 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            <span className="inline-block px-4 py-1.5 rounded-xl bg-slate-900/40 backdrop-blur-xs border border-white/5 shadow-xl">
              {['I','o','T','H','I','N','C'].map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-fade-in-up glow-cyan hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  {letter}
                </span>
              ))}
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-300 mt-2 inline-block">VIT Vellore</span>
          </h1>

          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-gray-400">
              Pioneering{' '}
              <span className="text-cyan-400 font-mono">
                {text}
                <span className="animate-blink">|</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-12 animate-fade-in-up">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Cpu className="h-8 w-8 animate-pulse" />
            <span className="text-sm font-mono">IoT</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-400">
            <Code className="h-8 w-8 animate-pulse" />
            <span className="text-sm font-mono">AI/ML</span>
          </div>
          <div className="flex items-center space-x-2 text-lime-400">
            <Wifi className="h-8 w-8 animate-pulse" />
            <span className="text-sm font-mono">Connected</span>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center animate-fade-in-up">
          <button
            onClick={() => onTabChange('projects')}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            Explore Projects
          </button>
          <button
            onClick={() => onTabChange('contact')}
            className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
          >
            Join Us
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => onTabChange('about')}
      >
        <ChevronDown className="h-8 w-8 text-cyan-400" />
      </div>
    </section>
  );
};

export default Hero;