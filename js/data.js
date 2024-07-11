var dataNameSpace = {
  version: "1",
 
 
  // reference variables for global diagram setup + default settings
  ref: {
    "geo": "EU27_2020", // cf. energyCountries object in codes.js 
    "unit": "KTOE", // cf. energyUnits object in codes.js
    "language": "EN", // language selected  
    "year": "",
    "fuel": "fuelMainFuel",
    "siec": "TOTAL",
    "details": 1,
    "chartOptions": 0,
    "stacking": "normal",
    "chartBal": "",
    "chart": "",
    "full": 0,
    "chartBalText":[],
    "order":"DESC",
    "siecs": "",
    "dataset": "nrg_bal_c",
    "decimals": "0",
    "agregates": "0",
    "share": "false",
    "fuelList": [ "fuelElectricity", "fuelCombustible", "fuelNonCombustible", "fuelOtherPetroleum", "fuelMainPetroleum", "fuelOil", "fuelOtherFossil", "fuelFossil", "fuelCoal", "fuelMainFuel"]
  },


// Function to set global ref variables in URL
setRefURL: function () {
  let url = window.location.href.split('?')[0]; // Get the base URL without query parameters
  const params = new URLSearchParams();

  // Add each ref from dataNameSpace.ref to the URL parameters
  Object.entries(dataNameSpace.ref).forEach(([key, value], index) => {
    params.append(key, value);
  });

  // Construct the final URL with the updated parameters
  url += `?${params.toString()}`;

  // Function to change the URL without reloading the page
  changeUrl("title", url);
},


  // get global ref variables in URL
  getRefURL: function () {
    // Function to get URL parameters as an object
    const getUrlVars = () => {
      const vars = {};
      const url = window.location.href.replace(/#$/, ''); // Remove trailing '#' if exists
      const queryString = url.split('?')[1] || '';
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key) {
          vars[decodeURIComponent(key)] = decodeURIComponent(value);
        }
      });
      return vars;
    };
  
    // Retrieve URL parameters
    const refURL = getUrlVars();
  
    // Update dataNameSpace.ref based on URL parameters
    for (const ref in dataNameSpace.ref) {
      if (refURL[ref] !== undefined) {
        dataNameSpace.ref[ref] = refURL[ref];
      }
    }
  
    // Update REF.fuelList if fuelList parameter exists in URL
    if (refURL.fuelList !== undefined) {
      REF.fuelList = refURL.fuelList.split(',').map(fuel => fuel.trim());
    }
  },
  
  


};
// global shortcut to reference setting
var REF = dataNameSpace.ref;

