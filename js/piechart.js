
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

    d = chartApiCall();

    const seriesOpt = {
      innerSize: "75%",
      showInLegend: true,
      dataLabels: {
        enabled: true,
      },
    };
  
    const pieOpt = {  
        allowPointSelect: true,
        animation: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>value: {point.y:,.4f} " + REF.unit
        },
    } 
    

 

  pieChartData = [];
  pieSiec = d.Dimension("siec").id;


  val = pieSiec.map((siec, sIdx) => {
    if(siec !== "TOTAL"){     
      d.value[sIdx] == null ? d.value[sIdx] = 0 : d.value[sIdx] = d.value[sIdx]     
      pieChartData.push({ name: languageNameSpace.labels[siec], y: d.value[sIdx] });
    }    
  });

  const tooltipFormatter = function() {
    return chartNormalTooltip(this.point);
  };

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
      name: 'Categories',
      data: pieChartData
    }],
    colors: colors,
    legend: {},
    pieOptions: pieOpt,
    columnOptions: null,
    seriesOptions: seriesOpt,
  
  };
  
  const customChart = new Chart(chartOptions);
  pieChart = customChart.createChart();
  
  changeLegendPisition(pieChart);     

  $(window).on('resize', function () {
    changeLegendPisition(pieChart);
  });

}






