import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Download } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackDownload, trackSectionView } from '../utils/analytics';
import { useScroll3D } from '../hooks/useScroll3D';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scroll3D = useScroll3D('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          trackSectionView('About');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDownloadResume = () => {
    trackDownload('resume.pdf');
    
    // Check if resume exists, otherwise show helpful message
    fetch(portfolioConfig.personal.resumeUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.open(portfolioConfig.personal.resumeUrl, '_blank');
        } else {
          alert('Resume not found! Please add resume.pdf to the public folder.\n\nSee HOW_TO_ADD_RESUME.md for instructions.');
        }
      })
      .catch(() => {
        // If fetch fails, try to open anyway (might work in production)
        window.open(portfolioConfig.personal.resumeUrl, '_blank');
      });
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 px-4 min-h-screen flex items-center bg-white"
      aria-label="About section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      <div className={`max-w-6xl mx-auto w-full ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`}>
          About <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {portfolioConfig.about.intro}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {portfolioConfig.about.description}
            </p>
          </div>

          <div className={`space-y-6 stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-orange-500" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Education</h3>
                  <p className="text-gray-700">B.Tech in Computer Science & Engineering</p>
                  <p className="text-sm text-gray-600">{portfolioConfig.personal.location}</p>
                  <p className="text-sm text-orange-500 font-semibold">Graduating {portfolioConfig.personal.graduation}</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                  <Briefcase className="w-6 h-6 text-orange-500" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Experience</h3>
                  <div className="space-y-2">
                    {portfolioConfig.experience.map((exp, index) => (
                      <div key={index}>
                        <p className="text-gray-800 font-semibold">{exp.title} - {exp.company}</p>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDownloadResume}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              aria-label="Download resume"
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
