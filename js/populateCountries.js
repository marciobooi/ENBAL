  function populateCountries() {
    const countryDropDown = $("#chartOptionsMenu > div.dropdown-grid > div > div:nth-child(1) > div > ul");
    countryDropDown.empty()
    let content = '';
  
    defGeos.forEach(geo => {
      const isActive = REF.geos.includes('all') ? (geo === 'all' ? 'active' : '') : (REF.geos.includes(geo) ? 'active' : '');    
      content += `
        <a role="menuitem" class="dropdown-item d-flex justify-content-between align-items-center ${isActive}" href="#" data-geo="${geo}" data-bs-toggle="button" aria-pressed="true">
          <span><img class="flag me-2" src="img/country_flags/${geo}.webp" alt="">${languageNameSpace.labels[geo]}</span>
          <i class="fas fa-check ms-2 ${isActive ? '' : 'invisible'}"></i>
        </a>`;
    });
    const dropdownMenu = $("<div>")
      .attr("id", "dropdown-geo-list")
      .attr("role", "menu")
      .css("height", "auto")
      .css("maxHeight", "48vh")
      .css("overflowX", "hidden")
      .html(content);

     
  
    let originalSelection = [];
    let activeDataGeos = [];
  
    dropdownMenu.on('click', '.dropdown-item', function(event) {
        event.stopPropagation();
        const target = $(this);
        const checkIcon = target.find('.fas.fa-check');
        const isActive = target.hasClass('active');        
      
        if (isActive) {
          checkIcon.removeClass('invisible');
        } else {
          checkIcon.addClass('invisible');
        }
      
        if (target.attr('data-geo') === 'all') {
          $('.dropdown-item').removeClass('active');
          $('.dropdown-item i').addClass('invisible');
        } else {
          $(`.dropdown-item[data-geo="all"]`).removeClass('active');
          $(`.dropdown-item[data-geo="all"] i`).addClass('invisible');
        }
      
        const activeDataGeos = [];
        const selectedItemsText = [];
      
        $('.dropdown-item.active').each(function() {
          const dataGeo = $(this).attr('data-geo');
          activeDataGeos.push(dataGeo);
      
          const itemText = $(this).text();
          selectedItemsText.push(itemText);
        });
      
        if (activeDataGeos.length === 1 && activeDataGeos[0] === 'all' || activeDataGeos.length === 0) {
          $(`.dropdown-item[data-geo="all"]`).addClass('active');
          $(`.dropdown-item[data-geo="all"] i`).removeClass('invisible');
        }
      
        // Update the dropdown toggle with selected items' texts
        const dropdownToggle = $('#selectCountry');
        if (selectedItemsText.length > 0) {
          dropdownToggle.text(selectedItemsText.join(', '));
          dropdownToggle.append('<i class="fas fa-caret-down"></i>');
        } else {
          dropdownToggle.text(languageNameSpace.labels['MENU_COUNTRY']).append('<i class="fas fa-caret-down"></i>');
        }

      });  

  
    countryDropDown.prepend(dropdownMenu);
    countryDropDown.append( `<div class="d-flex justify-content-evenly py-2">
        <button class="btn btn-outline-secondary btn-sm px-2 min-with--geo" type="button" id="btn-country-reset">Reset</button>
        <button class="btn btn-outline-secondary btn-sm px-2 min-with--geo" type="button" id="btn-country-cancel">Cancel</button>
        <button class="btn btn-secondary btn-sm px-2 min-with--geo" type="button" id="btn-country-ok">OK</button>
      </div>`);

    let prevText = '';

    if (REF.geos.includes('all') || REF.geos == ""){
      prevText = languageNameSpace.labels['all']
    } else if (Array.isArray(REF.geos)) {
      prevText = REF.geos.map((geo) => languageNameSpace.labels[geo]).join(', ');
    } 

    $('#selectCountry').html(`${prevText} <i class="fas fa-caret-down"></i>`);
 
    $('#selectCountry').on('shown.bs.dropdown', function() {
        originalSelection = []
        activeDataGeos = [];

        const item = document.querySelector("#dropdown-geo-list > a")

            $(item).each(function() {
                const dataGeo = $(this).attr('data-geo');
                activeDataGeos.push(dataGeo);
                originalSelection.push(dataGeo);
                if (REF.geos.includes(dataGeo)) {
                  $(this).addClass('active');
                  $(this).find('.fas.fa-check').removeClass('invisible');
              } 
            });

            $(item).removeClass('active');
            $(item).find('.fas.fa-check').addClass('invisible');

            $(item).each(function() {
              const dataGeo = $(this).attr('data-geo');
              if (REF.geos.includes(dataGeo)) {
                  $(this).addClass('active');
                  $(this).find('.fas.fa-check').removeClass('invisible');
              } else if(REF.geos.includes('all')) {

                $(item).removeClass('active');
                $(item).find('.fas.fa-check').addClass('invisible');

                $(`.dropdown-item[data-geo="all"]`).addClass('active');
                $(`.dropdown-item[data-geo="all"] i`).removeClass('invisible');
                return
              }
          });
    });
  
    $('#btn-country-reset').on('click', function(event) {
      resetHandler(event);
    });
  
    $('#btn-country-cancel').on('click', function(event) {
      cancelHandler(event);
    });
  
    $('#btn-country-ok').on('click', function(event) {
      okHandler(event);
    });
  
    function resetHandler(event) {
      event.preventDefault();
      $('.dropdown-item').removeClass('active');
      $('.dropdown-item i').addClass('invisible');
  
      $(`.dropdown-item[data-geo="all"]`).addClass('active');
      $(`.dropdown-item[data-geo="all"] i`).removeClass('invisible');
  
      activeDataGeos = ['all'];
      REF.geos = activeDataGeos;
  
      event.stopPropagation();
    }
  
    function cancelHandler(event) {      
        $('.dropdown-item').removeClass('active');
        $('.dropdown-item i').addClass('invisible');
      
        originalSelection.forEach(geo => {
          $(`.dropdown-item[data-geo="${geo}"]`).addClass('active');
          $(`.dropdown-item[data-geo="${geo}"] i`).removeClass('invisible');
        }); 
        event.stopPropagation();
      }
  
    function okHandler(event) {
      const geosItem = $('.dropdown-item.active')
        .map(function() {
          return $(this).attr('data-geo');
        }).get();  
      if (geosItem.length === 1 && geosItem[0] === 'all') {
        REF.geos = "";
      } else {
        REF.geos = geosItem;
      } 
  
      enprices();
    }


    $('#selectCountry').hover(
      function() {
          // Store the current text in a data attribute
          $(this).data('prevText', $(this).text());
          $(this).html(`${languageNameSpace.labels['MENU_COUNTRY']} <i class="fas fa-caret-down"></i>`);
      },
      function() {
          // Retrieve and display the previously stored text
          let prevText = '';
  
          if (REF.geos.includes('all')){
            prevText = languageNameSpace.labels['all']
          } else if (Array.isArray(REF.geos)) {
            prevText = REF.geos.map((geo) => languageNameSpace.labels[geo]).join(', ');
        } 
          $(this).html(`${prevText} <i class="fas fa-caret-down"></i>`);
      }
  );
      

  }

 


