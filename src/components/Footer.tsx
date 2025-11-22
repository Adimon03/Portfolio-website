import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-white/50 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-600 flex items-center justify-center gap-2">
          © 2025 Adithya S — Designed & Developed with
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          and Innovation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
