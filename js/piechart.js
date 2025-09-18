function renderPieChart(chartBal) {    
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

    // Define params for the chart data
    const params = {
      dataset: REF.dataset || "nrg_bal_c",
      chart: "pieChart",
      chartBal: REF.chartBal,
      unit: REF.unit,
      year: REF.year,
      geo: REF.geo,
      siecs: REF.siecs,
      language: REF.language
    };
    
    // For now, maintain backward compatibility with synchronous API calls
    d = chartApiCall();
 
    // Define series options for better accessibility
    const seriesOpt = {
      showInLegend: true,
      dataLabels: {
        enabled: true,
      },
      accessibility: {
        description: `Pie chart showing ${REF.chartBal} data for ${REF.geo} in ${REF.year}`,
        keyboardNavigation: {
          enabled: true
        }
      }
    };
  
    const pieOpt = {  
        allowPointSelect: true,
        innerSize: "75%",
        showInLegend: true,
        animation: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          y: -10,
          style: {
            fontSize: '.8rem',
            fontWeight: 'normal'
        },
          format: "<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>"+ translationsCache["VALUE"] +": {point.y:,."+ REF.decimals +"f} " + REF.unit
        },
    };
    
    // Process the pie chart data
    pieChartData = [];
    pieSiec = d.Dimension("siec").id;
  
    val = pieSiec.map((siec, sIdx) => {
      if(siec !== "TOTAL"){     
        if(d.value[sIdx] > 0){
          pieChartData.push({ name: translationsCache[siec] || siec, y: d.value[sIdx] });
        }
      }    
    });

    pieChartData.sort((a, b) => a.name.localeCompare(b.name));
  
    const tooltipFormatter = function() {
      return chartNormalTooltip(this.point);
    };
  
    // Configure chart with improved accessibility options
    const chartOptions = {
      containerId: "chart",
      type: "pie",
      title: getTitle(),
      subtitle: null,
      xAxis: null,
      yAxisFormat: "",
      tooltipFormatter: tooltipFormatter,
      creditsText: credits(),
      series: [{
        name: translationsCache["VALUE"],
        data: pieChartData
      }],
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
      pieOptions: pieOpt,
      columnOptions: null,
      seriesOptions: seriesOpt,
      accessibility: {
        point: {
          valueSuffix: REF.unit
        },
        description: `Pie chart showing distribution of ${REF.chartBal} by fuel type for ${REF.geo} in ${REF.year}`
      }
    };
  
    const customChart = new Chart(chartOptions);
    pieChart = customChart.createChart();
  
    changeLegendPisition(pieChart);     
  
    $(window).on('resize', function () {
      changeLegendPisition(pieChart);
    });
  
    $("#title").html('');
    setTimeout(() => {
        REF.chart = "pieChart";
        // log('here')
        // log(getTitle());
    }, 1500);

    // In future versions, we'll implement the async approach:
    /*
    dataService.getChartData('pieChart', params).then(result => {
      const pieChartData = result.series[0].data;
      
      // Configure and create chart
      const chartOptions = {
        // ...chart configuration...
        series: [{
          name: translationsCache["VALUE"],
          data: pieChartData
        }]
      };
      
      const customChart = new Chart(chartOptions);
      pieChart = customChart.createChart();
      
      // Update UI
      changeLegendPisition(pieChart);     
      
      $(window).on('resize', function () {
        changeLegendPisition(pieChart);
      });
    });
    */
}






