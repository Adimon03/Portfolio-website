import { useState, useEffect, useRef } from 'react';

const ImageOptimized = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  onClick,
  onKeyDown,
  tabIndex,
  role,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-full" />
      )}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        loading={loading}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        tabIndex={tabIndex}
        role={role}
        decoding="async"
      />
    </div>
  );
};

export default ImageOptimized;