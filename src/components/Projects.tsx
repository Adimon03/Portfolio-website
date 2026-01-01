import { useEffect, useState, useCallback, useRef } from 'react';
import { BarChart3, Mic, Shield, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackExternalLink, trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

const Projects = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Projects');
    }
  }, [isVisible]);

  const projectIcons = [Shield, BarChart3, Mic, Shield, Shield];
  const projectColors = ['text-green-600', 'text-orange-600', 'text-red-600', 'text-blue-600', 'text-purple-600'];
  const projectGradients = ['from-green-100 to-emerald-100', 'from-orange-100 to-red-100', 'from-red-100 to-orange-100', 'from-blue-100 to-cyan-100', 'from-purple-100 to-pink-100'];

  const handleProjectClick = useCallback((link: string | undefined, title: string) => {
    if (link) {
      trackExternalLink(`Project: ${title}`);
      window.open(link, '_blank');
    }
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const checkScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [checkScrollButtons]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = window.innerWidth < 768 ? 280 : 420;
      const gap = window.innerWidth < 768 ? 16 : 32;
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-20 px-4 bg-gray-50/30 dark:bg-gray-700 transition-colors duration-500"
      aria-label="Projects section"
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-8 md:mb-16 stagger-item ${isVisible ? 'visible' : ''}`}>
          Projects & <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Case Studies</span>
        </h2>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 md:pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
          >
            <div className="flex gap-4 md:gap-8 min-w-max px-2 md:px-4">
              {portfolioConfig.projects.map((project, index) => {
                const Icon = projectIcons[index];
                const iconColor = projectColors[index];
                const gradient = projectGradients[index];
                const isHovered = hoveredCard === index;
                
                return (
                  <div
                    key={index}
                    onClick={() => handleProjectClick(project.link, project.title)}
                    onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.link, project.title)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`project-card group flex flex-col bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                      project.link ? 'cursor-pointer' : ''
                    } ${isHovered ? 'ring-2 md:ring-4 ring-orange-500 shadow-2xl !scale-105 z-10' : ''}`}
                    style={{ 
                      width: window.innerWidth < 768 ? '280px' : '420px',
                      minWidth: window.innerWidth < 768 ? '280px' : '420px',
                    }}
                    tabIndex={project.link ? 0 : undefined}
                    role={project.link ? 'button' : undefined}
                    aria-label={`${project.title} project`}
                  >
                    {project.image && (
                      <div className="relative h-32 md:h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          loading="lazy"
                          style={{ 
                            transform: 'translate3d(0, 0, 0)',
                            willChange: 'transform'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-opacity duration-300" aria-hidden="true"></div>
                      </div>
                    )}

                    <div className="p-4 md:p-8 flex flex-col flex-grow">
                      <div className={`inline-block p-2 md:p-4 bg-gradient-to-br ${gradient} rounded-lg md:rounded-xl mb-3 md:mb-6 w-fit`}>
                        <Icon className={`w-5 h-5 md:w-8 md:h-8 ${iconColor}`} aria-hidden="true" />
                      </div>

                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 group-hover:text-gradient transition-all duration-300 line-clamp-2">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 text-gray-700 rounded-full text-xs md:text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <ul className="space-y-1.5 md:space-y-3 text-gray-600 mb-4 md:mb-6 flex-grow text-xs md:text-base">
                        {project.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-1.5 md:gap-2">
                            <span className="text-emerald-500 mt-0.5 md:mt-1 text-xs md:text-base" aria-hidden="true">▪</span>
                            <span className="line-clamp-2 md:line-clamp-none">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {project.link && (
                        <div className="inline-flex items-center gap-1.5 md:gap-2 text-sky-600 group-hover:text-emerald-500 text-xs md:text-sm font-semibold transition-colors duration-200">
                          View Project
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="text-center mt-3 md:mt-4 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
            ← Scroll horizontally to view all projects →
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
