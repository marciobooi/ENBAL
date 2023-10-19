

function newapicall() {

  REF.chart = ""

    d = chartApiCall();       

      const numRows = balances.length;
      const numColumns = mainFuelFamilies.length;

      const dataTable = [];

      firstCol = `${languageNameSpace.labels["tableYear"]}: ${REF.year} <br> ${languageNameSpace.labels["tableUnit"]}: ${REF.unit}`

      // Add the column headers as the first row
      dataTable.push([firstCol].concat(mainFuelFamilies)); 

      for (let i = 0; i < numRows; i++) {
        const row = [balances[i]];
        for (let j = 0; j < numColumns; j++) {
          const cellValue = d.value[i * numColumns + j];
          row.push(cellValue);
        }   
        dataTable.push(row);
      }

     
      createDataTable(dataTable);

}

function tableHeader(dataTable) {
  return dataTable[0].map((colTitle, index) => {
    if (index !== 0) {
      return {
        title: `<div class="tableHeader" id=${colTitle}> ${languageNameSpace.labels[colTitle]} <div class="tableInfoIcon"><i class="fas fa-info-circle"></i></div></div>`,
      };
    } else {
      return { title: colTitle }; // For the first column, keep the original title
    }
  }).filter(header => header !== undefined);
}



function dataTableHandler(dataTable) {

  function formatNumber(number) {
    if (typeof number === 'number') {
      return number.toFixed(REF.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return number; // Return as is if it's not a number
  }
  
  // Iterate through the dataTable and format the numbers
  for (let i = 1; i < dataTable.length; i++) {
      for (let j = 1; j < dataTable[i].length; j++) {
        if (dataTable[i][j] === null) {
          dataTable[i][j] = 0;
      } else {
          dataTable[i][j] = formatNumber(dataTable[i][j]);
      }
      }
  }
}

  function destroyTable() {
    if ($.fn.DataTable.isDataTable('#dataTableContainer')) {
      $('#dataTableContainer').DataTable().destroy();
    }  
  }


function createDataTable(dataTable) {

  destroyTable()

  dataTableHandler(dataTable);

  table = $("#dataTableContainer").DataTable({
    dom: "Bfrtip",
    createdRow: function (row, dataTable, dataIndex) {
      $(row).attr("id", dataTable[0]);
  
      // Check if any element in dataTable[0] is in the expandables array
      if (expandables.some(item => dataTable[0].includes(item))) {
          // If it contains elements from 'expandables', modify the content of the first <td>
          $(row).find("td:first-child").html(`${languageNameSpace.labels[dataTable[0]]}<i class="fas toggle-icon fa-plus-circle"></i>`);
  
          // Add a click event handler to toggle the icon when the first <td> is clicked
          $(row).find("td:first-child").on('click', function() {
              // Find the i element with the toggle-icon class in the first cell
              const icon = $(this).find('.toggle-icon');
  
              // Toggle the "fa-plus-circle" and "fa-minus-circle" classes
              icon.toggleClass('fa-plus-circle fa-minus-circle');
          });
  
          // Add CSS to change the cursor to a pointer on hover
          $(row).find("td:first-child").css('cursor', 'pointer');
      }
  },
    scrollX:"true",
    columns: tableHeader(dataTable),
    columnDefs: [      
      {
        targets: 0,
        orderable: false,
      },
      {
        targets: [dataTable[0].length],
        orderable: false,
        data: null,
        width: "80px",
        defaultContent:
          '<div class="icoContainer"><div class="chartIcon barChart"><i class="fas fa-chart-bar"></i></div><div class="chartIcon pieChart"><i class="fas fa-chart-pie"></i></div><div class="chartIcon lineChart"><i class="fas fa-chart-line"></i></div><div class="chartIcon info"><i class="fas fa-info"></i></div></div>',
      },
    ],
    ordering: false,
    data: dataTable.slice(1),
    searching: false,
    paging: false,
    info: false,
    responsive: true,
    language: {
      decimal: ",",
      thousands: " ",
    },
    colReorder: true,
    colReorder: {
      // order: order,
    },

  

    buttons: [
      {
        className: 'exportpdf d-none',
        text: '<i class="fas fa-file-pdf"></i>',
        // titleAttr: "PDF",       
        dontBreakRows: true,   
      },
      {
        className: 'exportxcel d-none',
        extend: "excelHtml5",
        text: '<i class="fas fa-file-excel"></i>',
        // titleAttr: "Excel",
        title: languageNameSpace.labels["pub2"],
        messageTop: languageNameSpace.labels[REF.geo] + " - " +languageNameSpace.labels[REF.fuel],
        messageBottom: "\r\n" + languageNameSpace.labels["eurostat"],
        customize:function (xlsx) { 
          var sheet = xlsx.xl.worksheets['sheet1.xml'];
          $('c[r=A3] t', sheet).text( languageNameSpace.labels["tableYear"] + ": " + REF.year + " / " + languageNameSpace.labels["tableUnit"] + ": " + REF.unit );
          
          var COLUMNS = ['B','C','D','E','F', 'G','H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];            
          for ( i=0; i < COLUMNS.length; i++ ) {
              $('row c[r^='+COLUMNS[i]+']', sheet).attr( 's', '52' );
              $('row c[r^='+COLUMNS[i]+"3"+']', sheet).attr( 's', '2' );
          }
      }
     
      },
      {
        className: 'exportcsv d-none',
        extend: "csvHtml5",
        bom: true,
        text: '<i class="fas fa-file-csv"></i>',
        // titleAttr: "CSV",
        customize: function (csv) {
          var csvRows = csv.split('\n');
          csvRows[0] = csvRows[0].replace('"Year: 2019Unit: KTOE"', languageNameSpace.labels["tableYear"] + ": " + REF.year + " / " + languageNameSpace.labels["tableUnit"] + ": " + REF.unit)
          csv = csvRows.join('\n');  
          return languageNameSpace.labels["pub2"] +"\n"+ languageNameSpace.labels[REF.geo] +" - "+ languageNameSpace.labels[REF.fuel] +"\n"+  csv +"\n\n" + languageNameSpace.labels["eurostat"]
       }
      },
    ],


  })


  
table.draw();

 
}










function apiCall(balances) {
  column = [];
  data = [];

  showSpinner();

  const chunckSize = 4;
  const res = balances.reduce((acc, _curr, i) => {
    if (!(i % chunckSize)) {
      acc.push(balances.slice(i, i + chunckSize));
    }
    return acc;
  }, []);

  //console.log(REF.dataset)

  let url = [];

  res.forEach(function (value, i) {
    url[i] = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
    url[i] += "format=JSON";
    url[i] += "&geo=" + REF.geo;
    for (var bIdx = 0; bIdx < value.length; bIdx++) {
      url[i] += "&nrg_bal=" + value[bIdx];
    }
    for (var sIdx = 0; sIdx < siecs.length; sIdx++) {
      url[i] += "&siec=" + siecs[sIdx];
    }
    url[i] += "&unit=" + REF.unit;
    url[i] += "&time=" + REF.year;
  });
  fetches = 0;

  obj = { title: languageNameSpace.labels["tableYear"] + ": " + REF.year + "<br>" + languageNameSpace.labels["tableUnit"] + ": " + REF.unit,};
  column.push(obj);
  if (REF.fuel == "fuelMainFuel") {
    columnSiecs = [
      "TOTAL",
      "C0000X0350-0370",
      "C0350-0370",
      "P1000",
      "S2000",
      "O4000XBIO",
      "G3000",
      "RA000",
      "W6100_6220",
      "N900H",
      "E7000",
      "H8000",
    ];
  } else {
    columnSiecs = siecs;
  }
  tableHeader = columnSiecs.map((a, _b) => {
    obj = {
      title: '<div class="tableHeader" id=' + a + ">" + languageNameSpace.labels[a] + '<div class="tableInfoIcon data-tippy-content="left"><i class="fas fa-info-circle"></i></div></div>',
    };
    column.push(obj);
  });

  return new Promise((resolve) => {
    for (i = 0; i < url.length; i++) {
      JSONstat(url[i], function () {
        fetches++;
        fetchUrl(this.Dataset(0));
        if (fetches == url.length) {
          urls = url.length;
          resolve(data);
          drawTable();
        }
      });
    }
  });
}

function newRowApiCall(d) {
  fetches = 0;

  function segment(key) {
    const segment = {
      NRGSUP: [
        "PPRD",
        "RCV_RCY",
        "IMP",
        "EXP",
        "STK_CHG",
        "GAE",
        "INTMARB",
        "GIC",
        "INTAVI",
      ],
      TI_E: [
        "TI_EHG_E",
        "TI_CO_E",
        "TI_BF_E",
        "TI_GW_E",
        "TI_RPI_E",
        "TI_PF_E",
        "TI_BKBPB_E",
        "TI_CL_E",
        "TI_BNG_E",
        "TI_LBB_E",
        "TI_CPP_E",
        "TI_GTL_E",
        "TI_NSP_E",
      ],
      TI_RPI_E: [
        "TI_RPI_RI_E",
        "TI_RPI_BPI_E",
        "TI_RPI_PT_E",
        "TI_RPI_IT_E",
        "TI_RPI_DU_E",
        "TI_RPI_PII_E",
      ],
      TI_EHG_E: [
        "TI_EHG_MAPE_E",
        "TI_EHG_MAPCHP_E",
        "TI_EHG_MAPH_E",
        "TI_EHG_APE_E",
        "TI_EHG_APCHP_E",
        "TI_EHG_APH_E",
        "TI_EHG_EDHP",
        "TI_EHG_EB",
        "TI_EHG_EPS",
        "TI_EHG_DHEP",
      ],
      TO: [
        "TO_EHG",
        "TO_CO",
        "TO_BF",
        "TO_GW",
        "TO_RPI",
        "TO_PF",
        "TO_CL",
        "TO_BKBPB",
        "TO_BNG",
        "TO_CPP",
        "TO_LBB",
        "TO_GTL",
        "TO_NSP",
      ],
      TO_RPI: [
        "TO_RPI_RO",
        "TO_RPI_BKFLOW",
        "TO_RPI_PT",
        "TO_RPI_IT",
        "TO_RPI_PPR",
        "TO_RPI_PIR",
      ],
      TO_EHG: [
        "TO_EHG_MAPE",
        "TO_EHG_MAPCHP",
        "TO_EHG_MAPH",
        "TO_EHG_APE",
        "TO_EHG_APCHP",
        "TO_EHG_APH",
        "TO_EHG_EDHP",
        "TO_EHG_EB",
        "TO_EHG_PH",
        "TO_EHG_OTH",
      ],
      NRG_E: [
        "NRG_EHG_E",
        "NRG_CM_E",
        "NRG_OIL_NG_E",
        "NRG_PF_E",
        "NRG_CO_E",
        "NRG_BKBPB_E",
        "NRG_GW_E",
        "NRG_BF_E",
        "NRG_PR_E",
        "NRG_NI_E",
        "NRG_CL_E",
        "NRG_LNG_E",
        "NRG_BIOG_E",
        "NRG_GTL_E",
        "NRG_CPP_E",
        "NRG_NSP_E",
      ],
      FC_E: ["FC_OTH_E", "FC_TRA_E", "FC_IND_E"],
      FC_IND_E: [
        "FC_IND_IS_E",
        "FC_IND_CPC_E",
        "FC_IND_NFM_E",
        "FC_IND_NMM_E",
        "FC_IND_TE_E",
        "FC_IND_MAC_E",
        "FC_IND_MQ_E",
        "FC_IND_FBT_E",
        "FC_IND_PPP_E",
        "FC_IND_WP_E",
        "FC_IND_CON_E",
        "FC_IND_TL_E",
        "FC_IND_NSP_E",
      ],
      FC_TRA_E: [
        "FC_TRA_RAIL_E",
        "FC_TRA_ROAD_E",
        "FC_TRA_DAVI_E",
        "FC_TRA_DNAVI_E",
        "FC_TRA_PIPE_E",
        "FC_TRA_NSP_E",
      ],
      FC_OTH_E: [
        "FC_OTH_CP_E",
        "FC_OTH_HH_E",
        "FC_OTH_AF_E",
        "FC_OTH_FISH_E",
        "FC_OTH_NSP_E",
      ],
      default: [],
    };
    return segment[key] || segment.default;
  }

  segment = segment(key);

  key == "TO" ? (chunckSize = 5) : (chunckSize = 4);

  const res = segment.reduce((acc, _curr, i) => {
    if (!(i % chunckSize)) {
      acc.push(segment.slice(i, i + chunckSize));
    }
    return acc;
  }, []);

  let url = [];
  // console.log('here')
  res.forEach(function (value, i) {
    // url[i] = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/" + REF.dataset + "?";
    url[i] = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
    url[i] += "format=JSON";
    url[i] += "&geo=" + REF.geo;
    for (var bIdx = 0; bIdx < value.length; bIdx++) {
      url[i] += "&nrg_bal=" + value[bIdx];
    }
    for (var sIdx = 0; sIdx < siecs.length; sIdx++) {
      url[i] += "&siec=" + siecs[sIdx];
    }
    url[i] += "&unit=" + REF.unit;
    url[i] += "&time=" + REF.year;
  });

  return new Promise((resolve) => {
    for (i = 0; i < url.length; i++) {
      JSONstat(url[i], function () {
        fetches++;
        d = this.Dataset(0);
        if (d !== null) {
          insertRowData(d);
        }
        if (fetches == url.length) {
          resolve(newRowData);
          arangednewRowData = [];
          segment.forEach((element) => {
            newBalOrder = languageNameSpace.labels[element];
            newRowData.forEach((elementData) => {
              if (elementData[1].indexOf(newBalOrder) !== -1) {
                arangednewRowData.push(elementData);
              }
            });
          });
          newRowData = arangednewRowData;
        }
      });
    }
  });
}
