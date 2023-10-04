function populateConsumption() {

 
    const conditions = {
      "4100_HOUSEHOLD": "nrg_pc_202_c",
      "4100_HOUSEHOLD": "nrg_pc_202",
      "4100_N_HOUSEHOLD": "nrg_pc_203_c",
      "4100_N_HOUSEHOLD": "nrg_pc_203",
      "6000_HOUSEHOLD": "nrg_pc_204_c",
      "6000_HOUSEHOLD": "nrg_pc_204",
      "6000_N_HOUSEHOLD": "nrg_pc_205_c",
      "6000_N_HOUSEHOLD": "nrg_pc_205"
    };

    consomsList = codesDataset[conditions[`${REF.product}_${REF.consumer}`]].consoms
    REF.consoms = codesDataset[conditions[`${REF.product}_${REF.consumer}`]].defaultConsom

    const consomsDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(5) > div > ul");
    consomsDropDown.empty()
    let content = '';
  
    consomsList.forEach(consoms => {     
        const isActive = consoms == REF.consoms ? 'active' : '';
      content += `
        <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-consoms="${consoms}" data-bs-toggle="button" aria-pressed="true">
          <span>${languageNameSpace.labels[consoms]}</span>
          <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'}"></i>
        </a>`;
    });
  
    const dropdownMenu = $("<div>")
      .attr("id", "dropdown-consoms-list")
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
        $('#selectConsuption').text(selectedText).append('<i class="fas fa-caret-down"></i>');

        REF.consoms = target.attr('data-consoms')       
       
        enprices()

      });
  
    consomsDropDown.prepend(dropdownMenu);

    $('#selectConsuption').hover(
        function() {
          $(this).data('prevText', $(this).text());
          $(this).html(`${languageNameSpace.labels['MENU_BAND']} <i class="fas fa-caret-down"></i>`);
        },
        function() {
          const dropdownConsumerList = $('#dropdown-consoms-list');
          const prevText = dropdownConsumerList.find('.dropdown-item.active span').text();
          $(this).html(`${prevText} <i class="fas fa-caret-down"></i>`);
        }
      );

  }