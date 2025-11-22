import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-300 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base md:text-lg uppercase tracking-wide leading-relaxed" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          <span>© 2025 ADITHYA S —</span>
          <span className="flex items-center gap-2">
            DESIGNED & DEVELOPED WITH
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500 animate-pulse flex-shrink-0" />
            AND INNOVATION.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
