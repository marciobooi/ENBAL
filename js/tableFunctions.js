// Define a variable to store the default data
    let defaultData = [];
    let expandStatus = [];
    let rowIndex = []

function tableHeader(dataTable) {
    return dataTable[0].map((colTitle, index) => {
      if (index !== 0) {
        return {
          title: `<div class="tableHeader" id=${colTitle}> 
          <span data-i18n="${translationsCache[colTitle] || colTitle}"></span>
            <button class="tableInfoIcon" data-i18n-title="POPINFOPRODUCTS" data-i18n-label="POPINFOPRODUCTS">
              <i class="fas fa-info-circle" aria-hidden="true"></i>
            </button>
          </div>`,
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
            dataTable[i][j] = "N/A";
        } else {
            dataTable[i][j] = formatNumber(dataTable[i][j]);
        }
        }
    }
  }
  
    function destroyTable() {
      if ($.fn.DataTable.isDataTable('#dataTableContainer')) {
        $('#dataTableContainer').DataTable().clear();
        $('#dataTableContainer').DataTable().destroy()
        $("#dataTableContainer > tbody").empty();
        $("#dataTableContainer > thead").empty();
      }     
    } 


// Function to set up the default data
function setupDefaultData() {
  // Assuming you have an initial defaultData array
  defaultData = $("#dataTableContainer").DataTable().data().toArray();
}

function addStyleNewRows() {
  rowIndex.forEach(entry => {
      if (entry) {
          const borderTop = '2px solid lightgrey';
          const table = $("#dataTableContainer").DataTable();
          const index = entry[2];
          let marginLeft = 0; // Initialize the margin-left value

          const typeToRowsMap = {
              "TI_RPI_E": 8,
              "TI_EHG_E": 13,
              "TO_EHG": 12,
              "TO_RPI": 8,
              "FC_OTH_E": 2,
              "FC_TRA_E": 1,
              "FC_IND_E": 0, // No change
          };

          const extraRows = typeToRowsMap[entry[0]] || 0;
          let numRowsToAddClass = entry[1] + extraRows;

          for (let i = 0; i < numRowsToAddClass; i++) {            
            const row = $(table.row(index + i).node());
              row.addClass('highlighted-row');
              if (i === 0) {                  
                  $(row).prev('tr').addClass('previous-highlighted-row');            
              }
              const currentMarginLeft = parseFloat(row.find('td:first-child').css('margin-left')) || 0; // Get current margin-left value, or 0 if not set
              marginLeft = Math.min(currentMarginLeft + 1, 2); // Limit margin-left to max 1.8rem
              row.find('td:first-child').css('padding-left', `${marginLeft}rem`); // Set margin-left dynamically
          }
      }
  });
}




function removeRows(id) {
    const pair = rowIndex.find(pair => pair[0] === id);
    const index = dataTable.findIndex(row => row[0] === id);
  
    if (pair) {  
  
        if (["FC_E", "TO", "TI_E"].includes(id)) {  
  
        const balancesId = {
          "FC_E": ["FC_OTH_E", "FC_TRA_E", "FC_IND_E"],
          "TO": ["TO_EHG", "TO_RPI"],
          "TI_E": ["TI_EHG_E", "TI_RPI_E"]
        };
  
        const childIDs = balancesId[id];
  
        // Remove the related IDs from rowIndex and update the index references
        childIDs.forEach(childID => {
          const childRows = rowIndex.find(childRows => childRows[0] === childID);
          const childIndex = dataTable.findIndex(row => row[0] === childID);
  
          if (childRows) {
            const numRowsToRemove = childRows[1];
  
            if (childIndex + numRowsToRemove < dataTable.length) {
              dataTable.splice(childIndex + 1, numRowsToRemove);
            }
          }
          expandStatus = expandStatus.filter(item => item !== childID);
          rowIndex.forEach(idx => {
            if (childIndex < idx[2]) {
              idx[2] = idx[2] - pair[1];
            }
          });
          rowIndex = rowIndex.filter(item => item[0] !== childID);
  
  
        });
      }
      const numRowsToRemove = pair[1];
      if (index !== -1) {
        if (index + numRowsToRemove < dataTable.length) {
          dataTable.splice(index + 1, numRowsToRemove);
        }
      }
    }
  
    expandStatus = expandStatus.filter(item => item !== id);
    rowIndex.forEach(idx => {
      if (index < idx[2]) {
        idx[2] = idx[2] - pair[1];
      }
    });
    rowIndex = rowIndex.filter(item => item[0] !== id);
  
    createDataTable(dataTable);
    addStyleNewRows();
  }
  

function addNewRows(id) {
    expandStatus.push(id);
  
    balances = extraBalances(id);
    d = chartApiCall(id);
    balances.reverse();
 
    const numRows = balances.length;
    const numColumns = REF.siecs.length;
  
    const index = dataTable.findIndex(idx => idx[0] == id);

    // Get dimension information from the API response
    const nrgBalDimension = d.Dimension("nrg_bal");
    const nrgBalIds = nrgBalDimension.id;
  
    for (let i = 0; i < numRows; i++) {
      const balance = balances[i];
      const row = [balance];
      
      // Find the corresponding index in the API data for this balance
      const apiBalanceIndex = nrgBalIds.indexOf(balance);
      
      const rowData = Array.from({ length: numColumns }, (_, j) => {
        let cellValue;
        if (apiBalanceIndex !== -1) {
          // If balance exists in API data, get the corresponding value
          cellValue = d.value[apiBalanceIndex * numColumns + j];
        } else {
          // If balance doesn't exist in API data, set to null or 0
          cellValue = null;
        }
        
        // Special handling for TI_EHG_CB
        if (balance === "TI_EHG_CB" && (cellValue === null || cellValue === undefined)) {
          return 0;
        }
        return cellValue === null ? 0 : cellValue;
      });
      
      dataTable.splice(index + 1, 0, [balance].concat(rowData));
    }
  
    rowIndex.forEach(idx => {
      if (idx[2] > index) {
        idx[2] = idx[2] + numRows;
      }
    });
  
    rowIndex.push([id, numRows, index]);
    createDataTable(dataTable);
    addStyleNewRows();
}








