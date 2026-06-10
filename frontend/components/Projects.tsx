import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

const Projects: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Smart Campus IoT',
      description: 'Comprehensive IoT solution for campus monitoring with real-time data analytics and automated systems.',
      tech: ['ESP32', 'Python', 'MongoDB', 'React'],
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Live',
      category: 'IoT Infrastructure'
    },
    {
      title: 'AI-Powered Security System',
      description: 'Advanced security monitoring with facial recognition and behavioral analysis using machine learning.',
      tech: ['TensorFlow', 'OpenCV', 'Raspberry Pi', 'Flask'],
      image: 'https://images.pexels.com/photos/2882509/pexels-photo-2882509.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Development',
      category: 'AI/ML'
    },
    {
      title: 'Environmental Monitoring',
      description: 'Real-time air quality and weather monitoring system with predictive analytics for environmental insights.',
      tech: ['Arduino', 'LoRaWAN', 'Node.js', 'Chart.js'],
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Completed',
      category: 'Environmental Tech'
    },
    {
      title: 'Smart Healthcare Wearable',
      description: 'Wearable device for continuous health monitoring with emergency alert system and data visualization.',
      tech: ['nRF52', 'Flutter', 'Firebase', 'TensorFlow Lite'],
      image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Beta Testing',
      category: 'Healthcare IoT'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'text-lime-400 border-lime-400';
      case 'In Development': return 'text-cyan-400 border-cyan-400';
      case 'Completed': return 'text-purple-400 border-purple-400';
      case 'Beta Testing': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

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
            Explore our cutting-edge projects that demonstrate the power of IoT, AI, and emerging technologies 
            in solving real-world challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-400/50 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 ${
                inView 
                  ? `translate-y-0 opacity-100 delay-${index * 150}` 
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`px-3 py-1 text-xs font-semibold border rounded-full backdrop-blur-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs text-cyan-400 font-mono uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors group/btn">
                    <Play className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Demo</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group/btn">
                    <svg className="h-5 w-5 fill-current transition-colors hover:text-cyan-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
</svg>
                    <span className="text-sm font-medium">Code</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group/btn">
                    <ExternalLink className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Live</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transform transition-all duration-1000 delay-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;