import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackButtonClick, trackExternalLink, trackDownload } from '../utils/analytics';
import { useScroll3D } from '../hooks/useScroll3D';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scroll3D = useScroll3D('hero');
  const [titleHovered, setTitleHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const [imageHovered, setImageHovered] = useState(false);
  const [imageMousePos, setImageMousePos] = useState({ x: 0, y: 0 });

  const handleTitleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setImageMousePos({ x, y });
  };

  const getTitleTransform = () => {
    if (!titleHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    const rect = titleElement.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((mousePos.y - centerY) / centerY) * -10;
    const rotateY = ((mousePos.x - centerX) / centerX) * 10;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const getImageTransform = () => {
    if (!imageHovered) return 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const imageElement = document.querySelector('.hero-image-container');
    if (!imageElement) return 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const rect = imageElement.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smoother rotation with reduced intensity
    const rotateX = ((imageMousePos.y - centerY) / centerY) * -8;
    const rotateY = ((imageMousePos.x - centerX) / centerX) * 8;
    
    return `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

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
      className="min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500"
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
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">Hello! I'm</p>
            <h1 className="text-orange-500 dark:text-orange-400 text-2xl md:text-3xl font-bold mb-4">
              {portfolioConfig.personal.name}
            </h1>
            <h2 
              className="hero-title text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 cursor-default"
              onMouseMove={handleTitleMouseMove}
              onMouseEnter={() => setTitleHovered(true)}
              onMouseLeave={() => setTitleHovered(false)}
              style={{
                transform: getTitleTransform(),
                transition: 'transform 0.1s ease-out',
                willChange: 'transform',
              }}
            >
              Data Analyst &<br />
              Full Stack Developer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
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
          <div 
            className="hero-image-container relative w-full max-w-md mx-auto cursor-pointer"
            onMouseMove={handleImageMouseMove}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
            style={{
              transform: getImageTransform(),
              transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            {/* Animated orange circle background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full transform scale-95 animate-pulse-slow"></div>
            
            {/* Rotating ring effect */}
            <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-spin-slow opacity-50"></div>
            
            {/* Profile image */}
            <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl animate-float">
              <img
                src={portfolioConfig.personal.image}
                alt={`${portfolioConfig.personal.name} - Portfolio`}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Social media card with slide-up animation */}
            <div className="absolute -bottom-6 left-0 right-0 mx-auto w-fit bg-white dark:bg-gray-800 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700 animate-slide-up transition-colors duration-500">
              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm whitespace-nowrap">FOLLOW ME ON:</span>
              <div className="flex gap-3">
                <a
                  href={portfolioConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('LinkedIn', portfolioConfig.social.linkedin)}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" className="text-[#0A66C2] dark:text-[#0A66C2]"/>
                  </svg>
                </a>
                <a
                  href={portfolioConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('GitHub', portfolioConfig.social.github)}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" className="text-gray-900 dark:text-white"/>
                  </svg>
                </a>
                <a
                  href={portfolioConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('Instagram', portfolioConfig.social.instagram)}
                  className="p-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-125 hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" className="text-[#E4405F] dark:text-[#E4405F]"/>
                  </svg>
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
