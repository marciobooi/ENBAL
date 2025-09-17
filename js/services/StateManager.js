/**
 * StateManager: Responsible for managing application state
 * Implements a publish/subscribe pattern for reactive state management
 */
class StateManager {
  constructor(initialState = {}) {
    // Private state object
    this._state = Object.assign({
      // Default state values
      chart: "",
      chartBal: "",
      unit: "KTOE",
      year: "2021",
      geo: "EU27_2020",
      siecs: [],
      siec: "TOTAL",
      fuel: "fuelMainFuel",
      language: "EN",
      details: 0,
      agregates: 1,
      order: "DESC",
      stacking: "normal",
      percentage: 0,
      decimals: 2,
      dataset: "nrg_bal_c"
    }, initialState);
    
    // Subscribers for state changes
    this._subscribers = {};
    
    // Subscribers for any state change
    this._globalSubscribers = [];
  }
  
  /**
   * Get current state
   * @param {string} key - Optional state key to retrieve
   * @returns {*} - State value or entire state object
   */
  getState(key) {
    if (key) {
      return this._state[key];
    }
    // Return copy of state to prevent direct mutation
    return Object.assign({}, this._state);
  }
  
  /**
   * Set state value
   * @param {string|Object} key - State key or object with multiple updates
   * @param {*} value - New value (optional if key is an object)
   */
  setState(key, value) {
    // Handle case where an object of updates is provided
    if (typeof key === 'object' && value === undefined) {
      const updates = key;
      const changedKeys = [];
      
      Object.keys(updates).forEach(k => {
        if (this._state[k] !== updates[k]) {
          this._state[k] = updates[k];
          changedKeys.push(k);
        }
      });
      
      // Notify subscribers of changes
      changedKeys.forEach(k => {
        this._notifySubscribers(k, this._state[k]);
      });
      
      // Notify global subscribers if any changes were made
      if (changedKeys.length > 0) {
        this._notifyGlobalSubscribers();
      }
    } 
    // Handle case where a single key/value is provided
    else if (this._state[key] !== value) {
      // Update state
      this._state[key] = value;
      
      // Notify subscribers of change
      this._notifySubscribers(key, value);
      this._notifyGlobalSubscribers();
    }
  }
  
  /**
   * Subscribe to changes in a specific state key
   * @param {string} key - State key to subscribe to
   * @param {Function} callback - Callback function when state changes
   * @returns {Function} - Unsubscribe function
   */
  subscribe(key, callback) {
    if (!this._subscribers[key]) {
      this._subscribers[key] = [];
    }
    
    this._subscribers[key].push(callback);
    
    // Return unsubscribe function
    return () => {
      this._subscribers[key] = this._subscribers[key].filter(cb => cb !== callback);
    };
  }
  
  /**
   * Subscribe to any state change
   * @param {Function} callback - Callback function when any state changes
   * @returns {Function} - Unsubscribe function
   */
  subscribeToAll(callback) {
    this._globalSubscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      this._globalSubscribers = this._globalSubscribers.filter(cb => cb !== callback);
    };
  }
  
  /**
   * Notify subscribers of state changes
   * @param {string} key - State key that changed
   * @param {*} value - New value
   * @private
   */
  _notifySubscribers(key, value) {
    if (this._subscribers[key]) {
      this._subscribers[key].forEach(callback => {
        try {
          callback(value, key);
        } catch (error) {
          console.error(`Error in subscriber callback for ${key}:`, error);
        }
      });
    }
  }
  
  /**
   * Notify global subscribers of any state change
   * @private
   */
  _notifyGlobalSubscribers() {
    if (this._globalSubscribers.length > 0) {
      const stateCopy = this.getState();
      
      this._globalSubscribers.forEach(callback => {
        try {
          callback(stateCopy);
        } catch (error) {
          console.error("Error in global subscriber callback:", error);
        }
      });
    }
  }
  
  /**
   * For backward compatibility with REF object
   * Acts as a proxy to allow accessing state properties directly
   */
  createRefProxy() {
    const self = this;
    
    return new Proxy({}, {
      get(target, prop) {
        return self.getState(prop);
      },
      set(target, prop, value) {
        self.setState(prop, value);
        return true;
      }
    });
  }
}

// Create StateManager instance
window.stateManager = new StateManager(window.REF || {});

// Create a backward-compatible REF proxy
// This allows existing code to continue working while we transition
window.REF = window.stateManager.createRefProxy();