import { useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Code, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { portfolioConfig } from '../config/portfolio';
import { trackFormSubmit, trackExternalLink, trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useScroll3D } from '../hooks/useScroll3D';
import { playSendSound, playErrorSound } from '../utils/soundEffects';

const Contact = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const scroll3D = useScroll3D('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Contact');
    }
  }, [isVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    trackFormSubmit('Contact Form');
    
    try {
      const form = e.currentTarget;
      
      // EmailJS Configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log('EmailJS Config:', { 
        serviceId: serviceId ? 'Set' : 'Missing', 
        templateId: templateId ? 'Set' : 'Missing', 
        publicKey: publicKey ? 'Set' : 'Missing' 
      });

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS not configured. Please add credentials to .env file');
        alert('Email service not configured. Please contact the site administrator.');
        setSubmitStatus('error');
        playErrorSound();
        return;
      }

      console.log('Sending email via EmailJS...');

      // Use EmailJS
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        publicKey
      );

      console.log('EmailJS Response:', result);

      if (result.text === 'OK') {
        setSubmitStatus('success');
        playSendSound();
        form.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        console.error('EmailJS returned non-OK status:', result);
        setSubmitStatus('error');
        playErrorSound();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', error.text || error.message);
      setSubmitStatus('error');
      playErrorSound();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (label) => {
    trackExternalLink(`Contact: ${label}`);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'Send Email', href: `mailto:${portfolioConfig.personal.email}` },
    { icon: Phone, label: 'Phone', value: 'Call Me', href: `tel:${portfolioConfig.personal.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: portfolioConfig.social.linkedin },
    { icon: Github, label: 'GitHub', value: 'View GitHub Profile', href: portfolioConfig.social.github },
    { icon: Code, label: 'LeetCode', value: 'Check LeetCode', href: portfolioConfig.social.leetcode }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="py-20 px-4 bg-gray-50/30 dark:bg-gray-700 transition-colors duration-500"
      aria-label="Contact section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 dark:text-white text-center mb-6 stagger-item ${isVisible ? 'visible' : ''}`}>
          Let's <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Connect</span>
        </h2>

        <p className={`text-xl text-gray-600 dark:text-gray-200 text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
          I'd love to collaborate or discuss new opportunities. Drop me a message anytime!
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Circular Contact Icons */}
          <div className={`relative stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <div className="relative w-full max-w-xs md:max-w-md mx-auto aspect-square flex items-center justify-center">
              {/* Connecting Lines - Circle */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="8,6"
                  className="text-orange-500 dark:text-orange-400"
                  opacity="0.7"
                />
              </svg>
              
              {contactInfo.map((info, index) => {
                const angle = (index * 360) / contactInfo.length - 90;
                const radius = 42; // percentage - slightly smaller for mobile
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() => handleContactClick(info.label)}
                    className="absolute group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-label={`${info.label}: ${info.value}`}
                  >
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                        style={{
                          background: info.label === 'Email' ? 'linear-gradient(to bottom right, #ef4444, #dc2626)' :
                                     info.label === 'Phone' ? 'linear-gradient(to bottom right, #10b981, #059669)' :
                                     info.label === 'LinkedIn' ? '#0A66C2' :
                                     info.label === 'GitHub' ? '#181717' :
                                     '#FFA116'
                        }}
                      />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group-hover:-translate-y-2">
                        {info.label === 'Email' && (
                          <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center border-2 border-red-400">
                            <Mail className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                          </div>
                        )}
                        {info.label === 'Phone' && (
                          <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center border-2 border-green-400">
                            <Phone className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                          </div>
                        )}
                        {info.label === 'LinkedIn' && (
                          <div className="w-full h-full bg-gradient-to-br from-[#0A66C2] to-[#084a8f] rounded-full flex items-center justify-center border-2 border-blue-400">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 fill-white drop-shadow-lg">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                        )}
                        {info.label === 'GitHub' && (
                          <div className="w-full h-full bg-gradient-to-br from-[#24292e] to-[#1a1e22] rounded-full flex items-center justify-center border-2 border-gray-600">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 fill-white drop-shadow-lg">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                        )}
                        {info.label === 'LeetCode' && (
                          <div className="w-full h-full bg-gradient-to-br from-[#FFA116] to-[#e68a00] rounded-full flex items-center justify-center border-2 border-orange-300">
                            <Code className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center gap-1">
                        <span className="text-xs md:text-sm text-gray-900 dark:text-white font-bold bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded whitespace-nowrap">
                          {info.label}
                        </span>
                        <span className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 font-medium bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded whitespace-nowrap">
                          {info.value}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
              
              {/* Center decoration */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">Let's</p>
                  <p className="text-base md:text-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Connect</p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`space-y-4 stagger-item ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '450ms' }}
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="from_name"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-400 focus:outline-none transition-all duration-300 disabled:opacity-50"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="from_email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-400 focus:outline-none transition-all duration-300 disabled:opacity-50"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                disabled={isSubmitting}
                rows={5}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-orange-400 focus:outline-none transition-all duration-300 resize-none disabled:opacity-50"
                placeholder="Your message here..."
              ></textarea>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-xl text-green-700 font-semibold animate-fade-in">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 font-semibold animate-fade-in">
                ❌ Failed to send message. Please try again or email me directly at {portfolioConfig.personal.email}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;