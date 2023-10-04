function changeImage(counter) {
  var images = [
    '<i class="fad fa-analytics"></i>',
    '<i class="fad fa-chart-pie"></i>',
    '<i class="fad fa-globe-europe"></i>',
    '<i class="fad fa-chart-line"></i>',
    '<i class="fad fa-chart-bar"></i>',
    '<i class="fad fa-chart-area"></i>',
    '<i class="fad fa-chart-scatter"></i>',
    '<i class="far fa-analytics"></i>',
    '<i class="fad fa-chart-area"></i>',
    '<i class="fad fa-chart-line"></i>',
    '<i class="fad fa-chart-bar"></i>',
  ];

  var images2 = [
    '<i class="fad fa-chart-bar"></i>',
    '<i class="fad fa-analytics"></i>',
    '<i class="far fa-analytics"></i>',
    '<i class="fad fa-chart-area"></i>',
    '<i class="fad fa-chart-pie"></i>',
    '<i class="fad fa-chart-scatter"></i>',
    '<i class="fad fa-chart-line"></i>',
    '<i class="fad fa-chart-line"></i>',
    '<i class="fad fa-globe-europe"></i>',
    '<i class="fad fa-chart-bar"></i>',
    '<i class="fad fa-chart-area"></i>',
  ];

  var images3 = [
    '<i class="fad fa-chart-line"></i>',
    '<i class="fad fa-chart-area"></i>',
    '<i class="fad fa-chart-bar"></i>',
    '<i class="fad fa-chart-scatter"></i>',
    '<i class="fad fa-globe-europe"></i>',
    '<i class="fad fa-analytics"></i>',
    '<i class="fad fa-chart-pie"></i>',
    '<i class="fad fa-chart-bar"></i>',
    '<i class="far fa-analytics"></i>',
    '<i class="fad fa-chart-scatter"></i>',
    '<i class="fad fa-analytics"></i>',
  ];

  $(".loader .image").html("" + images[counter] + "");
  $(".loader .image2").html("" + images2[counter] + "");
  $(".loader .image3").html("" + images3[counter] + "");
}

function loading() {




  var fullWidth = window.innerWidth;
  var fullHeight = window.innerHeight;
  
  var text =  "brown coal briquettes and peat briquettes plants industry sector energy use Gross electricity production Energy efficiency Energy Renewable GEO KTOE Energy consumption households adequately warm electricity consumption Biogases Solid fossil fuels Final consumption Coal W6220 Non-renewable municipal waste Other hydrocarbons Naphtha Aviation gasoline Gasoline-type Lubricants Solar photovoltaic R5230P Pure bio jet kerosene Blended"
  

   var lines = text.split(/[,\. ]+/g);
  var data = Highcharts.reduce(lines, function (arr, word) {
      var obj = Highcharts.find(arr, function (obj) {
          return obj.name === word;
      });
      if (obj) {
          obj.weight += 1;
      } else {
          arr.push({
              name: word,
              weight: 1
          });
      }
      return arr;
  }, []);
  
  var makeScale = function (domain, range) {
    var minDomain = domain[0];
    var maxDomain = domain[1];
    var rangeStart = range[0];
    var rangeEnd = range[1];

    return (value) => {
        return rangeStart + (rangeEnd - rangeStart) * ((value - minDomain) / (maxDomain - minDomain));
    }
};

var minWeight = data.reduce((min, word) =>
    (word.weight < min ? word.weight : min),
    data[0].weight
);
var maxWeight = data.reduce((max, word) =>
    (word.weight > max ? word.weight : max),
    data[0].weight
);
var scale = makeScale([minWeight, maxWeight], [0.1, 0.5]);

var scaledData = data.map(word =>
  ({ name: word.name, weight: (word.weight - 0.7), color: `rgba(255, 255, 255, 0.12),${scale((word.weight - 0.5))})` })
);

Highcharts.chart('words', {
  chart: {
    type: 'line',
    width: fullWidth,
    height:fullHeight,
    backgroundColor: 'linear-gradient(to right, rgb(23, 82, 82) 0%, rgb(51, 175, 175) 100%)',
    backgroundColor: {
      linearGradient: [0, 500, 500, 0],
      stops: [
          [0, 'rgb(23, 82, 82)'],
          [1, 'rgb(51, 175, 175)']
      ]
  },
},
title: {
  text: null
},
tooltip: {
  enabled: false
},
exporting: {
  enabled: false
},
  series: [{
      type: 'wordcloud',
      data: scaledData,
      rotation: {
          from: 0,
          to: 0,
      },
      minFontSize: 2,
      maxFontSize: 11,
      style: {
          fontFamily: '"Montserrat", sans-serif',
          color: 'rgba(255, 255, 255, 0.20)'
      },
      
  }],
 
});

  var num = 0;

  for (i = 0; i <= 100; i++) {
    setTimeout(function () {
      $(".loader span").html(num + "%");

      if (num == 100) {
          loading();
        $(".master").fadeOut(1500, function () {
          $(".master").css("display", "none");
          $("body").css("overflow", "auto");
          $('#words').highcharts().destroy();
        });
      }
      num++;
    }, i * 70);
  }
}
