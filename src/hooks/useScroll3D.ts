import { useEffect, useState } from 'react';

export const useScroll3D = (sectionId: string) => {
  const [scrollData, setScrollData] = useState({
    progress: 0,
    isInView: false,
    rotateX: 0,
    scale: 1,
    opacity: 1,
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in viewport
      const isInView = rect.top < windowHeight && rect.bottom > 0;

      // Calculate progress (0 to 1) based on section position
      let progress = 0;
      if (rect.top < windowHeight && rect.top > 0) {
        // Section entering from bottom
        progress = (windowHeight - rect.top) / windowHeight;
      } else if (rect.top <= 0 && rect.bottom > windowHeight) {
        // Section fully in view
        progress = 1;
      } else if (rect.bottom <= windowHeight && rect.bottom > 0) {
        // Section leaving from top
        progress = rect.bottom / windowHeight;
      }

      progress = Math.max(0, Math.min(1, progress));

      // Calculate 3D effects
      const rotateX = (1 - progress) * 15; // Tilt effect
      const scale = 0.9 + progress * 0.1; // Scale from 90% to 100%
      const opacity = 0.3 + progress * 0.7; // Fade from 30% to 100%

      setScrollData({
        progress,
        isInView,
        rotateX,
        scale,
        opacity,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId]);

  return scrollData;
};
