  function populateDecimals() {

    const target = document.querySelector("#containerDecimals");
    const elementId = 'selectDecimals';
    const optionsArray = energyDecimals;
    const labelDescription = languageNameSpace.labels["DECIMALS"];
    const activeElement = energyDecimals[REF.decimals];
    const textChange = languageNameSpace.labels["MENU_DEC"];

    const existingSingleSelect = document.getElementById(elementId);
      if (existingSingleSelect) {
          existingSingleSelect.parentElement.parentElement.remove();
      }

      function countDecimals(numString) {
        const match = numString.match(/\.(\d*)$/);
        return match ? match[1].length : 0;
    }
  
    const singleSelect = new Singleselect(elementId, optionsArray, labelDescription, activeElement, textChange, selectedValue => {
        REF.decimals = countDecimals(selectedValue);
        REF.full = 1;
        tableData();
    });
  
    const singleSelectHTML = singleSelect.createSingleSelect();
    target.insertAdjacentHTML('beforeend', singleSelectHTML);
  
    singleSelect.attachEventListeners();
  }


