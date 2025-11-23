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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Contact');
    }
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS not configured. Please add credentials to .env file');
        setSubmitStatus('error');
        playErrorSound();
        return;
      }

      // Use EmailJS
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form,
        publicKey
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        playSendSound();
        form.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        playErrorSound();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      playErrorSound();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (label: string) => {
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
          <div className={`space-y-6 stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            {contactInfo.map((info, index) => {
              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => handleContactClick(info.label)}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  aria-label={`${info.label}: ${info.value}`}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {info.label === 'Email' && (
                      <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                        <Mail className="w-7 h-7 text-white" />
                      </div>
                    )}
                    {info.label === 'Phone' && (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                    )}
                    {info.label === 'LinkedIn' && (
                      <div className="w-full h-full bg-[#0A66C2] rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                    )}
                    {info.label === 'GitHub' && (
                      <div className="w-full h-full bg-[#181717] rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                    )}
                    {info.label === 'LeetCode' && (
                      <div className="w-full h-full bg-[#FFA116] rounded-lg flex items-center justify-center">
                        <Code className="w-7 h-7 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                    <p className="text-gray-800 font-semibold">{info.value}</p>
                  </div>
                </a>
              );
            })}
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
