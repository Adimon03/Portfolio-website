import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackExternalLink, trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useScroll3D } from '../hooks/useScroll3D';

const Certifications = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const scroll3D = useScroll3D('certifications');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Certifications');
    }
  }, [isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardTransform = (index: number, rect: DOMRect | null) => {
    if (hoveredCard !== index || !rect) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((mousePosition.y - centerY) / centerY) * -15;
    const rotateY = ((mousePosition.x - centerX) / centerX) * 15;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleCardClick = (link: string | null, title: string) => {
    if (link) {
      trackExternalLink(`Certification: ${title}`);
      window.open(link, '_blank');
    }
  };

  return (
    <section 
      id="certifications" 
      ref={sectionRef} 
      className="py-20 px-4 bg-gray-50/30 dark:bg-gray-700 transition-colors duration-500"
      aria-label="Certifications section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 dark:text-white text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`}>
          Certifications & <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Achievements</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.certifications.map((cert, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(cert.link, cert.title)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cert.link, cert.title)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className={`cert-card group p-6 bg-white rounded-2xl shadow-xl stagger-item hover:shadow-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 ${
                cert.link ? 'cursor-pointer' : 'cursor-default'
              } ${isVisible ? 'visible' : ''}`}
              style={{ 
                transitionDelay: `${(index + 1) * 100}ms`,
                transform: hoveredCard === index 
                  ? getCardTransform(index, (document.querySelectorAll('.cert-card')[index] as HTMLElement)?.getBoundingClientRect() || null)
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out, background 0.3s ease-out',
                willChange: 'transform'
              }}
              tabIndex={cert.link ? 0 : undefined}
              role={cert.link ? 'button' : undefined}
              aria-label={`${cert.title} certification by ${cert.issuer}`}
            >
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  {cert.issuer === 'IBM' && (
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 p-2">
                      <img 
                        src="/ibm-logo.svg" 
                        alt="IBM Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {cert.issuer === 'Udemy' && (
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <img 
                        src="/udemy-logo.svg" 
                        alt="Udemy Logo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {cert.issuer === 'Ethnus' && (
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-white">
                      <img 
                        src="/ethnus-logo.svg" 
                        alt="Ethnus Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {cert.issuer === 'Oracle' && (
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <img 
                        src="/oracle-logo.svg" 
                        alt="Oracle Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {cert.issuer === 'Google' && (
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                      <svg viewBox="0 0 48 48" className="w-10 h-10">
                        <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                        <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                        <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                        <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                      </svg>
                    </div>
                  )}
                  {!['IBM', 'Udemy', 'Ethnus', 'Oracle', 'Google'].includes(cert.issuer) && (
                    <div className="text-4xl" aria-hidden="true">{cert.icon}</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">by {cert.issuer}</p>
                  {cert.link && (
                    <div className="inline-flex items-center gap-2 text-orange-600 group-hover:text-red-600 text-sm font-semibold transition-all duration-300">
                      View Certificate
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
