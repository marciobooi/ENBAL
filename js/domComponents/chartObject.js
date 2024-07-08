class Chart {
    constructor(options) {
      this.containerId = options.containerId;
      this.type = options.type;
      this.title = options.title;
      this.subtitle = options.subtitle;
      this.xAxis = options.xAxis;
      this.yAxisFormat = options.yAxisFormat;
      this.tooltipFormatter = options.tooltipFormatter;
      this.creditsText = options.creditsText;
      this.creditsHref = options.creditsHref;
      this.series = options.series;
      this.colors = options.colors;
      this.legend = options.legend;
      this.columnOptions = options.columnOptions;
      this.pieOptions = options.pieOptions;
      this.seriesOptions = options.seriesOptions;
      this.yAxisTitle = options.yAxisTitle;
    }
  
    createChart() {
      Highcharts.chart(this.containerId, {
        chart: {
          type: this.type,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          spacingBottom: 50,
          style: {
            fontFamily: 'arial,sans-serif',
            animation: true,
            duration: 1000,
          },
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        xAxis: this.xAxis,
        yAxis: {
          labels: {
            format: this.yAxisFormat,
            formatter: function () {
              return Math.round(this.value); // Remove decimals by rounding to the nearest integer
            }
          },
          title: {
            enabled: true,
            text: this.yAxisTitle,            
          },
        },
        colors: this.colors,
        tooltip: {
          formatter: this.tooltipFormatter,
          valueDecimals: REF.decimals,
          shared: true,
          useHTML: true,         
          padding: 0,
          backgroundColor: "rgba(255,255,255,0.9)",   
        },
        credits: {
          text: this.creditsText,
          href: this.creditsHref,
          position:{
            align:'center',
          },   
        },
        legend: {                
          itemHiddenStyle: {
            color: '#767676'
          },
          itemStyle: {
            fontSize: '1rem',
          }
        },
        legend: this.legend,
        plotOptions: {
          column: this.columnOptions,
          pie: this.pieOptions,
          // series: this.seriesOptions,
      },
        series: this.series,
        exporting: {         
            enabled: true,
            sourceWidth: 1200,
            sourceHeight: 600,
            chartOptions: {
              xAxis: [{
                labels: {
                  style: {
                    fontSize: '12px'
                  }
                }
              }]
            },                   
          buttons: {
              contextButton: {
                  enabled: false
              }
          }, 
            csv: {
                columnHeaderFormatter: function(item, key) {
                    if (!item || item instanceof Highcharts.Axis) {
                      const chartLabels = {
                        "pieChart": languageNameSpace.labels["IND"],
                        "barChart": languageNameSpace.labels["CTR"],
                        // Add more chart types and their corresponding labels here
                    };                    
                    // Default label for unknown chart types
                    const defaultLabel = languageNameSpace.labels["YEAR"];  
                    const label = chartLabels[REF.chart] || defaultLabel;
                    return label;                   
                    } else {
                        return item.name;
                    }
                }
            }
      }
      }); // end of chart object
      enableScreenREader()
    } // end of chart function
    
  }

  // function that return empty chart for when is no data to display
  function nullishChart() {
    const chartOptions = {
      containerId: "chart",
      type: null,
      title: null,
      subtitle: null,
      xAxis: null,
      yAxisFormat: null,
      tooltipFormatter: null,
      creditsText: "Source: Eurostat",
      creditsHref: "",
      series: [{ data: [] }],
      colors: null,
      legend: true,
      columnOptions: "",
      seriesOptions: ""
    };
  
    const chart = new Chart(chartOptions);
    chart.createChart();
  }
  

  