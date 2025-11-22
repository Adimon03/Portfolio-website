import { Heart } from 'lucide-react';

const Footer = () => {
  const text = (
    <span className="inline-flex items-center gap-2 mx-8 text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap">
      © 2025 Adithya S — Designed & Developed with
      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
      and Innovation
    </span>
  );

  return (
    <footer className="py-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex">
        <div className="flex animate-scroll">
          {[...Array(20)].map((_, i) => (
            <div key={`a-${i}`}>{text}</div>
          ))}
        </div>
        <div className="flex animate-scroll" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div key={`b-${i}`}>{text}</div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
