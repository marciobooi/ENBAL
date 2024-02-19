
$( document ).ready(function() {

  dataNameSpace.getRefURL();

  languageNameSpace.initLanguage(REF.language);

  const euGlobanContainer = $('<div>').attr('id', 'euGlobanContainer')

  euGlobanContainer.prependTo('header');

    $wt.render("euGlobanContainer", {
      utility: "globan",
      lang: REF.language.toLowerCase(),
      theme: "dark",
    });

  buildComponents();
})

function buildComponents() {

  const components = [
    { instance: new SubNavbar(), target: '#subnavbar-container' },
    { instance: new Footer(), target: '#componentFooter' },
    { instance: new Navbar(), target: '#navbar-container' },
    { instance: new FloatingChartControls(), target: '#componentFooter' },
  ];

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
