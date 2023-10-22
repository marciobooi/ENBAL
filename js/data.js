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
    "chart": [],
    "full": 0,
    "chartBalText":[],
    "order":"DESC",
    "siecs": "",
    "dataset": "nrg_bal_c",
    "decimals": "0",
    "agregates": "0",
    "fuelList": [ "fuelElectricity", "fuelCombustible", "fuelNonCombustible", "fuelOtherPetroleum", "fuelMainPetroleum", "fuelOil", "fuelOtherFossil", "fuelFossil", "fuelCoal", "fuelMainFuel"]
  },


  // set global ref variables in URL
  setRefURL: function () {
    var url = window.location.href;
    var end = url.indexOf("?");
    url = (end > 0) ? url.slice(0, end) : url.slice(0);
    var iref = 0;
    for (ref in dataNameSpace.ref) {
      url += (iref == 0) ? "?" : "&";
      url += ref + "=" + dataNameSpace.ref[ref];
      iref++;
    };
    changeUrl("title", url);
  },

  // get global ref variables in URL
  getRefURL: function () {
    var refURL = getUrlVars();
    for (var ref in dataNameSpace.ref) {
      if (typeof refURL[ref] === "undefined") continue;
      dataNameSpace.ref[ref] = refURL[ref];
    };


    if(typeof refURL[ref] !== "undefined"){
      fuelList = []
      refURL.fuelList.split(',').forEach(fuel => {             
        fuelList.push(fuel)
          });
      REF.fuelList = fuelList
    }

  },


};
// global shortcut to reference setting
var REF = dataNameSpace.ref;

