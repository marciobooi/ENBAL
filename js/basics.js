var log = console.log.bind(console);

var isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 850 || /Mobi|Android/i.test(navigator.userAgent) && (window.innerWidth < window.innerHeight);

const isEmpty = value => value == null || value === '';

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
// var dialogBoxPosition = function (x, y) {
//   this.x = x;
//   this.y = y;
// };

//calculate the dialog box position to display it all the time inside the diagram wether for the extrem right and bottom nodes
// function calculateDialogBoxPosition(x, y, width, height) {
//   var rightSpace = $(window).width() - x;
//   var bottomSpace = imgHeight - y;
//   var newX, newY;

//   if (rightSpace < width) {
//     newX = x - width;
//     if (bottomSpace < height) {
//       newY = y - height;
//     } else {
//       newY = y - 20;
//     }
//   } else if (bottomSpace < height) {
//     newX = x;
//     newY = y - height;
//   } else {
//     newX = x;
//     newY = y;
//   }
//   return new dialogBoxPosition(newX, newY);
// }

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
}
function hideSpinner() {
  // console.log('spinner end')
  $("#loaderSpinner").css("display", "none");
}

// function fuel(key) {
//   const fuel = {
//     // fuelMainFuel:[10,0,1,2,9,3,4,5,6,7,8,11,],
//     // fuelMainFuel: [10, 0, 1, 7, 9, 6, 3, 8, 11, 5, 2, 4],
//     fuelMainFuel: [0,1,2,3,4,6,5,7,8,9,10,11],
//     fuelElectricity: [0, 2, 1],
//     fuelCombustible: [0, 1, 9, 2, 3, 4, 5, 7, 6, 8, 10],
//     fuelNonCombustible: [0, 5, 2, 4, 3, 1, 6],
//     fuelOtherPetroleum: [0, 1, 2, 3, 4, 5, 7, 6, 8],
//     fuelMainPetroleum: [0, 1, 3, 4, 2, 5, 6, 7],
//     fuelOil: [0, 1, 2, 3, 4],
//     fuelOtherFossil: [0, 1, 2, 3, 4],
//     fuelFossil: [4, 1, 0, 2, 3],
//     fuelCoal: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     default: [],
//   };
//   return fuel[key] || fuel.default;
// }

// function numberdecimals(deckey) {
//   const decimals = {
//     '0': 0,
//     '0.0': 1,
//     '0.00': 2,
//     '0.000': 3,
//     default: 0,
//   };
//   return decimals[deckey] || decimals.default;
// }






// function countDecimalPlaces(number) {
//   // Convert the number to a string to perform string operations
//   const numStr = number.toString();

//   // Use a regular expression to match the decimal part
//   const decimalMatch = numStr.match(/\.(\d+)/);

//   if (decimalMatch) {
//     // Return the length of the decimal part
//     return decimalMatch[1].length;
//   } else {
//     // If there are no decimal places, return 0
//     return 0;
//   }
// }



// function fetchUrl(d) {
//   nrg = d.Dimension("nrg_bal").id;
//   key = REF.fuel;
//   deckey = REF.decimals;
//   factor = numberdecimals(deckey);

//   for (var item in nrg) {
//     fetcheddata = [];
//     for (j = 0; j < siecs.length; j++) {
//       if (typeof d.value[0] !== "undefined" && d.value[0]) {
//         fetcheddata.push(
//           Number(d.value[0])
//             .toFixed(factor)
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, " ").toString().replace("." , ",")
//         );
//       } else {
//         fetcheddata.push((0).toFixed(factor).toString().replace("." , ","));
//       }
//       d.value.shift();
//     }

//     newdata = fuel(key);
//     fetcheddata = newdata.map((object, i) => fetcheddata[object]);
//     if (
//       nrg[item] == "NRGSUP" ||
//       nrg[item] == "TI_E" ||
//       nrg[item] == "TO" ||
//       nrg[item] == "NRG_E" ||
//       nrg[item] == "FC_E"
//     ) {
//       data.push([
//         '<span class="expandTd">' +
//           languageNameSpace.labels[nrg[item]] +
//           '<div class="expand"><i class="fas fa-plus"></i></div></span>',
//         ...fetcheddata,
//       ]);
//     } else {
//       data.push([languageNameSpace.labels[nrg[item]], ...fetcheddata]);
//     }
//   }
// }

// function insertRowData(d) {
//   nrg = d.Dimension("nrg_bal").id;
//   key = REF.fuel;
//   deckey = REF.decimals;
//   factor = numberdecimals(deckey);
//   for (var item1 in nrg) {
//     data = [];
//     for (j = 0; j < siecs.length; j++) {
//       if (
//         typeof d.value[0] !== "null" &&
//         typeof d.value[0] !== "undefined" &&
//         d.value[0]
//       ) {
//         data.push(
//           Number(d.value[0])
//             .toFixed(factor)
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, " ").toString().replace("." , ",")
//         );
//       } else {
//         // console.log( d.value[0])
//         data.push((0).toFixed(factor).toString().replace("." , ","));
//       }
//       d.value.shift();
//     }
//     newdata = fuel(key);
//     data = newdata.map((object, i) => data[object]);
//     newRowData.push([
//       nrg[item1],
//       languageNameSpace.labels[nrg[item1]],
//       ...data,
//     ]);
//   }
// }

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

// $(document).on("click", function (e) {
//   if ($(e.target).closest(".highcharts-data-table").length === 0) {
//     $(".highcharts-data-table").hide();
//     $(".overlay").removeClass("overlay");
//   } else {
//     $(".highcharts-data-table").hide();
//     $(".overlay").removeClass("overlay");
//   }
// });

// function geturl(params) {
//   dataNameSpace.setRefURL();
//   iframeurl = window.location.href;
//   var url = iframeurl;
//   var new_url = url.replace("enbal", "embebed");
//   // console.log(new_url)
//   $("#contentselect").text("");
//   $("#sharemodaltitle").text(translationsCache["EMBEDDED_CHART_IFRAME"]);
//   $("#sharemodal").modal("show");
//   $("#contentselect").text(
//     '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="' +
//       new_url +
//       '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
//   );
// }

function download_DIVPdf() {
  // Create a new jsPDF instance
  var doc = new window.jspdf.jsPDF("L", "pt");

  // Add a header to the PDF
  doc.text(
    "" + translationsCache[REF.geo] || REF.geo + "\n" + translationsCache[REF.fuel] || REF.fuel + " - " + REF.year + "",
    doc.internal.pageSize.getWidth() / 2,
    50,
    null,
    null,
    "center"
  );

  // Calculate page width and margins
  var pageWidth = doc.internal.pageSize.getWidth();
  var margin = 20; // Set a margin of 20 units on each side
  var availableWidth = pageWidth - margin * 2;

  // Extract headers manually
  var headers = [];
  
  $("#dataTableContainer_wrapper > div.dt-scroll > div.dt-scroll-head > div > table > thead > tr > th").each(function() {
    var headerText = $(this).find('.tableHeader').text().trim() || $(this).text().trim();
    if (headerText) {
      headers.push(headerText);
    }
  });

  // Extract body content manually
  var body = [];
  $("#dataTableContainer tbody tr").each(function() {
    var row = [];
    $(this).find("td").each(function() {
      row.push($(this).text().trim());
    });
    body.push(row);
  });

  // Add a table to the PDF using autoTable plugin
  doc.autoTable({
    head: [headers],
    body: body,
    theme: "striped",
    startY: 125,
    tableWidth: 'auto',
    styles: {
      fontSize: 5,
      cellPadding: 8,
    },
    columnStyles: {
      0: {
        cellWidth: 'wrap',
        halign: "left",
      },
    },
    didDrawPage: function (data) {
      // Calculate the scale factor if the table exceeds the available width
      var scaleFactor = 1;
      if (data.table.width > availableWidth) {
        scaleFactor = availableWidth / data.table.width;
      }

      // Apply scaling
      if (scaleFactor < 1) {
        data.table.width *= scaleFactor;
        data.table.height *= scaleFactor;
        data.table.rows.forEach(function (row) {
          row.height *= scaleFactor;
          row.cells.forEach(function (cell) {
            cell.width *= scaleFactor;
            cell.height *= scaleFactor;
            cell.text = cell.text.map(function (text) {
              return {
                width: text.width * scaleFactor,
                text: text.text,
              };
            });
          });
        });
      }
    },
    didParseCell: function (data) {
      // Ensure each cell fits within the available width
      if (data.cell.raw && data.cell.text) {
        var cellFontSize = (data.styles && data.styles.fontSize) ? data.styles.fontSize : 5; // Default fontSize if undefined
        var maxCellWidth = availableWidth / data.table.columns.length;
        if (data.cell.text[0].length * cellFontSize > maxCellWidth) {
          data.cell.styles.cellWidth = maxCellWidth;
        }
      }
    }
  });

  // Add an image to the PDF
  var img = new Image();
  img.onload = function () {
    doc.addImage(this, 730, 30, 100, 40);
    doc.save("table.pdf"); // Save the PDF with a specified name
  };
  img.crossOrigin = "";
  img.src = "img/logo.png"; // Replace with the correct path to your image
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
    categories.push(translationsCache[x[country]] || x[country]);
  }

  // Populate Fuel types array
  for (const fuel in y) {
    series.push(translationsCache[y[fuel] || y[fuel]]);
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
  var topBtn = document.getElementById("toTop");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }
  }
});

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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
    const modal = new Modal(info, obj); // Assuming you have info and obj defined
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






$(document).on("click", ".barChart, .pieChart, .lineChart", function () {
  chartBalText = [];
  chartType = $(this)[0].classList[1];
  REF.chart = chartType;
  chartBal = $(this).parents("tr")[0].id;
  REF.chartBal = chartBal;
  chartBalText.push($(this).parents("tr").find("td:first").text());
  
  handleChartAction();
});


function handleChartAction() {
  addAuxiliarBarGraphOptions();
  $('#enbal').addClass('d-none');
  $('#chartContainer').removeClass('d-none');
  log(REF.chart)
  disableChatOptionsBtn()
  switch (REF.chart) {
    case "barChart":
      showMenuSwitch()
      createBarChart(chartBal, chartBalText);
      break;
    case "pieChart":      
      renderPieChart(chartType, chartBal, chartBalText);
      hideMenuSwitch()
      break;
    case "lineChart":
      hideMenuSwitch()
      renderLineChart(chartType, chartBal, chartBalText);
      break;
    default:
        return
  }
}


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
    $(".containerNav").css('visibility', 'initial')
    hideMenuSwitch()
 
  }

  function showMenuSwitch() {

    $("#menuSwitch > fieldset:nth-child(1)").css('display', "block") 
    $('#ChartOrder').css('display', "initial") 
    $("li#toggleTable").css('display', "initial") 
    $("li#Agregates").css('display', "initial") 
    $("li#ChartOrder").css('display', "initial") 
    $("li#togglePercentage").css('display', "initial") 
    $("#switchBtn").css('display', "block") 
  }
  
  function hideMenuSwitch() { 
    $("li#toggleTable").css('display', REF.chart === "" ?"none":"initial") 
    $("li#Agregates").css('display', "none") 
    $("li#ChartOrder").css('display', "none") 
    $("li#togglePercentage").css('display', "none") 
    $("#switchBtn").css('display', "none") 
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
              chart.update({ credits: { position: { align: 'center', x: -125 } } }, true);
            } else {
              chart.update({ legend: legendSmall }, true); // true for redraw
              chart.update({ credits: { position: { align: 'center', x: 0 } } }, true);
            }
            chart.redraw()            
      }
  });
}


 orderByPiles = (countriesAndValues, x, y) => {
  const categories = Object.values(x).map(country => translationsCache[country] || country);
  const fuelTypes = Object.values(y).map(fuel => translationsCache[fuel] || fuel);

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



function getTitle() {



  const geo = translationsCache[REF.geo] || REF.geo;
  const time = REF.year;
  const dataset = translationsCache["TOOLTITLE"];
  const fuel = translationsCache[REF.fuel] || REF.fuel
  const bal = translationsCache[REF.chartBal] || REF.chartBal

  let title = ""
  let subtitle = ""


  let chartTitle = "";
  switch (REF.chart) {
    case "lineChart":
      chartTitle = `${dataset} - ${fuel} - ${bal} - ${geo}`;
      title = `<strong>${fuel}, </strong> ${geo}, ${bal}`;
      subtitle = "";
    break;
    case "pieChart":
      chartTitle = `${dataset} - ${fuel} - ${bal} - ${geo} - ${time}`;
      title = `<strong>${geo}, </strong> ${bal}, ${dataset}, ${time}`;
      subtitle = "";
      break;
    case "barChart":
      chartTitle = `${dataset} - ${fuel} - ${bal} - ${time}`;
      title = `<strong>${fuel}, </strong> ${bal}, ${time}`;
      subtitle = "";
      break;
    default:    
      chartTitle = `${geo} - ${fuel}, ${time}`;
      title = `<strong>${geo}, </strong> ${fuel}, ${time}`;
      subtitle = "";   
  }

  $("#title").html(title);
  $("#subtitle").html(subtitle);

  return chartTitle;
}


function credits() {
  const chartCredits = `<span id="credits" style="font-size: .9rem; color="#262B38">Eurostat - </span>
  <a style="color:blue; text-decoration: underline; font-size: .9rem;"
  href="https://ec.europa.eu/eurostat/databrowser/view/${REF.dataset}/default/table?lang=${REF.language}">${translationsCache['DB']}</a>,
  <span style="font-size: .875rem;">                           
</span>`;

  return chartCredits
}

function extraBalances(id) {
  const extraBalances = {
    NRGSUP: ["PPRD", "RCV_RCY", "IMP", "EXP", "STK_CHG", "GAE", "INTMARB", "GIC", "INTAVI"],
    TI_E: ["TI_EHG_E", "TI_CO_E", "TI_BF_E", "TI_GW_E", "TI_RPI_E", "TI_PF_E", "TI_BKBPB_E", "TI_CL_E", "TI_BNG_E", "TI_LBB_E", "TI_CPP_E", "TI_GTL_E", "TI_NSP_E"],
    TI_RPI_E: ["TI_RPI_RI_E", "TI_RPI_BPI_E", "TI_RPI_PT_E", "TI_RPI_IT_E", "TI_RPI_DU_E", "TI_RPI_PII_E"],
    TI_EHG_E: ["TI_EHG_MAPE_E", "TI_EHG_MAPCHP_E", "TI_EHG_MAPH_E", "TI_EHG_APE_E", "TI_EHG_APCHP_E", "TI_EHG_APH_E", "TI_EHG_EDHP", "TI_EHG_EB", "TI_EHG_EPS", "TI_EHG_DHEP", "TI_EHG_CB"],
    TO: ["TO_EHG", "TO_CO", "TO_BF", "TO_GW", "TO_RPI", "TO_PF", "TO_CL", "TO_BKBPB", "TO_BNG", "TO_CPP", "TO_LBB", "TO_GTL", "TO_NSP"],
    TO_RPI: ["TO_RPI_RO", "TO_RPI_BKFLOW", "TO_RPI_PT", "TO_RPI_IT", "TO_RPI_PPR", "TO_RPI_PIR"],
    TO_EHG: ["TO_EHG_MAPE", "TO_EHG_MAPCHP", "TO_EHG_MAPH", "TO_EHG_APE", "TO_EHG_APCHP", "TO_EHG_APH", "TO_EHG_EDHP", "TO_EHG_EB", "TO_EHG_PH", "TO_EHG_OTH"],
    NRG_E: ["NRG_EHG_E", "NRG_CM_E", "NRG_OIL_NG_E", "NRG_PF_E", "NRG_CO_E", "NRG_BKBPB_E", "NRG_GW_E", "NRG_BF_E", "NRG_PR_E", "NRG_NI_E", "NRG_CL_E", "NRG_LNG_E", "NRG_BIOG_E", "NRG_GTL_E", "NRG_CPP_E", "NRG_NSP_E"],
    FC_E: ["FC_OTH_E", "FC_TRA_E", "FC_IND_E"],
    FC_IND_E: ["FC_IND_IS_E", "FC_IND_CPC_E", "FC_IND_NFM_E", "FC_IND_NMM_E", "FC_IND_TE_E", "FC_IND_MAC_E", "FC_IND_MQ_E", "FC_IND_FBT_E", "FC_IND_PPP_E", "FC_IND_WP_E", "FC_IND_CON_E", "FC_IND_TL_E", "FC_IND_NSP_E"],
    FC_TRA_E: ["FC_TRA_RAIL_E", "FC_TRA_ROAD_E", "FC_TRA_DAVI_E", "FC_TRA_DNAVI_E", "FC_TRA_PIPE_E", "FC_TRA_NSP_E"],
    FC_OTH_E: ["FC_OTH_CP_E", "FC_OTH_HH_E", "FC_OTH_AF_E", "FC_OTH_FISH_E", "FC_OTH_NSP_E"],
    default: [],

  };

  return extraBalances[id] || extraBalances.default;
}


function chartNormalTooltip(points) {
  const title = points.options.name;
  const value = Highcharts.numberFormat(points.options.y, REF.decimals);
  const unit = `${translationsCache[REF.unit] || REF.unit}`;
  
  // Calculate the percentage
  const total = points.series.data.reduce((acc, point) => acc + point.y, 0);
  const percentage = (points.options.y / total) * 100;
  const formattedPercentage = Highcharts.numberFormat(percentage, REF.decimals);

  // Construct the HTML for the tooltip
  let html = `
    <table class="table_component"> 
      <thead class="">
        <tr>
          <th scope="cols" colspan="2">${title}</th>                
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>${value}</b> ${unit}</td>         
        </tr>
        <tr>
           <td><b>${formattedPercentage}</b> %</td>       
        </tr>
      </tbody>
    </table>`;

  return html;
}

function tooltipTable(points) {

  const decimals = REF.decimals

  if(REF.stacking == "percent" ){
    let html = "";
    html += `<table id="tooltipTable" class="table_component">                
                <thead>
                  <tr>
                    <th scope="cols">${points[0].x}</th>                    
                    <th scope="cols">%</th>                    
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
    let totalColor = "";
    
    // Sort the points so that the "Total" item is at the last place
    const sortedPoints = points.sort(function (a, b) {
      if (a.series.name == translationsCache['TOTAL']) return 1;
      if (b.series.name == translationsCache['TOTAL']) return -1;
      return 0;
    });
    
    html += `<table id="tooltipTable" class="table_component">                
      <thead>
        <tr>
          <th scope="cols">${sortedPoints[0].key}</th>                    
          <th scope="cols">${REF.unit}</th>                    
        </tr>
      </thead>`;
    
    sortedPoints.forEach(function (point) {
      const color = point.series.color;
      const value = point.y.toFixed(decimals); // This keeps the number formatted with a fixed number of decimals
      const formattedValue = parseFloat(value).toLocaleString('en-US').replace(/,/g, ' '); // Replace commas with spaces
      const category = point.series.name;

      if(REF.details != 0) {
        html += `<tr>
        <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
        <td>${formattedValue}</td>
      </tr>`;
      }    
      // Check if point is "Total" and set the flag if found
      if (category == translationsCache['TOTAL']) {
        totalAdded = true;
      }
    });
    
    // Check if all values are zero and display a message if they are
    const allValuesZero = sortedPoints.every(function (point) {
      return point.y === 0;
    });
    
    if (allValuesZero) {
      html = 
    `<table id="tooltipTable" class="table_component">                
      <thead>
        <tr>
          <th scope="cols">${sortedPoints[0].key}</th>                                    
        </tr>
      </thead>
      <tr>      
        <td>${translationsCache["N/A"]}</td>
      </tr>
    </table>`;


    } else {
      // Add a row for the total if not already added
      if (!totalAdded) {
        // Calculate the total sum of all values
        const totalSum = sortedPoints.reduce(function (sum, point) {
          return sum + point.y;
        }, 0);
    
        // Format the total sum with three decimal places
        const totalValue = totalSum.toFixed(decimals);
        const formattedValue = parseFloat(totalValue).toLocaleString('en-US').replace(/,/g, ' '); // Replace commas with spaces
    
        // Add a row for the total
        html += `
        <tr class="TOTAL">
          <td> ${translationsCache['TOTAL']}</td>
          <td>${formattedValue}</td>
        </tr>`;
      }
    }
    
    html += `</table>`;
    return `<div>${html}</div>`;
    
  }
}


function enableScreenREader(params) {
	const titleElement = document.querySelector("text.highcharts-title")
	if (titleElement) {
	  titleElement.setAttribute('aria-hidden', 'false');
	}

	// Find and update the subtitle element
	const subtitleElement = document.querySelector('text.highcharts-subtitle');
	if (subtitleElement) {
	  subtitleElement.setAttribute('aria-hidden', 'false');
	}


	const container = document.querySelector(".highcharts-root")

	container.removeAttribute('aria-hidden');

  var fontAwesomeIcons = document.querySelectorAll('i.fas');
  
  fontAwesomeIcons.forEach(function(icon) {
    icon.setAttribute('aria-hidden', 'true');
});


  }

    //  function to check focus on building fase
  // document.addEventListener('keydown', function(event) {
  //   if (event.key === 'Tab') {
  //     var focusedElement = document.activeElement;
  //     console.log('Focused element:', focusedElement);
  //     focusedElement.style.outline = '2px solid red';
  //     // log(focusedElement)
  //   }
  // });


  function openVizTable() {
    $('#chart').hide();
  
    setTimeout(function() {
      const chart = $("#chart").highcharts();
      if (chart) {
        chart.viewData();
        $("table").removeAttr("summary");
      }
    }, 100);
  }
  
  function closeTable() {
    $(".highcharts-data-table").hide();
    $("#chart").show();
  }

  function initCustomScrollbar() {
    const scrollableContent = document.querySelector('.dt-scroll-body');
    const customScrollbar = document.querySelector('.custom-scrollbar');
    const customScrollbarInner = document.querySelector('.custom-scrollbar-inner');
  
    if (scrollableContent && customScrollbar && customScrollbarInner) {
      // Update the custom scrollbar's width dynamically
      function updateCustomScrollbar() {
        const elWidth = document.querySelector('.dt-scroll-headInner').offsetWidth; // Use offsetWidth to get the actual width
        customScrollbarInner.style.width = `${elWidth + 50}px`; // Adjust width to ensure full scrollable area
        customScrollbar.scrollLeft = scrollableContent.scrollLeft; // Sync initial positions
      }
  
      // Sync the custom scrollbar with the dt-scroll-body
      scrollableContent.addEventListener('scroll', function() {
        customScrollbar.scrollLeft = scrollableContent.scrollLeft;
      });
  
      customScrollbar.addEventListener('scroll', function() {
        scrollableContent.scrollLeft = customScrollbar.scrollLeft;
      });
  
      // Function to check if the window is scrolled near the bottom
      function checkScrollPosition() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const footerHeight = 76.075; // Adjust this value to the height of your footer
  
        if (scrollTop + windowHeight >= documentHeight - footerHeight) {
          customScrollbar.style.display = 'none';
        } else {
          customScrollbar.style.display = 'block';
        }
      }
  
      // Initial update
      updateCustomScrollbar();
      window.addEventListener('resize', updateCustomScrollbar);
      window.addEventListener('load', updateCustomScrollbar);
  
      // Ensure the scrollbar is updated when the table's layout changes
      const observer = new MutationObserver(updateCustomScrollbar);
      observer.observe(scrollableContent, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
  
      // Check the scroll position on scroll and resize events
      window.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
  
      // Initial check for scroll position
      checkScrollPosition();
    } else {
      console.error('One or more elements are missing.');
    }
  }