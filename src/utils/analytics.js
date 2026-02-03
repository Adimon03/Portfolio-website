// Analytics utility - FAANG Level tracking
// Replace with your Google Analytics ID or other analytics service

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;
  
  window.gtag?.('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window === 'undefined' || !GA_TRACKING_ID) return;

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  trackEvent('click', 'Button', buttonName);
};

// Track external link clicks
export const trackExternalLink = (url) => {
  trackEvent('click', 'External Link', url);
};

// Track downloads
export const trackDownload = (fileName) => {
  trackEvent('download', 'File', fileName);
};

// Track form submissions
export const trackFormSubmit = (formName) => {
  trackEvent('submit', 'Form', formName);
};

// Track section views
export const trackSectionView = (sectionName) => {
  trackEvent('view', 'Section', sectionName);
};