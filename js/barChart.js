

$(function () {
  barChartOption = function (elm) {
    if (elm === 1) {
      $("#barChartOption").attr("onclick", "barChartOption(0)");
      REF.details = 1;
      showSpinner();
      setTimeout(function () {
        renderBarChart();
      }, 100);
    } else {
      $("#barChartOption").attr("onclick", "barChartOption(1)");
      REF.details = 0;
      showSpinner();
      setTimeout(function () {
        renderBarChart();
      }, 100);
    }
  };

  barChartagregates = function (elm) {
    if (elm === 1) {
      $("#barChartOptionagregates i")
        .removeClass("fa-plus")
        .addClass("fa-minus");
      $("#barChartOptionagregates").attr("onclick", "barChartagregates(0)");
      REF.agregates = 1;
      showSpinner();
      setTimeout(function () {
        renderBarChart();
      }, 100);
    } else {
      $("#barChartOptionagregates i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      $("#barChartOptionagregates").attr("onclick", "barChartagregates(1)");
      REF.agregates = 0;
      showSpinner();
      setTimeout(function () {
        renderBarChart();
      }, 100);
    }
  };

  barChartPercentages = function (elm) {
    if (elm === 1) {
      $("#barChartPercentages").attr("onclick", "barChartPercentages(0)");
      REF.stacking = "percent";
      showSpinner();
      setTimeout(function () {
        renderBarChart();
      }, 100);
    } else {
      $("#barChartPercentages").attr("onclick", "barChartPercentages(1)");
      REF.stacking = "normal";
      showSpinner();
      setTimeout(function () {
        renderBarChart();
      }, 100);
    }
  };
});

function renderBarChart(chartBalText, key) {
  console.log("barchar initiated");
chartMenuLanguages();
  if ($("#barChartOption:hidden")) {
    $("#barChartOption").css("display", "initial");
  }
  if ($("#barChartOptionagregates:hidden")) {
    $("#barChartOptionagregates").css("display", "initial");
  }

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

  //console.log(REF.siecs)



  $("#selectOrder").css("display", "block");

  if (REF.details == 1) {

    url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
    url += "format=JSON";
    url += "&nrg_bal=" + REF.chartBal;
    // console.log(REF.siecs)
    for (var i = 0; i < REF.siecs.length; i++) {
      if (
        // REF.siecs[i] == "C0000X0350-0370" ||       
        // REF.siecs[i] == "C0350-0370"  ||
        REF.siecs[i] == "TOTAL"
      ) {
      } else {
        url += "&siec=" + REF.siecs[i];
      }
    }
    url += "&unit=" + REF.unit;
    url += "&time=" + REF.year;
    for (var i = 0; i < defGeos.length; i++) {
      if (REF.agregates == 0) {
        if (defGeos[i] == "EU27_2020" || defGeos[i] == "EA19") {
        } else {
          url += "&geo=" + defGeos[i];
        }
      } else {
        url += "&geo=" + defGeos[i];
      }
    }
  } else {

    url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
    url += "format=JSON";
    url += "&nrg_bal=" + REF.chartBal;
    url += "&siec=" + REF.siec;
    url += "&unit=" + REF.unit;
    url += "&time=" + REF.year;
    // console.log(REF.siec)

    for (var i = 0; i < defGeos.length; i++) {
      if (REF.agregates == 0) {
        if (defGeos[i] == "EU27_2020" || defGeos[i] == "EA19") {
        } else {
          url += "&geo=" + defGeos[i];
        }
      } else {
        url += "&geo=" + defGeos[i];
      }
    }
  }

  // console.log(url)

  d = JSONstat(url).Dataset(0);
  negativeVal = "false";

  geos = d.Dimension("geo").id;
  REF.chartOptions = REF.details;
  if (REF.details == 1) {
    geo = d.Dimension("geo").id;
    valores = d.value;
    barcateg = [];
    chartSeries = [];
    barSiec = d.Dimension("siec").id;

    for (var item in barSiec) {
      //console.log(barSiec[item])
      if(barSiec[item] === "TOTAL") {
        //console.log(true)
      } else {
        var i = 0;
        data = [];
        for (var j = 0; j < geo.length; j++) {
          if (valores[0] < 0 && REF.stacking == "percent") {
            negativeVal = "true";
            data.push(0);
            valores.shift();
          } else {
            data.push(valores[0]);
            valores.shift();
          }
          if (barcateg.length < geo.length) {
            barcateg.push(languageNameSpace.labels[geo[j]]);
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

        chartSeries.forEach((bdEl) => {
          myObject.y.push(bdEl.data[i]);
        });

        if (REF.component == 0) {
          const myXTAX = myObject.y[1];
          const myXVAT = myObject.y[0] - myObject.y[2];
          const rest = myObject.y[0] - (myXTAX + myXVAT);

          myObject.y[0] = parseFloat((rest * factor).toFixed(dec));
          myObject.y[1] = parseFloat((myXTAX * factor).toFixed(dec));
          myObject.y[2] = parseFloat((myXVAT * factor).toFixed(dec));
        }
        // console.log(myObject)
        return myObject;
      }
    });
  } else {
    chartData = geos.map((geo, gIdx) => {
      return [languageNameSpace.labels[geo], d.value[gIdx]];
    });
  }

  if (REF.details == 1) {
    switch (REF.order) {
      case "ALPHA":
        categoriesAndStacks.sort((a, b) => {
          if (a.x < b.x) {
            return -1;
          } else if (a.x > b.x) {
            return 1;
          } else {
            return 0;
          }
        });
        orderedSeries = makeOrderedSeries(categoriesAndStacks);
        break;

      case "ASC":
      case "DESC":
        if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
          categoriesAndStacks.sort((a, b) => {
            const sumA = a.y.reduce((a, b) => {
              return a + b;
            });
            const sumB = b.y.reduce((a, b) => {
              return a + b;
            });

            if (sumA > sumB) {
              return 1;
            } else if (sumB < sumA) {
              return -1;
            } else {
              return 0;
            }
          });
        } else {
          categoriesAndStacks.sort((a, b) => {
            const sumA = a.y.reduce((a, b) => {
              return a + b;
            });
            const sumB = b.y.reduce((a, b) => {
              return a + b;
            });

            if (sumA < sumB) {
              return -1;
            } else if (sumB > sumA) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        if (REF.order === "DESC") {
          categoriesAndStacks.reverse();
        }
        orderedSeries = makeOrderedSeries(categoriesAndStacks);
        // console.log(orderedSeries)
        break;

      default:
      case "PROTO":
        const energyCountriesCodes = Object.keys(energyCountries);
        categoriesAndStacks.sort((a, b) => {
          return (
            energyCountriesCodes.indexOf(a.code) -
            energyCountriesCodes.indexOf(b.code)
          );
        });
        orderedSeries = makeOrderedSeries(categoriesAndStacks);
        break;
    }
  } else {
    switch (REF.order) {
      case "ALPHA":
        chartData.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        break;
      case "PROTO":
        orderedChartData = [];
        defGeos.forEach((element) => {
          chartData.forEach((elementData) => {
            if (
              elementData[0].indexOf(languageNameSpace.labels[element]) !== -1
            ) {
              orderedChartData.push(elementData);
            }
          });
        });
        chartData = orderedChartData;
        break;
      case "ASC":
        chartData.sort((a, b) => {
          if (a[1] < b[1]) return -1;
          if (a[1] > b[1]) return 1;
          return 0;
        });
        break;
      case "DESC":
        chartData.sort((a, b) => {
          if (a[1] > b[1]) return -1;
          if (a[1] < b[1]) return 1;
          return 0;
        });
        break;
      default:
        break;
    }
  }

  barChartTitle = languageNameSpace.labels[REF.fuel];
  barChartSubtitle = languageNameSpace.labels[REF.chartBal] + " - " + REF.year;



 

  if (REF.details == 1) {
    if ($("#barChartPercentages:hidden")) {
      $("#barChartPercentages").css("display", "initial");
    }

    console.log("indetails");
    chart = new Highcharts.chart("chart", {
      chart: {
        type: "column",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        height: chartheight,
        // height: heightbar,
        style: {
          animation: true,
          duration: 1000,
        },
        events: {
          load: function () {
            var legend = this.legend,
              legendGroup = legend.group;

            customCredits = this.credits.getBBox();
            this.renderer
              .image(
                "img/logo.png",
                customCredits.x - 40,
                customCredits.y - 20,
                100,
                40
              )
              .addClass("chartLogo")
              .attr({ zIndex: 9999 })
              .add();
            $(".chartLogo").click(function () {
              window.open(
                "https://ec.europa.eu/eurostat/databrowser/product/view/NRG_BAL_C",
                "_blank"
              );
            });

            if (negativeVal == "true") {
              this.renderer
                .text(
                  '<span class="negLegend">' +
                    languageNameSpace.labels["negativeValues"] +
                    "</span>",
                  legendGroup.translateX + legend.padding,
                  legendGroup.translateY + legend.legendHeight + legend.padding,
                  true
                )
                .add();
            }
          },
        },
      },
      title: {
        text: barChartTitle,
      },
      navigation: {
        buttonOptions: {
          align: "right",
          x: 0,
          y: 20,
          verticalAlign: "top",
        },
      },
      subtitle: {
        text: barChartSubtitle,
      },
      xAxis: {
        categories: categoriesAndStacks.map((e) => e.x),
      },
      yAxis: {
        // labels: {
        //   format: "{value:.2f}",
        // },
        labels: {
          formatter: function () {
            var numericSymbols = Highcharts.getOptions().lang.numericSymbols;
            var i = numericSymbols && numericSymbols.length;
            var numericSymbolDetector = this.axis.isLog
              ? this.value
              : this.axis.tickInterval;
            var UNDEFINED, ret, multi;

            while (i-- && ret === UNDEFINED) {
              multi = Math.pow(1000, i + 1);
              if (
                numericSymbolDetector >= multi &&
                (this.value * 10) % multi === 0 &&
                numericSymbols[i] !== null
              ) {
                ret =
                  Highcharts.numberFormat(this.value / multi, -1) +
                  numericSymbols[i];
              }
            }

            if (ret === UNDEFINED) {
              if (Math.abs(this.value) >= 10000) {
                ret = Highcharts.numberFormat(this.value, -1);
              } else {
                ret = Highcharts.numberFormat(this.value, -1, UNDEFINED, "");
              }
            }

            return ret; // Adding the prefix
          },
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
      tooltip: {
        // useHTML: true,
        formatter: function () {
          var s = "<b>" + this.x + "</b>",
            sum = 0;
          if (REF.stacking == "percent") {
            $.each(this.points, function (i, point) {
              s +=
                '<br/><svg width="10" height="10" style="color:' +
                point.series.color +
                '">● </svg><span>' +
                point.series.name +
                ": <b>" +
                Highcharts.numberFormat(point.y, "2", ",") +
                " " +
                REF.unit +
                "</b> / " +
                Highcharts.numberFormat(point.percentage) +
                "%</span>";
              sum += point.y;
            });
          } else {
            $.each(this.points, function (i, point) {
              s +=
                '<br/><svg width="10" height="10" style="color:' +
                point.series.color +
                '">● </svg><span>' +
                point.series.name +
                ": <b>" +
                Highcharts.numberFormat(point.y, "2", ",") +
                " </b>" +
                REF.unit +
                "</span>";
              sum += point.y;
            });
            s +=
              '<br/><span style="text-align: center">Total: <b>' +
              parseFloat(sum.toFixed(2)) +
              " </b>" +
              REF.unit +
              "</span>";
          }
          return s;
        },
        valueDecimals: 4,
        shared: true,
      },
      credits: {
        text: "Source: Eurostat",
        style: {
          color: "transparent",
        },
      },
      plotOptions: {
        column: {
          stacking: REF.stacking,
        },
        series: {
          cursor: "pointer",
        },
      },
      series: orderedSeries,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 820,
              maxHeight: 300,
            },
            chartOptions: {
              scrollbar: {
                enabled: false,
              },
              legend: {
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
                  return languageNameSpace.labels['CTR']
              } else {
                  return item.name;
              }              
          }
      },
        xlsx: {
          worksheet: {
            autoFitColumns: true,
            sheetName: "CustomSheetName",
            categoryColumn: {
              title: "Date",
              numberFormat: "yyyy-mm",
            },
            headerStyle: {
              font: {
                color: "#FFFFFF",
                bold: true,
              },
              fill: {
                color: "#414b56",
              },
            },
          },
          workbook: {
            fileProperties: {
              creator: "File Author",
              company: "File Company",
              created: new Date(2017, 11, 31),
            },
          },
        },
        tableCaption:
          barChartTitle + "<br>" + barChartSubtitle + " <br> "+ languageNameSpace.labels[REF.unit] + " Source: Eurostat",
        chartOptions: {
          title: {
            text: barChartTitle,
          },
          subtitle: {
            text: barChartSubtitle,
          },
          chart: {
            width: 1900,
            height: 1000,
            events: {
              load: function () {
                this.renderer
                  .image(
                    "https://ec.europa.eu/eurostat/statistics-explained/images/0/09/Logo_RGB-POS.png",
                    1700,
                    -20,
                    200,
                    75
                  )
                  .add();
              },
            },
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
                this.renderTo.parentNode.insertBefore(
                  div,
                  this.renderTo.nextSibling
                );
                div.innerHTML = this.getTable();
                this.insertedTable = true;
                var date_str = new Date().getTime().toString();
                var rand_str = Math.floor(Math.random() * 1000000).toString();
                this.insertedTableID = "div_" + date_str + rand_str;
                div.id = this.insertedTableID;
                // $('.highcharts-data-table').wrap("<div class='overlay'>");
                $(".highcharts-data-table").append("<img class='tableLogo' src='../img/logo.png' alt='' /><a class='print' onclick='printTable()'><i class='fad fa-print'></i></a>");  
                $(".highcharts-table-caption").html(
                  barChartTitle +
                    "<br>" +
                    barChartSubtitle +
                    "<br>" +
                    languageNameSpace.labels[REF.unit] +
                    " <br> Source: Eurostat" 
                );
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
  } else {
    chart = new Highcharts.chart("chart", {
      chart: {
        type: "column",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        height: chartheight,
        // height: heightbar,
        style: {
          animation: true,
          duration: 1000,
        },
        events: {
          load: function () {
            customCredits = this.credits.getBBox();
            this.renderer
              .image(
                "img/logo.png",
                customCredits.x - 40,
                customCredits.y - 20,
                100,
                40
              )
              .addClass("chartLogo")
              .attr({ zIndex: 9999 })
              .add();
            $(".chartLogo").click(function () {
              window.open(
                "https://ec.europa.eu/eurostat/databrowser/product/view/NRG_BAL_C",
                "_blank"
              );
            });
          },
        },
      },
      title: {
        text: barChartTitle,
      },
      navigation: {
        buttonOptions: {
          align: "right",
          x: 0,
          y: 20,
          verticalAlign: "top",
        },
      },
      subtitle: {
        text: barChartSubtitle,
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        // labels: {
        //   format: "{value:.2f}",
        // },
        labels: {
          formatter: function () {
            var numericSymbols = Highcharts.getOptions().lang.numericSymbols;
            var i = numericSymbols && numericSymbols.length;
            var numericSymbolDetector = this.axis.isLog
              ? this.value
              : this.axis.tickInterval;
            var UNDEFINED, ret, multi;

            while (i-- && ret === UNDEFINED) {
              multi = Math.pow(1000, i + 1);
              if (
                numericSymbolDetector >= multi &&
                (this.value * 10) % multi === 0 &&
                numericSymbols[i] !== null
              ) {
                ret =
                  Highcharts.numberFormat(this.value / multi, -1) +
                  numericSymbols[i];
              }
            }

            if (ret === UNDEFINED) {
              if (Math.abs(this.value) >= 10000) {
                ret = Highcharts.numberFormat(this.value, -1);
              } else {
                ret = Highcharts.numberFormat(this.value, -1, UNDEFINED, "");
              }
            }

            return ret; // Adding the prefix
          },
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
      credits: {
        text: "Source: Eurostat",
        style: {
          color: "transparent",
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            Highcharts.numberFormat(this.y, "2", ",") +
            "</b>  " +
            REF.unit
          );
        },
      },
      plotOptions: {
        column: {
          stacking: "normal",
        },
      },
      colors:['#32afaf'],  
      series: [
        {
          name: languageNameSpace.labels[REF.unit],
          data: chartData,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 820,
              maxHeight: 300,
            },
            chartOptions: {
              scrollbar: {
                enabled: false,
              },
              legend: {
                enabled: false,
              },
            },
          },
        ],
      },
      exporting: {
        filename: languageNameSpace.labels['dataset'],  
        tableCaption: barChartTitle + "<br>" + barChartSubtitle + " <br> Source: Eurostat",
        chartOptions: {
          title: {
            text: barChartTitle,
          },
          subtitle: {
            text: barChartSubtitle,
          },
          chart: {
            width: 1900,
            height: 1000,
            events: {
              load: function () {
                this.renderer
                  .image(
                    "https://ec.europa.eu/eurostat/statistics-explained/images/0/09/Logo_RGB-POS.png",
                    1700,
                    -20,
                    200,
                    75
                  )
                  .add();
              },
            },
          },
        },
        csv: {
          columnHeaderFormatter: function(item, key) {      
              if (!item || item instanceof Highcharts.Axis) {
                  return languageNameSpace.labels['CTR']
              } else {
                  return item.name;
              }              
          }
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
                this.renderTo.parentNode.insertBefore(
                  div,
                  this.renderTo.nextSibling
                );
                div.innerHTML = this.getTable();
                this.insertedTable = true;
                var date_str = new Date().getTime().toString();
                var rand_str = Math.floor(Math.random() * 1000000).toString();
                this.insertedTableID = "div_" + date_str + rand_str;
                div.id = this.insertedTableID;
                // $('.highcharts-data-table').wrap("<div class='overlay'>");
                $(".highcharts-data-table").append("<img class='tableLogo' src='../img/logo.png' alt='' /><a class='print' onclick='printTable()'><i class='fad fa-print'></i></a>");  
                $(".highcharts-table-caption").html(
                  barChartTitle +
                    "<br>" +
                    barChartSubtitle +
                    " <br> Source: Eurostat"
                );
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
  }

  $("#energyModal").modal("show");
  hideSpinner();
  $("#energyModal").on("hidden.bs.modal", function () {
    $("#chart").empty();
    $("#selectOrder").css("display", "none");
    $("#barChartOptionagregates").css("display", "none");
    $("#barChartPercentages").css("display", "none");
  });
}


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


var legendBig = {
  align: 'right',
  verticalAlign: 'middle',
  layout: 'vertical'
};

var legendSmall = {     
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
}
var legendHide = {     
  enabled: false
}

function changeLegendPisition() {

    Highcharts.charts.forEach(chart => {
      if (chart) {      
            if ($(window).width() > 1100) {
              chart.update({ legend: legendBig }, true); // true for redraw
            } else {
              chart.update({ legend: legendSmall }, true); // true for redraw
            }
            chart.redraw()            
      }
  });
}


 orderByPiles = (countriesAndValues, x, y) => {
  const categories = Object.values(x).map(country => languageNameSpace.labels[country]);
  const fuelTypes = Object.values(y).map(fuel => languageNameSpace.labels[fuel]);

  const mySeries = fuelTypes.map((fuel, i) => ({
    name: fuel,
    data: countriesAndValues[i].data.map(element => element)
  }));

  const categoriesAndPiles = categories.map((name, index) => ({
    name,
    piles: mySeries.map(serie => ({
      name: serie.name,
      value: serie.data[index]
    }))
  }));

  categoriesAndPiles.sort((a, b) => {
    const sumA = a.piles.reduce((sum, pile) => sum + pile.value, 0);
    const sumB = b.piles.reduce((sum, pile) => sum + pile.value, 0);
    return sumB - sumA;
  });

  const myXAxis = categoriesAndPiles.map(category => category.name);

  mySeries.forEach(serie => {
    serie.data = categoriesAndPiles.map(category => category.piles.find(pile => pile.name == serie.name).value);
  });

  return {
    myXAxis,
    mySeries
  };
};


 makeOrderedSeries = (categoriesAndStacks) => {

  const ordSeries = [];
  for (let i = 0; i < categoriesAndStacks[0].y.length; i++) {
    const temp = categoriesAndStacks.map(category => category.y[i]);
    ordSeries.push({
      index: chartSeries[i].index,
      name: chartSeries[i].name,
      legendIndex: chartSeries[i].legendIndex,
      id: chartSeries[i].id,
      data: temp
    });
  }

  const [temp] = ordSeries.splice(1, 1);
  ordSeries.push(temp);

  return ordSeries;
};

function exportHandling(id) {
  const chartToPrint = `#${codesDataset[REF.chartId].container}`;

  const exportFunctions = {
    'printBtn': () => $(chartToPrint).highcharts().print(),
    'downloadBtn': () => $(chartToPrint).highcharts().exportChart(),
    'excelBtn': () => $(chartToPrint).highcharts().downloadXLS(),
  };

  const selectedFunction = exportFunctions[id];

  if (selectedFunction) {
    selectedFunction();
  } else {
    console.log('Invalid operation');
  }

// function exportJpegChart() { $(chartToPrint).highcharts().exportChart({type: 'image/jpeg'})};
// function exportPdfChart() { $(chartToPrint).highcharts().exportChart({type: 'application/pdf'})};
// function exportSvgChart() { $(chartToPrint).highcharts().exportChart({type: 'image/svg+xml'})};
// function exportCsvChart() { $(chartToPrint).highcharts().downloadCSV()};
}


function showHideTimeLine() {
  const timelineContainer = document.getElementById('timelineContainer');

  // Check if a timeline instance exists
  if (this.timeline) {
    // Remove the existing timeline
    this.timeline.removeFromDOM();
    this.timeline = null;
  }

  if (REF.chartType === 'barChart' || REF.chartType === 'pieChart') {
    // Create and add the Timeline instance to the DOM
    this.timeline = new Timeline(timelineContainer);

    // Display the timeline
    this.timeline.addToDOM();

    // Show specific chart options
    showChartOptions();
  } else {
    // Hide specific chart options
    hideChartOptions();
  }
}


function sortArrayAlphabetically() {
  if (REF.details == 1) {
    categoriesAndStacks.sort((a, b) => a.x.localeCompare(b.x));
  } else {
    chartSeries.sort((a, b) => a.name.localeCompare(b.name, undefined, { ignorePunctuation: true, sensitivity: 'base' }));
  }
}

function sortArrayByAscValues(arr) {
  if (REF.details == 1) {
    arr.sort((a, b) => {
      const sumA = a.y.reduce((acc, val) => acc + val, 0);
      const sumB = b.y.reduce((acc, val) => acc + val, 0);
      return sumA - sumB;
    });
  } else {
    arr.sort((a, b) => a.y - b.y);
  }
}

function sortArrayByDescValues(arr) {
  if (REF.details == 1) {
    arr.sort((a, b) => {
      const sumA = a.y.reduce((acc, val) => acc + val, 0);
      const sumB = b.y.reduce((acc, val) => acc + val, 0);
      return sumB - sumA;
    });
  } else {
    arr.sort((a, b) => b.y - a.y);
  }
}

function sortArrayByProtocolOrder(arr) {
  if (REF.details == 1) {
    const energyCountriesCodes = barcateg;
    arr.sort((a, b) => {
      if (a.code === "all") return -1; // Move "all" to the beginning
      if (b.code === "all") return 1; // Move "all" to the beginning
      return energyCountriesCodes.indexOf(a.code) - energyCountriesCodes.indexOf(b.code);
    });
    orderedSeries = makeOrderedSeries(categoriesAndStacks);
  }
}



function chartNormalTooltip(points) {
  const value = Highcharts.numberFormat(points[0].y, 4);
  const unit = `${languageNameSpace.labels["S_" + REF.currency]}/${languageNameSpace.labels["S_" + REF.unit]}`;
  const na = languageNameSpace.labels['FLAG_NA'];
  const title = REF.chartId==="mainChart" ?  points[0].key : points[0].x
  return this.y == 0 ? `<b>${title}<br>Total: <b>${na}</b>` : `<b>${title}<br>Total: <b>${value}</b> ${unit}`;
}

function tooltipTable(points) {
  if(REF.percentage == 1 ){
    let html = "";
    html += `<table id="tooltipTable" class="table">                
                <thead>
                  <tr>
                    <th scope="cols">${points[0].x}</th>                    
                    <th scope="cols"></th>                    
                  </tr>
                </thead>`
      points.forEach(element => {
          const value = element.point.percentage.toFixed(0); // Limit decimals to three places
          const category = element.point.series.name; 
          const color = element.point.color;              
          html += `<tr>
                      <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                      <td>${value} %</td>
                  </tr>` 
      });
    html += `</table>`;
    return `<div>${html}</div>`;
  } else {
  let html = "";
  let totalAdded = false; // Flag to track if total row has been added
  let totalColor = "#7cb5ec"
  
  // Sort the points so that "Total" item is at the last place
  const sortedPoints = points.slice().sort(function (a, b) {
    if (a.series.name == languageNameSpace.labels['TOTAL']) return 1;
    if (b.series.name == languageNameSpace.labels['TOTAL']) return -1;
    return 0;
  });
  html += `<table id="tooltipTable" class="table">                
                <thead>
                  <tr>
                    <th scope="cols">${sortedPoints[0].key}</th>                    
                    <th scope="cols"></th>                    
                  </tr>
                </thead>`;
  sortedPoints.forEach(function (point) {
    const color = point.series.color;
    const value = point.y.toFixed(dec); // Limit decimals to three places
    const category = point.series.name;    
    
    html += `<tr>
                <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                      <td>${value}</td>
                  </tr>` 
    
    
    


    // Check if point is "Total" and set the flag if found
    if (category == languageNameSpace.labels['TOTAL']) {
      totalAdded = true;
    }
  });

  // Add a row for the total if not already added
  if (!totalAdded) {
    // Calculate the total sum of all values
    const totalSum = sortedPoints.reduce(function (sum, point) {
      return sum + point.y;
    }, 0);

    // Format the total sum with three decimal places
    const totalValue = totalSum.toFixed(dec);

    // Add a row for the total
    html += `<tr>
                      <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${totalColor}" /></svg> ${languageNameSpace.labels['TOTAL']}</td>
                      <td>${totalValue}</td>
  </tr>`
    
    
    
   
  }

  html += `</table>`;

  return `<div>${html}</div>`;
  }
}

function getTitle() {
  const geoLabel = languageNameSpace.labels[REF.chartGeo];
  const time = REF.time;
  const dataset = languageNameSpace.labels[REF.dataset];
  const consoms = languageNameSpace.labels[REF.consoms];
  const barText = languageNameSpace.labels["BAR_CHART_TITLE_CONSOMS"];
  const currencyLabel = languageNameSpace.labels["S_" + REF.currency];
  const unitLabel = languageNameSpace.labels["S_" + REF.unit];
  let title = ""
  let subtitle = ""

  let chartTitle = "";
  switch (REF.chartId) {
    case "lineChart":
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${geoLabel} - ${consoms}</span>`;
      title = `${dataset}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${geoLabel} - ${consoms}</span>`;
      break;
    case "pieChart":
      chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${geoLabel} - ${time} - ${consoms}</span>`;
      title = `${dataset}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${geoLabel} - ${time} - ${consoms}</span>`;
      break;
    case "barChart":
      chartTitle = `${dataset}<br><span style="font-size:12px; padding-top:5px">${barText} - ${geoLabel} - ${time}</span>`;
      title = `${dataset}`;
      subtitle = `<span style="font-size:12px; padding-top:5px">${barText} - ${geoLabel} - ${time}</span>`;
      break;
    default:    
    chartTitle = `${dataset}<br><span style="font-size:10px; padding-top:5px">${time} - ${consoms}</span>`;
    title = `${dataset} (${currencyLabel}/${unitLabel}) ${time}`;
    subtitle = `${consoms} - ${time}`;   
  }

  $("#title").html(title);
  $("#subtitle").html(subtitle);

  return chartTitle;
}


function credits() {
  const chartCredits = `<span style="font-size: .75rem;">${languageNameSpace.labels["EXPORT_FOOTER_TITLE"]} - </span>
  <a style="color:blue; text-decoration: underline; font-size: .75rem;"
  href="https://ec.europa.eu/eurostat/databrowser/view/${REF.dataset}/default/table?lang=${REF.language}">${languageNameSpace.labels['DB']}</a>,
  <span style="font-size: .875rem;">                           
</span>`;

  return chartCredits
}

var cache = {};

function addToCache(query, d) {
  if (!cache[query]) {
    cache[query] = [];
  }
  
  cache[query].push(d);
}


function chartApiCall(query) {

  let url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/" + REF.dataset + "?";
  url += "format=JSON";
  url += "&lang=" + REF.language;



  switch (REF.chart) {
    case "lineChart":
      url += "&unit=" + REF.unit; 
      url += "&geo=" + REF.geo;  
      if(REF.indicator.length > 0) {
        for (let i = 0; i < REF.indicator.length; i++) url += indicator_type + REF.indicator[i];  
      }
      if(REF.indicator2.length > 0) {
        for (let i = 0; i < REF.indicator2.length; i++) url += indicator2_type + REF.indicator2[i];  
      }

      if(REF.chartId === "chart_17" || REF.chartId === "chart-18") {
        REF.chartId === "chart_17" ? url += "&operator=PRR_AUTO" : url += "&operator=PRR_MAIN"
        url += "&plants=ELC"
      }
      break;

      case "barChart":
        url += "&nrg_bal=" + REF.chartBal;
        url += "&unit=" + REF.unit;
        url += "&time=" + REF.year;
      
        if (REF.details == 1) {
          const siecsToInclude = REF.siecs.filter((siec) => siec !== "TOTAL");
          url += siecsToInclude.map((siec) => "&siec=" + siec).join("");
        } else {
          url += "&siec=" + REF.siec;
        }
      
        if (REF.agregates == 0) {
          const geosToInclude = defGeos.filter(
            (geo) => geo !== "EU27_2020" && geo !== "EA19"
          );
          url += geosToInclude.map((geo) => "&geo=" + geo).join("");
        } else {
          url += defGeos.map((geo) => "&geo=" + geo).join("");
        }
        break;


  case "pieChart":
    if(REF.indicator.length > 0) { for (let i = 0; i < REF.indicator.length; i++) url += indicator_type + REF.indicator[i]}
    if(REF.indicator2.length > 0) {for (let i = 0; i < REF.indicator2.length; i++) url += indicator2_type + REF.indicator2[i];}
    url += "&unit=" + REF.unit; 
    url += "&time=" + REF.year;
    url += "&geo=" + REF.geo;
  
    break



  
 
  }

  if (cache[url] && cache[url].length > 0) {  
    d = JSONstat(cache[url][cache[url].length - 1]).Dataset(0);
    return d;
  } else {
   

    const request = new XMLHttpRequest();
    request.open("GET", url, false); // Setting the third parameter to 'false' makes it synchronous
    request.send();
  
    if (request.status === 500 || request.status === 503) {
      // submitFormDown();
    }
  
    if (request.status !== 200) {
      // submitFormDown();
    }
  
    const data = JSON.parse(request.responseText);
    const d = JSONstat(data).Dataset(0);

    addToCache(url, d);
    
    return d;
  }


}


function chartNormalTooltip(points) {
  const value = Highcharts.numberFormat(points[0].y, 4);
  const unit = `${languageNameSpace.labels["S_" + REF.currency]}/${languageNameSpace.labels["S_" + REF.unit]}`;
  const na = languageNameSpace.labels['FLAG_NA'];
  const title = REF.chartId==="lineChart" ?  points[0].key : points[0].x
  return this.y == 0 ? `<b>${title}<br>Total: <b>${na}</b>` : `<b>${title}<br>Total: <b>${value}</b> ${unit}`;
}

function tooltipTable(points) {

  const decimals = REF.dataset == "demo_pjan" ? 0 : 3

  if(REF.percentage == 1 ){
    let html = "";
    html += `<table id="tooltipTable" class="table">                
                <thead>
                  <tr>
                    <th scope="cols">${points[0].x}</th>                    
                    <th scope="cols"></th>                    
                  </tr>
                </thead>`
      points.forEach(element => {
          const value = element.point.percentage.toFixed(0); // Limit decimals to three places
          const category = element.point.series.name; 
          const color = element.point.color;              
          html += `<tr>
                      <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
                      <td>${value} %</td>
                  </tr>` 
      });
    html += `</table>`;
    return `<div>${html}</div>`;
  } else {
    let html = "";
    let totalAdded = false; // Flag to track if the total row has been added
    let totalColor = "#7cb5ec";
    
    // Sort the points so that the "Total" item is at the last place
    const sortedPoints = points.sort(function (a, b) {
      if (a.series.name == languageNameSpace.labels['TOTAL']) return 1;
      if (b.series.name == languageNameSpace.labels['TOTAL']) return -1;
      return 0;
    });
    
    html += `<table id="tooltipTable" class="table">                
      <thead>
        <tr>
          <th scope="cols">${sortedPoints[0].key}</th>                    
          <th scope="cols"></th>                    
        </tr>
      </thead>`;
    
    sortedPoints.forEach(function (point) {
      const color = point.series.color;
      const value = point.y.toFixed(decimals); // Limit decimals to three places
      const category = point.series.name;
    
      html += `<tr>
        <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${color}" /></svg> ${category}</td>
        <td>${value}</td>
      </tr>`;
    
      // Check if point is "Total" and set the flag if found
      if (category == languageNameSpace.labels['TOTAL']) {
        totalAdded = true;
      }
    });
    
    // Check if all values are zero and display a message if they are
    const allValuesZero = sortedPoints.every(function (point) {
      return point.y === 0;
    });
    
    // if (allValuesZero) {
    //   html = "<p>All values are zero.</p>"; // Replace the table with the message
    // } else {
      // Add a row for the total if not already added
      if (!totalAdded) {
        // Calculate the total sum of all values
        const totalSum = sortedPoints.reduce(function (sum, point) {
          return sum + point.y;
        }, 0);
    
        // Format the total sum with three decimal places
        const totalValue = totalSum.toFixed(decimals);
    
        // Add a row for the total
        html += `<tr>
          <td><svg width="10" height="10" style="vertical-align: baseline;"><circle cx="5" cy="5" r="3" fill="${totalColor}" /></svg> ${languageNameSpace.labels['TOTAL']}</td>
          <td>${totalValue}</td>
        </tr>`;
      }
    // }
    
    html += `</table>`;
    
    return `<div>${html}</div>`;
    
  }
}