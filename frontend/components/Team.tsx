import React, { useEffect, useRef, useState } from 'react';
import { Mail, User } from 'lucide-react';

const Team: React.FC = () => {
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

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'President',
      department: 'Computer Science',
      year: '4th Year',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['IoT Architecture', 'Python', 'Leadership'],
      social: { github: '#', linkedin: '#', email: '#' }
    },
    {
      name: 'Priya Sharma',
      role: 'Vice President',
      department: 'Electronics & Communication',
      year: '3rd Year',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Hardware Design', 'Embedded Systems', 'PCB Design'],
      social: { github: '#', linkedin: '#', email: '#' }
    },
    {
      name: 'Raj Patel',
      role: 'Technical Lead',
      department: 'Information Technology',
      year: '4th Year',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Full Stack', 'ML/AI', 'Cloud Computing'],
      social: { github: '#', linkedin: '#', email: '#' }
    },
    {
      name: 'Sarah Kim',
      role: 'Research Head',
      department: 'Computer Science',
      year: '3rd Year',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Data Science', 'Research', 'Analytics'],
      social: { github: '#', linkedin: '#', email: '#' }
    },
    {
      name: 'Mike Johnson',
      role: 'Hardware Lead',
      department: 'Electronics & Communication',
      year: '2nd Year',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['Arduino', 'Sensors', 'Prototyping'],
      social: { github: '#', linkedin: '#', email: '#' }
    },
    {
      name: 'Lisa Wang',
      role: 'Software Lead',
      department: 'Information Technology',
      year: '2nd Year',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: ['React', 'Node.js', 'Mobile Dev'],
      social: { github: '#', linkedin: '#', email: '#' }
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-transparent to-lime-900/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The brilliant minds driving innovation and leading the future of IoT technology at VIT Vellore.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-400/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 ${
                inView 
                  ? `translate-y-0 opacity-100 delay-${index * 100}` 
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-cyan-400 text-sm font-semibold mb-1">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.department}</p>
                <p className="text-gray-500 text-xs">{member.year}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {member.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <a href={member.social.github} className="text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all">
                  <svg className="h-5 w-5 fill-current transition-colors hover:text-cyan-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
</svg>
                </a>
                <a href={member.social.linkedin} className="text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>
                </a>
                <a href={member.social.email} className="text-gray-400 hover:text-cyan-400 transform hover:scale-110 transition-all">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
            <p className="text-gray-400 mb-6">
              We're always looking for passionate individuals to join our mission of advancing IoT technology.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-lime-500 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-lime-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;