
$( document ).ready(function() {

  dataNameSpace.getRefURL();


  
  buildComponents();
  languageNameSpace.initLanguage(REF.language);

})

// Global reference to FloatingChartControls for language updates
let floatingChartControls = null;

function buildComponents() {

  const components = [
    { instance: new SubNavbar(), target: '#subnavbar-container' },
    { instance: new Footer(), target: '#componentFooter' },
    { instance: new Navbar(), target: '#navbar-container' },
    { instance: new FloatingChartControls(), target: '#componentFooter footer' },
  ];

  // Store reference to FloatingChartControls
  floatingChartControls = components.find(comp => comp.instance instanceof FloatingChartControls)?.instance;

  components.forEach(({ instance, target }) => {
    instance.addToDOM(target);
  });

  populateDropdownData();
}

function removeComponents() {
  $('#navbar-container').empty();
  $('#subnavbar-container').empty();
  $('#menuSwitch').remove();
  $('#floatingMenu').empty();
  $('#componentFooter').empty();
}

function populateDropdownData() {
  populateCountries();
  populateFuel();
  populateYearsData();
  populateDecimals();
  populateUnit();
}
