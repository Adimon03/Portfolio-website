import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

export const usePageTransition = () => {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const hero = document.querySelector('.hero-section');
          const about = document.querySelector('.about-transition');

          if (!hero || !about) {
            ticking = false;
            return;
          }

          const aboutRect = about.getBoundingClientRect();
          const scrollProgress = Math.max(0, Math.min(1, -aboutRect.top / window.innerHeight));

          // Simplified - removed overlay manipulation for better performance
          if (scrollProgress > 0.3) {
            about.classList.add('transition-active');
          } else {
            about.classList.remove('transition-active');
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
