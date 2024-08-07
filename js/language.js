// let container
// let items
// let selectedItem
// let selectedLangCode


// function laguageselectbox() {
// container = document.getElementById('select-container');
// items = container.getElementsByTagName('ul')[0].getElementsByTagName('li');
// selectedItem = items[0];
// hideSelected();
// }

// function onSelect(item) {

//   showUnselected();
//   selectedItem.innerHTML = item.innerHTML;
//   selectedItem.setAttribute('lang-selection', item.getAttribute('lang-selection'));
//   selectedItem.setAttribute('tooltip', item.getAttribute('tooltip'));
//   REF.language = item.getAttribute('lang-selection')
//   hideSelected();
//   unwrapSelector();
//   // languageNameSpace.initLanguage(REF.language)
//   languageNameSpace.setLanguage(REF.language)
// }

// function unwrapSelector() {
//   container.style.pointerEvents = "none";
//   setTimeout(() => container.style.pointerEvents = "auto", 200);
// }

// function showUnselected() {
//   selectedLangCode = selectedItem.getAttribute('lang-selection');

//   for (let i = 1; i < items.length; i++) {
//     if (items[i].getAttribute('lang-selection') == selectedLangCode) {
//       items[i].style.opacity = '1';
//       items[i].style.display = '';
//       break;
//     }
//   }
// }

// function hideSelected() {
//   selectedLangCode = selectedItem.getAttribute('lang-selection');  
//   for (let i = 1; i < items.length; i++) {
//     if (items[i].getAttribute('lang-selection') == selectedLangCode) {
//       items[i].style.opacity = '0';
//       setTimeout(() => items[i].style.display = 'none', 200);
//       break;
//     }
//   }
// }



var languageNameSpace = {
  //Label containers for the selected language
  labels: {},
  tutorial: {},

  //selected language
  languageSelected: "",

  //init of the labels for the language defined in the URL
  initLanguage: function (val) { 
    language = val;
    languageNameSpace.languageSelected = language;

    $.ajax({
      url: "data/labels_" + language + ".json",
      type: "GET",
      // contentType: "application/json; charset=ISO-8859-1",
      // //important for encoding character with accent
      // beforeSend: function(jqXHR) {
      // jqXHR.overrideMimeType('text/html;charset=iso-8859-1');
      // },
      dataType: "json",
      async: false,
      success: function (data) {
        languageNameSpace.labels = data;
      },
      error: function () {
        console.log("Error with language: " + language);
        error("initLanguage: No label found!");
        //if language not found => set EN version by default
        languageNameSpace.setLanguage("EN");
        languageNameSpace.languageSelected = "EN";
      },
    });

    $.ajax({
      url: "data/tutorial_" + language + ".json",
      type: "GET",
      //contentType: "application/json; charset=ISO-8859-1",
      //important for encoding character with accent
      // beforeSend: function(jqXHR) {
      // 	jqXHR.overrideMimeType('text/html;charset=iso-8859-1');
      // },
      dataType: "json",
      async: false,
      success: function (data) {
        languageNameSpace.tutorial = data;
      },
      error: function () {
        console.log("Error with language: " + language);
        error("initLanguage: No data found for tutorial!");
      },
    });

    //set labels for the selected language
    $(document).ready(function () { 

   

      $("#menu-product-title").text(languageNameSpace.labels["MENU_FUEL"]);
      $("#menu-consumer-title").text(languageNameSpace.labels["MENU_CONSUMER"]);
      $("#menu-band-title").text(languageNameSpace.labels["MENU_BAND"]);
      $("#menu-unit-title").text(languageNameSpace.labels["MENU_UNIT"]);
      $("#menu-save-diagram-title").text(languageNameSpace.labels["MENU_SAVE_DIAGRAM"]);
      $("#menu-more-title").text(languageNameSpace.labels["MENU_MORE"]);
      $("#sharemodaltitle").text(languageNameSpace.labels["sharemodaltitle"]);
      $(".pub").text(languageNameSpace.labels["pub"]);
      $(".pub2").text(languageNameSpace.labels["pub2"]);
      $("#sharemodaltitle").text(languageNameSpace.labels["sharemodaltitle"]);

      $("#header-title-label").text(languageNameSpace.labels["pub2"]);   

      // $('label[for="selectCountry"]').text(languageNameSpace.labels["COUNTRY"]);
      // $('label[for="selectFuel"]').text(languageNameSpace.labels["FUEL"]);
      // $('label[for="selectYear"]').text(languageNameSpace.labels["REFERENCE"]);
      // $('label[for="selectDecimals"]').text(languageNameSpace.labels["DECIMALS"]);
      // $('label[for="selectUnit"]').text(languageNameSpace.labels["UNIT"]);


      $('tbody tr').each(function () {
        let trId = $(this).attr('id');    
          $(this).find('td:first').contents().filter(function() {
            return this.nodeType === 3; 
          }).first().replaceWith(languageNameSpace.labels[trId]);
      });

      $('thead th').each(function () {
        let thId = $(this).find('.tableHeader').attr('id');
        const btn = `<button class="tableInfoIcon" title="Open product info"><i class="fas fa-info-circle" aria-hidden="true"></i></button>`
          $(this).find('.tableHeader').html(languageNameSpace.labels[thId] + btn);        
      });

      const frstCol = document.querySelector("#dataTableContainer_wrapper > div.dataTables_scroll > div.dataTables_scrollHead > div > table > thead > tr > th:nth-child(1)")
  
      $(frstCol).html(`${languageNameSpace.labels["YEAR"]}: ${REF.year} <br> ${languageNameSpace.labels["UNIT"]}: ${REF.unit}`)    

      $('.chartIcon.barChart').attr('title', languageNameSpace.labels["POPBARCHART"]);
      $('.chartIcon.pieChart').attr('title', languageNameSpace.labels["POPPIECHART"]);
      $('.chartIcon.lineChart').attr('title', languageNameSpace.labels["POPLINECHART"]);
      $('.chartIcon.info').attr('title', languageNameSpace.labels["POPINFO"]);
      $('.tableInfoIcon').attr('title', languageNameSpace.labels["POPINFOPRODUCTS"]);

      $('#infoBtn').attr('title', languageNameSpace.labels["INFO"]);
      $('#downloadBtn').attr('title', languageNameSpace.labels["DWL"]);
      $('#embebedBtn').attr('title', languageNameSpace.labels["EMB"]);
      $('#shareChart1').attr('title', languageNameSpace.labels["SHA"]);


      $('button.tableRowIcon i.fas.fa-plus').each(function() {
        $(this).closest('button.tableRowIcon').attr('title', languageNameSpace.labels["POPEXP"])
      });

      $('#barChart').attr('title', languageNameSpace.labels["TGLBAR"]);
      $('#pieChart').attr('title', languageNameSpace.labels["TGLPIE"]);
      $('#lineChart').attr('title', languageNameSpace.labels["TGLLINE"]);
      $('#toggleTableBtn').attr('title', languageNameSpace.labels["TGLTABLE"]);
      $('#printBtn').attr('title', languageNameSpace.labels["PRINT"]);
      $('#downloadBtn').attr('title', languageNameSpace.labels["DWNIMAGE"]);
      $('#excelBtn').attr('title', languageNameSpace.labels["DWNCHART"]);
      $('#embebedBtn').attr('title', languageNameSpace.labels["EMBED"]);
      $('#btnCloseModalChart').attr('title', languageNameSpace.labels["CLS"]);


      $("#infoBtnChart > ul > button:nth-child(1)").attr("aria-label", languageNameSpace.labels['DATASET']).html(languageNameSpace.labels['DATASET']);
      $("#infoBtnChart > ul > button:nth-child(2)").attr("aria-label", languageNameSpace.labels['META']).html(languageNameSpace.labels['META']);
      $("#infoBtnChart > ul > button:nth-child(3)").attr("aria-label", languageNameSpace.labels['FEED']).html(languageNameSpace.labels['FEED']);
      $("#infoBtnChart > ul > button:nth-child(4)").attr("aria-label", languageNameSpace.labels['BALGUIDE']).html(languageNameSpace.labels['BALGUIDE']);
      $("#infoBtnChart > ul > button:nth-child(5)").attr("aria-label", languageNameSpace.labels['POPTUT']).html(languageNameSpace.labels['POPTUT']);

      $("#downloadChart > ul > button:nth-child(1)").attr("aria-label", languageNameSpace.labels['POPDOWNLOADTABLEPDF']).html(languageNameSpace.labels['POPDOWNLOADTABLEPDF']);
      $("#downloadChart > ul > button:nth-child(2)").attr("aria-label", languageNameSpace.labels['POPDOWNLOADTABLEEXCEL']).html(languageNameSpace.labels['POPDOWNLOADTABLEEXCEL']);
      $("#downloadChart > ul > button:nth-child(3)").attr("aria-label", languageNameSpace.labels['POPDOWNLOADTABLECSV']).html(languageNameSpace.labels['POPDOWNLOADTABLECSV']);

      $(".IND").text(languageNameSpace.labels["IND"]);
      $(".CTR").text(languageNameSpace.labels["CTR"]);
      $(".YEAR").text(languageNameSpace.labels["YEAR"]);
      $(".UNIT").text(languageNameSpace.labels["UNIT"]);
      $(".DEC").text(languageNameSpace.labels["DEC"]);

      document.getElementById('toTop').setAttribute('aria-label', languageNameSpace.labels["TOP"]);    


      $("#headingOne > button").text(languageNameSpace.labels["headingOne"]);
      $("#headingTwo > button").text(languageNameSpace.labels["headingTwo"]);
      $("#headingThree > button").text(languageNameSpace.labels["headingThree"]);

      $("#loaderSpinner > div > div.loadingText > h6").text(languageNameSpace.labels["LOADINGTEXT"]);

      $("#search-input").attr('placeholder',languageNameSpace.labels['SEARCHAMEXBOX']);

      $("#ecl-site-header__language-title").text(languageNameSpace.labels["SELECTLANGUAGE"]);
      $(".ecl-site-header__language-category-title").text(languageNameSpace.labels["OFFICIAL"]);
      $("#toTop").attr("aria-label", languageNameSpace.labels['TOP'])
      

      //Country labels
      energyCountries["EU27_2020"] = languageNameSpace.labels["EU27_2020"];
      energyCountries["EU28"] = languageNameSpace.labels["EU28"];
      energyCountries["EA19"] = languageNameSpace.labels["EA19"];
      energyCountries["BE"] = languageNameSpace.labels["BE"];
      energyCountries["BG"] = languageNameSpace.labels["BG"];
      energyCountries["CZ"] = languageNameSpace.labels["CZ"];
      energyCountries["DK"] = languageNameSpace.labels["DK"];
      energyCountries["DE"] = languageNameSpace.labels["DE"];
      energyCountries["EE"] = languageNameSpace.labels["EE"];
      energyCountries["IE"] = languageNameSpace.labels["IE"];
      energyCountries["EL"] = languageNameSpace.labels["EL"];
      energyCountries["ES"] = languageNameSpace.labels["ES"];
      energyCountries["FR"] = languageNameSpace.labels["FR"];
      energyCountries["HR"] = languageNameSpace.labels["HR"];
      energyCountries["IT"] = languageNameSpace.labels["IT"];
      energyCountries["LV"] = languageNameSpace.labels["LV"];
      energyCountries["LT"] = languageNameSpace.labels["LT"];
      energyCountries["LU"] = languageNameSpace.labels["LU"];
      energyCountries["HU"] = languageNameSpace.labels["HU"];
      energyCountries["NL"] = languageNameSpace.labels["NL"];
      energyCountries["AT"] = languageNameSpace.labels["AT"];
      energyCountries["PL"] = languageNameSpace.labels["PL"];
      energyCountries["PT"] = languageNameSpace.labels["PT"];
      energyCountries["RO"] = languageNameSpace.labels["RO"];
      energyCountries["SI"] = languageNameSpace.labels["SI"];
      energyCountries["SK"] = languageNameSpace.labels["SK"];
      energyCountries["SE"] = languageNameSpace.labels["SE"];
      energyCountries["UK"] = languageNameSpace.labels["UK"];
      energyCountries["MK"] = languageNameSpace.labels["MK"];
      energyCountries["RS"] = languageNameSpace.labels["RS"];
      energyCountries["TR"] = languageNameSpace.labels["TR"];
      energyCountries["UA"] = languageNameSpace.labels["UA"];
      energyCountries["LI"] = languageNameSpace.labels["LI"];
      energyCountries["MD"] = languageNameSpace.labels["MD"];
      energyCountries["BA"] = languageNameSpace.labels["BA"];
      energyCountries["CY"] = languageNameSpace.labels["CY"];
      energyCountries["MT"] = languageNameSpace.labels["MT"];
      energyCountries["FI"] = languageNameSpace.labels["FI"];
      energyCountries["IS"] = languageNameSpace.labels["IS"];
      energyCountries["NO"] = languageNameSpace.labels["NO"];
      energyCountries["ME"] = languageNameSpace.labels["ME"];
      energyCountries["XK"] = languageNameSpace.labels["XK"];
      energyCountries["AL"] = languageNameSpace.labels["AL"];
      energyCountries["GE"] = languageNameSpace.labels["GE"];

      $(".cck-content-content > p").html(languageNameSpace.labels["COOKIETEXT"]);
      $(".cck-actions > a:nth-child(1)").text(languageNameSpace.labels["COOKIECOMPLETEacceptAll"]);
      $(".cck-actions > a:nth-child(2)").text(languageNameSpace.labels["COOKIECOMPLETEonlyTechnical"]);
      $(".cck-content-complete > p").html(languageNameSpace.labels["COOKIECOMPLETE"]);
      $(".cck-actions > a[href=\'#close']").text(languageNameSpace.labels["COOKIECOMPLETEclose"]);
      $(".cck-actions > a[href=\'#close']").append('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.538 15.205L13.32 11.99l3.199-3.194-1.332-1.332-3.2 3.193L8.812 7.48 7.48 8.812l3.177 3.177-3.195 3.199 1.334 1.333 3.193-3.2 3.217 3.217 1.333-1.333zm5.594-7.49a10.886 10.886 0 00-2.355-3.492 10.882 10.882 0 00-3.492-2.355A10.906 10.906 0 0012 1c-1.488 0-2.93.293-4.286.868a10.958 10.958 0 00-3.492 2.355 10.888 10.888 0 00-2.355 3.492A10.925 10.925 0 001 12a10.958 10.958 0 003.222 7.778 10.9 10.9 0 003.492 2.355C9.07 22.707 10.512 23 12 23a10.964 10.964 0 007.777-3.222 10.912 10.912 0 002.355-3.492A10.94 10.94 0 0023 12c0-1.487-.294-2.93-.868-4.285zM21.702 12a9.642 9.642 0 01-2.844 6.858A9.619 9.619 0 0112 21.703a9.635 9.635 0 01-6.859-2.844A9.617 9.617 0 012.298 12a9.619 9.619 0 012.843-6.859A9.615 9.615 0 0112 2.298a9.619 9.619 0 016.858 2.843A9.623 9.623 0 0121.703 12z"></path></svg>')
      $("#footer-cookies").html(languageNameSpace.labels["COOKIES"]);
      $("#footer-privacy").html(languageNameSpace.labels["PRIVACY"]);
      $("#footer-legal").html(languageNameSpace.labels["LEGAL"]);
      $("#footer-access").html(languageNameSpace.labels["ACCESS"]);

      $("#DESC").html(languageNameSpace.labels["DESC"])
      $("#ASC").html(languageNameSpace.labels["ASC"])
      $("#ALPHA").html(languageNameSpace.labels["ALPHA"])
      $("#PROTO").html(languageNameSpace.labels["PROTO"])

      $("#SHOW").html(languageNameSpace.labels["details"])
      $("#HIDE").html(languageNameSpace.labels["hidDetails"])

      $("#tb-togle-percentage").attr("title", languageNameSpace.labels["POPPERCENTAGES"])
      $("#toggleAgregates").attr("title", languageNameSpace.labels["TOGGLEAGREGATES"])
      $("#tb-togle-order").attr("title", languageNameSpace.labels["ORDER"])      


      $('.ecl-modal__header-content').html(languageNameSpace.labels["EMBED"]);
 
      $("#close").html(languageNameSpace.labels["CLS"]);
      $("#share").html(languageNameSpace.labels["COPY"]);
      $(".ecl-social-media-share__description").html(languageNameSpace.labels["SHARE"]);


    });

  },

  //Set language function
  setLanguage: function (val) {    
    REF.language = val;
    // 
    languageNameSpace.initLanguage(REF.language);   
    REF.full = 1  
    // tableData();
    populateCountries();
    populateFuel();
    populateUnit();
    populateDecimals();
    populateYearsData();
    if (REF.language === "FR") {
      $("th:nth-child(10)").css('width', '11rem');
    } else {
      $("th:nth-child(10)").css('width', 'initial');
    }
    if(REF.chart !== "") {
      handleChartAction()
    }    


    if ($('.highcharts-data-table').is(':visible')) {
      closeTable();
      openVizTable();
      $('#toggleTableBtn').focus();
    } 


  },
};
