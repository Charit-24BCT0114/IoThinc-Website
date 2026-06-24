"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export type TabId = 'home' | 'about' | 'projects' | 'team' | 'contact';

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden min-h-screen">
      <ParticleBackground />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative z-10 pt-16">
        <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
          <Hero onTabChange={setActiveTab} />
        </div>
        <div style={{ display: activeTab === 'about' ? 'block' : 'none' }}>
          <About />
        </div>
        <div style={{ display: activeTab === 'projects' ? 'block' : 'none' }}>
          <Projects />
        </div>
        <div style={{ display: activeTab === 'team' ? 'block' : 'none' }}>
          <Team />
        </div>
        <div style={{ display: activeTab === 'contact' ? 'block' : 'none' }}>
          <Contact />
        </div>
      </main>

      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}