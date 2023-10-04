function clickEvents() {
  $(document).on("click", ".barChart", function () {
    chartBalText = [];
    REF.chart = "barCart";
    chartBal = $(this).parents("tr")[0].id;
    REF.chartBal = chartBal;
    chartBalText.push($(this).parents("tr").find("td:first").text());
    showSpinner();
    setTimeout(function () {
      renderBarChart(chartBal, chartBalText);
    }, 100);
  });

  $(document).on("click", ".pieChart", function () {
    chartBalText = [];
    REF.chart = "pieChart";
    chartBal = $(this).parents("tr")[0].id;
    REF.chartBal = chartBal;
    chartBalText.push($(this).parents("tr").find("td:first").text());
    showSpinner();
    setTimeout(function () {
      renderPieChart(chartBal, chartBalText);
    }, 100);
  });
  $(document).on("click", ".lineChart", function () {
    chartBalText = [];
    REF.chart = "lineChart";
    chartBal = $(this).parents("tr")[0].id;
    REF.chartBal = chartBal;
    chartBalText.push($(this).parents("tr").find("td:first").text());
    showSpinner();
    setTimeout(function () {
      renderLineChart(chartBal, chartBalText);
    }, 100);
  });

  $(document).on("click", ".fa-file-search", function () {
    var myModal = new bootstrap.Modal(document.getElementById("amexModal"));
    myModal.show();
  });

  $(document).on("click", ".fa-book", function () {
    window.open("https://ec.europa.eu/eurostat/documents/38154/4956218/ENERGY-BALANCE-GUIDE.pdf/", "_blank");
  });

  $(document).on("click", ".info", function () {
    info = $(this).parents("tr")[0].id;
    infoModal(info);
  });

  $(document).on("click", ".tableInfoIcon", function () {
    productInfo = $(this).parents(".tableHeader")[0].id;
    infoModal(productInfo);
  });

  document.getElementById("countries").addEventListener("change", function (e) {
    $("img.select-box__input-flag.country-flag").css("display", "none");
    if (e.target.checked === true) {
      $(e.target.previousSibling).css("display", "initial");
    } else {
      $(e.target.previousSibling).css("display", "none");
    }
    REF.geo = e.target.defaultValue;
    REF.full = 1;
    tableData();
  });

  document.getElementById("years").addEventListener("change", function (e) {
    REF.year = e.target.defaultValue;
    REF.full = 1;
    tableData();
  });

  document.getElementById("indicator").addEventListener("change", function (e) {
    REF.fuel = e.target.defaultValue;
    REF.full = 1;
    tableData();
  });

  document.getElementById("decimals").addEventListener("change", function (e) {
    REF.decimals = e.target.defaultValue;

    REF.full = 1;
    tableData();
  });

  document.getElementById("unitInd").addEventListener("change", function (e) {
    REF.unit = e.target.defaultValue;
    REF.full = 1;
    tableData();
  });

  document
    .getElementById("selectOrder")
    .addEventListener("change", function (e) {
      REF.order = this.value;
      renderBarChart();
    });
}

function populateComboBoxes() {
  $("#indicator").empty();
  $("#indicatorList").html("");
  $("#countries").html("");
  $("#countrieslist").html("");
  $("#years").html("");
  $("#yearsList").html("");
  $("#unitInd").html("");
  $("#unitIndList").html("");
  $("#decimals").html("");
  $("#decimalsList").html("");
  $("#selectOrder").html("");


  for (let i = 0; i < REF.fuelList.length; i++) {
    const FUEL = REF.fuelList[i];
    content = '<div class="select-box__value">';
    if (REF.fuel === FUEL) {
      content +=
        '<input class="select-box__input" type="radio" id="' +
        FUEL +
        '" value="' +
        FUEL +
        '" name="indicator" checked="checked"/>';
    } else {
      content +=
        '<input class="select-box__input" type="radio" id="' +
        FUEL +
        '" value="' +
        FUEL +
        '" name="indicator"/>';
    }
    content +=
      '<p class="select-box__input-text" value="' +
      FUEL +
      '">' +
      languageNameSpace.labels[FUEL] +
      "</p>" +
      "</div>";
    content2 =
      '<li><label class="select-box__option" for="' +
      FUEL +
      '" aria-hidden="true">' +
      languageNameSpace.labels[FUEL] +
      "</label></li>";
    $("#indicator").prepend(content);
    $("#indicatorList").prepend(content2);
  }
  // $("#indicator").prepend('<img class="select-box__icon" src="https://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true" />');
  $("#indicator").prepend(
    '<i class="select-box__icon fal fa-chevron-down" alt="Arrow Icon" aria-hidden="true"></i>'
  );

  for (let i = 0; i < countries.length; i++) {
    const CTR = countries[i];
    content = '<div class="select-box__value">';
    switch (CTR[0]) {
      case "EU27_2020":
        flag = "EU";
        break;
      case "EA19":
        flag = "EU";
        break;
      case "EL":
        flag = "GR";
        break;
      default:
        flag = CTR[0];
        break;
    }

    if (REF.geo === CTR[0]) {
      // console.log(true)
      content += '<img class="select-box__input-flag country-flag" style="display:initial" src="https://flagcdn.com/w20/' + flag.toLowerCase() + '.png">' + '<input class="select-box__input" type="radio" id="' + CTR[0] + '" value="' + CTR[0] + '" name="country" checked="checked"/>';
    } else {
      content += '<img class="select-box__input-flag country-flag" style="display:none" src="https://flagcdn.com/w20/' + flag.toLowerCase() + '.png">' + '<input class="select-box__input" type="radio" id="' + CTR[0] + '" value="' + CTR[0] + '" name="country"/>';
    }
    content += '<p class="select-box__input-text" value="' + CTR[0] + '">' + languageNameSpace.labels[CTR[0]] + "</p>" + "</div>";
    content2 = "<li>" + '<div class="countryList">' + '<img class="country-flag-list" src="https://flagcdn.com/w20/' + flag.toLowerCase() + '.png">' + '<label class="select-box__option" for="' + CTR[0] + '" aria-hidden="aria-hidden">' + languageNameSpace.labels[CTR[0]] + "</label>" + "</div>" + "</li>";
    $("#countries").prepend(content);
    $("#countrieslist").prepend(content2);
  }

  const list = document.querySelector("#countrieslist");
  Array.from(list.children)
    .reverse()
    .forEach((element) => list.appendChild(element));

  $("#countries").prepend(
    '<i class="select-box__icon fal fa-chevron-down" alt="Arrow Icon" aria-hidden="true"></i>'
  );

  for (let i = 0; i < years.length; i++) {
    content = '<div class="select-box__value">';
    if (REF.year === years[i]) {
      content +=
        '<input class="select-box__input" type="radio" id="' +
        years[i] +
        '" value="' +
        years[i] +
        '" name="year" checked="checked"/>';
    } else {
      content +=
        '<input class="select-box__input" type="radio" id="' +
        years[i] +
        '" value="' +
        years[i] +
        '" name="year"/>';
    }
    content +=
      '<p class="select-box__input-text">' + years[i] + "</p>" + "</div>";
    content2 =
      '<li><label class="select-box__option" for="' +
      years[i] +
      '" aria-hidden="true">' +
      years[i] +
      "</label></li>";
    $("#years").prepend(content);
    $("#yearsList").prepend(content2);
  }

  $("#years").prepend(
    '<i class="select-box__icon fal fa-chevron-down" alt="Arrow Icon" aria-hidden="true"></i>'
  );

  for (let i = 0; i < units.length; i++) {
    content = '<div class="select-box__value">';
    if (REF.unit === units[i]) {
      content +=
        '<input class="select-box__input" type="radio" id="' +
        units[i] +
        '" value="' +
        units[i] +
        '" name="unit" checked="checked"/>';
    } else {
      content +=
        '<input class="select-box__input" type="radio" id="' +
        units[i] +
        '" value="' +
        units[i] +
        '" name="unit"/>';
    }
    content +=
      '<p class="select-box__input-text" value="' +
      units[i] +
      '">' +
      languageNameSpace.labels[units[i]] +
      "</p>" +
      "</div>";
    content2 =
      '<li><label class="select-box__option" for="' +
      units[i] +
      '" aria-hidden="true">' +
      languageNameSpace.labels[units[i]] +
      "</label></li>";
    $("#unitInd").prepend(content);
    $("#unitIndList").prepend(content2);
  }

  $("#unitInd").prepend(
    '<i class="select-box__icon fal fa-chevron-down" alt="Arrow Icon" aria-hidden="true"></i>'
  );

  // energyDecimals.reverse();
  for (let i = 0; i < energyDecimals.length; i++) {
    content = '<div class="select-box__value">';
    if (REF.decimals === energyDecimals[i]) {
      content += '<input class="select-box__input" type="radio" id="' + energyDecimals[i] + '" value="' + energyDecimals[i] + '" name="energyDecimals" checked="checked"/>';
    } else {
      content += '<input class="select-box__input" type="radio" id="' + energyDecimals[i] + '" value="' + energyDecimals[i] + '" name="energyDecimals"/>';
    }
    content += '<p class="select-box__input-text" value="' + energyDecimals[i] + '">' + energyDecimals[i] + "</p>" + "</div>";
    content2 = '<li><label class="select-box__option" for="' + energyDecimals[i] + '" aria-hidden="true">' + energyDecimals[i] + "</label></li>";
    $("#decimals").append(content);
    $("#decimalsList").append(content2);
  }

  $("#decimals").prepend(
    '<i class="select-box__icon fal fa-chevron-down" alt="Arrow Icon" aria-hidden="true"></i>'
  );

  for (var i = 0; i < energyOrder.length; i++) {
    if (energyOrder[i] == REF.order) {
      content =
        '<option value="' +
        energyOrder[i] +
        '" selected>' +
        languageNameSpace.labels[energyOrder[i]] +
        "</option>";
    } else {
      content =
        '<option value="' +
        energyOrder[i] +
        '">' +
        languageNameSpace.labels[energyOrder[i]] +
        "</option>";
    }

    $("#selectOrder").prepend(content);
  }
}
