/**
 * initServices: Initializes and coordinates all service dependencies
 * Ensures proper loading order and prevents reference errors
 */
(function() {
  // Create global namespaces for services
  window.ENBAL = window.ENBAL || {};
  window.ENBAL.services = window.ENBAL.services || {};
  
  // Wait for DOM ready to initialize services
  document.addEventListener('DOMContentLoaded', function() {
    // console.log('Initializing ENBAL services...');
    
    // Initialize services in order of dependencies
    initializeServices();
    
    // Attach services to global namespace
    window.apiService = window.ENBAL.services.apiService;
    window.dataService = window.ENBAL.services.dataService;
    window.stateManager = window.ENBAL.services.stateManager;
    window.accessibilityService = window.ENBAL.services.accessibilityService;
    window.performanceService = window.ENBAL.services.performanceService;
  });
  
  /**
   * Initialize all services in the correct order
   */
  function initializeServices() {
    try {
      // Create ApiService first as others depend on it
      window.ENBAL.services.apiService = new ApiService();
      // console.log('ApiService initialized');
      
      // Create DataService which depends on ApiService
      window.ENBAL.services.dataService = new DataService(window.ENBAL.services.apiService);
      // console.log('DataService initialized');
      
      // Create StateManager and initialize with current REF object if available
      window.ENBAL.services.stateManager = new StateManager(window.REF || {});
      // Create a backward-compatible REF proxy for legacy code
      if (window.REF) {
        window.REF = window.ENBAL.services.stateManager.createRefProxy();
      }
      // console.log('StateManager initialized');
      
      // Initialize AccessibilityService
      window.ENBAL.services.accessibilityService = new AccessibilityService();
      window.ENBAL.services.accessibilityService.initialize();
      // console.log('AccessibilityService initialized');
      
      // Initialize PerformanceService
      window.ENBAL.services.performanceService = new PerformanceService();
      window.ENBAL.services.performanceService.initialize();
      // console.log('PerformanceService initialized');
      
      // console.log('All ENBAL services initialized successfully');
    } catch (error) {
      console.error('Error initializing services:', error);
    }
  }
})();