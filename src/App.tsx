import { useEffect, useState, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import { usePageTransition } from './hooks/useScrollAnimation';
import { initGA } from './utils/analytics';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component
const LoadingSection = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  usePageTransition();

  useEffect(() => {
    // Initialize analytics
    initGA();
    
    // Page load animation
    setTimeout(() => setIsLoaded(true), 100);

    // Performance monitoring (dev only)
    if (import.meta.env.DEV) {
      import('./utils/performance').then(({ initPerformanceMonitoring }) => {
        initPerformanceMonitoring();
      });
    }
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <SEO />
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar />
          <AnimatedBackground />
          <div className="relative z-10">
            <Hero />
            <Suspense fallback={<LoadingSection />}>
              <About />
              <Skills />
              <Certifications />
              <Projects />
              <Contact />
              <Footer />
            </Suspense>
            <ScrollToTop />
          </div>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
