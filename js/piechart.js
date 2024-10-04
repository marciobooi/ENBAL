
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
      showInLegend: true,
      dataLabels: {
        enabled: true,
      },
    };
  
    const pieOpt = {  
        allowPointSelect: true,
        // size: "75%",
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
    } 
    

 

  pieChartData = [].sort();
  pieSiec = d.Dimension("siec").id;


  val = pieSiec.map((siec, sIdx) => {
    if(siec !== "TOTAL"){     
      // d.value[sIdx] == null ? d.value[sIdx] = 0 : d.value[sIdx] = d.value[sIdx]     
        if(d.value[sIdx] > 0){
          pieChartData.push({ name: translationsCache[siec] || siec, y: d.value[sIdx] });
        }
    }    
  });


  pieChartData.sort((a, b) => a.name.localeCompare(b.name));

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
    log('here')
      log(getTitle());
  }, 1500);

}






