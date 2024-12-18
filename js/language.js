let translationsCache = {};
let translationsTuturialCache = {};
let languageNameSpace = {
  initLanguage: function (lang) {
    $(document).ready(function () {
      setTimeout(() => {
        loadTranslations(lang);
        loadTranslationsTuturial(lang);
        checkAndShowTutorial();
      }, 200);
    });
  },
};

function loadTranslations(lang) {
  $.getJSON(`data/labels_${lang}.json`, function (translations) {
    translationsCache = {};
    translationsCache = translations;

    const translateElements = (selector, attribute, targetAttr = "text") => {
      $(selector).each(function () {
        let key = $(this).data(attribute);
        let translation = translations[key] || key;
        if (targetAttr === "text") {
          $(this).text(translation);
        } else {
          $(this).attr(targetAttr, translation);
        }
      });
    };

    translateElements("[data-i18n]", "i18n", "text");
    translateElements("[data-i18n-label]", "i18nLabel", "aria-label");
    translateElements("[data-i18n-labelledby]", "i18nLabelledby", "aria-labelledby");
    translateElements("[data-i18n-title]", "i18nTitle", "title");
    translateElements("optgroup[data-i18n-label]", "i18nLabel", "label");

    getTitle();

    if (REF.chart != "") {
      Highcharts.charts.forEach((chart) => {
        if (chart) {
          handleChartAction();
        }
      });
    }

 
  

    if (!isFirefox) {
    const selectElement = document.getElementById("selectFuel");

    let mainFuelOption = null;
    let options = Array.from(selectElement.options).filter((option) => {
      if (option.value === "fuelMainFuel") {
        mainFuelOption = option;
        return false;
      }
      return true;
    });

    options.sort((a, b) => a.text.localeCompare(b.text));

    selectElement.innerHTML = "";
    if (mainFuelOption) selectElement.appendChild(mainFuelOption);

    options.forEach((option) => selectElement.appendChild(option));
    }




    document.documentElement.lang = lang.toLowerCase();


    addNAAttributes();

    euGlobanContainer();

    enableTooltips()


  }).fail(function () {
    console.error("Error loading translations for language: " + lang);
  });
}

function euGlobanContainer() {
  $("#euGlobanContainer").remove();

  const euGlobanContainer = $("<div>", { id: "euGlobanContainer" });
  euGlobanContainer.prependTo("header");

  $wt.render("euGlobanContainer", {
    utility: "globan",
    lang: REF.language.toLowerCase(),
    theme: "dark",
  });
}

function loadTranslationsTuturial(lang) {
  $.getJSON(`data/tutorial_${lang}.json`, function (translations) {
    translationsTuturialCache = {};
    translationsTuturialCache = translations;
  }).fail(function () {
    console.error("Error loading translations for language: " + lang);
  });
}


function addNAAttributes() {
  $("#dataTableContainer > tbody > tr > td").each(function () {
    if ($(this).text().trim() === "N/A") {
      $(this).addClass("highlight-na");
      $(this).attr("title", translationsCache["N/A"] || "Not Available");
      $(this).attr("aria-label", translationsCache["N/A"] || "Not Available");
    }
  });
}