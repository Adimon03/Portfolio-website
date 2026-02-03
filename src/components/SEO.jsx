import { useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = title || portfolioConfig.seo.title;
  const siteDescription = description || portfolioConfig.seo.description;
  const siteImage = image || portfolioConfig.seo.ogImage;
  const siteUrl = url || window.location.href;

  useEffect(() => {
    // Update document title
    document.title = siteTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', siteDescription);
    updateMetaTag('keywords', portfolioConfig.seo.keywords);
    updateMetaTag('author', portfolioConfig.personal.name);

    // Open Graph tags
    updateMetaTag('og:title', siteTitle, true);
    updateMetaTag('og:description', siteDescription, true);
    updateMetaTag('og:image', siteImage, true);
    updateMetaTag('og:url', siteUrl, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', siteTitle);
    updateMetaTag('twitter:description', siteDescription);
    updateMetaTag('twitter:image', siteImage);
    updateMetaTag('twitter:creator', portfolioConfig.seo.twitterHandle);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('theme-color', '#0ea5e9');

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: portfolioConfig.personal.name,
      jobTitle: portfolioConfig.personal.title,
      email: portfolioConfig.personal.email,
      telephone: portfolioConfig.personal.phone,
      url: siteUrl,
      image: portfolioConfig.personal.image,
      sameAs: [
        portfolioConfig.social.linkedin,
        portfolioConfig.social.github,
        portfolioConfig.social.leetcode,
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'VIT Bhopal University',
      },
      knowsAbout: [
        'Full Stack Development',
        'Data Analysis',
        'Cybersecurity',
        'React',
        'Python',
        'JavaScript',
      ],
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [siteTitle, siteDescription, siteImage, siteUrl]);

  return null;
};

export default SEO;