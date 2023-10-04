

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
    bardata = [];
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
        bardata.push(barobj);

      } 
 
    }

    categoriesAndStacks = barcateg.map((el, i) => {
      if (i >= bardata[0].data.length) {
        return false;
      } else {
        let myObject = {};
        myObject.x = el;
        myObject.code = geo[i];
        myObject.y = [];

        bardata.forEach((bdEl) => {
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
