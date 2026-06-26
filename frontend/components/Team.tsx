"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  role: string;
  department: string;
  year: string;
  skills: string;
  github_url: string;
  linkedin_url: string;
  email: string;
  image_url: string;
  academicYear: string;
}

const FALLBACK_MEMBERS: Member[] = [
  { id:1, name:'Alex Chen',    role:'President',      department:'Computer Science',          year:'4th Year', skills:'IoT Architecture,Python,Leadership', github_url:'#', linkedin_url:'#', email:'#', image_url:'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', academicYear:'2025-2026' },
  { id:2, name:'Priya Sharma', role:'Vice President',  department:'Electronics & Communication', year:'3rd Year', skills:'Hardware Design,Embedded Systems,PCB Design', github_url:'#', linkedin_url:'#', email:'#', image_url:'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', academicYear:'2025-2026' },
  { id:3, name:'Raj Patel',    role:'Technical Lead',  department:'Information Technology',    year:'4th Year', skills:'Full Stack,ML/AI,Cloud Computing', github_url:'#', linkedin_url:'#', email:'#', image_url:'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', academicYear:'2025-2026' },
  { id:4, name:'Sarah Kim',    role:'Research Head',   department:'Computer Science',          year:'3rd Year', skills:'Data Science,Research,Analytics', github_url:'#', linkedin_url:'#', email:'#', image_url:'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400', academicYear:'2025-2026' },
  { id:5, name:'Mike Johnson', role:'Hardware Lead',   department:'Electronics & Communication', year:'2nd Year', skills:'Arduino,Sensors,Prototyping', github_url:'#', linkedin_url:'#', email:'#', image_url:'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', academicYear:'2025-2026' },
  { id:6, name:'Lisa Wang',    role:'Software Lead',   department:'Information Technology',    year:'2nd Year', skills:'React,Node.js,Mobile Dev', github_url:'#', linkedin_url:'#', email:'#', image_url:'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400', academicYear:'2025-2026' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Each card observes itself individually for staggered pop-in
const MemberCard: React.FC<{ member: Member; index: number }> = ({ member, index }) => {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // stagger delay based on index
          setTimeout(() => setVisible(true), index * 120);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6
                 hover:border-cyan-400/30 hover:bg-cyan-500/[0.05]
                 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.15)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.93)',
        transition: 'opacity 0.55s cubic-bezier(0.34,1.56,0.64,1), transform 0.55s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* Subtle top-left glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.07),transparent_60%)]" />

      {/* Avatar */}
      <div className="relative mb-5 flex justify-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden
                        ring-2 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-500">
          <img
            src={member.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0d1117&color=00D4FF&size=200`}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* tiny online-style dot for visual interest */}
        <span className="absolute bottom-0 right-[calc(50%-2.5rem)] h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-gray-950" />
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="mt-0.5 text-xs font-semibold tracking-wide text-cyan-400 uppercase">
          {member.role}
        </p>
        <p className="mt-1 text-xs text-slate-500">{member.department}</p>
        <p className="text-xs text-slate-600">{member.year}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-5">
        {(member.skills || '').split(',').map((skill, i) => (
          <span
            key={i}
            className="rounded-full border border-white/5 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-slate-400
                       group-hover:border-cyan-400/20 group-hover:text-cyan-300 transition-colors duration-300"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      {/* Social links */}
      <div className="flex justify-center gap-4">
        {member.github_url && member.github_url !== '#' && (
          <a href={member.github_url} target="_blank" rel="noopener noreferrer"
             className="text-slate-600 hover:text-cyan-400 transition-colors duration-200 hover:scale-110 transform">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        )}
        {member.linkedin_url && member.linkedin_url !== '#' && (
          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer"
             className="text-slate-600 hover:text-cyan-400 transition-colors duration-200 hover:scale-110 transform">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
        {member.email && member.email !== '#' && (
          <a href={`mailto:${member.email}`}
             className="text-slate-600 hover:text-cyan-400 transition-colors duration-200 hover:scale-110 transform">
            <Mail className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/committee-members?year=2025-2026`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setMembers(data.length > 0 ? data : FALLBACK_MEMBERS);
      } catch {
        setMembers(FALLBACK_MEMBERS);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <section id="team" className="relative py-24 bg-black overflow-hidden">

      {/* Same ambient orbs as Hero so bg feels continuous */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[140px]" />

      {/* Thin top separator that visually "connects" from About */}
      {/* Matches About's black → gray-950 fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-500">The People</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Meet the{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <div className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <p className="mt-5 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Brilliant minds driving innovation and leading the future of IoT at VIT Vellore.
          </p>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 animate-pulse">
                <div className="h-20 w-20 rounded-full bg-white/5 mx-auto mb-4" />
                <div className="h-4 bg-white/5 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;