function populateCountries() {

  const target = document.querySelector("#containerCountries");
  const elementId = 'selectCountry';
  const optionsArray = defGeos;
  const labelDescription = "COUNTRY";
  const activeElement = REF.geo;
  const textChange = "MENU_COUNTRY"; //passing the key

  const existingSingleSelect = document.getElementById(elementId);
    if (existingSingleSelect) {
        existingSingleSelect.parentElement.parentElement.remove();
    }

  const singleSelect = new Singleselect(elementId, optionsArray, labelDescription, activeElement, textChange, selectedValue => {
      REF.geo = selectedValue;
      REF.full = 1;
      tableData();

  });

  const singleSelectHTML = singleSelect.createSingleSelect();
  target.insertAdjacentHTML('beforeend', singleSelectHTML);

  singleSelect.attachEventListeners();
}

