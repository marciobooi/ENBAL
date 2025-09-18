/**
 * Enhanced Tooltip Management System
 * Handles creation, display, and keyboard navigation for tooltips
 * Features: ESC key support, smart positioning, performance optimization, enhanced accessibility
 */

class TooltipManager {
  constructor() {
    this.visibleTooltips = new Set();
    this.tooltipElements = new Map(); // Cache tooltip elements
    this.escListenerAdded = false;
    this.resizeHandler = null;
    this.TOOLTIP_OFFSET = 10;
    this.SHOW_DELAY = 200; // Delay before showing tooltip
    this.HIDE_DELAY = 100;  // Delay before hiding tooltip
    this.showTimeout = null;
    this.hideTimeout = null;
    this.currentMode = null; // Track current interaction mode: 'mouse' or 'keyboard'
    this.activeTooltip = null; // Track currently active tooltip
  }

  /**
   * Clean up existing tooltips and event listeners
   */
  cleanup() {
    // Clear any pending timeouts
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    
    // Remove all existing tooltip elements
    const existingTooltips = document.querySelectorAll('.tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
    
    // Clear caches and reset state
    this.visibleTooltips.clear();
    this.tooltipElements.clear();
    this.currentMode = null;
    this.activeTooltip = null;
    
    // Remove resize listener
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    
    // Reset ESC listener flag
    this.escListenerAdded = false;
    
    // Clean up specific chart-related buttons
    const buttonsToClean = document.querySelectorAll(".chartIcon, #auxChartControls button, #dataTableContainer button");
    buttonsToClean.forEach(button => {
      const newButton = button.cloneNode(true);
      button.parentNode?.replaceChild(newButton, button);
    });
  }

  /**
   * ESC key handler to close visible tooltips
   */
  handleEscKey = (event) => {
    if (event.key === 'Escape' && this.visibleTooltips.size > 0) {
      event.preventDefault(); // Prevent default ESC behavior
      this.hideAllTooltips();
      
      // Optionally restore focus to the previously focused element
      if (document.activeElement && this.shouldBlurOnEsc(document.activeElement)) {
        document.activeElement.blur();
      }
    }
  }

  /**
   * Determine if we should blur the focused element on ESC
   */
  shouldBlurOnEsc(element) {
    // Only blur if it's a button that triggered a tooltip
    return element.tagName === 'BUTTON' && 
           (element.hasAttribute('title') || element.hasAttribute('aria-label'));
  }

  /**
   * Hide all visible tooltips
   */
  hideAllTooltips() {
    this.visibleTooltips.forEach(tooltip => {
      this.hideTooltip(tooltip);
    });
    this.visibleTooltips.clear();
    this.activeTooltip = null;
    this.currentMode = null;
  }

  /**
   * Switch interaction mode and hide conflicting tooltips
   */
  switchMode(newMode, currentTooltip = null) {
    if (this.currentMode && this.currentMode !== newMode) {
      // Hide all existing tooltips when switching modes
      console.log(`Switching from ${this.currentMode} to ${newMode} mode - hiding all tooltips`);
      this.hideAllTooltips();
    } else if (newMode === 'mouse' && this.activeTooltip && this.activeTooltip !== currentTooltip) {
      // If we're in mouse mode and showing a different tooltip, hide the current one
    //   console.log(`Same mode (${newMode}) but different tooltip - hiding current tooltip`);
      this.hideAllTooltips();
    }
    this.currentMode = newMode;
    if (currentTooltip) {
      this.activeTooltip = currentTooltip;
    }
  }

  /**
   * Smart positioning that avoids viewport edges
   */
  positionTooltip(tooltip, button) {
    const rect = button.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = rect.left + scrollX + rect.width / 2 - tooltipRect.width / 2;
    let top = rect.top + scrollY - tooltipRect.height - this.TOOLTIP_OFFSET;

    // Horizontal boundary checking
    if (left < scrollX + 5) {
      left = scrollX + 5; // Left edge with padding
    } else if (left + tooltipRect.width > scrollX + viewportWidth - 5) {
      left = scrollX + viewportWidth - tooltipRect.width - 5; // Right edge with padding
    }

    // Vertical boundary checking - show below if no space above
    if (top < scrollY + 5) {
      top = rect.bottom + scrollY + this.TOOLTIP_OFFSET;
      tooltip.classList.add('tooltip-below');
    } else {
      tooltip.classList.remove('tooltip-below');
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  /**
   * Create tooltip element with enhanced accessibility
   */
  createTooltip(text, buttonId) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.setAttribute('tabindex', '0'); // Make tooltip focusable
    tooltip.id = `tooltip-${buttonId || Math.random().toString(36).substr(2, 9)}`;
    
    // Apply styles
    Object.assign(tooltip.style, {
      position: "absolute",
      visibility: "hidden",
      opacity: "0",
      transition: "opacity 0.1s ease-in-out",
      zIndex: "10000"
    });
    
    // Add event listeners for tooltip focus management
    tooltip.addEventListener('mouseenter', () => {
      // Keep tooltip visible when hovered
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
    });
    
    tooltip.addEventListener('mouseleave', () => {
      // Delay hide when leaving tooltip
      this.hideTimeout = setTimeout(() => {
        this.hideTooltip(tooltip);
      }, this.HIDE_DELAY);
    });
    
    tooltip.addEventListener('focus', () => {
      // Keep tooltip visible when focused
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
    });
    
    tooltip.addEventListener('blur', () => {
      // Hide when focus leaves tooltip
      this.hideTooltip(tooltip);
    });
    
    document.body.appendChild(tooltip);
    return tooltip;
  }

  /**
   * Show tooltip with animation
   */
  showTooltip(tooltip, button, mode = 'mouse') {
    // Switch mode and hide conflicting tooltips if necessary
    this.switchMode(mode, tooltip);
    
    // Clear any pending hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    tooltip.setAttribute('aria-hidden', 'false');
    this.visibleTooltips.add(tooltip);
    this.activeTooltip = tooltip;
    this.positionTooltip(tooltip, button);

    // Add aria-describedby to button for screen readers
    if (button.id) {
      button.setAttribute('aria-describedby', tooltip.id);
    }
  }

  /**
   * Hide tooltip with animation
   */
  hideTooltip(tooltip, button = null) {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
    tooltip.setAttribute('aria-hidden', 'true');
    this.visibleTooltips.delete(tooltip);

    // Clear active tooltip if it's the one being hidden
    if (this.activeTooltip === tooltip) {
      this.activeTooltip = null;
      this.currentMode = null;
    }

    // Remove aria-describedby from button
    if (button && button.hasAttribute('aria-describedby')) {
      button.removeAttribute('aria-describedby');
    }
  }

  /**
   * Debounced resize handler
   */
  handleResize = () => {
    this.visibleTooltips.forEach(tooltip => {
      // Find the associated button for repositioning
      const buttonId = tooltip.id.replace('tooltip-', '');
      const button = document.getElementById(buttonId) || 
                    Array.from(this.tooltipElements.keys()).find(btn => 
                      this.tooltipElements.get(btn) === tooltip
                    );
      if (button) {
        this.positionTooltip(tooltip, button);
      }
    });
  }

  /**
   * Initialize tooltips for all qualifying buttons
   */
  enable() {
    const buttons = document.querySelectorAll("button[title], button[aria-label]");

    // Add global ESC key listener (only once)
    if (!this.escListenerAdded) {
      document.addEventListener('keydown', this.handleEscKey);
      this.escListenerAdded = true;
    }

    // Add resize handler with debouncing
    if (!this.resizeHandler) {
      let resizeTimeout;
      this.resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(this.handleResize, 100);
      };
      window.addEventListener('resize', this.resizeHandler);
    }

    buttons.forEach((button) => {
      // Skip if already processed
      if (this.tooltipElements.has(button)) return;

      const tooltipText = button.getAttribute("title") || button.getAttribute("aria-label");
      if (!tooltipText) return;

      // Ensure button has an ID for accessibility
      if (!button.id) {
        button.id = `btn-${Math.random().toString(36).substr(2, 9)}`;
      }

      // Remove title attribute to prevent default browser tooltip
      // but preserve text in aria-label for accessibility
      if (button.hasAttribute("title")) {
        if (!button.hasAttribute("aria-label")) {
          button.setAttribute("aria-label", tooltipText);
        }
        button.removeAttribute("title");
      }

      // Create tooltip element
      const tooltip = this.createTooltip(tooltipText, button.id);
      this.tooltipElements.set(button, tooltip);

      // Event handlers with mode-aware behavior
      const showHandler = () => {
        // Clear any pending timeouts first
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }
        
        // Switch to mouse mode and hide any keyboard tooltips immediately
        if (this.currentMode === 'keyboard') {
          this.hideAllTooltips();
        }
        this.switchMode('mouse', tooltip);
        
        this.showTimeout = setTimeout(() => {
          this.showTooltip(tooltip, button, 'mouse');
        }, this.SHOW_DELAY);
      };

      const hideHandler = () => {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout);
          this.showTimeout = null;
        }
        
        // Only hide if this tooltip is from mouse interaction
        if (this.currentMode === 'mouse' && this.activeTooltip === tooltip) {
          this.hideTimeout = setTimeout(() => {
            this.hideTooltip(tooltip, button);
          }, this.HIDE_DELAY);
        }
      };

      // Immediate show/hide for keyboard focus (accessibility)
      const focusHandler = () => {
        // Clear any pending timeouts first
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }
        
        // Switch to keyboard mode and hide any mouse tooltips immediately
        if (this.currentMode === 'mouse') {
          this.hideAllTooltips();
        }
        this.switchMode('keyboard', tooltip);
        
        this.showTooltip(tooltip, button, 'keyboard');
      };

      const blurHandler = () => {
        if (this.showTimeout) {
          clearTimeout(this.showTimeout);
          this.showTimeout = null;
        }
        
        // Only hide if this tooltip is from keyboard interaction
        if (this.currentMode === 'keyboard' && this.activeTooltip === tooltip) {
          this.hideTooltip(tooltip, button);
        }
      };

      // Add event listeners
      button.addEventListener("mouseenter", showHandler);
      button.addEventListener("mouseleave", hideHandler);
      button.addEventListener("focus", focusHandler);
      button.addEventListener("blur", blurHandler);

      // Store handlers for potential cleanup
      button._tooltipHandlers = { showHandler, hideHandler, focusHandler, blurHandler };
    });
  }
}

// Create global instance
const tooltipManager = new TooltipManager();

// Export functions for backward compatibility
function cleanupTooltips() {
  tooltipManager.cleanup();
}

function enableTooltips() {
  tooltipManager.enable();
}