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

  const type = "column"   

  d = chartApiCall();                    

  const series = d.Dimension("geo").id;
  const categories = d.Dimension("geo").id;  

  handleData(d, series);    

  const yAxisTitle = translationsCache[REF.unit] || REF.unit 

  const xAxis =  REF.details == 1 ? { reversedStacks: true, categories: categoriesAndStacks.map((e) => e.x) } : { type: "category" };

  const chartData = REF.details == 0 ? [{name: translationsCache[REF.unit] || REF.unit, data: chartSeries}] : orderedSeries.reverse();

  const legendStatus = REF.details == 0 ? false : true ;

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
    yAxisTitle:  REF.stacking == "normal" ? yAxisTitle : translationsCache["PERCENTAGE"] || "PERCENTAGE",
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
      seriesOptions:""
};


const customChart = new Chart(chartOptions);
barChart = customChart.createChart();

changeLegendPisition(barChart);     

$(window).on('resize', function () {
  changeLegendPisition(barChart);
});



}


