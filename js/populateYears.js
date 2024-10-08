function populateYearsData() {
 
  const target = document.querySelector("#containerYear");
  const elementId = 'selectYear';
  const optionsArray = getYear();
  const labelDescription = "YEAR";
  const activeElement = REF.year;
  const textChange = "MENU_YEARS";

  const existingSingleSelect = document.getElementById(elementId);
  if (existingSingleSelect) {
      existingSingleSelect.parentElement.parentElement.remove();
  }

  const singleSelect = new Singleselect(elementId, optionsArray.reverse(), labelDescription, activeElement, textChange, selectedValue => {
      REF.year = selectedValue;
      REF.full = 1;
      tableData();
  });

  const singleSelectHTML = singleSelect.createSingleSelect();
  target.insertAdjacentHTML('beforeend', singleSelectHTML);

  singleSelect.attachEventListeners();
}



