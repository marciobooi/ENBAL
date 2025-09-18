/**
 * Tooltip Management System
 * Handles creation, display, and keyboard navigation for tooltips
 * Supports ESC key to close visible tooltips during keyboard navigation
 */

// Function to clean up existing tooltips
function cleanupTooltips() {
  console.log("Cleaning up tooltips");
  
  // Remove all existing tooltip elements
  const existingTooltips = document.querySelectorAll('.tooltip');
  existingTooltips.forEach(tooltip => tooltip.remove());
  
  // Reset ESC listener flag so it can be added again when tooltips are re-enabled
  window.tooltipEscListenerAdded = false;
  
  // Only clean up specific chart-related buttons that are dynamically created
  // and exclude all navigation, menu, and other important UI buttons
  const buttonsToClean = document.querySelectorAll(".chartIcon, #auxChartControls button, #dataTableContainer button");
  buttonsToClean.forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });
}

// Function to show tooltip on keyboard navigation and mouse hover
function enableTooltips() {
  // Select all button elements with title or aria-label attributes
  const buttons = document.querySelectorAll("button[title], button[aria-label]");

  // Track currently visible tooltips for ESC key functionality
  let visibleTooltips = new Set();

  // ESC key handler to close visible tooltips
  const handleEscKey = (event) => {
    if (event.key === 'Escape' && visibleTooltips.size > 0) {
      // Hide all visible tooltips
      visibleTooltips.forEach(tooltip => {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
      });
      visibleTooltips.clear();
      
      // Return focus to the previously focused element if possible
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
    }
  };

  // Add global ESC key listener (only once)
  if (!window.tooltipEscListenerAdded) {
    document.addEventListener('keydown', handleEscKey);
    window.tooltipEscListenerAdded = true;
  }

  buttons.forEach((button) => {  
    // Get the tooltip content from title or aria-label
    const tooltipText = button.getAttribute("title") || button.getAttribute("aria-label");
    if (!tooltipText) return;

    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = tooltipText;
    tooltip.style.position = "absolute";
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
    tooltip.style.transition = "opacity 0.2s";
    document.body.appendChild(tooltip);

    // Position the tooltip relative to the button
    const positionTooltip = () => {
      const rect = button.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const tooltipHeight = tooltip.offsetHeight;
      const tooltipWidth = tooltip.offsetWidth;

      tooltip.style.left = `${rect.left + scrollX + rect.width / 2 - tooltipWidth / 2}px`;
      tooltip.style.top = `${rect.top + scrollY - tooltipHeight - 10}px`;
    };

    // Show tooltip
    const showTooltip = () => {
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
      visibleTooltips.add(tooltip);
      positionTooltip();
    };

    // Hide tooltip
    const hideTooltip = () => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      visibleTooltips.delete(tooltip);
    };

    // Event listeners for both mouse and keyboard interactions
    button.addEventListener("mouseover", showTooltip);
    button.addEventListener("mouseout", hideTooltip);
    button.addEventListener("focus", showTooltip);
    button.addEventListener("blur", hideTooltip);

    // Update tooltip position on resize to keep alignment
    window.addEventListener("resize", () => {
      if (tooltip.style.visibility === "visible") {
        positionTooltip();
      }
    });
  });
}