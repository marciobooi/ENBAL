function handleData(d, series ) {

  chartSeries = []
  barcateg = [];

  if(REF.details == 1){
    valores = d.value;
    barSiec = d.Dimension("siec").id;
  
    for (var item in barSiec) {
      //console.log(barSiec[item])
      if(barSiec[item] === "TOTAL") {
        //console.log(true)
      } else {    
        data = [];
        for (var j = 0; j < series.length; j++) {
          if (valores[0] < 0 && REF.stacking == "percent") {
            negativeVal = "true";
            data.push(0);
            valores.shift();
          } else {
            data.push(valores[0]);
            valores.shift();
          }          
            if (barcateg.length < series.length) {
              barcateg.push(languageNameSpace.labels[series[j]]);
            }   
        }
        barobj = {
          name: languageNameSpace.labels[barSiec[item]],
          data: data,
        };
        chartSeries.push(barobj);  
      }   
    }
    categoriesAndStacks = barcateg.map((el, i) => {
      if (i >= chartSeries[0].data.length) {
        return false;
      } else {
        let myObject = {};
        myObject.x = el;
        myObject.code = geo[i];
        myObject.y = [];

        // console.log(myObject)

        chartSeries.forEach((bdEl) => {
          myObject.y.push(bdEl.data[i]);
        });

        return myObject;
      }
    });



    // const makeOrderedSeriesFunc = () => makeOrderedSeries(categoriesAndStacks);

  } else {
    val2 = series.map((geo, yIdx) => {   
      barcateg.push(languageNameSpace.labels[geo]);
      const languageLabel = languageNameSpace.labels[geo];
      const color = geo == "EU27_2020" ? '#14375a' : (geo == "EA" ? '#800000' : "#32afaf");
      chartSeries.push({ name: languageLabel, y: d.value[yIdx], color }); 
    });
  }

  const detail = REF.details;
  const order = REF.order;

  
  const makeOrderedSeriesFunc = () => makeOrderedSeries(categoriesAndStacks);


  
  const orderChange = {
    "1_ALPHA": () => { sortArrayAlphabetically(categoriesAndStacks); orderedSeries = makeOrderedSeriesFunc(); },
    "1_PROTO": () => { sortArrayByProtocolOrder(categoriesAndStacks); orderedSeries = makeOrderedSeriesFunc(); },
    "1_ASC": () => { sortArrayByAscValues(categoriesAndStacks); orderedSeries = makeOrderedSeriesFunc(); },
    "1_DESC": () => { sortArrayByDescValues(categoriesAndStacks); orderedSeries = makeOrderedSeriesFunc(); },
    "0_ALPHA": sortArrayAlphabetically,
    "0_PROTO": () => sortArrayByProtocolOrder(d),
    "0_ASC": () => sortArrayByAscValues(chartSeries),
    "0_DESC": () => sortArrayByDescValues(chartSeries),
  };
  
  const findOrder = `${detail}_${order}`;

  log(findOrder)
  
  if (orderChange.hasOwnProperty(findOrder)) {
    orderChange[findOrder]();
  }

}


function createBarChart() {

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


  REF.siecs = siec(REF.fuel);

  const type = "column"   

  d = chartApiCall();                    

  const series = d.Dimension("geo").id;
  const categories = d.Dimension("geo").id;  

  handleData(d, series);   

 

  const yAxisTitle = d.__tree__.dimension.unit.category.label[REF.unit]   

  const xAxis =  REF.details == 1 ? { reversedStacks: true, categories: categoriesAndStacks.map((e) => e.x) } : { type: "category" };

  const chartData = REF.details == 0 ? [{name: languageNameSpace.labels[REF.unit], data: chartSeries}] : orderedSeries.reverse();



  const tooltipFormatter = function() {
    return tooltipTable(this.points) ;
  };


  const chartOptions = {
    containerId: "chart",
    type: type,
    title: getTitle(),
    subtitle: null,
    xAxis: xAxis,
    yAxisFormat: '{value:.2f}',
    yAxisTitle:  yAxisTitle,
    tooltipFormatter: tooltipFormatter,
    creditsText: credits(),
    creditsHref: "",
    series: chartData,
    colors: colors,
    legend: {},
    columnOptions: {
        stacking: REF.stacking == "normal" ? "normal" : "percent",
        connectNulls: true,
        events: {
          mouseOver: function () {
            var point = this;
            var color = point.color;
            $('path.highcharts-label-box.highcharts-tooltip-box').css('stroke', color);
          }
        }
      },
      seriesOptions:""
};


const customChart = new Chart(chartOptions);
barChart = customChart.createChart();

changeLegendPisition(barChart);     

$(window).on('resize', function () {
  changeLegendPisition(barChart);
});

    

}


// new functions


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
  const geoLabel = languageNameSpace.labels[REF.chartGeo];
  const time = REF.time;
  const dataset = languageNameSpace.labels[REF.dataset];
  const consoms = languageNameSpace.labels[REF.consoms];
  const barText = languageNameSpace.labels["BAR_CHART_TITLE_CONSOMS"];
  const currencyLabel = languageNameSpace.labels["S_" + REF.currency];
  const unitLabel = languageNameSpace.labels["S_" + REF.unit];
  let title = ""
  let subtitle = ""

  let chartTitle = "";
  switch (REF.chartId) {
    case "lineChart":
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${geoLabel} - ${consoms}</span>`;
      title = `${dataset}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${geoLabel} - ${consoms}</span>`;
      break;
    case "pieChart":
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${geoLabel} - ${time} - ${consoms}</span>`;
      title = `${dataset}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${geoLabel} - ${time} - ${consoms}</span>`;
      break;
    case "barChart":
      chartTitle = `${dataset}<br><span style="font-size:12px; padding-top:5px">${barText} - ${geoLabel} - ${time}</span>`;
      title = `${dataset}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${barText} - ${geoLabel} - ${time}</span>`;
      break;
    default:    
    chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${time} - ${consoms}</span>`;
    title = `${dataset} (${currencyLabel}/${unitLabel}) ${time}`;
    subtitle = `${consoms} - ${time}`;   
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