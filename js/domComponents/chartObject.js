// Wrap Highcharts showCredits method to make credits clickable and keyboard-accessible
Highcharts.wrap(Highcharts.Chart.prototype, 'showCredits', function (proceed, credits) {
  console.log('showCredits called with credits:', credits);

  if (credits.enabled && !this.credits) {
    console.log('Creating credits element...');
    this.credits = this.renderer
      .text(credits.text, 0, 0)
      .on('click', function () {
        console.log('Credits clicked!');
        if (credits.href) {
          window.open(credits.href, '_blank', 'noopener,noreferrer');
        }
      })
      .on('mouseover', function () {
        this.element.style.cursor = 'pointer';
      })
      .on('mouseout', function () {
        this.element.style.cursor = 'default';
      })
      .attr({
        align: credits.position && credits.position.align ? credits.position.align : 'right',
        zIndex: 8
      })
      .css(credits.style || {})
      .add()
      .align(credits.position || { align: 'right', x: -10, y: -5 });

    console.log('Credits element created:', this.credits);

    // Make the SVG credits focusable and operable via keyboard
    if (this.credits.element) {
      console.log('Making credits element focusable...');
      const el = this.credits.element;
      el.setAttribute('tabindex', '0');
      el.setAttribute('focusable', 'true'); // important for some SVG engines
      el.setAttribute('role', 'link');
      el.setAttribute('aria-label', `Eurostat dataset link: ${credits.href || ''}`);

      // Keyboard activation (Enter/Space)
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log('Credits activated via keyboard!');
          if (credits.href) {
            window.open(credits.href, '_blank', 'noopener,noreferrer');
          }
        }
      });

      // Optional visual focus feedback inside SVG (since CSS outline is unreliable in SVG)
      el.addEventListener('focus', function () {
        console.log('Highcharts credits focused!');
        this.style.fill = '#005ea2';
        this.style.stroke = '#005ea2';
        this.style.strokeWidth = '1px';
      });
      el.addEventListener('blur', function () {
        console.log('Highcharts credits blurred!');
        this.style.fill = '';
        this.style.stroke = '';
        this.style.strokeWidth = '';
      });

      console.log('Credits element made focusable:', el);
    } else {
      console.log('Credits element not found!');
    }
  } else {
    console.log('Credits already exist or not enabled');
  }
});

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
    // Calculate dynamic chart height based on viewport for zoom accessibility
    const viewportWidth = window.innerWidth;
    let chartHeight = 600; // Default height
    let legendLayout = 'vertical'; // Default legend layout
    let legendAlign = 'right'; // Default legend alignment
    let legendVerticalAlign = 'middle'; // Default vertical alignment
    let legendItemWidth = null; // Default item width (auto)
    let legendMaxHeight = null; // Default max height (no limit)
    let legendNavigation = {}; // Default navigation options

    // Detect zoom levels by viewport width
    if (viewportWidth >= 640 && viewportWidth <= 1024) {
      // 200% zoom range
      chartHeight = 750;
      legendLayout = 'horizontal';
      legendAlign = 'center';
      legendVerticalAlign = 'bottom';
      legendItemWidth = null;
      legendMaxHeight = 150; // Add max height with scroll if needed
      legendNavigation = {
        enabled: true,
        animation: true
      };
    } else if (viewportWidth >= 320 && viewportWidth < 640) {
      // 400% zoom range
      chartHeight = 750;
      legendLayout = 'horizontal';
      legendAlign = 'center';
      legendVerticalAlign = 'bottom';
      legendItemWidth = null;
      legendMaxHeight = 120; // Add max height with scroll if needed
      legendNavigation = {
        enabled: true,
        animation: true
      };
    }

    Highcharts.chart(this.containerId, {
      chart: {
        type: this.type,
        height: chartHeight,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        spacingBottom: 70,
        style: {
          fontFamily: 'arial, sans-serif',
          animation: true,
          duration: 1000
        }
      },
      title: {
        text: this.title,
        align: 'center',
        verticalAlign: 'top'
      },
      subtitle: {
        text: this.subtitle,
        align: 'center',
        verticalAlign: 'top'
      },
      xAxis: this.xAxis,
      yAxis: {
        labels: {
          format: this.yAxisFormat,
          formatter: function () {
            return Highcharts.numberFormat(this.value, 0, '.', ' ');
          }
        },
        title: {
          enabled: true,
          text: this.yAxisTitle
        }
      },
      colors: this.colors,
      tooltip: {
        formatter: this.tooltipFormatter,
        valueDecimals: REF.decimals,
        shared: true,
        useHTML: true,
        padding: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        shadow: false,
        style: { padding: 0 }
      },
      credits: {
        enabled: false,
        text: this.creditsText,
        href: `https://ec.europa.eu/eurostat/databrowser/view/${REF.dataset}/default/table?lang=${REF.language}`,
        position: { align: 'center' },
        style: { cursor: 'pointer' }
      },
      accessibility: {
        enabled: true,
        keyboardNavigation: {
          enabled: true
        },
        announceNewData: {
          enabled: true
        },
        landmarkVerbosity: 'one'
      },
      legend: {
        itemHiddenStyle: { color: '#767676' },
        itemStyle: {
          fontSize: '1rem',
          textOverflow: null // Prevent text truncation
        },
        layout: legendLayout,
        align: legendAlign,
        verticalAlign: legendVerticalAlign,
        itemWidth: legendItemWidth,
        maxHeight: legendMaxHeight,
        navigation: legendNavigation,
        ...(this.legend || {})
      },
      plotOptions: {
        column: this.columnOptions,
        pie: this.pieOptions
        // series: this.seriesOptions,
      },
      series: this.series,
      exporting: {
        enabled: true,
        allowHTML: true,
        sourceWidth: 1200,
        sourceHeight: 800,
        scale: 1,
        chartOptions: {
          subtitle: null,
          // Prefer disabling credits in export explicitly:
          credits: { enabled: false },
          chart: {
            marginTop: 100,
            marginLeft: 100,
            marginRight: 100,
            events: {
              load: function () {
                this.renderer
                  .image(
                    'https://ec.europa.eu/eurostat/statistics-explained/images/0/09/Logo_RGB-POS.png',
                    1100,
                    750,
                    90,
                    50
                  )
                  .add();
              },
              redraw: function () {
                const chart = this;
                const images = chart.container.getElementsByTagName('image');
                if (images.length > 0) {
                  images[0].setAttribute('x', chart.chartWidth - 100);
                  images[0].setAttribute('y', chart.chartHeight - 40);
                }
              }
            }
          }
        },
        buttons: {
          contextButton: {
            enabled: false
          }
        }
      },
      csv: {
        columnHeaderFormatter: function (item, key) {
          if (!item || !(item instanceof Highcharts.Axis)) {
            const chartLabels = {
              pieChart: translationsCache['IND'],
              barChart: translationsCache['CTR']
              // Add more chart types and their corresponding labels here
            };
            // Default label for unknown chart types
            const defaultLabel = translationsCache['YEAR'];
            const label = chartLabels[REF.chart] || defaultLabel;
            return label;
          } else {
            return item.name;
          }
        }
      }
    }); // end Highcharts.chart

    // Your existing helpers (left as-is)
    enableScreenREader();
    setTimeout(() => {
      updateAccessibilityLabels();
    }, 500);

    // ---------------------------------------
    // Accessible credits overlay (HTML <a>)
    // ---------------------------------------
    // Add accessible credits overlay after chart renders.
    // IMPORTANT: append to the OUTER container (#chart), NOT .highcharts-container,
    // so it remains in the accessibility tree and tabbable.
// Append an accessible, styled credits overlay that mimics the old look
// So it remains in the accessibility tree and tabbable.
setTimeout(() => {
  const chartContainer = document.querySelector('#chart');
  if (!chartContainer) return;

  // Remove any existing accessible credits
  const existing = chartContainer.querySelector('.accessible-credits-overlay');
  if (existing) existing.remove();

  // Build URL
  const url = `https://ec.europa.eu/eurostat/databrowser/view/${REF.dataset}/default/table?lang=${REF.language}`;

  // Wrapper that mimics Highcharts credits placement and typography
  const wrapper = document.createElement('div');
  wrapper.className = 'accessible-credits-overlay';
  wrapper.id = 'credits';

  // Position relative to the outer chart container
  chartContainer.style.position = 'relative';
  Object.assign(wrapper.style, {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '10',
    fontFamily: 'arial, sans-serif',
    fontSize: '0.9rem',  // match old SVG
    lineHeight: '1',
    color: '#666666',
    whiteSpace: 'nowrap',
    background: 'transparent',
    pointerEvents: 'auto'
  });

  // Static prefix: "Source: Eurostat - " (neutral grey)
  const prefix = document.createElement('span');
  prefix.textContent = 'Source: Eurostat - ';
  // Use default wrapper color (#666) or set explicitly:
  // prefix.style.color = '#666666';

  // LINK: "Dataset" — blue + underline (clickable)
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Eurostat dataset link: ${url}`);
  link.textContent = 'Dataset';
  Object.assign(link.style, {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    outline: 'none'
  });

  // Visible focus style
  link.addEventListener('focus', () => {
    link.style.outline = '2px solid #005ea2';
    link.style.outlineOffset = '2px';
  });
  link.addEventListener('blur', () => {
    link.style.outline = 'none';
  });

  // Optional hover cue
  link.addEventListener('mouseover', () => {
    link.style.color = '#005ea2';
  });
  link.addEventListener('mouseout', () => {
    link.style.color = 'blue';
  });

  // Compose and insert
  wrapper.appendChild(prefix);
  wrapper.appendChild(link);
  chartContainer.appendChild(wrapper);

  console.log('Accessible credits overlay added: "Source: Eurostat - Dataset" (Dataset is the link).');
}, 1000);
  } // end of createChart()
}

// function that returns empty chart for when there is no data to display
function nullishChart() {
  const chartOptions = {
    containerId: 'chart',
    type: null,
    title: null,
    subtitle: null,
    xAxis: null,
    yAxisFormat: null,
    tooltipFormatter: null,
    creditsText: 'Source: Eurostat',
    creditsHref: '',
    series: [{ data: [] }],
    colors: null,
    legend: true,
    columnOptions: '',
    seriesOptions: ''
  };
  const chart = new Chart(chartOptions);
  chart.createChart();
}