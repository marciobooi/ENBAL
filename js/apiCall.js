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

      for (let i = 0; i < numRows; i++) {
        const row = [balances[i]];
        for (let j = 0; j < numColumns; j++) {
          const cellValue = d.value[i * numColumns + j];
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














































































// function apiCall(balances) {
//   column = [];
//   data = [];

//   showSpinner();

//   const chunckSize = 4;
//   const res = balances.reduce((acc, _curr, i) => {
//     if (!(i % chunckSize)) {
//       acc.push(balances.slice(i, i + chunckSize));
//     }
//     return acc;
//   }, []);

//   //console.log(REF.dataset)

//   let url = [];

//   res.forEach(function (value, i) {
//     url[i] = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
//     url[i] += "format=JSON";
//     url[i] += "&geo=" + REF.geo;
//     for (var bIdx = 0; bIdx < value.length; bIdx++) {
//       url[i] += "&nrg_bal=" + value[bIdx];
//     }
//     for (var sIdx = 0; sIdx < siecs.length; sIdx++) {
//       url[i] += "&siec=" + siecs[sIdx];
//     }
//     url[i] += "&unit=" + REF.unit;
//     url[i] += "&time=" + REF.year;
//   });
//   fetches = 0;

//   obj = { title: languageNameSpace.labels["tableYear"] + ": " + REF.year + "<br>" + languageNameSpace.labels["tableUnit"] + ": " + REF.unit,};
//   column.push(obj);
//   if (REF.fuel == "fuelMainFuel") {
//     columnSiecs = [
//       "TOTAL",
//       "C0000X0350-0370",
//       "C0350-0370",
//       "P1000",
//       "S2000",
//       "O4000XBIO",
//       "G3000",
//       "RA000",
//       "W6100_6220",
//       "N900H",
//       "E7000",
//       "H8000",
//     ];
//   } else {
//     columnSiecs = siecs;
//   }
//   tableHeader = columnSiecs.map((a, _b) => {
//     obj = {
//       title: '<div class="tableHeader" id=' + a + ">" + languageNameSpace.labels[a] + '<div class="tableInfoIcon data-tippy-content="left"><i class="fas fa-info-circle"></i></div></div>',
//     };
//     column.push(obj);
//   });

//   return new Promise((resolve) => {
//     for (i = 0; i < url.length; i++) {
//       JSONstat(url[i], function () {
//         fetches++;
//         fetchUrl(this.Dataset(0));
//         if (fetches == url.length) {
//           urls = url.length;
//           resolve(data);
//           drawTable();
//         }
//       });
//     }
//   });
// }

// function newRowApiCall(d) {
//   fetches = 0;

//   function segment(key) {
//     const segment = {
//       NRGSUP: [
//         "PPRD",
//         "RCV_RCY",
//         "IMP",
//         "EXP",
//         "STK_CHG",
//         "GAE",
//         "INTMARB",
//         "GIC",
//         "INTAVI",
//       ],
//       TI_E: [
//         "TI_EHG_E",
//         "TI_CO_E",
//         "TI_BF_E",
//         "TI_GW_E",
//         "TI_RPI_E",
//         "TI_PF_E",
//         "TI_BKBPB_E",
//         "TI_CL_E",
//         "TI_BNG_E",
//         "TI_LBB_E",
//         "TI_CPP_E",
//         "TI_GTL_E",
//         "TI_NSP_E",
//       ],
//       TI_RPI_E: [
//         "TI_RPI_RI_E",
//         "TI_RPI_BPI_E",
//         "TI_RPI_PT_E",
//         "TI_RPI_IT_E",
//         "TI_RPI_DU_E",
//         "TI_RPI_PII_E",
//       ],
//       TI_EHG_E: [
//         "TI_EHG_MAPE_E",
//         "TI_EHG_MAPCHP_E",
//         "TI_EHG_MAPH_E",
//         "TI_EHG_APE_E",
//         "TI_EHG_APCHP_E",
//         "TI_EHG_APH_E",
//         "TI_EHG_EDHP",
//         "TI_EHG_EB",
//         "TI_EHG_EPS",
//         "TI_EHG_DHEP",
//       ],
//       TO: [
//         "TO_EHG",
//         "TO_CO",
//         "TO_BF",
//         "TO_GW",
//         "TO_RPI",
//         "TO_PF",
//         "TO_CL",
//         "TO_BKBPB",
//         "TO_BNG",
//         "TO_CPP",
//         "TO_LBB",
//         "TO_GTL",
//         "TO_NSP",
//       ],
//       TO_RPI: [
//         "TO_RPI_RO",
//         "TO_RPI_BKFLOW",
//         "TO_RPI_PT",
//         "TO_RPI_IT",
//         "TO_RPI_PPR",
//         "TO_RPI_PIR",
//       ],
//       TO_EHG: [
//         "TO_EHG_MAPE",
//         "TO_EHG_MAPCHP",
//         "TO_EHG_MAPH",
//         "TO_EHG_APE",
//         "TO_EHG_APCHP",
//         "TO_EHG_APH",
//         "TO_EHG_EDHP",
//         "TO_EHG_EB",
//         "TO_EHG_PH",
//         "TO_EHG_OTH",
//       ],
//       NRG_E: [
//         "NRG_EHG_E",
//         "NRG_CM_E",
//         "NRG_OIL_NG_E",
//         "NRG_PF_E",
//         "NRG_CO_E",
//         "NRG_BKBPB_E",
//         "NRG_GW_E",
//         "NRG_BF_E",
//         "NRG_PR_E",
//         "NRG_NI_E",
//         "NRG_CL_E",
//         "NRG_LNG_E",
//         "NRG_BIOG_E",
//         "NRG_GTL_E",
//         "NRG_CPP_E",
//         "NRG_NSP_E",
//       ],
//       FC_E: ["FC_OTH_E", "FC_TRA_E", "FC_IND_E"],
//       FC_IND_E: [
//         "FC_IND_IS_E",
//         "FC_IND_CPC_E",
//         "FC_IND_NFM_E",
//         "FC_IND_NMM_E",
//         "FC_IND_TE_E",
//         "FC_IND_MAC_E",
//         "FC_IND_MQ_E",
//         "FC_IND_FBT_E",
//         "FC_IND_PPP_E",
//         "FC_IND_WP_E",
//         "FC_IND_CON_E",
//         "FC_IND_TL_E",
//         "FC_IND_NSP_E",
//       ],
//       FC_TRA_E: [
//         "FC_TRA_RAIL_E",
//         "FC_TRA_ROAD_E",
//         "FC_TRA_DAVI_E",
//         "FC_TRA_DNAVI_E",
//         "FC_TRA_PIPE_E",
//         "FC_TRA_NSP_E",
//       ],
//       FC_OTH_E: [
//         "FC_OTH_CP_E",
//         "FC_OTH_HH_E",
//         "FC_OTH_AF_E",
//         "FC_OTH_FISH_E",
//         "FC_OTH_NSP_E",
//       ],
//       default: [],
//     };
//     return segment[key] || segment.default;
//   }

//   segment = segment(key);

//   key == "TO" ? (chunckSize = 5) : (chunckSize = 4);

//   const res = segment.reduce((acc, _curr, i) => {
//     if (!(i % chunckSize)) {
//       acc.push(segment.slice(i, i + chunckSize));
//     }
//     return acc;
//   }, []);

//   let url = [];
//   // console.log('here')
//   res.forEach(function (value, i) {
//     // url[i] = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/" + REF.dataset + "?";
//     url[i] = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
//     url[i] += "format=JSON";
//     url[i] += "&geo=" + REF.geo;
//     for (var bIdx = 0; bIdx < value.length; bIdx++) {
//       url[i] += "&nrg_bal=" + value[bIdx];
//     }
//     for (var sIdx = 0; sIdx < siecs.length; sIdx++) {
//       url[i] += "&siec=" + siecs[sIdx];
//     }
//     url[i] += "&unit=" + REF.unit;
//     url[i] += "&time=" + REF.year;
//   });

//   return new Promise((resolve) => {
//     for (i = 0; i < url.length; i++) {
//       JSONstat(url[i], function () {
//         fetches++;
//         d = this.Dataset(0);
//         if (d !== null) {
//           insertRowData(d);
//         }
//         if (fetches == url.length) {
//           resolve(newRowData);
//           arangednewRowData = [];
//           segment.forEach((element) => {
//             newBalOrder = languageNameSpace.labels[element];
//             newRowData.forEach((elementData) => {
//               if (elementData[1].indexOf(newBalOrder) !== -1) {
//                 arangednewRowData.push(elementData);
//               }
//             });
//           });
//           newRowData = arangednewRowData;
//         }
//       });
//     }
//   });
// }
