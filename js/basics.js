const log = console.log.bind(console);

// Mobile detection - consolidated from duplicate definitions
const isMobile = /Mobi|Android/i.test(navigator.userAgent) || 
                window.innerWidth < 850 || 
                (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent));

const isEmpty = value => value == null || value === '';

let lastFocusedElement = null;

// Modern browser feature detection
const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
const isFirefox = typeof InstallTrigger !== "undefined";
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const isEdge = !!(navigator.userAgent.match(/Edg/i) || navigator.userAgent.match(/Edge/i));
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isBlink = (isChrome || isOpera) && !!window.CSS;
const isIEBrowser = /*@cc_on!@*/ false || !!document.documentMode;  // IE-specific comment

// Check whether browser is supported
const isBrowserSupported = isFirefox || isChrome || (isSafari && parseInt(navigator.appVersion, 10) > 9) || isEdge;

// Get screen orientation
function getOrientation() {
  return screen.height > screen.width ? "portrait" : "landscape";
}

// Read variables from URL
function getUrlVars() {
  const vars = {};
  window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
}

function closeDialogBox(box) {
  box.close();
  box.destroy();
}

// Change URL by adding new item to history
function changeUrl(title, url) {
  if (typeof history.pushState !== "undefined") {
    const obj = {
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
  $("#loaderSpinner").css("display", "block");
}

function hideSpinner() {
  $("#loaderSpinner").css("display", "none");
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

// PDF generation function is now in pdfGenerator.js
// The download_DIVPdf() function is available globally when pdfGenerator.js is loaded

// Set chart height based on device
const chartheight = isMobile ? (9 / 16) * 77 + "%" : (9 / 16) * 100 + "%";

function orderByPiles(countriesAndValues, x, y) {
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
}

function makeOrderedSeries(categoriesAndStacks, bardata) {
  const ordSeries = [];
  for (let i = 0; i < categoriesAndStacks[0].y.length; i++) {
    const temp = categoriesAndStacks.map(category => category.y[i]);
    
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

  const temp = ordSeries.splice(1, 1);
  ordSeries.push(temp[0]);
  return ordSeries;
}

$(document).ready(function () {
  const topBtn = document.getElementById("toTop");

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
    modal.addToDOM('#definitionsModal');
  }
}

// Click event handler for elements with the class "info"
$(document).on("click", ".info", function () {
  lastFocusedElement = this;
  const info = $(this).closest("tr").attr("id");
  openModal(info);
});

// Click event handler for elements with the class "tableInfoIcon"
$(document).on("click", ".tableInfoIcon", function () {
  lastFocusedElement = this;
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
  lastFocusedElement = this;
  chartBalText = [];
  chartType = $(this)[0].classList[1];
  REF.chart = chartType;
  chartBal = $(this).parents("tr")[0].id;
  REF.chartBal = chartBal;
  chartBalText.push($(this).parents("tr").find("td:first").text());
  
  handleChartAction();

  setTimeout(() => {
    if ($('#barChart').not(':disabled').length > 0) {
      $('#barChart').focus();
    } else if ($('#pieChart').not(':disabled').length > 0) {
      $('#pieChart').focus();
    } else if ($('#lineChart').not(':disabled').length > 0) {
      $('#lineChart').focus();
    }
  }, 400);
});

function handleChartAction() {
  addAuxiliarBarGraphOptions();
  $('#enbal').addClass('d-none');
  $('#chartContainer').removeClass('d-none');
  disableChatOptionsBtn();
  
  switch (REF.chart) {
    case "barChart":
      showMenuSwitch();
      createBarChart(chartBal, chartBalText);
      log('here');
      break;
    case "pieChart":      
      renderPieChart(chartType, chartBal, chartBalText);
      hideMenuSwitch();
      break;
    case "lineChart":
      hideMenuSwitch();
      renderLineChart(chartType, chartBal, chartBalText);
      break;
    default:
      return;
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
  REF.percentage = 0;  
  REF.chart = "";

  $('#chartContainer').addClass('d-none');
  $('#enbal').removeClass('d-none');

  const auxiliarBarGraphOptions = new ChartControls();
  auxiliarBarGraphOptions.removeFromDOM("#subnavbar-container");  
  $(".containerNav").css('visibility', 'initial');
  hideMenuSwitch();
  getTitle();   

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function showMenuSwitch() {
  $("#menuSwitch > fieldset:nth-child(1)").css('display', "block"); 
  $('#ChartOrder').css('display', "initial"); 
  $("li#toggleTable").css('display', "initial"); 
  $("li#Agregates").css('display', "initial"); 
  $("li#ChartOrder").css('display', "initial"); 
  $("li#togglePercentage").css('display', "initial"); 
  $("#switchBtn").css('display', "block"); 
}

function hideMenuSwitch() { 
  $("li#toggleTable").css('display', REF.chart === "" ? "none" : "initial"); 
  $("li#Agregates").css('display', "none"); 
  $("li#ChartOrder").css('display', "none"); 
  $("li#togglePercentage").css('display', "none"); 
  $("#switchBtn").css('display', "none"); 
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

const legendBig = {
  align: 'right',
  verticalAlign: 'middle',
  layout: 'vertical'
};

const legendSmall = {     
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom',
};

const legendHide = {     
  enabled: false
};

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
      chart.redraw();            
    }
  });
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
    orderedSeries = makeOrderedSeries(categoriesAndStacks, chartSeries);
  }
}

function getTitle() {
  const geo = translationsCache[REF.geo] || REF.geo;
  const time = REF.year;
  const dataset = translationsCache["TOOLTITLE"];
  const fuel = translationsCache[REF.fuel] || REF.fuel;
  const bal = translationsCache[REF.chartBal] || REF.chartBal;

  let title = "";
  let subtitle = "";
  let chartTitle = "";
  
  switch (REF.chart) {
    case "lineChart":
      chartTitle = `${dataset} - ${fuel} - ${bal} - ${geo}`;
      title = `<strong>${fuel}</strong>, ${geo}, ${bal}`;
      break;
    case "pieChart":
      chartTitle = `${dataset} - ${fuel} - ${bal} - ${geo} - ${time}`;
      title = `<strong>${fuel}</strong>, ${geo}, ${bal}, ${time}`;
      break;
    case "barChart":
      chartTitle = `${dataset} - ${fuel} - ${bal} - ${time}`;
      title = `<strong>${fuel}</strong>, ${bal}, ${time}`;
      break;
    default:   
      chartTitle = `${geo} - ${fuel}, ${time}`;
      title = `<strong>${geo}</strong>, ${fuel}, ${time}`;  
  }

  $("#title").html(title);
  $("#subtitle").html(subtitle);

  return chartTitle;
}

function credits() {
  const datasetURL = `https://ec.europa.eu/eurostat/databrowser/view/${REF.dataset}/default/table?lang=${REF.language}`;

  // Return SVG-compatible credits text
  return `
    <tspan id="credits" style="font-size: 0.9rem;">
      Eurostat - 
      <tspan
        tabindex="0"
        role="link"
        aria-label="Eurostat dataset link: ${datasetURL}"
        title="Eurostat dataset link"
        style="cursor: pointer; fill: blue; text-decoration: underline;"
        onclick="window.open('${datasetURL}', '_blank')"
      >
        Access to dataset
      </tspan>
    </tspan>
  `;
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
  const decimals = REF.decimals;

  if(REF.stacking == "percent") {
    let html = "";
    html += `<table id="tooltipTable" class="table_component">                
                <thead>
                  <tr>
                    <th scope="cols">${points[0].x}</th>                    
                    <th scope="cols">%</th>                    
                  </tr>
                </thead>`;
    points.forEach(element => {
      const value = element.point.percentage.toFixed(0);
      const category = element.point.series.name; 
      const color = element.point.color;              
      html += `<tr>
                <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                <td>${value} %</td>
              </tr>`; 
    });
    html += `</table>`;
    return `<div>${html}</div>`;
  } else {
    let html = "";
    let totalAdded = false;
    
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
      const value = point.y.toFixed(decimals);
      const formattedValue = parseFloat(value).toLocaleString('en-US').replace(/,/g, ' ');
      const category = point.series.name;

      if(REF.details != 0) {
        html += `<tr>
          <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
          <td>${formattedValue}</td>
        </tr>`;
      }    
      
      if (category == translationsCache['TOTAL']) {
        totalAdded = true;
      }
    });
    
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
      if (!totalAdded) {
        const totalSum = sortedPoints.reduce(function (sum, point) {
          return sum + point.y;
        }, 0);
    
        const totalValue = totalSum.toFixed(decimals);
        const formattedValue = parseFloat(totalValue).toLocaleString('en-US').replace(/,/g, ' ');
    
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

function enableScreenREader() {
  const titleElement = document.querySelector("text.highcharts-title");
  if (titleElement) {
    titleElement.setAttribute('aria-hidden', 'false');
  }

  const subtitleElement = document.querySelector('text.highcharts-subtitle');
  if (subtitleElement) {
    subtitleElement.setAttribute('aria-hidden', 'false');
  }

  const container = document.querySelector(".highcharts-root");
  if (container) {
    container.removeAttribute('aria-hidden');
  }

  const fontAwesomeIcons = document.querySelectorAll('i.fas');
  fontAwesomeIcons.forEach(function(icon) {
    icon.setAttribute('aria-hidden', 'true');
  });
}

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
      const elWidth = document.querySelector('.dt-scroll-headInner').offsetWidth;
      customScrollbarInner.style.width = `${elWidth + 250}px`;
      customScrollbar.scrollLeft = scrollableContent.scrollLeft;
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
      const footerHeight = 76.075;

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

async function exportToExcel() {
  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Get the HTML table element
  const table = document.getElementById("dataTableContainer");

  // Determine the number of columns in the table
  const totalColumns = table.rows[0].cells.length;

  // Convert the column index to Excel letters (e.g., 13 -> 'M')
  function getColumnLetter(index) {
    let letter = "";
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  }

  const lastColumnLetter = getColumnLetter(totalColumns - 1);

  // Add a title row at the top
  const titleRow = worksheet.addRow([translationsCache["TOOLTITLE"]]);
  titleRow.font = { bold: true, size: 16 };
  worksheet.mergeCells(`A1:${lastColumnLetter}1`);
  titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };

  // Add a subtitle row below the title row
  const subtitleRow = worksheet.addRow([translationsCache[REF.geo] + " - " + translationsCache[REF.fuel]]);
  subtitleRow.font = { italic: true, size: 14};
  worksheet.mergeCells(`A2:${lastColumnLetter}2`);
  subtitleRow.getCell(1).alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // Extract table header row
  const headerRow = table.rows[0];
  const headerData = Array.from(headerRow.cells)
    .slice(0, totalColumns)
    .map((cell) => cell.innerText);
  const worksheetHeaderRow = worksheet.addRow(headerData);
  worksheetHeaderRow.font = { bold: true };

  // Set custom height for the header row (third row)
  worksheet.getRow(3).height = 60;

  for (let i = 0; i < totalColumns; i++) {
    const cell = worksheetHeaderRow.getCell(i + 1);
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4A90E2" }, // Softer blue for the header (#4A90E2)
    };
    // Align header cells: First column to left, others to right
    cell.alignment = {
      horizontal: i === 0 ? "left" : "right",
      vertical: "middle",
      wrapText: true,
    };
  }

  // Set custom width for the columns
  worksheet.getColumn(1).width = 35;
  for (let i = 2; i <= totalColumns; i++) {
    worksheet.getColumn(i).width = 12.5;
  }

  // Extract table data rows and add striped styling
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const rowData = Array.from(row.cells)
      .slice(0, totalColumns)
      .map((cell) => cell.innerText);
    const worksheetRow = worksheet.addRow(rowData);

    for (let j = 0; j < totalColumns; j++) {
      const cell = worksheetRow.getCell(j + 1);

      // Align cells: First column to left, others to right
      cell.alignment = {
        horizontal: j === 0 ? "left" : "right",
        vertical: "middle",
      };

      // Format numbers with space for thousands separator if the cell contains a number
      if (j > 0 && !isNaN(cell.value)) {
        cell.numFmt = "# ###";
      }

      // Add striped styling - light blue background for alternating rows
      if (i % 2 === 0) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFcfdaf5" },
        };
      }
    }
  }

  // Add a footer row with today's date and source
  const today = new Date().toLocaleDateString();
  const footerRow = worksheet.addRow([`Source: Eurostat | Date: ${today}`]);
  footerRow.font = { italic: true, size: 12 };
  worksheet.mergeCells(`A${footerRow.number}:${lastColumnLetter}${footerRow.number}`);
  footerRow.getCell(1).alignment = { horizontal: "right", vertical: "middle" };

  // Export workbook to an Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Energy_balances.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Function to correct aria-hidden attributes on the chart
function observeAriaHidden() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "aria-hidden") {
        const target = mutation.target;
        if (target.tagName === "svg" && target.getAttribute("aria-hidden") === "false") {
          target.removeAttribute("aria-hidden");
        }
      }
    });
  });

  // Observe the entire document for changes
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
  });
}

document.addEventListener("DOMContentLoaded", observeAriaHidden);

function updateAccessibilityLabels() {
  const elements = document.querySelectorAll('.highcharts-a11y-proxy-element');
  elements.forEach((element) => {
    let ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel && (ariaLabel.includes("Show") || ariaLabel.includes("Anzeigen") || ariaLabel.includes("Afficher"))) {
      const updatedLabel = ariaLabel
        .replace(/Show/g, translationsCache["SHOW"])
        .replace(/Anzeigen/g, translationsCache["SHOW"])
        .replace(/Afficher/g, translationsCache["SHOW"]);
      element.setAttribute('aria-label', updatedLabel);
    }
  });
}

document.addEventListener('DOMContentLoaded', updateAccessibilityLabels);






