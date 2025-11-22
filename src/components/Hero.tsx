import { useEffect, useState } from 'react';
import { Linkedin, Github, Mail, Download } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackButtonClick, trackExternalLink, trackDownload } from '../utils/analytics';
import { useScroll3D } from '../hooks/useScroll3D';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scroll3D = useScroll3D('hero');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const scrollToSection = (id: string) => {
    trackButtonClick(`scroll-to-${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackExternalLink(`${platform}: ${url}`);
  };

  const handleDownloadCV = () => {
    trackDownload('resume.pdf');
    window.open(portfolioConfig.personal.resumeUrl, '_blank');
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 relative overflow-hidden"
      aria-label="Hero section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >


      <div 
        className={`max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        
        {/* Left Side - Content */}
        <div className="space-y-6">
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <p className="text-gray-600 text-lg mb-2">Hello! I'm</p>
            <h1 className="text-orange-500 text-2xl md:text-3xl font-bold mb-4">
              {portfolioConfig.personal.name}
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="inline-block hover:scale-110 transition-transform duration-300">Data Analyst</span> &<br />
              <span className="inline-block hover:scale-110 transition-transform duration-300">Full Stack Developer</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              {portfolioConfig.about.intro}
            </p>
          </div>

          {/* Buttons */}
          <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
            >
              Hire Me
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <button
              onClick={handleDownloadCV}
              className="group px-8 py-3 bg-white text-gray-800 font-semibold rounded-full border-2 border-gray-300 hover:border-orange-500 hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download CV
            </button>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div 
          className={`relative transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Animated orange circle background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full transform scale-95 animate-pulse-slow"></div>
            
            {/* Rotating ring effect */}
            <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-spin-slow opacity-50"></div>
            
            {/* Profile image */}
            <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl hover:scale-105 transition-transform duration-500 animate-float">
              <img
                src={portfolioConfig.personal.image}
                alt={`${portfolioConfig.personal.name} - Portfolio`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Social media card with slide-up animation */}
            <div className="absolute -bottom-6 left-0 right-0 mx-auto w-fit bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 border border-gray-100 animate-slide-up">
              <span className="text-gray-600 font-medium text-sm whitespace-nowrap">FOLLOW ME ON:</span>
              <div className="flex gap-3">
                <a
                  href={portfolioConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('LinkedIn', portfolioConfig.social.linkedin)}
                  className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-700 hover:text-orange-500 transition-colors" />
                </a>
                <a
                  href={portfolioConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('GitHub', portfolioConfig.social.github)}
                  className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-700 hover:text-orange-500 transition-colors" />
                </a>
                <a
                  href={`mailto:${portfolioConfig.personal.email}`}
                  onClick={() => handleSocialClick('Email', portfolioConfig.personal.email)}
                  className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-gray-700 hover:text-orange-500 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
