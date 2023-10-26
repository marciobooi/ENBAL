function populateDecimals() {

 

    const decimalsDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(4) > div > ul");
    decimalsDropDown.empty()
    let content = '';
  
    energyDecimals.forEach(decimals => {     
        const isActive = decimals == REF.decimals ? 'active' : '';
      content += `
        <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-decimals="${decimals}" data-bs-toggle="button" aria-pressed="true">
          <span>${decimals}</span>
          <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'} aria-hidden="true""></i>
        </a>`;
    });
  
    const dropdownMenu = $("<div>")
      .attr("id", "dropdown-decimals-list")
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
        $('#selectDecimals').text(selectedText).append('<i class="fas fa-caret-down" aria-hidden="true"></i>');

        REF.decimals = countDecimalPlaces(target.attr('data-decimals'))

        REF.full = 1;
        newApiCall()


      });
  
    decimalsDropDown.prepend(dropdownMenu);

    $('#selectDecimals').hover(
        function() {
          $(this).data('prevText', $(this).text());
          $(this).html(`${languageNameSpace.labels['MENU_DEC']} <i class="fas fa-caret-down" aria-hidden="true"></i>`);
        },
        function() {
          const dropdownConsumerList = $('#dropdown-decimals-list');
          const prevText = dropdownConsumerList.find('.dropdown-item.active span').text();
          $(this).html(`${prevText} <i class="fas fa-caret-down" aria-hidden="true"></i>`);
        }
      );

  }