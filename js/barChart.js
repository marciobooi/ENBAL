function handleData(d, series) {
  // This function now expects processed data from DataService
  chartSeries = []
  barcateg = [];

  if(REF.details == 1){
    valores = d.value;
    barSiec = d.Dimension("siec").id;
  
    for (var item in barSiec) {
      if(barSiec[item] === "TOTAL") {
        // Skip TOTAL
      } else {    
        data = [];
        for (var j = 0; j < series.length; j++) {
          if (valores[0] < 0 && REF.stacking == "percent") {
            negativeVal = "true";
            data.push(0);
            valores.shift();
          } else {
           val = valores[0] == null ? 0 : valores[0]
            data.push(val);
            valores.shift();
          }          
            if (barcateg.length < series.length) {
              barcateg.push(translationsCache[series[j]] || series[j]);              
            }   
        }
        barobj = {         
          name:  translationsCache[barSiec[item]] || barSiec[item],          
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
      barcateg.push(translationsCache[geo] || geo);
      const languageLabel = translationsCache[geo] || geo;
      const color = geo == "EU27_2020" ? '#CCA300' : (geo == "EA" ? '#208486' : "#0E47CB");
      chartSeries.push({ name: languageLabel, y: d.value[yIdx] == null ? 0 : d.value[yIdx] , color }); 
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

  // log(findOrder)
  
  if (orderChange.hasOwnProperty(findOrder)) {
    orderChange[findOrder]();
  }

}


function createBarChart() {
  REF.siecs = siec(REF.fuel);

  const type = "column";
  
  // Use DataService to get chart data in a way that maintains backward compatibility
  const params = {
    dataset: REF.dataset || "nrg_bal_c",
    chart: "barChart",
    chartBal: REF.chartBal,
    unit: REF.unit,
    year: REF.year,
    geo: REF.geo,
    siecs: REF.siecs,
    siec: REF.siec,
    details: REF.details,
    agregates: REF.agregates,
    language: REF.language
  };
  
  // For now, keep using the synchronous approach to maintain compatibility
  d = chartApiCall();                    
  
  // In future versions, we can fully migrate to async:
  // dataService.getChartData("barChart", params).then(result => {
  //   d = result.rawData;
  //   // Continue with chart creation
  // });

  const series = d.Dimension("geo").id;
  const categories = d.Dimension("geo").id;  

  handleData(d, series);    

  const yAxisTitle = translationsCache[REF.unit] || REF.unit;

  const xAxis = REF.details == 1 ? { 
    reversedStacks: true, 
    categories: categoriesAndStacks.map((e) => e.x),
    labels: {
      step: 1,
      staggerLines: 2,
      overflow: 'justify',
      style: {
        fontSize: '10px'
      }
    }
  } : { 
    type: "category",
    labels: {
      step: 1,
      overflow: 'justify',
      style: {
        fontSize: '10px'
      }
    }
  };

  const chartData = REF.details == 0 ? [{name: translationsCache[REF.unit] || REF.unit, data: chartSeries}] : orderedSeries.reverse();

  const legendStatus = REF.details == 0 ? false : true;

  const tooltipFormatter = function() {
    return tooltipTable(this.points);
  };

  // Create the chart with accessibility enhancements
  const chartOptions = {
    containerId: "chart",
    type: type,
    title: getTitle(),
    subtitle: null,
    xAxis: xAxis,
    yAxisFormat: '{value:.2f}',
    yAxisTitle: REF.stacking == "normal" ? yAxisTitle : translationsCache["PERCENTAGE"] || "PERCENTAGE",
    tooltipFormatter: tooltipFormatter,
    creditsText: credits(),
    creditsHref: "",
    series: chartData.sort((a, b) => a.name.localeCompare(b.name)),
    colors: colors,
    legend: {
      enabled: legendStatus,
      padding: 3,   
      itemMarginTop: 5,
      itemMarginBottom: 5,
      itemHiddenStyle: {
        color: '#767676'
      },
      itemStyle: {
        fontSize: '.9rem',
        fontWeight: 'light'
      }
    },
    columnOptions: {
      stacking: REF.stacking == "normal" ? "normal" : "percent",
      connectNulls: true,
      events: {
        mouseOver: function () {
          var point = this;
          // var color = point.color;
          // $('path.highcharts-label-box.highcharts-tooltip-box').css('stroke', color);
        }
      }
    },
    seriesOptions: "",
    accessibility: {
      description: `Bar chart showing ${REF.chartBal} data for ${REF.geo} in ${REF.year}`,
      keyboardNavigation: {
        enabled: true
      }
    }
  };

  const customChart = new Chart(chartOptions);
  barChart = customChart.createChart();

  changeLegendPisition(barChart);     

  $(window).on('resize', function () {
    changeLegendPisition(barChart);
  });
}


