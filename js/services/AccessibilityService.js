/**
 * AccessibilityService: Centralizes accessibility-related features
 * Improves accessibility compliance across the application
 */
class AccessibilityService {
  constructor() {
    this.observerActive = false;
  }

  /**
   * Initialize accessibility features
   */
  initialize() {
    this.setupAriaObserver();
    this.enhanceKeyboardNavigation();
    this.improveChartAccessibility();
  }

  /**
   * Sets up an observer to fix aria-hidden attributes on chart elements
   * This addresses the issue where some Highcharts elements have improper aria-hidden values
   */
  setupAriaObserver() {
    if (this.observerActive) return;
    
    // Create a MutationObserver to watch for changes to aria-hidden attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
          const target = mutation.target;
          if (target.classList.contains('highcharts-a11y-proxy-element') && target.getAttribute('aria-hidden') === 'true') {
            // Only change it if it's not a legend item that should be hidden
            if (!target.getAttribute('aria-label')?.includes('hide')) {
              target.setAttribute('aria-hidden', 'false');
            }
          }
        }
      });
    });

    // Start observing the document with the configured parameters
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['aria-hidden'],
        subtree: true
      });
      this.observerActive = true;
    });
  }

  /**
   * Enhances keyboard navigation throughout the application
   */
  enhanceKeyboardNavigation() {
    document.addEventListener('DOMContentLoaded', () => {
      // Add focus indicators to all focusable elements
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      document.querySelectorAll(focusableElements).forEach(element => {
        element.addEventListener('focus', () => {
          element.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', () => {
          element.classList.remove('keyboard-focus');
        });
      });

      // Add skip links for keyboard navigation
      this.addSkipLinks();
    });
  }

  /**
   * Add skip links to improve keyboard navigation
   */
  addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const mainContent = document.getElementById('enbal') || document.querySelector('main');
        if (mainContent) {
          mainContent.setAttribute('tabindex', '-1');
          mainContent.focus();
        }
      }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Improves chart accessibility
   */
  improveChartAccessibility() {
    // Update chart accessibility options when charts are created
    document.addEventListener('DOMContentLoaded', () => {
      if (window.Highcharts) {
        // Set default accessibility options for all charts
        window.Highcharts.setOptions({
          accessibility: {
            enabled: true,
            keyboardNavigation: {
              enabled: true,
              focusBorder: {
                style: {
                  lineWidth: 3,
                  color: '#0E47CB'
                }
              }
            },
            announceNewData: {
              enabled: true
            }
          }
        });
      }
    });
  }

  /**
   * Enhances accessibility for a specific chart
   * @param {Object} chart - The Highcharts chart object
   * @param {Object} options - Accessibility options
   */
  enhanceChartAccessibility(chart, options = {}) {
    if (!chart) return;
    
    // Merge provided options with defaults
    const accessibilityOptions = Object.assign({
      keyboardNavigation: {
        enabled: true,
        focusBorder: {
          style: {
            lineWidth: 3,
            color: '#0E47CB'
          }
        }
      },
      announceNewData: {
        enabled: true
      },
      screenReaderSection: {
        beforeChartFormat: `<h5>{chartTitle}</h5><div>{chartSubtitle}</div><div>{chartLongdesc}</div>`
      }
    }, options);
    
    // Update chart with enhanced accessibility options
    chart.update({
      accessibility: accessibilityOptions
    });
  }

  /**
   * Updates accessibility labels for chart elements
   * Replaces default English text with translated versions
   */
  updateAccessibilityLabels() {
    // Query all highcharts-a11y-proxy-element elements with the `aria-label` attribute
    const elements = document.querySelectorAll('highcharts-a11y-proxy-element[aria-label]');
  
    elements.forEach((element) => {
      // Get the current aria-label
      let ariaLabel = element.getAttribute('aria-label');
  
      // Check if it contains the word "Show" (case-insensitive)
      if (/show/i.test(ariaLabel)) {
        // Replace "Show" with the translated version
        const translatedLabel = ariaLabel.replace(/show/i, window.translationsCache['SHOW'] || 'Show');
  
        // Update the aria-label attribute with the translated text
        element.setAttribute('aria-label', translatedLabel);
      }
      
      // Check if it contains the word "Hide" (case-insensitive)
      if (/hide/i.test(ariaLabel)) {
        // Replace "Hide" with the translated version
        const translatedLabel = ariaLabel.replace(/hide/i, window.translationsCache['HIDE'] || 'Hide');
  
        // Update the aria-label attribute with the translated text
        element.setAttribute('aria-label', translatedLabel);
      }
    });
  }
}

// Create instance and export
window.accessibilityService = new AccessibilityService();

// Initialize accessibility features when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityService.initialize();
});