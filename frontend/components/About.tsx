import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Lightbulb, Zap } from 'lucide-react';

const About: React.FC = () => {
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

  const features = [
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Building a vibrant community of tech enthusiasts and innovators',
      color: 'cyan'
    },
    {
      icon: Target,
      title: 'Mission Focused',
      description: 'Advancing IoT solutions for real-world problems and challenges',
      color: 'purple'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Fostering creativity and breakthrough ideas in technology',
      color: 'lime'
    },
    {
      icon: Zap,
      title: 'Cutting Edge',
      description: 'Exploring the latest trends in IoT, AI, and emerging technologies',
      color: 'pink'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-purple-900/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IoTHINC</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            IoTHINC VIT Vellore is a premier student organization dedicated to exploring and advancing 
            the Internet of Things ecosystem. We bring together passionate minds to create innovative 
            solutions that shape the future of connected technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-${feature.color}-400/50 transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-${feature.color}-500/20 ${
                inView 
                  ? `translate-y-0 opacity-100 delay-${index * 100}` 
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600 transform transition-all duration-1000 delay-500 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-gray-400">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-400 mb-2">20+</div>
              <div className="text-gray-400">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;