// Performance monitoring utilities - FAANG Level

export const measurePerformance = () => {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  window.addEventListener('load', () => {
    // Get navigation timing
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfData) {
      const metrics = {
        // Page load metrics
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        request: perfData.responseStart - perfData.requestStart,
        response: perfData.responseEnd - perfData.responseStart,
        dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        load: perfData.loadEventEnd - perfData.loadEventStart,
        total: perfData.loadEventEnd - perfData.fetchStart,
      };

      console.group('⚡ Performance Metrics');
      console.log('DNS Lookup:', metrics.dns.toFixed(2), 'ms');
      console.log('TCP Connection:', metrics.tcp.toFixed(2), 'ms');
      console.log('Request Time:', metrics.request.toFixed(2), 'ms');
      console.log('Response Time:', metrics.response.toFixed(2), 'ms');
      console.log('DOM Processing:', metrics.dom.toFixed(2), 'ms');
      console.log('Load Event:', metrics.load.toFixed(2), 'ms');
      console.log('Total Load Time:', metrics.total.toFixed(2), 'ms');
      console.groupEnd();

      // Log warning if load time is slow
      if (metrics.total > 3000) {
        console.warn('⚠️ Page load time is slow. Consider optimizing assets.');
      }
    }

    // Get resource timing
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const largeResources = resources.filter(r => r.transferSize > 100000);
    
    if (largeResources.length > 0) {
      console.group('📦 Large Resources (>100KB)');
      largeResources.forEach(resource => {
        console.log(
          resource.name.split('/').pop(),
          (resource.transferSize / 1024).toFixed(2),
          'KB',
          resource.duration.toFixed(2),
          'ms'
        );
      });
      console.groupEnd();
    }
  });
};

// Core Web Vitals monitoring
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      console.log('🎨 LCP:', lastEntry.renderTime || lastEntry.loadTime, 'ms');
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const observeFID = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        console.log('⚡ FID:', entry.processingStart - entry.startTime, 'ms');
      });
    });
    observer.observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsScore = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsScore += (entry as any).value;
        }
      }
      console.log('📐 CLS:', clsScore.toFixed(4));
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  };

  try {
    observeLCP();
    observeFID();
    observeCLS();
  } catch (error) {
    console.warn('Web Vitals monitoring not supported in this browser');
  }
};

// Memory usage monitoring (Chrome only)
export const monitorMemory = () => {
  if (typeof window === 'undefined') return;
  
  const memory = (performance as any).memory;
  if (memory) {
    setInterval(() => {
      const used = (memory.usedJSHeapSize / 1048576).toFixed(2);
      const total = (memory.totalJSHeapSize / 1048576).toFixed(2);
      const limit = (memory.jsHeapSizeLimit / 1048576).toFixed(2);
      
      console.log(`💾 Memory: ${used}MB / ${total}MB (Limit: ${limit}MB)`);
      
      // Warn if memory usage is high
      if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
        console.warn('⚠️ High memory usage detected!');
      }
    }, 30000); // Check every 30 seconds
  }
};

// Initialize all performance monitoring
export const initPerformanceMonitoring = () => {
  if (import.meta.env.DEV) {
    measurePerformance();
    measureWebVitals();
    monitorMemory();
  }
};
