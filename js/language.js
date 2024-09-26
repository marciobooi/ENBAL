let translationsCache = {};
let translationsTuturialCache = {};
let languageNameSpace = {
  initLanguage: function (lang) {
    $(document).ready(function () {
      loadTranslations(lang);
      loadTranslationsTuturial(lang);
      checkAndShowTutorial();
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
    translateElements("[data-i18n-label]", "i18n-label", "aria-label");
    translateElements("[data-i18n-labelledby]", "i18n-labelledby", "aria-labelledby");
    translateElements("[data-i18n-title]", "i18n-title", "title");
    translateElements("optgroup[data-i18n-label]", "i18n-label", "label");

    getTitle();

    if (REF.chart != "") {
          Highcharts.charts.forEach((chart) => {
            if (chart) {
              handleChartAction();
            }
          });
    }


    euGlobanContainer();
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
