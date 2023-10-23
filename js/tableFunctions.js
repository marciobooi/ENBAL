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
        $('#dataTableContainer').DataTable().destroy();
      }  
    }

    




// Function to set up the default data
function setupDefaultData() {
  // Assuming you have an initial defaultData array
  defaultData = $("#dataTableContainer").DataTable().data().toArray();
}

function removeRowChildren(className, id) {
    // Get a reference to the DataTable container
    const tableContainer = document.getElementById("dataTableContainer");
  
    // Get all elements with the specified class name
    const elements = tableContainer.getElementsByClassName(className);
  
    // Iterate through the elements and remove them
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      element.remove();
    }
    // If you want to remove the property associated with the ID, you can do:
    delete tableContainer[id];
  
  }