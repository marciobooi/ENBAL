  function populateUnit() {

    const target = document.querySelector("#containerUnit");
    const elementId = 'selectUnit';
    const optionsArray = units;
    const labelDescription = "UNIT";
    const activeElement = REF.unit;
    const textChange = "MENU_UNIT";

    const existingSingleSelect = document.getElementById(elementId);
    if (existingSingleSelect) {
        existingSingleSelect.parentElement.parentElement.remove();
    }
  
  
    const singleSelect = new Singleselect(elementId, optionsArray, labelDescription, activeElement, textChange, selectedValue => {
        REF.unit = selectedValue;
        REF.full = 1;
        tableData();
    });
  
    const singleSelectHTML = singleSelect.createSingleSelect();
    target.insertAdjacentHTML('beforeend', singleSelectHTML);
  
    singleSelect.attachEventListeners();



  }