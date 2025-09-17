/**
 * ApiService: Responsible for all API interactions
 * Follows Single Responsibility Principle by handling only API-related operations
 */
class ApiService {
  constructor() {
    this.cache = {};
    this.baseUrl = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/";
  }

  /**
   * Builds a URL for the API request based on parameters
   * @param {Object} params - Configuration parameters for URL building
   * @returns {string} - The constructed URL
   */
  buildUrl(params) {
    const { dataset, chart, chartBal, unit, year, geo, siecs, siec, details, agregates, language } = params;
    
    let url = `${this.baseUrl}${dataset}?format=JSON&lang=${language || 'en'}`;

    switch (chart) {
      case "lineChart":
        url += `&nrg_bal=${chartBal}&unit=${unit}&geo=${geo}`;
        if (siecs && siecs.length > 0) {
          siecs.forEach(s => {
            if (s !== "0000X0350-0370" && s !== "TOTAL" && s !== "C0350-0370") {
              url += `&siec=${s}`;
            }
          });
        }
        break;
        
      case "barChart":
        url += `&nrg_bal=${chartBal}&unit=${unit}&time=${year}`;
        
        if (details === 1) {
          const siecsToInclude = siecs.filter(s => s !== "TOTAL");
          url += siecsToInclude.map(s => `&siec=${s}`).join("");
        } else {
          url += `&siec=${siec}`;
        }
        
        if (agregates === 0) {
          const geosToInclude = window.defGeos.filter(g => g !== "EU27_2020" && g !== "EA19");
          url += geosToInclude.map(g => `&geo=${g}`).join("");
        } else {
          url += window.defGeos.map(g => `&geo=${g}`).join("");
        }
        break;
        
      case "pieChart":
        url += `&nrg_bal=${chartBal}&unit=${unit}&time=${year}&geo=${geo}`;
        if (siecs && siecs.length > 0) {
          siecs.forEach(s => {
            if (s !== "0000X0350-0370" && s !== "TOTAL" && s !== "C0350-0370") {
              url += `&siec=${s}`;
            }
          });
        }
        break;
        
      default:
        url += `&time=${year}&geo=${geo}&unit=${unit}`;
        if (params.balances && params.balances.length > 0) {
          params.balances.forEach(b => {
            url += `&nrg_bal=${b}`;
          });
        }
        if (siecs && siecs.length > 0) {
          siecs.forEach(s => {
            url += `&siec=${s}`;
          });
        }
        break;
    }
    
    return url;
  }

  /**
   * Check if data is in cache and return it, or fetch from API if not
   * @param {string} url - The URL to fetch or retrieve from cache
   * @returns {Promise<Object>} - The data from cache or API
   */
  async getData(url) {
    // If data is in cache, return it
    if (this.cache[url] && this.cache[url].length > 0) {
      return Promise.resolve(JSONstat(this.cache[url][this.cache[url].length - 1]).Dataset(0));
    }
    
    try {
      // Fetch data from API
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const dataset = JSONstat(data).Dataset(0);
      
      // Add to cache
      this.addToCache(url, dataset);
      
      return dataset;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * Get chart data based on parameters
   * @param {Object} params - Parameters for the chart data request
   * @returns {Promise<Object>} - The chart data
   */
  async getChartData(params) {
    const url = this.buildUrl(params);
    return this.getData(url);
  }

  /**
   * Add data to cache
   * @param {string} url - The URL as key for cache
   * @param {Object} data - The data to cache
   */
  addToCache(url, data) {
    if (!this.cache[url]) {
      this.cache[url] = [];
    }
    this.cache[url].push(data);
  }

  /**
   * Clear the cache
   */
  clearCache() {
    this.cache = {};
  }
}

// Export the service for use in other files
window.ApiService = ApiService;