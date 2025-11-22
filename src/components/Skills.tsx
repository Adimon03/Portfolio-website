import { useEffect } from 'react';
import { Code2, Wrench, Brain } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useScroll3D } from '../hooks/useScroll3D';

const Skills = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const scroll3D = useScroll3D('skills');

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Skills');
    }
  }, [isVisible]);

  const skillCategories = [
    {
      icon: Code2,
      title: 'Programming Languages',
      color: 'from-orange-100 to-red-100',
      iconColor: 'text-orange-600',
      skills: portfolioConfig.skills.programming
    },
    {
      icon: Wrench,
      title: 'Tools & Technologies',
      color: 'from-orange-100 to-red-100',
      iconColor: 'text-red-600',
      skills: portfolioConfig.skills.tools
    },
    {
      icon: Brain,
      title: 'Core Knowledge',
      color: 'from-orange-100 to-red-100',
      iconColor: 'text-orange-600',
      skills: portfolioConfig.skills.core
    }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 px-4 bg-gradient-to-br from-gray-50 via-orange-50 to-red-50"
      aria-label="Skills section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`}>
          Technical <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Skills</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`p-8 bg-white rounded-2xl shadow-xl gradient-border stagger-item ${
                  isVisible ? 'visible' : ''
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className={`inline-block p-4 bg-gradient-to-br ${category.color} rounded-xl mb-6`}>
                  <Icon className={`w-8 h-8 ${category.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
