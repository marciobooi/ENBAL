var cache = {};
let dataTable = [];

// Initialize service instances - moved to top-level variables to prevent reference errors
let apiService;
let dataService;

// Initialize services when document is ready
document.addEventListener('DOMContentLoaded', function() {
  apiService = new ApiService();
  dataService = new DataService(apiService);
});

function apiCall() {
  REF.chart = "";
  REF.siecs = siec(REF.fuel);
  
  // Make sure services are initialized
  if (!apiService) {
    apiService = new ApiService();
    dataService = new DataService(apiService);
  }
  
  // Use the data service to fetch data
  const params = {
    dataset: REF.dataset || "nrg_bal_c",
    language: REF.language,
    year: REF.year,
    geo: REF.geo,
    unit: REF.unit,
    balances: balances, 
    siecs: REF.siecs
  };

  // Clear the datatable before populating
  dataTable = [];
  
  // For now, use synchronous approach to maintain compatibility
  d = chartApiCall();      
  
  const numRows = balances.length;
  const numColumns = REF.siecs.length;   

  firstCol = `<div>
              <span data-i18n="tableYear"></span>
              <span>: ${REF.year}</span>
              <br>
              <span data-i18n="tableUnit"></span>
              <span>: ${REF.unit}</span>
          </div>`;

  // Add the column headers as the first row
  dataTable.push([firstCol].concat(REF.siecs));       

  const nrgBalDimension = d.Dimension("nrg_bal");
  const nrgBalIds = nrgBalDimension.id;

  for (let i = 0; i < numRows; i++) {
    const balance = balances[i];
    const row = [balance];
    
    // Find the corresponding index in the API data for this balance
    const apiBalanceIndex = nrgBalIds.indexOf(balance);
    
    for (let j = 0; j < numColumns; j++) {
      let cellValue;
      if (apiBalanceIndex !== -1) {
        // If balance exists in API data, get the corresponding value
        cellValue = d.value[apiBalanceIndex * numColumns + j];
      } else {
        // If balance doesn't exist in API data, set to null or 0
        cellValue = null;
      }
      row.push(cellValue);
    }   
    dataTable.push(row);
  }

  createDataTable(dataTable);
  setupDefaultData();
  
  // In future versions we'll implement promise-based approach:
  /*
  dataService.getBalanceData(params)
    .then(d => {
      const numRows = balances.length;
      const numColumns = REF.siecs.length;   

      firstCol = `<div>
                  <span data-i18n="tableYear"></span>
                  <span>: ${REF.year}</span>
                  <br>
                  <span data-i18n="tableUnit"></span>
                  <span>: ${REF.unit}</span>
              </div>`;

      // Add the column headers as the first row
      dataTable.push([firstCol].concat(REF.siecs));       

      // Process table data using the DataService
      const tableData = dataService.processTableData(d, balances, REF.siecs);
      
      // Add processed data to the dataTable
      dataTable = dataTable.concat(tableData);

      createDataTable(dataTable);
      setupDefaultData();
    })
    .catch(error => {
      console.error("Error in apiCall:", error);
      // Show error message to the user
    });
  */
}

function addExtraBal(id) {  
  if ($('#' + id + ' > td:first-child > div > button> i').hasClass('fa-minus')) {
    removeRows(id);
    $('#' + id + ' > td:first-child > div > button').focus();
  } else {
    addNewRows(id);    
    $('#' + id + ' > td:first-child > div > button').focus();
  }
}

// Legacy function maintained for backward compatibility
// Will eventually be deprecated as ApiService takes over caching
function addToCache(query, d) {
  if (!cache[query]) {
    cache[query] = [];
  }
  
  cache[query].push(d);
}

// Refactored to use ApiService
function chartApiCall(id) {
  // Make sure apiService is initialized
  if (!apiService) {
    apiService = new ApiService();
    dataService = new DataService(apiService);
  }
  
  const params = {
    dataset: REF.dataset || "nrg_bal_c",
    chart: REF.chart,
    chartBal: REF.chartBal,
    unit: REF.unit,
    year: REF.year,
    geo: REF.geo,
    siecs: REF.siecs,
    siec: REF.siec,
    details: REF.details,
    agregates: REF.agregates,
    language: REF.language,
    balances: id ? extraBalances(id) : balances
  };

  // Use synchronous approach for now to maintain compatibility with existing code
  // In the future, fully migrate to async/await pattern
  const url = apiService.buildUrl(params);
  
  if (cache[url] && cache[url].length > 0) {  
    d = JSONstat(cache[url][cache[url].length - 1]).Dataset(0);
    return d;
  } else {
    const request = new XMLHttpRequest();
    request.open("GET", url, false); 
    request.send();
  
    if (request.status !== 200) {
      console.error(`API error: ${request.status}`);
      // Handle error gracefully
    }
  
    const data = JSON.parse(request.responseText);
    const d = JSONstat(data).Dataset(0);

    addToCache(url, d);
    
    return d;
  }
}
