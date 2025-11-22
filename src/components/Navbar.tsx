import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackButtonClick } from '../utils/analytics';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    trackButtonClick(`nav-${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    { label: 'Resume', action: () => window.open(portfolioConfig.personal.resumeUrl, '_blank') },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              Adi
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.action ? item.action() : scrollToSection(item.id!)}
                className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  index === 0 ? 'text-orange-500' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleHireMe}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Hire Me
              <span>→</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.action ? item.action() : scrollToSection(item.id!)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-200"
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
