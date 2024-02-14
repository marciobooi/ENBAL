function populateYearsData() {

  const url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?format=JSON&geo=EU27_2020&unit=KTOE&siec=TOTAL&nrg_bal=PEC2020-2030&lang=en"

  const yearsArray = JSONstat(url).Dataset(0).Dimension("time").id;  

  REF.year ||= yearsArray[yearsArray.length - 1];

  var numberOfItems = $("#dropdown-years-list").children().length;

  if(numberOfItems !== yearsArray.length) {
    REF.year = yearsArray[yearsArray.length - 1]
  }


  const target = document.querySelector("#containerYear");
  const elementId = 'selectYear';
  const optionsArray = yearsArray;
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



