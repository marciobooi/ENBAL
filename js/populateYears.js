function populateYearsData() {

  const conditions = {
    "4100_HOUSEHOLD_1": "nrg_pc_202_c",
    "4100_HOUSEHOLD_0": "nrg_pc_202",
    "4100_N_HOUSEHOLD_1": "nrg_pc_203_c",
    "4100_N_HOUSEHOLD_0": "nrg_pc_203",
    "6000_HOUSEHOLD_1": "nrg_pc_204_c",
    "6000_HOUSEHOLD_0": "nrg_pc_204",
    "6000_N_HOUSEHOLD_1": "nrg_pc_205_c",
    "6000_N_HOUSEHOLD_0": "nrg_pc_205"
  };


  const dataset = conditions[`${REF.product}_${REF.consumer}_${REF.component}`];

  const url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+dataset+"?format=JSON&geo=EU27_2020&nrg_cons=TOT_KWH&currency=EUR";  


  const yearsArray = JSONstat(url).Dataset(0).Dimension("time").id;
 
  REF.time = yearsArray[yearsArray.length - 1]


  const yearsDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(4) > div > ul");
  yearsDropDown.empty()
  let content = ''; 

  yearsArray.forEach(year => {
    const isActive = year == REF.time ? 'active' : '';
    content += `
      <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-year="${year}" data-bs-toggle="button" aria-pressed="true">
        <span>${year}</span>
        <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'}"></i>
      </a>`;
  });

  const dropdownMenu = $("<div>")
    .attr("id", "dropdown-years-list")
    .attr("role", "menu")
    .css("height", "auto")
    .css("maxHeight", "48vh")
    .css("overflowX", "hidden")
    .html(content);

  dropdownMenu.on('click', '.dropdown-item', function() {
    const target = $(this);
    const checkIcon = target.find('.fas.fa-check');

    dropdownMenu.find('.dropdown-item').removeClass('active');
    dropdownMenu.find('.fas.fa-check').addClass('invisible');

    target.addClass('active');
    checkIcon.removeClass('invisible');

    const selectedText = target.find('span').text();
    $('#selectYear').text(selectedText).append('<i class="fas fa-caret-down"></i>');

    REF.time = target.attr('data-year');

    enprices();
  });

  yearsDropDown.prepend(dropdownMenu);

  $('#selectYear').text(REF.time).append('<i class="fas fa-caret-down"></i>');

  $('#selectYear').off('mouseenter mouseleave');

  $('#selectYear').hover(
    function() {
      $(this).data('prevText', $(this).text());
      $(this).html(`${languageNameSpace.labels['MENU_YEARS']} <i class="fas fa-caret-down"></i>`);
    },
    function() {
      const dropdownConsumerList = $('#dropdown-years-list');
      const prevText = dropdownConsumerList.find('.dropdown-item.active span').text();
      $(this).html(`${prevText} <i class="fas fa-caret-down"></i>`);
    }
  );
}

