import { useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Code, Send } from 'lucide-react';
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
      const formData = new FormData(form);
      
      // Using FormSubmit.co - a free form backend service
      const response = await fetch(`https://formsubmit.co/${portfolioConfig.personal.email}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        playSendSound(); // Play success sound
        form.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        playErrorSound(); // Play error sound
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      playErrorSound(); // Play error sound
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (label: string, link: string) => {
    trackExternalLink(`Contact: ${label}`);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: portfolioConfig.personal.email, link: `mailto:${portfolioConfig.personal.email}` },
    { icon: Phone, label: 'Phone', value: portfolioConfig.personal.phone, link: `tel:${portfolioConfig.personal.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', value: portfolioConfig.social.linkedin.replace('https://', ''), link: portfolioConfig.social.linkedin },
    { icon: Github, label: 'GitHub', value: portfolioConfig.social.github.replace('https://', ''), link: portfolioConfig.social.github },
    { icon: Code, label: 'LeetCode', value: portfolioConfig.social.leetcode.replace('https://', ''), link: portfolioConfig.social.leetcode }
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
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => handleContactClick(info.label, info.link)}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  aria-label={`${info.label}: ${info.value}`}
                >
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-orange-600" aria-hidden="true" />
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
            {/* Hidden fields for FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New Portfolio Contact Message!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
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
                name="email"
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
                ❌ Failed to send message. Please try again or email me directly.
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
