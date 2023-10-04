function populateFuel() {
    const fuelDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(2) > div > ul");
    fuelDropDown.empty()
    let content = '';
  
    Object.keys(energyProducts).forEach(fuel => {     
        const isActive = fuel == REF.product ? 'active' : '';
      content += `
        <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-fuel="${fuel}" data-bs-toggle="button" aria-pressed="true">
          <span>${languageNameSpace.labels[fuel]}</span>
          <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'}"></i>
        </a>`;
    });
  
    const dropdownMenu = $("<div>")
      .attr("id", "dropdown-fuel-list")
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
        $('#selectFuel').text(selectedText).append('<i class="fas fa-caret-down"></i>');

        REF.product = target.attr('data-fuel')  
        
        populateConsumption()
        enprices()

      });
  
    fuelDropDown.prepend(dropdownMenu);

    $('#selectFuel').hover(
        function() {
          $(this).data('prevText', $(this).text());
          $(this).html(`${languageNameSpace.labels['MENU_FUEL']} <i class="fas fa-caret-down"></i>`);
        },
        function() {
          const dropdownFuelList = $('#dropdown-fuel-list');
          const prevText = dropdownFuelList.find('.dropdown-item.active span').text();
          $(this).html(`${prevText} <i class="fas fa-caret-down"></i>`);
        }
      );

  }