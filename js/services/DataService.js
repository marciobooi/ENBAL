/**
 * DataService: Handles data transformation and processing
 * Applies the Single Responsibility Principle by focusing only on data manipulation
 */
class DataService {
  constructor(apiService) {
    this.apiService = apiService || new ApiService();
  }

  /**
   * Gets balance data for the main table
   * @param {Object} params - Parameters for data request
   * @returns {Promise<Object>} - Processed data
   */
  async getBalanceData(params) {
    try {
      const data = await this.apiService.getChartData(params);
      return data;
    } catch (error) {
      console.error("Error getting balance data:", error);
      throw error;
    }
  }

  /**
   * Gets chart data for the specific chart type
   * @param {string} chartType - Type of chart (barChart, pieChart, lineChart)
   * @param {Object} params - Parameters for chart data
   * @returns {Promise<Object>} - Processed chart data
   */
  async getChartData(chartType, params) {
    try {
      // Set chart type in params
      params.chart = chartType;
      const data = await this.apiService.getChartData(params);
      
      switch (chartType) {
        case 'barChart':
          return this.transformBarChartData(data, params);
        case 'pieChart':
          return this.transformPieChartData(data, params);
        case 'lineChart':
          return this.transformLineChartData(data, params);
        default:
          return data;
      }
    } catch (error) {
      console.error("Error getting chart data:", error);
      throw error;
    }
  }

  /**
   * Transform data for bar charts
   * @param {Object} data - Raw data from API
   * @param {Object} params - Additional parameters
   * @returns {Object} - Processed data for bar charts
   */
  transformBarChartData(data, params) {
    const { details } = params;
    let chartSeries = [];
    let categories = [];
    
    if (details === 1) {
      // Handle detailed view
      const values = data.value;
      const siecs = data.Dimension("siec").id;
      const geos = data.Dimension("geo").id;
      
      // Process for detailed view
      for (let siecIndex in siecs) {
        if (siecs[siecIndex] === "TOTAL") continue;
        
        let seriesData = [];
        for (let j = 0; j < geos.length; j++) {
          // Get value from the data array
          const valueIndex = parseInt(siecIndex) * geos.length + j;
          const value = values[valueIndex] === null ? 0 : values[valueIndex];
          seriesData.push(value);
          
          // Add category names only once
          if (categories.length < geos.length) {
            categories.push(window.translationsCache[geos[j]] || geos[j]);
          }
        }
        
        chartSeries.push({
          name: window.translationsCache[siecs[siecIndex]] || siecs[siecIndex],
          data: seriesData
        });
      }
    } else {
      // Handle simple view
      const geos = data.Dimension("geo").id;
      
      chartSeries = geos.map((geo, index) => {
        const color = geo === "EU27_2020" ? '#CCA300' : (geo === "EA" ? '#208486' : "#0E47CB");
        categories.push(window.translationsCache[geo] || geo);
        
        return {
          name: window.translationsCache[geo] || geo,
          y: data.value[index] === null ? 0 : data.value[index],
          color
        };
      });
    }
    
    return {
      series: chartSeries,
      categories,
      rawData: data
    };
  }

  /**
   * Transform data for pie charts
   * @param {Object} data - Raw data from API
   * @param {Object} params - Additional parameters
   * @returns {Object} - Processed data for pie charts
   */
  transformPieChartData(data, params) {
    const pieChartData = [];
    const siecs = data.Dimension("siec").id;
    const values = data.value;
    
    siecs.forEach((siec, index) => {
      if (siec !== "TOTAL" && values[index] > 0) {
        pieChartData.push({
          name: window.translationsCache[siec] || siec,
          y: values[index]
        });
      }
    });
    
    // Sort data alphabetically
    pieChartData.sort((a, b) => a.name.localeCompare(b.name));
    
    return {
      series: [{
        name: window.translationsCache["VALUE"] || "VALUE",
        data: pieChartData
      }],
      rawData: data
    };
  }

  /**
   * Transform data for line charts
   * @param {Object} data - Raw data from API
   * @param {Object} params - Additional parameters
   * @returns {Object} - Processed data for line charts
   */
  transformLineChartData(data, params) {
    const lineChartData = [];
    const siecs = data.Dimension("siec").id;
    const years = data.Dimension("time").id;
    const values = data.value;
    
    siecs.forEach((siec, siecIndex) => {
      const seriesData = [];
      
      for (let j = 0; j < years.length; j++) {
        const valueIndex = siecIndex * years.length + j;
        seriesData.push(values[valueIndex]);
      }
      
      lineChartData.push({
        name: window.translationsCache[siec] || siec,
        data: seriesData
      });
    });
    
    return {
      series: lineChartData,
      categories: years,
      rawData: data
    };
  }

  /**
   * Process table data for display
   * @param {Object} data - Raw data from API
   * @param {Array} balances - Balance codes
   * @param {Array} siecs - SIEC codes
   * @returns {Array} - Processed table data
   */
  processTableData(data, balances, siecs) {
    const tableData = [];
    const nrgBalDimension = data.Dimension("nrg_bal");
    const nrgBalIds = nrgBalDimension.id;
    const numColumns = siecs.length;
    
    // Process each balance
    balances.forEach(balance => {
      const row = [balance];
      const apiBalanceIndex = nrgBalIds.indexOf(balance);
      
      // Process each column
      for (let j = 0; j < numColumns; j++) {
        let cellValue;
        
        if (apiBalanceIndex !== -1) {
          // Get value from API data
          cellValue = data.value[apiBalanceIndex * numColumns + j];
        } else {
          // Balance not in API data
          cellValue = null;
        }
        
        row.push(cellValue);
      }
      
      tableData.push(row);
    });
    
    return tableData;
  }
}

// Export the service for use in other files
window.DataService = DataService;