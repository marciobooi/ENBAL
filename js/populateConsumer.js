function populateConsumer() {
    const consumerDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(3) > div > ul");
    consumerDropDown.empty()
    let content = '';
  
    Object.keys(energyConsumers).forEach(consumer => {     
        const isActive = consumer == REF.consumer ? 'active' : '';
      content += `
        <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-consumer="${consumer}" data-bs-toggle="button" aria-pressed="true">
          <span>${languageNameSpace.labels[consumer]}</span>
          <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'}"></i>
        </a>`;
    });
  
    const dropdownMenu = $("<div>")
      .attr("id", "dropdown-consumer-list")
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
        $('#selectConsumer').text(selectedText).append('<i class="fas fa-caret-down"></i>');

        REF.consumer = target.attr('data-consumer')

        populateConsumption()
        enprices()

      });
  
    consumerDropDown.prepend(dropdownMenu);


    $('#selectConsumer').hover(
        function() {
          $(this).data('prevText', $(this).text());
          $(this).html(`${languageNameSpace.labels['MENU_CONSUMER']} <i class="fas fa-caret-down"></i>`);
        },
        function() {
          const dropdownConsumerList = $('#dropdown-consumer-list');
          const prevText = dropdownConsumerList.find('.dropdown-item.active span').text();
          $(this).html(`${prevText} <i class="fas fa-caret-down"></i>`);
        }
      );

  }