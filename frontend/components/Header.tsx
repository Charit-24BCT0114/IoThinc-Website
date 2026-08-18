"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { TabId } from '@/components/TabLayout';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4 tabs — About is part of Home now
  const navItems: { name: string; tab: TabId }[] = [
    { name: 'Home',     tab: 'home'     },
    //{ name: 'Projects', tab: 'projects' },
    { name: 'Team',     tab: 'team'     },
    { name: 'Contact',  tab: 'contact'  },
  ];

  const handleNav = (tab: TabId) => {
    onTabChange(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group bg-transparent border-none cursor-pointer"
          >
            {/* Animated logo mark */}
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-sm" />
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-xs font-black text-cyan-400 tracking-tighter">IoT</span>
              </div>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 tracking-tight">
                IoTHINC
              </span>
              <span className="text-[10px] text-cyan-400/70 font-mono tracking-widest uppercase hidden sm:block">
                VIT Vellore
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`relative px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 border-none cursor-pointer ${
                  activeTab === item.tab
                    ? 'text-gray-950 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/25'
                    : 'text-gray-500 leading-7 hover:text-white bg-transparent hover:bg-white/5'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-gray-950 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 border-none cursor-pointer"
            >
              Join Us
              <span className="text-xs">→</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-gray-500 leading-7 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-lg"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-gray-950/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNav(item.tab)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 bg-transparent border-none cursor-pointer ${
                activeTab === item.tab
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-gray-500 leading-7 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="w-full mt-2 px-4 py-3 text-sm font-semibold text-gray-950 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl border-none cursor-pointer"
          >
            Join Us →
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;