
function renderLineChart(chartBal) {
    // console.log(REF.chart)
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
   

    lineChartData = []


    let url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
    url += "format=JSON";
    url += "&nrg_bal=" + REF.chartBal;
    url += "&unit=" + REF.unit;
    url += "&geo=" + REF.geo;
    for (var i = 0; i < REF.siecs.length; i++) {    
      if (REF.siecs[i] == "0000X0350-0370" || REF.siecs[i] == "TOTAL" ||REF.siecs[i] == "C0350-0370") {       
      } else {
        url += "&siec=" + REF.siecs[i];
      }
    }

    d = JSONstat(url).Dataset(0);

    siecs = d.Dimension("siec").id;
    years = d.Dimension("time").id;
    valores = d.value;
  
    for (var item in siecs) {
      data = [];
      for (var j = 0; j < years.length; j++) {
        data.push(valores[0]);
        valores.shift();
      }
      barobj = {
        name: languageNameSpace.labels[siecs[item]],
        data: data,
      };
      lineChartData.push(barobj);
    }

  
    lineTitle = languageNameSpace.labels[REF.fuel] +"<br>"+ languageNameSpace.labels[REF.chartBal] ;


    lineSubTitle = languageNameSpace.labels[REF.geo] + " - " + REF.year;

    chart = new Highcharts.chart("chart", {
      chart: {
        type: 'spline',
        height: chartheight, 
        events: {
          load: function (event) {
            customCredits = this.credits.getBBox();         
            this.renderer.image('img/logo.png', customCredits.x - 40, customCredits.y - 20, 100, 40).addClass('chartLogo').attr({zIndex: 9999}).add();  
            $('.chartLogo').click(function() {
              window.open(
                "https://ec.europa.eu/eurostat/databrowser/product/view/NRG_BAL_C", "_blank"
              );
            })  
          },
        },
      },
      title: {
        text: lineTitle,     
      },
      subtitle: {
        text: lineSubTitle,     
      },
    
      xAxis: {
        categories: years,
        tickLength: 0,
        min: 0.5,
      },
      yAxis: {
        // labels: {
        //   format: "{value:.2f}",
        // },
        labels: {
          formatter: function() {
              var numericSymbols = Highcharts.getOptions().lang.numericSymbols;
              var i = numericSymbols && numericSymbols.length;
              var numericSymbolDetector = this.axis.isLog ? this.value : this.axis.tickInterval;
              var UNDEFINED, ret, multi;

              while (i-- && ret === UNDEFINED) {
                  multi = Math.pow(100, i + 1);
                  if (numericSymbolDetector >= multi && (this.value * 10) % multi === 0 && numericSymbols[i] !== null) {
                      ret = Highcharts.numberFormat(this.value / multi, -1) + numericSymbols[i];
                  }
              }

              if (ret === UNDEFINED) {
                  if (Math.abs(this.value) >= 1000) { 
                      ret = Highcharts.numberFormat(this.value, -1);

                  } else {
                      ret = Highcharts.numberFormat(this.value, -1, UNDEFINED, '');
                  }
              }

              return ret; // Adding the prefix
          }
      },       
        title: {
          text: languageNameSpace.labels[REF.unit],
          style: {
            fontFamily: "Comfortaa, Geneva, sans-serif",
            fontSize: "1em",
            fontWeight: "200",
          },
        },
      },
      navigation: {
        buttonOptions: {
          align: 'right',
          x: 0,
          y: 20,
          verticalAlign: 'top'
        }
    },
    
      tooltip: {
        formatter: function () {
          var s = '<b>' + this.x + '</b>',
            sum = 0;   
          $.each(this.points, function (i, point) {               
              s += '<br/><svg width="10" height="10" style="color:' + point.series.color + '">● </svg><span>' + point.series.name + ': <b>' + Highcharts.numberFormat(point.y) + ' </b>' + REF.unit + '</span>';
              
            sum += point.y ;
          }); 
    
          s += '<br/>Total:<b> '+ Highcharts.numberFormat(parseFloat((sum).toFixed(2))) + "</b> " +REF.unit
          return s;
        },
        crosshairs: true,
        shared: true,         
      },
      credits: {
        text: "Source: Eurostat",
        style: {
          color: "transparent",         
        },
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 2,
            lineWidth: 1
          }
        },
      },
      series: lineChartData,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 820,
            maxHeight: 400,
          },
        }, ],
      },
      exporting: {
        tableCaption: lineTitle + "<br>" + lineSubTitle + "<br> Source: Eurostat",
        filename: languageNameSpace.labels['dataset'],  
        csv: {
          columnHeaderFormatter: function(item, key) {      
              if (!item || item instanceof Highcharts.Axis) {
                  return languageNameSpace.labels['YEAR']
              } else {
                  return item.name;
              }              
          }
      },
        chartOptions: {
          title: {
            text: lineTitle,     
          },
          subtitle: {
            text: lineSubTitle,     
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
            tableDecimalValue: 2,
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
                var div = document.createElement('div');
                div.className = 'highcharts-data-table';
                // Insert after the chart container
                this.renderTo.parentNode.insertBefore(div, this.renderTo.nextSibling);
                div.innerHTML = this.getTable();
                this.insertedTable = true;
                var date_str = new Date().getTime().toString();
                var rand_str = Math.floor(Math.random() * (1000000)).toString();
                this.insertedTableID = 'div_' + date_str + rand_str
                div.id = this.insertedTableID;
                // $('.highcharts-data-table').wrap("<div class='overlay'>");
                $(".highcharts-data-table").append("<img class='tableLogo' src='../img/logo.png' alt='' /><a class='print' onclick='printTable()'><i class='fad fa-print'></i></a>");  
                $('.highcharts-table-caption').html(lineTitle + "<br>" + lineSubTitle + "<br> Source: Eurostat")
                const cells = document.querySelectorAll('td.number');
                cells.forEach(function(cell) {   
                cell.innerHTML = Highcharts.numberFormat(cell.innerHTML, 2)
              })
              } else {
                $('#' + this.insertedTableID).toggle();
                // $('.highcharts-data-table').wrap("<div class='overlay'>");
                $(".highcharts-data-table").append("<img class='tableLogo' src='../img/logo.png' alt='' /><a class='print' onclick='printTable()'><i class='fad fa-print'></i></a>");  
              }
            },
          }
        },
      },
    });
      

      $("#energyModal").modal("show");
      hideSpinner()
      $("#energyModal").on("hidden.bs.modal", function () {
        $("#chart").empty();
      });
}













