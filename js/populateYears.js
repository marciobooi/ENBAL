function populateYearsData() {
 
  const target = document.querySelector("#containerYear");
  const elementId = 'selectYear';
  const optionsArray = getYear();
  const labelDescription = languageNameSpace.labels["YEAR"];
  const activeElement = REF.year;
  const textChange = languageNameSpace.labels["MENU_YEARS"];

  const existingSingleSelect = document.getElementById(elementId);
  if (existingSingleSelect) {
      existingSingleSelect.parentElement.parentElement.remove();
  }

  const singleSelect = new Singleselect(elementId, optionsArray, labelDescription, activeElement, textChange, selectedValue => {
      REF.year = selectedValue;
      REF.full = 1;
      tableData();
  });

  const singleSelectHTML = singleSelect.createSingleSelect();
  target.insertAdjacentHTML('beforeend', singleSelectHTML);

  singleSelect.attachEventListeners();
}



