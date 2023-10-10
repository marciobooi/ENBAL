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

