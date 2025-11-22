import { useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Github, Code, Send } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { trackFormSubmit, trackExternalLink, trackSectionView } from '../utils/analytics';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useScroll3D } from '../hooks/useScroll3D';

const Contact = () => {
  const { ref: sectionRef, isVisible } = useSectionAnimation({ threshold: 0.1 });
  const scroll3D = useScroll3D('contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (isVisible) {
      trackSectionView('Contact');
    }
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit('Contact Form');
    const mailtoLink = `mailto:${portfolioConfig.personal.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name}%0AEmail: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      className="py-20 px-4 bg-white"
      aria-label="Contact section"
      style={{
        transform: `perspective(1200px) rotateX(${scroll3D.rotateX}deg) scale(${scroll3D.scale})`,
        opacity: scroll3D.opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      }}
    >
      <div className={`max-w-6xl mx-auto ${isVisible ? 'visible' : ''}`}>
        <h2 className={`text-5xl font-bold text-gray-900 text-center mb-6 stagger-item ${isVisible ? 'visible' : ''}`}>
          Let's <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Connect</span>
        </h2>

        <p className={`text-xl text-gray-600 text-center mb-16 stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
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
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none transition-all duration-300"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none transition-all duration-300 resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
