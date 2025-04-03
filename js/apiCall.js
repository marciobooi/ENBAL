var cache = {};
let dataTable = [];

function apiCall() {
  REF.chart = ""
  REF.siecs = siec(REF.fuel);
  
  d = chartApiCall();      
  
  const numRows = balances.length;
  const numColumns = REF.siecs.length;   

  firstCol = `<div>
                <span data-i18n="tableYear"></span>
                <span>: ${REF.year}</span>
                <br>
                <span data-i18n="tableUnit"></span>
                <span>: ${REF.unit}</span>
            </div>`

  // Add the column headers as the first row
  dataTable.push([firstCol].concat(REF.siecs));       

  // Create a mapping of balance to its index
  const balanceIndices = {};
  balances.forEach((balance, index) => {
    balanceIndices[balance] = index;
  });

  // Get dimension information from the API response
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

function addToCache(query, d) {
  if (!cache[query]) {
    cache[query] = [];
  }
  
  cache[query].push(d);
}

function chartApiCall(id) {

REF.dataset = "nrg_bal_c";

  let url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/" + REF.dataset + "?";
  url += "format=JSON";
  url += "&lang=" + REF.language;

  switch (REF.chart) {
    case "lineChart":

    url += "&nrg_bal=" + REF.chartBal;
    url += "&unit=" + REF.unit;
    url += "&geo=" + REF.geo;
    for (var i = 0; i < REF.siecs.length; i++) {    
      if (REF.siecs[i] == "0000X0350-0370" || REF.siecs[i] == "TOTAL" ||REF.siecs[i] == "C0350-0370") {       
      } else {
        url += "&siec=" + REF.siecs[i];
      }
    }
      break;
      case "barChart":
        url += "&nrg_bal=" + REF.chartBal;
        url += "&unit=" + REF.unit;
        url += "&time=" + REF.year;
      
        if (REF.details == 1) {
          const siecsToInclude = REF.siecs.filter((siec) => siec !== "TOTAL");
          url += siecsToInclude.map((siec) => "&siec=" + siec).join("");
        } else {
          url += "&siec=" + REF.siec;
        }
      
        if (REF.agregates == 0) {
          const geosToInclude = defGeos.filter(
            (geo) => geo !== "EU27_2020" && geo !== "EA19"
          );
          url += geosToInclude.map((geo) => "&geo=" + geo).join("");
        } else {
          url += defGeos.map((geo) => "&geo=" + geo).join("");
        }
        break;
  case "pieChart":
    url += "&nrg_bal=" + REF.chartBal;
    url += "&unit=" + REF.unit;
    url += "&time=" + REF.year;
    url += "&geo=" + REF.geo;
    for (var i = 0; i < REF.siecs.length; i++) {
      if ( REF.siecs[i] !== "0000X0350-0370" ||REF.siecs[i] !== "TOTAL" ||REF.siecs[i] !== "C0350-0370") {
        url += "&siec=" + REF.siecs[i];
      }
    }  
    break
  default:
      url += "&time=" + REF.year;
      url += "&geo=" + REF.geo;
      url += "&unit=" + REF.unit;
      for (var i = 0; i < balances.length; i++) url += "&nrg_bal=" + balances[i];
      for (var i = 0; i < REF.siecs.length; i++) url += "&siec=" + REF.siecs[i];
    break 
  }


  log(url)

  if (cache[url] && cache[url].length > 0) {  
    d = JSONstat(cache[url][cache[url].length - 1]).Dataset(0);
    // log('load from cache')
    return d;
  } else {
   

    const request = new XMLHttpRequest();
    request.open("GET", url, false); 
    request.send();
  
    if (request.status === 500 || request.status === 503) {
      // submitFormDown();
    }
  
    if (request.status !== 200) {
      // submitFormDown();
    }
  
    const data = JSON.parse(request.responseText);
    const d = JSONstat(data).Dataset(0);

    addToCache(url, d);
    
    return d;
  }


}
