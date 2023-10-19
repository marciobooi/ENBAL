var log = console.log.bind(console);

var isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 850 || /Mobi|Android/i.test(navigator.userAgent) && (window.innerWidth < window.innerHeight);



// browser platform support
// taken from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Opera 8.0+
var isOpera =
  (!!window.opr && !!opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== "undefined";
// At least Safari 3+: "[object HTMLElementConstructor]"
if (navigator.appVersion.indexOf("Mac") != -1) {
  var isSafari = navigator.userAgent.toLowerCase().indexOf("safari/") > -1;
} else {
  var isSafari =
    Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") >
    0;
}


const message = (/The ENBAL tool is down since:     (.*)/)

var objAgent = navigator.userAgent;
var safariMajorVersion = parseInt(navigator.appVersion, 10);
var objOffsetVersion, ix;

//get Safari version
if (isSafari) {
  objfullVersion = objAgent.substring(objOffsetVersion + 7);

  if ((objOffsetVersion = objAgent.indexOf("Version")) != -1)
    objfullVersion = objAgent.substring(objOffsetVersion + 8);
  if ((ix = objfullVersion.indexOf(";")) != -1)
    objfullVersion = objfullVersion.substring(0, ix);
  if ((ix = objfullVersion.indexOf(" ")) != -1)
    objfullVersion = objfullVersion.substring(0, ix);

  safariMajorVersion = parseInt("" + objfullVersion, 10);
  if (isNaN(safariMajorVersion)) {
    objfullVersion = "" + parseFloat(navigator.appVersion);
    safariMajorVersion = parseInt(navigator.appVersion, 10);
  }
  // console.log(objfullVersion); //full version X.xx.xx
  // console.log(safariMajorVersion); // Major version X
}

// Internet Explorer 6-11
var isIEBrowser = /*@cc_on!@*/ false || !!document.documentMode;
// Edge 20+
var isEdge = !isIEBrowser && !!window.StyleMedia;
// Chrome 1+
var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

// supported platforms
var isBrowserSupported =
  isFirefox ||
  isChrome ||
  isIEBrowser ||
  (isSafari && safariMajorVersion > 9) ||
  isEdge;
var output = "Detecting browsers:<hr>";
output += "isFirefox: " + isFirefox + "<br>";
output += "isChrome: " + isChrome + "<br>";
output += "isSafari: " + isSafari + "<br>";
output += "isOpera: " + isOpera + "<br>";
output += "isIEBrowser: " + isIEBrowser + "<br>";
output += "isEdge: " + isEdge + "<br>";
output += "isBlink: " + isBlink + "<br>";
// console.log(output)

var isMobile =
  navigator.userAgent.match(/Android/i) != null ||
  navigator.userAgent.match(/webOS/i) != null ||
  navigator.userAgent.match(/iPhone/i) != null ||
  navigator.userAgent.match(/iPad/i) != null ||
  navigator.userAgent.match(/iPod/i) != null ||
  navigator.userAgent.match(/BlackBerry/i) != null ||
  navigator.userAgent.match(/Windows Phone/i) != null;

function getOrientation() {
  if (screen.height > screen.width) {
    return "portrait";
  } else {
    return "landscape";
  }
}


// read variables from URL
// code from http://papermashup.com/read-url-get-variables-withjavascript/
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
}

//dialog box position object
var dialogBoxPosition = function (x, y) {
  this.x = x;
  this.y = y;
};

//calculate the dialog box position to display it all the time inside the diagram wether for the extrem right and bottom nodes
function calculateDialogBoxPosition(x, y, width, height) {
  var rightSpace = $(window).width() - x;
  var bottomSpace = imgHeight - y;
  var newX, newY;

  if (rightSpace < width) {
    newX = x - width;
    if (bottomSpace < height) {
      newY = y - height;
    } else {
      newY = y - 20;
    }
  } else if (bottomSpace < height) {
    newX = x;
    newY = y - height;
  } else {
    newX = x;
    newY = y;
  }
  return new dialogBoxPosition(newX, newY);
}

function closeDialogBox(box) {
  box.close();
  box.destroy();
}

// change URL by adding new item to history
// code from http://www.aspsnippets.com/Articles/Change-Browser-URL-without-reloading-refreshing-page-using-HTML5-in-JavaScript-and-jQuery.aspx
function changeUrl(title, url) {
  if (typeof history.pushState != "undefined") {
    var obj = {
      Title: title,
      Url: url,
    };
    history.pushState(obj, obj.Title, obj.Url);
  } else {
    alert(languageNameSpace.labels["MSG_BROWSER"]);
  }
}

function openDataset() {
  window.open("https://ec.europa.eu/eurostat/databrowser/view/" + REF.dataset + "/default/table?lang="+ REF.language);
}

function showSpinner() {
  // console.log('spinner start')
  $("#loaderSpinner").css("display", "block");
  $(".show").css("background-color", "#e0e0e0");
  $("#ENTable").css("background-color", "#e0e0e0");
  $("table.dataTable tbody tr").css("background-color", "#e0e0e0");
}
function hideSpinner() {
  // console.log('spinner end')
  $("#loaderSpinner").css("display", "none");
  $("#ENTable").css("background-color", "initial");
  $("table.dataTable tbody tr").css("background-color", "initial");
  $(".show").css("background-color", "aliceblue");
  $(".secondLayerTR").css("background-color", "#f2fff0");
}

function fuel(key) {
  const fuel = {
    // fuelMainFuel:[10,0,1,2,9,3,4,5,6,7,8,11,],
    // fuelMainFuel: [10, 0, 1, 7, 9, 6, 3, 8, 11, 5, 2, 4],
    fuelMainFuel: [0,1,2,3,4,6,5,7,8,9,10,11],
    fuelElectricity: [0, 2, 1],
    fuelCombustible: [0, 1, 9, 2, 3, 4, 5, 7, 6, 8, 10],
    fuelNonCombustible: [0, 5, 2, 4, 3, 1, 6],
    fuelOtherPetroleum: [0, 1, 2, 3, 4, 5, 7, 6, 8],
    fuelMainPetroleum: [0, 1, 3, 4, 2, 5, 6, 7],
    fuelOil: [0, 1, 2, 3, 4],
    fuelOtherFossil: [0, 1, 2, 3, 4],
    fuelFossil: [4, 1, 0, 2, 3],
    fuelCoal: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    default: [],
  };
  return fuel[key] || fuel.default;
}

function numberdecimals(deckey) {
  const decimals = {
    '0': 0,
    '0.0': 1,
    '0.00': 2,
    '0.000': 3,
    default: 0,
  };
  return decimals[deckey] || decimals.default;
}






function countDecimalPlaces(number) {
  // Convert the number to a string to perform string operations
  const numStr = number.toString();

  // Use a regular expression to match the decimal part
  const decimalMatch = numStr.match(/\.(\d+)/);

  if (decimalMatch) {
    // Return the length of the decimal part
    return decimalMatch[1].length;
  } else {
    // If there are no decimal places, return 0
    return 0;
  }
}



function fetchUrl(d) {
  nrg = d.Dimension("nrg_bal").id;
  key = REF.fuel;
  deckey = REF.decimals;
  factor = numberdecimals(deckey);

  for (var item in nrg) {
    fetcheddata = [];
    for (j = 0; j < siecs.length; j++) {
      if (typeof d.value[0] !== "undefined" && d.value[0]) {
        fetcheddata.push(
          Number(d.value[0])
            .toFixed(factor)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ").toString().replace("." , ",")
        );
      } else {
        fetcheddata.push((0).toFixed(factor).toString().replace("." , ","));
      }
      d.value.shift();
    }

    newdata = fuel(key);
    fetcheddata = newdata.map((object, i) => fetcheddata[object]);
    if (
      nrg[item] == "NRGSUP" ||
      nrg[item] == "TI_E" ||
      nrg[item] == "TO" ||
      nrg[item] == "NRG_E" ||
      nrg[item] == "FC_E"
    ) {
      data.push([
        '<span class="expandTd">' +
          languageNameSpace.labels[nrg[item]] +
          '<div class="expand"><i class="fas fa-plus"></i></div></span>',
        ...fetcheddata,
      ]);
    } else {
      data.push([languageNameSpace.labels[nrg[item]], ...fetcheddata]);
    }
  }
}

function insertRowData(d) {
  nrg = d.Dimension("nrg_bal").id;
  key = REF.fuel;
  deckey = REF.decimals;
  factor = numberdecimals(deckey);
  for (var item1 in nrg) {
    data = [];
    for (j = 0; j < siecs.length; j++) {
      if (
        typeof d.value[0] !== "null" &&
        typeof d.value[0] !== "undefined" &&
        d.value[0]
      ) {
        data.push(
          Number(d.value[0])
            .toFixed(factor)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ").toString().replace("." , ",")
        );
      } else {
        // console.log( d.value[0])
        data.push((0).toFixed(factor).toString().replace("." , ","));
      }
      d.value.shift();
    }
    newdata = fuel(key);
    data = newdata.map((object, i) => data[object]);
    newRowData.push([
      nrg[item1],
      languageNameSpace.labels[nrg[item1]],
      ...data,
    ]);
  }
}

function siec(key) {
  const siec = {
    fuelMainFuel: mainFuelFamilies,
    fuelCoal: coal,
    fuelFossil: fossilBasedGasses,
    fuelOtherFossil: otherFossilFuelsAndWastes,
    fuelOil: primaryOil,
    fuelMainPetroleum: mainPetroleumProducts,
    fuelOtherPetroleum: otherPetroleumProducts,
    fuelNonCombustible: nonCombustibleRenewables,
    fuelCombustible: combustibleRenewables,
    fuelElectricity: electricityAndHeat,
    default: [],
  };
  return siec[key] || siec.default;
}

$(document).on("click", function (e) {
  if ($(e.target).closest(".highcharts-data-table").length === 0) {
    $(".highcharts-data-table").hide();
    $(".overlay").removeClass("overlay");
  } else {
    $(".highcharts-data-table").hide();
    $(".overlay").removeClass("overlay");
  }
});

function geturl(params) {
  dataNameSpace.setRefURL();
  iframeurl = window.location.href;
  var url = iframeurl;
  var new_url = url.replace("enbal", "embebed");
  // console.log(new_url)
  $("#contentselect").text("");
  $("#sharemodaltitle").text(languageNameSpace.labels["sharemodaltitle"]);
  $("#sharemodal").modal("show");
  $("#contentselect").text(
    '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="' +
      new_url +
      '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  );
}

function download_DIVPdf() {
  var doc = new window.jspdf.jsPDF("L", "pt");
  doc.text("" +languageNameSpace.labels[REF.geo] +"\n" +languageNameSpace.labels[REF.fuel] +" - " +REF.year +"",
    doc.internal.pageSize.width / 2,
    50,
    null,
    null,
    "center"
  );
  doc.autoTable({
    html: "#ENTable",
    theme: "striped",
    tableWidth: 'auto',
    tableLineWidth: 0,
    startY: 125,
    columnStyles: {
      0: {
          cellWidth: 100,
          halign: "left",
      },              
  },
    styles: {
      fontSize: 5,
      cellPadding: 8,
      halign: "right",
      cellWidth: 53,
    },
  });

  var img = new Image();
  img.onload = function () {
    doc.addImage(this, 730, 30, 100, 40);
    doc.save("table.pdf");
  };
  img.crossOrigin = "";
  img.src = "img/logo.png";
}

if (isMobile) {
  chartheight = (9 / 16) * 77 + "%";
} else {
  chartheight = (9 / 16) * 100 + "%";
}

function orderByPiles(countriesAndValues, x, y) {
  let series = [];
  let categories = [];
  // Populate categories array
  for (const country in x) {
    categories.push(languageNameSpace.labels[x[country]]);
  }

  // Populate Fuel types array
  for (const fuel in y) {
    series.push(languageNameSpace.labels[y[fuel]]);
  }

  // Create series of fuel types and categories
  mySeries = [];
  for (let i = 0; i < series.length; i++) {
    let values = [];
    countriesAndValues[i].data.forEach((element) => {
      values.push(element);
    });
    mySeries.push({
      name: series[i],
      data: values,
    });
  }

  // Create object relating categories and respective graphic piles for posterior ordenation
  let categoriesAndPiles = categories.map((value) => {
    return {
      name: value,
      piles: [],
    };
  });

  // Fill that object
  mySeries.forEach((mySeriesEl) => {
    mySeriesEl.data.forEach((dataEl, index) => {
      categoriesAndPiles[index].piles.push({
        name: mySeriesEl.name,
        value: dataEl,
      });
    });
  });

  // Sort it by piles
  categoriesAndPiles.sort((a, b) => {
    let sumA = 0;
    let sumB = 0;
    a.piles.forEach((el) => {
      sumA += el.value;
    });
    b.piles.forEach((el) => {
      sumB += el.value;
    });
    if (sumA > sumB) {
      return -1;
    } else if (sumB > sumA) {
      return 1;
    }
    return 0;
  });
  const myXAxis = [];
  categoriesAndPiles.forEach((el) => {
    myXAxis.push(el.name);
  });

  // Empty initial series and fill with ordered data
  mySeries.forEach((el) => (el.data = []));

  for (let i = 0; i < mySeries.length; i++) {
    categoriesAndPiles.forEach((el) => {
      mySeries[i].data.push(el.piles[i].value);
    });
  }
  return {
    myXAxis: myXAxis,
    mySeries: mySeries,
  };
}

function makeOrderedSeries(categoriesAndStacks) {
  let ordSeries = [];

  // console.log(categoriesAndStacks)

  for (let i = 0; i < categoriesAndStacks[0].y.length; i++) {
    let temp = [];
    for (let j = 0; j < categoriesAndStacks.length; j++) {
      temp.push(categoriesAndStacks[j].y[i]);
    }
    if (REF.component == 1) {
      ordSeries.push({
        index: bardata[i].index,
        name: bardata[i].name,
        legendIndex: bardata[i].legendIndex,
        id: bardata[i].id,
        data: temp,
      });
    } else {
      ordSeries.push({
        index: bardata[i].index,
        name: bardata[i].name,
        data: temp,
        id: bardata[i].id,
        legendIndex: bardata[i].legendIndex,
      });
    }
  }

  temp = ordSeries.splice(1, 1);
  ordSeries.push(temp[0]);
  return ordSeries;
}

$(document).ready(function () {
  var mybutton = document.getElementById("toTop");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 600 ||
      document.documentElement.scrollTop > 600
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
});

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




// function chartMenuLanguages() {
//   switch (REF.language) {
//     case ("FR"):
//       Highcharts.setOptions({
//         lang: {
//           months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
//           weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
//           shortMonths: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
//           decimalPoint: ",",
//           printChart: "Imprimer",
//           downloadPNG: "Télécharger en image PNG",
//           downloadJPEG: "Télécharger en image JPEG",
//           downloadPDF: "Télécharger en document PDF",
//           downloadSVG: "Télécharger en document Vectoriel",
//           loading: "Chargement en cours…",
//           contextButtonTitle: "Exporter le graphique",
//           resetZoom: "Réinitialiser le zoom",
//           resetZoomTitle: "Réinitialiser le zoom au niveau 1:1",
//           thousandsSep: " ",
// 		  downloadCSV: "Télécharger CSV",
// 		  downloadXLS: "Télécharger le fichier Excel",
// 		  viewData: "Afficher le tableau",
//           noData: "Pas d'information à afficher"
//         }
//       });
//       break;
//     case ("DE"):
//       Highcharts.setOptions({
//         lang: {
//           months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
//           weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
//           shortMonths: ["Jan", "Feb", "Mar", "Apr", "Mai", "Juni", "Jul", "August", "Sept", "Okt", "Nov", "Déc"],
//           decimalPoint: ",",
//           printChart: "Drucken",
//           downloadPNG: "Als PNG-Bild herunterladen",
//           downloadJPEG: "Als JPEG-Bild herunterladen",
//           downloadPDF: "Als PDF-Dokument herunterladen",
//           downloadSVG: "Als Vektordokument herunterladen",
//           loading: "Laden ...",
//           contextButtonTitle: "Exportieren des Diagramms",
//           resetZoom: "Zoom zurücksetzen",
//           resetZoomTitle: "Zoom auf Stufe 1: 1 zurücksetzen",
//           thousandsSep: " ",
// 		  downloadCSV: "CSV-Datei herunterladen",
// 		  downloadXLS: "Excel-Datei herunterladen",
// 		  viewData: "Tabelle anzeigen",
//           noData: "Keine Informationen zum Anzeigen"
//         }
//       });
//       break;
//     default:
//       Highcharts.setOptions({
//         lang: {
//           months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//           weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//           shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "August", "Sept", "Oct", "Nov", "Dec"],
//           decimalPoint: ",",
//           printChart: "Print",
//           downloadPNG: "Download as PNG image",
//           downloadJPEG: "Download as JPEG image",
//           downloadPDF: "Download as PDF document",
//           downloadSVG: "Download as Vector Document",
//           loading: "Loading ...",
//           contextButtonTitle: "Export the graph",
//           resetZoom: "Reset zoom",
//           resetZoomTitle: "Reset zoom to level 1: 1",
//           thousandsSep: " ",
// 		  downloadCSV: "Download CSV",
// 		  downloadXLS: "Download Excel file",
// 		  viewData: "View table",
//           noData: "No information to display"
//         }
//       });
//       break;
//   }

// }

function printTable() {
  window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('.highcharts-data-table').html()));
}


function agregateIcon() {
  const iconHTML = `
  <span class="agregates fa-stack fa-rotate-180" style=" position: absolute; top: 8px;">
    <i class="fa fa-square fa-stack-1x" style="top: .0em; left: .0em; color: white;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .2em; left: .2em; color: #0a328e;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .2em; left: .2em; color: transparent;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .3em; left: .3em; color: white;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .5em; left: .5em; color: #0a328e;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .5em; left: .5em; color: transparent;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .6em; left: .6em; color: white;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .8em; left: .8em; color: #0a328e;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .8em; left: .8em; color: transparent;"></i>
    <i class="fa fa-square fa-stack-1x" style="top: .9em; left: .9em; color: white;"></i>
  </span>
`;
return iconHTML;
}

function nonagregateIcon() {
  const iconHTML = `
      <span class="nonAgregates fa-stack fa-rotate-180" style="position: absolute;top: 4px;">
        <i class="fa fa-square fa-stack-1x" style="top: .0em;left: .0em;color: white;"></i>
        <i class="fa fa-square fa-stack-1x" style="top: .2em;left: .2em;color: #0a328e;"></i>
        <i class="fa fa-square fa-stack-1x" style="top: .2em;left: .2em;color: transparent;"></i>
        <i class="fa fa-square fa-stack-1x" style="top: .3em;left: .3em;color: white;"></i>
      </span>`;
return iconHTML;
}



function openBalDefinitions(params) {
  window.open("https://ec.europa.eu/eurostat/documents/38154/4956218/ENERGY-BALANCE-GUIDE.pdf/", "_blank");
}
function openMeta(params) {
  window.open("https://ec.europa.eu/eurostat/cache/metadata/en/nrg_bal_esms.htm", "_blank");
}


// Function to open a modal based on the provided info
function openModal(info) {
  const obj = excelInfoData[0].find((o) => o.CODE === info);
  if (obj) {
    const modal = new Modal(info, obj);
    modal.open();
    modal.addToDOM('#definitionsModal');
  }
}

// Click event handler for elements with the class "info"
$(document).on("click", ".info", function () {
  const info = $(this).closest("tr").attr("id");
  openModal(info);
});

// Click event handler for elements with the class "tableInfoIcon"
$(document).on("click", ".tableInfoIcon", function () {
  const productInfo = $(this).closest(".tableHeader").attr("id");
  openModal(productInfo);
});

function openLink(url) {
  window.location.href = url;
}



let chartType;
let chartBal;
let chartBalText;



function handleChartAction() {
  addAuxiliarBarGraphOptions();
  $('#enbal').addClass('d-none');
  $('#chartContainer').removeClass('d-none');
  switch (chartType) {
    case "barChart":
      $('#menuSwitch').removeClass('d-none');
      createBarChart(chartBal, chartBalText);
      break;
    case "pieChart":
      $('#menuSwitch').addClass('d-none');
      renderPieChart(chartType, chartBal, chartBalText);
      break;
    case "lineChart":
      $('#menuSwitch').addClass('d-none');
      renderLineChart(chartType, chartBal, chartBalText);
      break;
  }
  disableChatOptionsBtn(chartType)
}

$(document).on("click", ".barChart, .pieChart, .lineChart", function () {
  chartBalText = [];
  chartType = $(this)[0].classList[1];
  REF.chart = chartType;
  chartBal = $(this).parents("tr")[0].id;
  REF.chartBal = chartBal;
  chartBalText.push($(this).parents("tr").find("td:first").text());
  
  handleChartAction();
});



let auxiliarBarGraphOptions;

  function addAuxiliarBarGraphOptions() {
    if (!auxiliarBarGraphOptions) {
      auxiliarBarGraphOptions = new ChartControls();
      auxiliarBarGraphOptions.addToDOM("#subnavbar-container");
    } 
  }

  function removeAuxiliarBarGraphOptions() {
    REF.percentage = 0  
    REF.chart = ""
    getTitle()   

    $('#chartContainer').addClass('d-none');
    $('#enbal').removeClass('d-none');
  
    const auxiliarBarGraphOptions = new ChartControls();
    auxiliarBarGraphOptions.removeFromDOM("#subnavbar-container");  

    $('#menuSwitch').addClass('d-none');
    $(".containerNav").css('visibility', 'initial')
  }
  

  function exportHandling(id) {
    const chartToPrint = $("#chart");
  
    const exportFunctions = {
      'printBtn': () => $(chartToPrint).highcharts().print(),
      'downloadBtn': () => $(chartToPrint).highcharts().exportChart(),
      'excelBtn': () => $(chartToPrint).highcharts().downloadXLS(),
    };
  
    const selectedFunction = exportFunctions[id];
  
    if (selectedFunction) {
      selectedFunction();
    } else {
      console.log('Invalid operation');
    }

  }


  
var legendBig = {
  align: 'right',
  verticalAlign: 'middle',
  layout: 'vertical'
};

var legendSmall = {     
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
}
var legendHide = {     
  enabled: false
}

function changeLegendPisition() {

    Highcharts.charts.forEach(chart => {
      if (chart) {      
            if ($(window).width() > 1100) {
              chart.update({ legend: legendBig }, true); // true for redraw
            } else {
              chart.update({ legend: legendSmall }, true); // true for redraw
            }
            chart.redraw()            
      }
  });
}


 orderByPiles = (countriesAndValues, x, y) => {
  const categories = Object.values(x).map(country => languageNameSpace.labels[country]);
  const fuelTypes = Object.values(y).map(fuel => languageNameSpace.labels[fuel]);

  const mySeries = fuelTypes.map((fuel, i) => ({
    name: fuel,
    data: countriesAndValues[i].data.map(element => element)
  }));

  const categoriesAndPiles = categories.map((name, index) => ({
    name,
    piles: mySeries.map(serie => ({
      name: serie.name,
      value: serie.data[index]
    }))
  }));

  categoriesAndPiles.sort((a, b) => {
    const sumA = a.piles.reduce((sum, pile) => sum + pile.value, 0);
    const sumB = b.piles.reduce((sum, pile) => sum + pile.value, 0);
    return sumB - sumA;
  });

  const myXAxis = categoriesAndPiles.map(category => category.name);

  mySeries.forEach(serie => {
    serie.data = categoriesAndPiles.map(category => category.piles.find(pile => pile.name == serie.name).value);
  });

  return {
    myXAxis,
    mySeries
  };
};


 makeOrderedSeries = (categoriesAndStacks) => {

  const ordSeries = [];
  for (let i = 0; i < categoriesAndStacks[0].y.length; i++) {
    const temp = categoriesAndStacks.map(category => category.y[i]);
    ordSeries.push({
      index: chartSeries[i].index,
      name: chartSeries[i].name,
      legendIndex: chartSeries[i].legendIndex,
      id: chartSeries[i].id,
      data: temp
    });
  }

  const [temp] = ordSeries.splice(1, 1);
  ordSeries.push(temp);

  return ordSeries;
};




function showHideTimeLine() {
  const timelineContainer = document.getElementById('timelineContainer');

  // Check if a timeline instance exists
  if (this.timeline) {
    // Remove the existing timeline
    this.timeline.removeFromDOM();
    this.timeline = null;
  }

  if (REF.chartType === 'barChart' || REF.chartType === 'pieChart') {
    // Create and add the Timeline instance to the DOM
    this.timeline = new Timeline(timelineContainer);

    // Display the timeline
    this.timeline.addToDOM();

    // Show specific chart options
    showChartOptions();
  } else {
    // Hide specific chart options
    hideChartOptions();
  }
}


function sortArrayAlphabetically() {
  if (REF.details == 1) {
    categoriesAndStacks.sort((a, b) => a.x.localeCompare(b.x));
  } else {
    chartSeries.sort((a, b) => a.name.localeCompare(b.name, undefined, { ignorePunctuation: true, sensitivity: 'base' }));
  }
}

function sortArrayByAscValues(arr) {
  if (REF.details == 1) {
    arr.sort((a, b) => {
      const sumA = a.y.reduce((acc, val) => acc + val, 0);
      const sumB = b.y.reduce((acc, val) => acc + val, 0);
      return sumA - sumB;
    });
  } else {
    arr.sort((a, b) => a.y - b.y);
  }
}

function sortArrayByDescValues(arr) {
  if (REF.details == 1) {
    arr.sort((a, b) => {
      const sumA = a.y.reduce((acc, val) => acc + val, 0);
      const sumB = b.y.reduce((acc, val) => acc + val, 0);
      return sumB - sumA;
    });
  } else {
    arr.sort((a, b) => b.y - a.y);
  }
}

function sortArrayByProtocolOrder(arr) {
  if (REF.details == 1) {
    const energyCountriesCodes = barcateg;
    arr.sort((a, b) => {
      if (a.code === "all") return -1; // Move "all" to the beginning
      if (b.code === "all") return 1; // Move "all" to the beginning
      return energyCountriesCodes.indexOf(a.code) - energyCountriesCodes.indexOf(b.code);
    });
    orderedSeries = makeOrderedSeries(categoriesAndStacks);
  }
}



function chartNormalTooltip(points) {
  const value = Highcharts.numberFormat(points[0].y, 4);
  const unit = `${languageNameSpace.labels["S_" + REF.currency]}/${languageNameSpace.labels["S_" + REF.unit]}`;
  const na = languageNameSpace.labels['FLAG_NA'];
  const title = REF.chartId==="mainChart" ?  points[0].key : points[0].x
  return this.y == 0 ? `<b>${title}<br>Total: <b>${na}</b>` : `<b>${title}<br>Total: <b>${value}</b> ${unit}`;
}

function tooltipTable(points) {
  if(REF.percentage == 1 ){
    let html = "";
    html += `<table id="tooltipTable" class="table">                
                <thead>
                  <tr>
                    <th scope="cols">${points[0].x}</th>                    
                    <th scope="cols"></th>                    
                  </tr>
                </thead>`
      points.forEach(element => {
          const value = element.point.percentage.toFixed(0); // Limit decimals to three places
          const category = element.point.series.name; 
          const color = element.point.color;              
          html += `<tr>
                      <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                      <td>${value} %</td>
                  </tr>` 
      });
    html += `</table>`;
    return `<div>${html}</div>`;
  } else {
  let html = "";
  let totalAdded = false; // Flag to track if total row has been added
  let totalColor = "#7cb5ec"
  
  // Sort the points so that "Total" item is at the last place
  const sortedPoints = points.slice().sort(function (a, b) {
    if (a.series.name == languageNameSpace.labels['TOTAL']) return 1;
    if (b.series.name == languageNameSpace.labels['TOTAL']) return -1;
    return 0;
  });
  html += `<table id="tooltipTable" class="table">                
                <thead>
                  <tr>
                    <th scope="cols">${sortedPoints[0].key}</th>                    
                    <th scope="cols"></th>                    
                  </tr>
                </thead>`;
  sortedPoints.forEach(function (point) {
    const color = point.series.color;
    const value = point.y.toFixed(dec); // Limit decimals to three places
    const category = point.series.name;    
    
    html += `<tr>
                <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                      <td>${value}</td>
                  </tr>` 
    
    
    


    // Check if point is "Total" and set the flag if found
    if (category == languageNameSpace.labels['TOTAL']) {
      totalAdded = true;
    }
  });

  // Add a row for the total if not already added
  if (!totalAdded) {
    // Calculate the total sum of all values
    const totalSum = sortedPoints.reduce(function (sum, point) {
      return sum + point.y;
    }, 0);

    // Format the total sum with three decimal places
    const totalValue = totalSum.toFixed(dec);

    // Add a row for the total
    html += `<tr>
                      <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${totalColor}" /></svg> ${languageNameSpace.labels['TOTAL']}</td>
                      <td>${totalValue}</td>
  </tr>`
    
    
    
   
  }

  html += `</table>`;

  return `<div>${html}</div>`;
  }
}

function getTitle() {
  const geo = languageNameSpace.labels[REF.geo];
  const time = REF.year;
  const dataset = languageNameSpace.labels["dataset"];
  const fuel = languageNameSpace.labels[REF.fuel]
  const bal = languageNameSpace.labels[REF.chartBal]

  let title = ""
  let subtitle = ""

  let chartTitle = "";
  switch (REF.chart) {
    case "lineChart":
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${fuel} - ${bal} - ${geo}</span>`;
      title = `${fuel}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${geo} - ${bal}</span>`;
    break;
    case "pieChart":
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${fuel} - ${bal} - ${geo} - ${time}</span>`;
      title = `${fuel}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${bal} - ${geo} - ${time}</span>`;
      break;
    case "barChart":
      chartTitle = `${dataset}<br><span style="font-size:12px; padding-top:5px">${fuel} - ${bal} - ${time}</span>`;
      title = `${fuel}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${bal} - ${time}</span>`;
      break;
    default:    
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${dataset} - ${geo} - ${time} - ${fuel}</span>`;
      title = `${dataset}`;
      subtitle = `${geo} - ${time} - ${fuel}`;   
  }

  $("#title").html(title);
  $("#subtitle").html(subtitle);

  return chartTitle;
}


function credits() {
  const chartCredits = `<span style="font-size: .75rem;">${languageNameSpace.labels["EXPORT_FOOTER_TITLE"]} - </span>
  <a style="color:blue; text-decoration: underline; font-size: .75rem;"
  href="https://ec.europa.eu/eurostat/databrowser/view/${REF.dataset}/default/table?lang=${REF.language}">${languageNameSpace.labels['DB']}</a>,
  <span style="font-size: .875rem;">                           
</span>`;

  return chartCredits
}

var cache = {};

function addToCache(query, d) {
  if (!cache[query]) {
    cache[query] = [];
  }
  
  cache[query].push(d);
}


function chartApiCall(query) {

  let url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/" + REF.dataset + "?";
  url += "format=JSON";
  url += "&lang=" + REF.language;



  switch (REF.chart) {
    case "lineChart":

    url += "&nrg_bal=" + REF.chartBal;
    url += "&unit=" + REF.unit;
    url += "&geo=" + REF.geo;
    for (var i = 0; i < REF.siecs.length; i++) {    
      if (REF.siecs[i] == "0000X0350-0370" || REF.siecs[i] == "TOTAL" ||REF.siecs[i] == "C0350-0370") {       
      } else {
        url += "&siec=" + REF.siecs[i];
      }
    }

      break;

      case "barChart":
        url += "&nrg_bal=" + REF.chartBal;
        url += "&unit=" + REF.unit;
        url += "&time=" + REF.year;
      
        if (REF.details == 1) {
          const siecsToInclude = REF.siecs.filter((siec) => siec !== "TOTAL");
          url += siecsToInclude.map((siec) => "&siec=" + siec).join("");
        } else {
          url += "&siec=" + REF.siec;
        }
      
        if (REF.agregates == 0) {
          const geosToInclude = defGeos.filter(
            (geo) => geo !== "EU27_2020" && geo !== "EA19"
          );
          url += geosToInclude.map((geo) => "&geo=" + geo).join("");
        } else {
          url += defGeos.map((geo) => "&geo=" + geo).join("");
        }
        break;


  case "pieChart":
    url += "&nrg_bal=" + REF.chartBal;
    url += "&unit=" + REF.unit;
    url += "&time=" + REF.year;
    url += "&geo=" + REF.geo;
    for (var i = 0; i < REF.siecs.length; i++) {
      if ( REF.siecs[i] !== "0000X0350-0370" ||REF.siecs[i] !== "TOTAL" ||REF.siecs[i] !== "C0350-0370") {
        url += "&siec=" + REF.siecs[i];
      }
    }  
    break
  default:
      url += "&time=" + REF.year;
      url += "&geo=" + REF.geo;
      url += "&unit=" + REF.unit;
      for (var i = 0; i < balances.length; i++) url += "&nrg_bal=" + balances[i];
      for (var i = 0; i < REF.siecs.length; i++) url += "&siec=" + REF.siecs[i];
    break 
  }

  if (cache[url] && cache[url].length > 0) {  
    d = JSONstat(cache[url][cache[url].length - 1]).Dataset(0);
    return d;
  } else {
   

    const request = new XMLHttpRequest();
    request.open("GET", url, false); // Setting the third parameter to 'false' makes it synchronous
    request.send();
  
    if (request.status === 500 || request.status === 503) {
      // submitFormDown();
    }
  
    if (request.status !== 200) {
      // submitFormDown();
    }
  
    const data = JSON.parse(request.responseText);
    const d = JSONstat(data).Dataset(0);

    addToCache(url, d);
    
    return d;
  }


}


function chartNormalTooltip(points) {
  const value = Highcharts.numberFormat(points[0].y, 4);
  const unit = `${languageNameSpace.labels["S_" + REF.currency]}/${languageNameSpace.labels["S_" + REF.unit]}`;
  const na = languageNameSpace.labels['FLAG_NA'];
  const title = REF.chartId==="lineChart" ?  points[0].key : points[0].x
  return this.y == 0 ? `<b>${title}<br>Total: <b>${na}</b>` : `<b>${title}<br>Total: <b>${value}</b> ${unit}`;
}

function tooltipTable(points) {

  const decimals = REF.dataset == "demo_pjan" ? 0 : 3

  if(REF.percentage == 1 ){
    let html = "";
    html += `<table id="tooltipTable" class="table">                
                <thead>
                  <tr>
                    <th scope="cols">${points[0].x}</th>                    
                    <th scope="cols"></th>                    
                  </tr>
                </thead>`
      points.forEach(element => {
          const value = element.point.percentage.toFixed(0); // Limit decimals to three places
          const category = element.point.series.name; 
          const color = element.point.color;              
          html += `<tr>
                      <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                      <td>${value} %</td>
                  </tr>` 
      });
    html += `</table>`;
    return `<div>${html}</div>`;
  } else {
    let html = "";
    let totalAdded = false; // Flag to track if the total row has been added
    let totalColor = "#7cb5ec";
    
    // Sort the points so that the "Total" item is at the last place
    const sortedPoints = points.sort(function (a, b) {
      if (a.series.name == languageNameSpace.labels['TOTAL']) return 1;
      if (b.series.name == languageNameSpace.labels['TOTAL']) return -1;
      return 0;
    });
    
    html += `<table id="tooltipTable" class="table">                
      <thead>
        <tr>
          <th scope="cols">${sortedPoints[0].key}</th>                    
          <th scope="cols"></th>                    
        </tr>
      </thead>`;
    
    sortedPoints.forEach(function (point) {
      const color = point.series.color;
      const value = point.y.toFixed(decimals); // Limit decimals to three places
      const category = point.series.name;
    
      html += `<tr>
        <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
        <td>${value}</td>
      </tr>`;
    
      // Check if point is "Total" and set the flag if found
      if (category == languageNameSpace.labels['TOTAL']) {
        totalAdded = true;
      }
    });
    
    // Check if all values are zero and display a message if they are
    const allValuesZero = sortedPoints.every(function (point) {
      return point.y === 0;
    });
    
    // if (allValuesZero) {
    //   html = "<p>All values are zero.</p>"; // Replace the table with the message
    // } else {
      // Add a row for the total if not already added
      if (!totalAdded) {
        // Calculate the total sum of all values
        const totalSum = sortedPoints.reduce(function (sum, point) {
          return sum + point.y;
        }, 0);
    
        // Format the total sum with three decimal places
        const totalValue = totalSum.toFixed(decimals);
    
        // Add a row for the total
        html += `<tr>
          <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${totalColor}" /></svg> ${languageNameSpace.labels['TOTAL']}</td>
          <td>${totalValue}</td>
        </tr>`;
      }
    // }
    
    html += `</table>`;
    
    return `<div>${html}</div>`;
    
  }
}