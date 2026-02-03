import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { trackButtonClick } from '../utils/analytics';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    trackButtonClick(`nav-${id}`);
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      const currentPosition = window.pageYOffset;
      const distance = offsetPosition - currentPosition;
      
      // Much faster scroll - max 500ms
      const duration = Math.min(Math.abs(distance) * 0.3, 500);
      
      const startTime = performance.now();
      
      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      };
      
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutQuad(progress);
        
        window.scrollTo(0, currentPosition + distance * easeProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      requestAnimationFrame(animateScroll);
      setIsMenuOpen(false);
    }
  };

  const handleHireMe = () => {
    trackButtonClick('nav-hire-me');
    scrollToSection('contact');
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Adi
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-white hover:scale-110 transition-all duration-300 font-medium group ${
                  index === 0 ? 'text-orange-500' : ''
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </button>
            ))}
            <ThemeToggle />
            <button
              onClick={handleHireMe}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Hire Me
              <span>→</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-2 hover:scale-105 rounded-md transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleHireMe}
              className="w-full mt-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              Hire Me →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;