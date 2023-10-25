    // Define a variable to store the default data
    let defaultData = [];
    let expandStatus = [];
    let rowIndex = []

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
            const table = $("#dataTableContainer").DataTable();
            const index = entry[2];             

            const typeToRowsMap = {
                "TI_RPI_E": 8,
                "TI_EHG_E": 12,
                "TO_EHG": 12,
                "TO_RPI": 8,
                "FC_OTH_E": 2,
                "FC_TRA_E": 1,
                "FC_IND_E": 0, // No change
            };
    
            const extraRows = typeToRowsMap[entry[0]] || 0;

            let numRowsToAddClass = entry[1] + extraRows
 
            for (let i = 0; i < numRowsToAddClass; i++) {
                table.row(index + i).nodes().to$().addClass('highlighted-row');
                table.row(index + i).nodes().to$().find('td:first').css('margin-left', '.9rem'); // Adjust padding as needed
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
  
  
    for (let i = 0; i < numRows; i++) {
      const row = [balances[i]].concat(
        Array.from({ length: numColumns }, (_, j) => {
          const cellValue = d.value[(numRows - 1 - i) * numColumns + j];
          return cellValue;
        })
      );
  
      dataTable.splice(index + 1, 0, row);
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








