/**
 * PerformanceService: Centralizes performance optimization features
 * Implements lazy loading, debouncing, and other performance improvements
 */
class PerformanceService {
  constructor() {
    this.debounceTimers = {};
    this.measurementActive = false;
    this.lazyLoadObserver = null;
  }

  /**
   * Initialize performance optimizations
   */
  initialize() {
    this.setupLazyLoading();
    this.monitorPagePerformance();
  }

  /**
   * Apply debouncing to a function to limit how often it can be called
   * @param {Function} func - The function to debounce
   * @param {number} delay - Delay in milliseconds
   * @param {string} id - Unique identifier for this debounced function
   * @returns {Function} - Debounced function
   */
  debounce(func, delay, id = 'default') {
    return (...args) => {
      // Clear any existing timer for this ID
      if (this.debounceTimers[id]) {
        clearTimeout(this.debounceTimers[id]);
      }
      
      // Set a new timer
      this.debounceTimers[id] = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  /**
   * Apply throttling to a function to ensure it's not called more than once in a given period
   * @param {Function} func - The function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  throttle(func, limit) {
    let inThrottle = false;
    
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  /**
   * Setup lazy loading for images and other resources
   * Uses Intersection Observer API for better performance
   */
  setupLazyLoading() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.loadAllImagesImmediately();
      return;
    }
    
    const options = {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    };
    
    this.lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // For images
          if (element.tagName.toLowerCase() === 'img' && element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
          
          // For background images
          if (element.dataset.background) {
            element.style.backgroundImage = `url(${element.dataset.background})`;
            element.removeAttribute('data-background');
          }
          
          // Stop observing the element after loading
          observer.unobserve(element);
        }
      });
    }, options);
    
    // Start observing elements when the document is ready
    document.addEventListener('DOMContentLoaded', () => {
      // For images
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.lazyLoadObserver.observe(img);
      });
      
      // For elements with background images
      document.querySelectorAll('[data-background]').forEach(element => {
        this.lazyLoadObserver.observe(element);
      });
    });
  }

  /**
   * Fallback method to load all images immediately
   * Used when IntersectionObserver is not supported
   */
  loadAllImagesImmediately() {
    document.addEventListener('DOMContentLoaded', () => {
      // Load all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
      
      // Load all background images
      document.querySelectorAll('[data-background]').forEach(element => {
        element.style.backgroundImage = `url(${element.dataset.background})`;
      });
    });
  }

  /**
   * Monitor page performance using the Performance API
   */
  monitorPagePerformance() {
    // Check if Performance API is supported
    if (!('performance' in window)) {
      return;
    }
    
    // Avoid duplicate measurements
    if (this.measurementActive) {
      return;
    }
    
    this.measurementActive = true;
    
    // Measure page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const performance = window.performance;
        
        if (performance) {
          // Navigation Timing API
          const pageNavigation = performance.getEntriesByType('navigation')[0];
          
          if (pageNavigation) {
            const loadTime = pageNavigation.loadEventEnd - pageNavigation.startTime;
            console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
            
            // Send metrics to analytics if loadTime is too high
            if (loadTime > 3000) {
              // Consider optimization techniques if page load is slow
              this.applyAdditionalOptimizations();
            }
          }
          
          // Resource Timing for specific assets
          const resources = performance.getEntriesByType('resource');
          const slowResources = resources.filter(resource => 
            resource.duration > 1000
          );
          
          if (slowResources.length > 0) {
            console.log('Slow-loading resources:', slowResources);
            // Consider optimizing these resources
          }
        }
      }, 0);
    });
  }

  /**
   * Apply additional optimizations for slow pages
   */
  applyAdditionalOptimizations() {
    // If page load is slow, apply more aggressive optimizations
    
    // Reduce animation complexity
    document.documentElement.classList.add('reduce-animation');
    
    // Implement soft image degradation for slower connections
    document.querySelectorAll('img:not([data-src])').forEach(img => {
      // Add a compressed version if original image is large
      if (img.naturalWidth > 800) {
        const src = img.src;
        const compressedSrc = this.getCompressedImageUrl(src);
        img.src = compressedSrc;
      }
    });
  }

  /**
   * Get a compressed version of an image URL
   * @param {string} originalUrl - Original image URL
   * @returns {string} - URL for compressed version
   */
  getCompressedImageUrl(originalUrl) {
    // In a real implementation, this would point to a compressed version
    // For now, we'll just return the original as a placeholder
    return originalUrl;
  }

  /**
   * Optimize chart rendering to improve performance
   * @param {Object} chartOptions - Highcharts options object
   * @returns {Object} - Optimized chart options
   */
  optimizeChartOptions(chartOptions) {
    // Apply performance optimizations to chart options
    const optimizedOptions = { ...chartOptions };
    
    // Disable animations for better performance
    if (!optimizedOptions.plotOptions) {
      optimizedOptions.plotOptions = {};
    }
    
    // Optimize series options for better performance
    if (optimizedOptions.series && optimizedOptions.series.length > 20) {
      // For large datasets, use optimized settings
      if (!optimizedOptions.plotOptions.series) {
        optimizedOptions.plotOptions.series = {};
      }
      
      optimizedOptions.plotOptions.series.animation = false;
      optimizedOptions.plotOptions.series.enableMouseTracking = false;
      optimizedOptions.plotOptions.series.states = {
        hover: {
          enabled: false
        }
      };
      
      // Re-enable mouse tracking only when chart is ready
      setTimeout(() => {
        if (chartOptions.chart && chartOptions.chart.events) {
          const originalCallback = chartOptions.chart.events.load;
          
          optimizedOptions.chart.events.load = function() {
            if (originalCallback) {
              originalCallback.apply(this, arguments);
            }
            
            // Re-enable mouse tracking after chart is loaded
            this.update({
              plotOptions: {
                series: {
                  enableMouseTracking: true,
                  states: {
                    hover: {
                      enabled: true
                    }
                  }
                }
              }
            });
          };
        }
      }, 1000);
    }
    
    return optimizedOptions;
  }
}

// Create instance and export
window.performanceService = new PerformanceService();

// Initialize performance optimizations when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.performanceService.initialize();
});