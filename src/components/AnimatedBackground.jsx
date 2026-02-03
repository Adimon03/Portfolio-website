const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Optimized: Reduced size and simplified animations */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 bg-sky-300 rounded-full mix-blend-multiply filter blur-2xl opacity-15"
        style={{ 
          animation: 'blob 20s ease-in-out infinite',
          transform: 'translate3d(0, 0, 0)', // GPU acceleration
        }}
      ></div>
      <div 
        className="absolute top-40 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-15"
        style={{ 
          animation: 'blob 25s ease-in-out infinite 2s',
          transform: 'translate3d(0, 0, 0)', // GPU acceleration
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-1/2 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-15"
        style={{ 
          animation: 'blob 22s ease-in-out infinite 4s',
          transform: 'translate3d(0, 0, 0)', // GPU acceleration
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;