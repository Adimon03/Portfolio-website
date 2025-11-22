import { useEffect } from 'react';
import { BarChart3, Mic, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackExternalLink, trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useScroll3D } from '../hooks/useScroll3D';

const Projects = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const scroll3D = useScroll3D('projects');

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Projects');
    }
  }, [isVisible]);

  const projectIcons = [BarChart3, Mic];
  const projectColors = ['text-orange-600', 'text-red-600'];
  const projectGradients = ['from-orange-100 to-red-100', 'from-red-100 to-orange-100'];

  const handleProjectClick = (link: string | undefined, title: string) => {
    if (link) {
      trackExternalLink(`Project: ${title}`);
      window.open(link, '_blank');
    }
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="py-20 px-4 bg-white"
      aria-label="Projects section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`}>
          Projects & <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Case Studies</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioConfig.projects.map((project, index) => {
            const Icon = projectIcons[index];
            const iconColor = projectColors[index];
            const gradient = projectGradients[index];
            
            return (
              <div
                key={index}
                onClick={() => handleProjectClick(project.link, project.title)}
                onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.link, project.title)}
                className={`group flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden stagger-item transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl ${
                  project.link ? 'cursor-pointer' : ''
                } ${isVisible ? 'visible' : ''}`}
                style={{ 
                  transitionDelay: `${(index + 1) * 200}ms`,
                  transform: 'translate3d(0, 0, 0)', // GPU acceleration
                  willChange: 'transform'
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
                        transform: 'translate3d(0, 0, 0)', // GPU acceleration
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
    </section>
  );
};

export default Projects;
