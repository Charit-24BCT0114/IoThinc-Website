"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
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

  const navItems: { name: string; tab: TabId }[] = [
    { name: 'Home',     tab: 'home'     },
    { name: 'About',    tab: 'about'    },
    { name: 'Projects', tab: 'projects' },
    { name: 'Team',     tab: 'team'     },
    { name: 'Contact',  tab: 'contact'  },
  ];

  const handleNav = (tab: TabId) => {
    onTabChange(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center space-x-2 group cursor-pointer bg-transparent border-none"
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Zap className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              IoTHINC
            </span>
            <span className="text-sm text-cyan-400 hidden sm:block">VIT Vellore</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors group bg-transparent border-none cursor-pointer ${
                  activeTab === item.tab
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.name}
                {/* Active underline */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                  activeTab === item.tab ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-cyan-400 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-cyan-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`w-full text-left block px-3 py-2 rounded-md transition-colors bg-transparent border-none cursor-pointer ${
                  activeTab === item.tab
                    ? 'text-cyan-400 bg-gray-800/50'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;