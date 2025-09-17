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

    // Define parameters for the chart data
    const params = {
      dataset: REF.dataset || "nrg_bal_c",
      chart: "lineChart",
      chartBal: REF.chartBal,
      unit: REF.unit,
      year: REF.year,
      geo: REF.geo,
      siecs: REF.siecs,
      language: REF.language
    };

    lineChartData = [];
    
    // For now, maintain backward compatibility with synchronous API calls
    d = chartApiCall();

    // Process the line chart data
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
        accessibility: {
          description: `Line series for ${siecs[item]} showing trend from ${years[0]} to ${years[years.length - 1]}`
        }
      };
      lineChartData.push(lineobj);
    }  

    // Configure tooltip formatter
    const tooltipFormatter = function() { 
      return tooltipTable(this.points);
    };  
   
    // Configure chart with improved accessibility options
    const chartOptions = {
      containerId: "chart",
      type: "spline",
      title: getTitle(),
      subtitle: null,
      xAxis: { 
        categories: years,
        accessibility: {
          description: `Years from ${years[0]} to ${years[years.length - 1]}`
        }
      },
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
          mouseOver: function() {
            var point = this;
          }
        }
      },
      seriesOptions: "",
      accessibility: {
        keyboardNavigation: {
          enabled: true
        },
        description: `Line chart showing trend of ${REF.chartBal} for ${REF.geo} over time from ${years[0]} to ${years[years.length - 1]}`,
        point: {
          valueSuffix: REF.unit
        }
      }
    };
      
    const chart = new Chart(chartOptions);
    lineChart = chart.createChart();

    // In future versions, we'll implement the async approach:
    /*
    dataService.getChartData('lineChart', params).then(result => {
      const lineChartData = result.series;
      const years = result.categories;
      
      // Configure and create chart
      const chartOptions = {
        // ...chart configuration...
        xAxis: { categories: years },
        series: lineChartData
      };
      
      const chart = new Chart(chartOptions);
      lineChart = chart.createChart();
    });
    */
}













