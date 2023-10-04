
function renderPieChart(chartBal) {    

  chartMenuLanguages();

    if($('#barChartOption:visible')){
        $('#barChartOption').css("display", "none")
    }




      switch (REF.fuel) {
        case "fuelMainFuel":
          REF.siecs = mainFuelFamilies;       
          break;
        case "fuelCoal":
          REF.siecs = coal;       
          break;
        case "fuelFossil":
          REF.siecs = fossilBasedGasses;       
          break;
        case "fuelOtherFossil":
          REF.siecs = otherFossilFuelsAndWastes;       
          break;
        case "fuelOil":
          REF.siecs = primaryOil;       
          break;
        case "fuelMainPetroleum":
          REF.siecs = mainPetroleumProducts;       
          break;
        case "fuelOtherPetroleum":
          REF.siecs = otherPetroleumProducts;       
          break;
        case "fuelNonCombustible":
          REF.siecs = nonCombustibleRenewables;       
          break;
        case "fuelCombustible":
          REF.siecs = combustibleRenewables;       
          break;
        case "fuelElectricity":
          REF.siecs = electricityAndHeat;       
          break;
      }  


    let url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
    url += "format=JSON";
    url += "&nrg_bal=" + REF.chartBal;
    url += "&unit=" + REF.unit;
    url += "&time=" + REF.year;
    url += "&geo=" + REF.geo;
    for (var i = 0; i < REF.siecs.length; i++) {
      if ( REF.siecs[i] !== "0000X0350-0370" ||REF.siecs[i] !== "TOTAL" ||REF.siecs[i] !== "C0350-0370") {
        url += "&siec=" + REF.siecs[i];
      }
    }
    

    d = JSONstat(url).Dataset(0);

  pieChartData = [];
  pieSiec = d.Dimension("siec").id;


  val = pieSiec.map((siec, sIdx) => {
    if(siec !== "TOTAL"){     
      d.value[sIdx] == null ? d.value[sIdx] = 0 : d.value[sIdx] = d.value[sIdx]     
      pieChartData.push({ name: languageNameSpace.labels[siec], y: d.value[sIdx] });
    }    
  });


  if (!Object.values(d.value).some(x => (x !== null && x !== '' && x !== 0))) {
    pieChartData = [];
  }

  if(chartBalText == ""){
    chartBalText = languageNameSpace.labels[REF.chartBal]
  } else {
    chartBalText = chartBalText;
  }


  pieTitle = languageNameSpace.labels[REF.fuel]+"<br>"+chartBalText +"<br>"+languageNameSpace.labels[REF.geo] + " - " + REF.year;


  Highcharts.chart("chart", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: chartheight, 
      style: {
        animation: true,
        duration: 1000,
      },
      events: {
        load: function (event) {
          var chart = this,          
            points = chart.series[0].points,
            len = points.length,      
            i = 0;  
        
            customCredits = this.credits.getBBox();         
            this.renderer.image('img/logo.png', customCredits.x - 40, customCredits.y - 20, 100, 40).addClass('chartLogo').attr({zIndex: 9999}).add();  
            $('.chartLogo').click(function() {
              window.open(
                "https://ec.europa.eu/eurostat/databrowser/product/view/NRG_BAL_C", "_blank"
              );
            })  

         var legend = this.legend,
         legendGroup = legend.group;

         for (var i = 0; i < len; i++) {
          if(points[i].y < 0){
            this.renderer.text(
              '<span>'+languageNameSpace.labels["negativeValues"]+'</span>',
              legendGroup.translateX + legend.padding,
              legendGroup.translateY + legend.legendHeight + legend.padding,
              true
            ).add();
            break;
          }        
        }
        },
      },
    },
    title: {
      text: pieTitle,   
      align: 'left',
      x: 70,
      style: {
        fontFamily: "Comfortaa, Geneva, sans-serif",
      },       
    },        
  
    tooltip: {     
      useHTML: true,  
      pointFormat: '{point.percentage:.1f}%</b>: <b>{point.y:,.2f} </b>'+ REF.unit ,
      valueSuffix: " " + REF.unit,      
    },
    accessibility: {
      point: {
        valueSuffix: languageNameSpace.labels[REF.unit],
      },
    },
    credits: {       
      text: "Source: Eurostat",
      style: {         
        color: "transparent",        
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        whiteSpace: 'nowrap', 
        animation: true,
        cursor: "pointer",
        showInLegend: true,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        dataLabels: {
          enabled: true,         
          format: "<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>"+languageNameSpace.labels["VALUE"]+": {point.y:,.2f} " + REF.unit,
        },
        point: {
          events: {
            click: function (e) {
              var point = this,
                tooltip = point.series.chart.tooltip;
              if (tooltip) {
                tooltip.hide();
              }
            },
            mouseOver: function (event) {
              var p = this;
              if (!p.sliced) {
                p.select(true);
              }
            },
            mouseOut: function (event) {
              var p = this;
              if (p.sliced) {
                p.select(false);
              }
            },
          },
        },
      },
      series: {
        size: '60%',
        innerSize: "65%",
        showInLegend: true,
        dataLabels: {
          enabled: true,
          connectorColor: "silver",
          style: {
            font: "10pt Montserrat, sans-serif",
          },
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 5,
      itemMarginBottom: 5,
      symbolHeight: 7,
      symbolWidth: 7,
      itemStyle: {
        font: "10pt Montserrat, sans-serif",
      },
    },
    series: [ {
      name: languageNameSpace.labels[REF.unit],
      data: pieChartData,
    }], 
    navigation: {
      buttonOptions: {
        align: 'right',
        x: 0,
        y: 20,
        verticalAlign: 'top'
      }
  },
  
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 820,
            maxHeight: 400,
          },
          chartOptions: {
            scrollbar: {
              enabled: false,
            },
          },
        },
      ],
    },
    exporting: {
      filename: languageNameSpace.labels['dataset'],  
      csv: {
        columnHeaderFormatter: function(item, key) {      
            if (!item || item instanceof Highcharts.Axis) {
                return languageNameSpace.labels['IND']
            } else {
                return item.name;
            }              
        }
    },
      tableCaption: pieTitle + '<br> Source: Eurostat',
      chartOptions: {
        title: {
          text: pieTitle,         
        },
       
        chart: {
          width: 1900,
          height: 1000,
          events: {
            load: function () {
              this.renderer.image('https://ec.europa.eu/eurostat/statistics-explained/images/0/09/Logo_RGB-POS.png', 1700, -20, 200, 75).add();
            },
          },
        },
        exporting: {
          tableDecimalPoint: ",", // "." or ","
          tableDecimalValue: 4,         
        },
      },
      buttons: {
        contextButton: {
          menuItems: [
            // "printChart",
            // "separator",
            "downloadPNG",
            "downloadJPEG",
            // "downloadPDF",
            "downloadSVG",
            "separator",
            "downloadCSV",
            "downloadXLS",
            "viewData",
            // "openInCloud"
          ],
        },
      },
      menuItemDefinitions: {
        // Custom definition
        viewData: {
          onclick: function () {
            if (!this.insertedTable) {
              var div = document.createElement("div");
              div.className = "highcharts-data-table";
              // Insert after the chart container
              this.renderTo.parentNode.insertBefore(div,this.renderTo.nextSibling);
              div.innerHTML = this.getTable();
              this.insertedTable = true;
              var date_str = new Date().getTime().toString();
              var rand_str = Math.floor(Math.random() * 1000000).toString();
              this.insertedTableID = "div_" + date_str + rand_str;
              div.id = this.insertedTableID;
              // $('.highcharts-data-table').wrap("<div class='overlay'>");
              $(".highcharts-data-table").append("<img class='tableLogo' src='../img/logo.png' alt='' /><a class='print' onclick='printTable()'><i class='fad fa-print'></i></a>");  
              $(".highcharts-table-caption").html(pieTitle + " " + REF.unit + "<br> Source: Eurostat");
                   
              const cells = document.querySelectorAll('td.number');
              cells.forEach(function(cell) {   
              cell.innerHTML = Highcharts.numberFormat(cell.innerHTML, 2)
            })
            } else {
              $("#" + this.insertedTableID).toggle();
              // $('.highcharts-data-table').wrap("<div class='overlay'>");
              $(".highcharts-data-table").append("<img class='tableLogo' src='../img/logo.png' alt='' /><a class='print' onclick='printTable()'><i class='fad fa-print'></i></a>");  
            }
          },
        },
      },
    },
  });
 

      $("#energyModal").modal("show");
      hideSpinner()
      $("#energyModal").on("hidden.bs.modal", function () {
        $("#chart").empty();
      });
}






