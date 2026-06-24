"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play, ExternalLink as Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  github_url: string;
  project_lead: string;
  status: string;
  image_url: string;
  category: string;
  academicYear: string;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1, title: 'Smart Campus IoT', academicYear: '2025-2026',
    description: 'Comprehensive IoT solution for campus monitoring with real-time data analytics and automated systems.',
    tech_stack: 'ESP32,Python,MongoDB,React', github_url: '#', project_lead: 'Alex Chen',
    status: 'Live', image_url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'IoT Infrastructure'
  },
  {
    id: 2, title: 'AI-Powered Security System', academicYear: '2025-2026',
    description: 'Advanced security monitoring with facial recognition and behavioral analysis using machine learning.',
    tech_stack: 'TensorFlow,OpenCV,Raspberry Pi,Flask', github_url: '#', project_lead: 'Raj Patel',
    status: 'In Development', image_url: 'https://images.pexels.com/photos/2882509/pexels-photo-2882509.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'AI/ML'
  },
  {
    id: 3, title: 'Environmental Monitoring', academicYear: '2025-2026',
    description: 'Real-time air quality and weather monitoring with predictive analytics.',
    tech_stack: 'Arduino,LoRaWAN,Node.js,Chart.js', github_url: '#', project_lead: 'Sarah Kim',
    status: 'Completed', image_url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Environmental Tech'
  },
  {
    id: 4, title: 'Smart Healthcare Wearable', academicYear: '2025-2026',
    description: 'Wearable device for continuous health monitoring with emergency alert system.',
    tech_stack: 'nRF52,Flutter,Firebase,TensorFlow Lite', github_url: '#', project_lead: 'Lisa Wang',
    status: 'Beta Testing', image_url: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Healthcare IoT'
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Live': return 'text-lime-400 border-lime-400';
    case 'In Development': return 'text-cyan-400 border-cyan-400';
    case 'Completed': return 'text-purple-400 border-purple-400';
    case 'Beta Testing': return 'text-yellow-400 border-yellow-400';
    default: return 'text-gray-400 border-gray-400';
  }
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects?year=2025-2026`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setProjects(data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch {
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayProjects = loading ? [] : projects;

  return (
    <section id="projects" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-cyan-900/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge projects in IoT, AI, and emerging tech solving real-world problems.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700 animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-700 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-400/50 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold border rounded-full backdrop-blur-sm ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs text-cyan-400 font-mono uppercase tracking-wide">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tech_stack || '').split(',').map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {project.project_lead && (
                    <p className="text-xs text-gray-500 mb-3">Lead: <span className="text-gray-400">{project.project_lead}</span></p>
                  )}

                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-cyan-400 hover:text-white transition-colors text-sm">
                      <Play className="h-4 w-4" /><span>Demo</span>
                    </button>
                    {project.github_url && project.github_url !== '#' && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm">
                        <Github className="h-4 w-4" /><span>Code</span>
                      </a>
                    )}
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm">
                      <ExternalLink className="h-4 w-4" /><span>Live</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;