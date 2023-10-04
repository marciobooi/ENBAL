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
  window.open(
    "https://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=" +
      dataNameSpace.dataset +
      "&lang=en"
  );
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
          '<div class="expand"><i class="fal fa-plus-circle"></i></div></span>',
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
  var doc = new jsPDF("L", "pt");
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




function chartMenuLanguages() {
  switch (REF.language) {
    case ("FR"):
      Highcharts.setOptions({
        lang: {
          months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
          weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
          shortMonths: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
          decimalPoint: ",",
          printChart: "Imprimer",
          downloadPNG: "Télécharger en image PNG",
          downloadJPEG: "Télécharger en image JPEG",
          downloadPDF: "Télécharger en document PDF",
          downloadSVG: "Télécharger en document Vectoriel",
          loading: "Chargement en cours…",
          contextButtonTitle: "Exporter le graphique",
          resetZoom: "Réinitialiser le zoom",
          resetZoomTitle: "Réinitialiser le zoom au niveau 1:1",
          thousandsSep: " ",
		  downloadCSV: "Télécharger CSV",
		  downloadXLS: "Télécharger le fichier Excel",
		  viewData: "Afficher le tableau",
          noData: "Pas d'information à afficher"
        }
      });
      break;
    case ("DE"):
      Highcharts.setOptions({
        lang: {
          months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
          shortMonths: ["Jan", "Feb", "Mar", "Apr", "Mai", "Juni", "Jul", "August", "Sept", "Okt", "Nov", "Déc"],
          decimalPoint: ",",
          printChart: "Drucken",
          downloadPNG: "Als PNG-Bild herunterladen",
          downloadJPEG: "Als JPEG-Bild herunterladen",
          downloadPDF: "Als PDF-Dokument herunterladen",
          downloadSVG: "Als Vektordokument herunterladen",
          loading: "Laden ...",
          contextButtonTitle: "Exportieren des Diagramms",
          resetZoom: "Zoom zurücksetzen",
          resetZoomTitle: "Zoom auf Stufe 1: 1 zurücksetzen",
          thousandsSep: " ",
		  downloadCSV: "CSV-Datei herunterladen",
		  downloadXLS: "Excel-Datei herunterladen",
		  viewData: "Tabelle anzeigen",
          noData: "Keine Informationen zum Anzeigen"
        }
      });
      break;
    default:
      Highcharts.setOptions({
        lang: {
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "August", "Sept", "Oct", "Nov", "Dec"],
          decimalPoint: ",",
          printChart: "Print",
          downloadPNG: "Download as PNG image",
          downloadJPEG: "Download as JPEG image",
          downloadPDF: "Download as PDF document",
          downloadSVG: "Download as Vector Document",
          loading: "Loading ...",
          contextButtonTitle: "Export the graph",
          resetZoom: "Reset zoom",
          resetZoomTitle: "Reset zoom to level 1: 1",
          thousandsSep: " ",
		  downloadCSV: "Download CSV",
		  downloadXLS: "Download Excel file",
		  viewData: "View table",
          noData: "No information to display"
        }
      });
      break;
  }

}

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

