import { useEffect, useState, useCallback } from 'react';
import { BarChart3, Mic, Shield, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackExternalLink, trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

const Projects = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Projects');
    }
  }, [isVisible]);

  const projectIcons = [BarChart3, Mic, Shield];
  const projectColors = ['text-orange-600', 'text-red-600', 'text-blue-600'];
  const projectGradients = ['from-orange-100 to-red-100', 'from-red-100 to-orange-100', 'from-blue-100 to-cyan-100'];

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

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-20 px-4 bg-gray-50/30 dark:bg-gray-700 transition-colors duration-500"
      aria-label="Projects section"
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 dark:text-white text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`}>
          Projects & <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Case Studies</span>
        </h2>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            <div className="flex gap-8 min-w-max px-4">
              {portfolioConfig.projects.map((project, index) => {
                const Icon = projectIcons[index];
                const iconColor = projectColors[index];
                const gradient = projectGradients[index];
                const isHovered = hoveredCard === index;
                const isOtherHovered = hoveredCard !== null && hoveredCard !== index;
                
                return (
                  <div
                    key={index}
                    onClick={() => handleProjectClick(project.link, project.title)}
                    onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.link, project.title)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`project-card group flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                      project.link ? 'cursor-pointer' : ''
                    } ${isHovered ? 'ring-4 ring-orange-500 shadow-2xl !scale-105 z-10' : ''} ${isOtherHovered ? '!opacity-60' : ''}`}
                    style={{ 
                      width: '420px',
                      minWidth: '420px',
                      filter: isOtherHovered ? 'blur(3px)' : 'none',
                    }}
                    tabIndex={project.link ? 0 : undefined}
                    role={project.link ? 'button' : undefined}
                    aria-label={`${project.title} project`}
                  >
                    {project.image && (
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
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

                    <div className="p-8 flex flex-col flex-grow">
                      <div className={`inline-block p-4 bg-gradient-to-br ${gradient} rounded-xl mb-6 w-fit`}>
                        <Icon className={`w-8 h-8 ${iconColor}`} aria-hidden="true" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gradient-to-r from-sky-500/10 to-emerald-500/10 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <ul className="space-y-3 text-gray-600 mb-6 flex-grow">
                        {project.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-1" aria-hidden="true">▪</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {project.link && (
                        <div className="inline-flex items-center gap-2 text-sky-600 group-hover:text-emerald-500 text-sm font-semibold transition-colors duration-200">
                          View Project
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="text-center mt-4 text-gray-500 dark:text-gray-400 text-sm">
            ← Scroll horizontally to view all projects →
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
