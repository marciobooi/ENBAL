
function renderLineChart(chartBal) {

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

    lineChartData = []


    d = chartApiCall();

    siecs = d.Dimension("siec").id;
    years = d.Dimension("time").id;
    valores = d.value;
  
    for (var item in siecs) {
      data = [];
      for (var j = 0; j < years.length; j++) {
        data.push(valores[0]);
        valores.shift();
      }
      lineobj = {
        name: translationsCache[siecs[item]] || siecs[item],
        data: data,
      };
      lineChartData.push(lineobj);
    }  

   
    const tooltipFormatter = function () { return tooltipTable(this.points);};  
   
      const chartOptions = {
        containerId: "chart",
        type: "spline",
        title: getTitle(),
        subtitle: null,
        xAxis: { categories: years },
        yAxisFormat: "{value:.2f}",
        tooltipFormatter: tooltipFormatter,
        creditsText: credits(),
        creditsHref: 'https://ec.europa.eu/eurostat/databrowser/view/'+REF.dataset+'/default/table?lang=EN',
        series: lineChartData.sort((a, b) => a.name.localeCompare(b.name)),
        colors: colors,
        legend: {
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
            stacking: "normal",
            events: {
              mouseOver: function () {
                var point = this;
                // var color = point.color;
                // $('path.highcharts-label-box.highcharts-tooltip-box').css('stroke', color);
              }
            }
          },
        seriesOptions: ""      
      };
      
      const chart = new Chart(chartOptions);
      chart.createChart();    
}













