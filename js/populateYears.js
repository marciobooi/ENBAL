function populateYearsData() {

  const url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?format=JSON&geo=EU27_2020&unit=KTOE&siec=TOTAL&nrg_bal=PEC2020-2030&lang=en"

  const yearsArray = JSONstat(url).Dataset(0).Dimension("time").id;
 
  REF.year = yearsArray[yearsArray.length - 1]


  const yearsDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(3) > div > ul");
  yearsDropDown.empty()
  let content = ''; 

  yearsArray.forEach(year => {
    const isActive = year == REF.year ? 'active' : '';
    content += `
      <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-year="${year}" data-bs-toggle="button" aria-pressed="true">
        <span>${year}</span>
        <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'}" aria-hidden="true"></i>
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
    $('#selectYear').text(selectedText).append('<i class="fas fa-angle-down" aria-hidden="true"></i>');

    REF.year = target.attr('data-year');


    REF.full = 1;
    tableData();
  });

  yearsDropDown.prepend(dropdownMenu);

  $('#selectYear').text(REF.year).append('<i class="fas fa-angle-down" aria-hidden="true"></i>');

  $('#selectYear').off('mouseenter mouseleave');

  $('#selectYear').hover(
    function() {
      $(this).data('prevText', $(this).text());
      $(this).html(`${languageNameSpace.labels['MENU_YEARS']} <i class="fas fa-angle-down" aria-hidden="true"></i>`);
    },
    function() {
      const dropdownConsumerList = $('#dropdown-years-list');
      const prevText = dropdownConsumerList.find('.dropdown-item.active span').text();
      $(this).html(`${prevText} <i class="fas fa-angle-down" aria-hidden="true"></i>`);
    }
  );
}

