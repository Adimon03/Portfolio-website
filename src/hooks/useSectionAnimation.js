import { useEffect, useRef, useState } from 'react';

export const useSectionAnimation = (options = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Hook for staggered children animations
export const useStaggerAnimation = (itemCount, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const { ref, isVisible } = useSectionAnimation();

  useEffect(() => {
    if (isVisible) {
      // Stagger the appearance of items
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems((prev) => new Set(prev).add(i));
        }, i * delay);
      }
    }
  }, [isVisible, itemCount, delay]);

  return { ref, visibleItems };
};