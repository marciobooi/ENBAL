var input = document.getElementById("search-input");
var listAmex = document.getElementById("resultsAmex");
var d = (a = null);

$(document).ready(function () {
  var h2 = document.querySelector("h2");
  h2.addEventListener("input", function () {
    this.setAttribute("data-heading", this.innerText);
  });
  handleSearcheBox();
  handleUserTyping();
  populateInfo();
});

function ipFetch(nrgAmex) {
  siecList = [
    "C0000X0350-0370",
    "C0110",
    "C0121",
    "C0129",
    "C0210",
    "C0220",
    "C0320",
    "C0311",
    "C0312",
    "C0340",
    "C0330",
    "C0350-0370",
    "C0360",
    "C0350",
    "C0371",
    "C0379",
    "P1000",
    "P1100",
    "P1200",
    "S2000",
    "O4000XBIO",
    "O4100_TOT",
    "O4200",
    "O4300",
    "O4400X4410",
    "O4500",
    "O4610",
    "O4620",
    "O4630",
    "O4652XR5210B",
    "O4651",
    "O4653",
    "O4661XR5230B",
    "O4669",
    "O4640",
    "O4671XR5220B",
    "O4680",
    "O4691",
    "O4692",
    "O4695",
    "O4694",
    "O4693",
    "O4699",
    "G3000",
    "RA000",
    "RA100",
    "RA500",
    "RA300",
    "RA420",
    "RA410",
    "RA200",
    "R5110-5150_W6000RI",
    "R5160",
    "R5300",
    "W6210",
    "R5210P",
    "R5210B",
    "R5220P",
    "R5220B",
    "R5230P",
    "R5230B",
    "R5290",
    "RA600",
    "W6100_6220",
    "W6100",
    "W6220",
    "N900H",
    "H8000",
    "E7000",
  ];

  if (siecList.includes(nrgAmex)) {
    amexSiec = nrgAmex;
  } else {
    amexSiec = "TOTAL";
  }

  // console.log(nrgAmex)

  switch (nrgAmex) {
    case "TOTAL":
    case "C0000X0350-0370":
    case "C0110":
    case "C0121":
    case "C0129":
    case "C0210":
    case "P1000":
    case "G3000":
    case "RA000":
    case "RA100":
    case "RA600":
    case "W6100_6220":
    case "W6100":
    case "W6220":
    case "N900H":
    case "RA500":
    case "R5300":
    case "W6210":
    case "RA300":
    case "RA420":
    case "RA410":
    case "RA200":
    case "R5110-5150_W6000RI":
    case "P1100":
    case "C0220":
    case "S2000":
    case "O4000XBIO":
    case "O4100_TOT":
      variable = "GAE";
      break;

    case "R5210P":
    case "O4652XR5210B":
    case "R5210B":
    case "O4661XR5230B":
    case "R5220P":
    case "R5220B":
    case "O4671XR5220B":
    case "R5230P":
    case "R5230B":
    case "R5290":
    case "H8000":
    case "E7000":
      variable = "AFC";
      break;

    case "O4200":
    case "O4300":
    case "O4400X4410":
    case "O4500":
      variable = "TI_E";
      break;

    default:
      variable = "TO"; // No need for a break; here
  }


  lineurl = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
  lineurl += "format=JSON";
  lineurl += "&nrg_bal=" + variable;
  lineurl += "&unit=" + "KTOE";
  lineurl += "&geo=" + "EU27_2020";
  lineurl += "&siec=" + amexSiec;

  colurl = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/"+REF.dataset+"?";
  colurl += "format=JSON";
  colurl += "&nrg_bal=" + variable;
  colurl += "&unit=" + "KTOE";
  colurl += "&siec=" + amexSiec;
  colurl += "&time=" + "2019";  
  for (var i = 0; i < defGeos.length; i++) {
    colurl += "&geo=" + defGeos[i];
  }

  urlsAmex = [lineurl, colurl];

  fetchesAmex = 1;

  return new Promise((resolve) => {
    for (i = 0; i < urlsAmex.length; i++) {
      const myIndex = i;
      JSONstat(urlsAmex[i], function () {
        switch (myIndex) {
          case 0:
            d = this.Dataset(0);
            break;
          case 1:
            a = this.Dataset(0);
            break;
        }
        if (fetchesAmex == urlsAmex.length) {
          resolve("done");
          hideSpinner();
        }
        fetchesAmex++;
      });
    }
  });
}

function dataReceived(objAmex) {
  chartMenuLanguages();
  lineChartTitle = languageNameSpace.labels["EU27_2020"] +" - " +languageNameSpace.labels[variable] +" - " +languageNameSpace.labels[objAmex.CODE];
  barChartTitle = languageNameSpace.labels[variable] +" - " +languageNameSpace.labels[objAmex.CODE] +" - 2019";

  Highcharts.chart("chart1Amex", {
    chart: {
      type: "spline",
      height: chartheight,
    },
    title: {
      text: lineChartTitle,
      style: {      
        fontWeight: 'bold',
        fontSize: 15,
      }
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: d.Dimension("time").id,
      visible: true,
      labels: {       
        rotation: 45,
        style: {
          fontSize: 10,
      }
    }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0"> </td>' +
        '<td style="padding:0"><b>{point.y:.1f} KTOE</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    yAxis: {
      title: {
        text: languageNameSpace.labels["KTOE"],
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: languageNameSpace.labels[REF.unit],
        data: d.value,
      },
    ],
    exporting: {
      filename: languageNameSpace.labels['dataset'],  
      tableCaption: lineChartTitle + " <br> " + languageNameSpace.labels['eurostat'],   
      chartOptions: {
        title: {
          text: lineChartTitle,
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
                return languageNameSpace.labels['YEAR']
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
          ],
        },
      },
   
    },
  });

  geos = a.Dimension("geo").id;

  chartData = geos
    .map((geo, gIdx) => {
      return [languageNameSpace.labels[geo], a.value[gIdx]];
    })
    .sort((a, b) => b[1] - a[1]);

  Highcharts.chart("chart2Amex", {
    chart: {
      type: "column",
      height: chartheight,
    },
    title: {
      text: barChartTitle,
      style: {      
        fontWeight: 'bold',
        fontSize: 15,
      }
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",     
      labels: {
        step: 1,
        rotation: 45,
        style: {
          fontSize: 9,
      }
    }
    },
    yAxis: {
      title: {
        text: languageNameSpace.labels["KTOE"],
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0"> </td>' +
        '<td style="padding:0"><b>{point.y:.1f} KTOE</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: languageNameSpace.labels["KTOE"],
        data: chartData,
      },
    ],
    exporting: {
      filename: languageNameSpace.labels['dataset'],  
      tableCaption: barChartTitle + " <br> " + languageNameSpace.labels['eurostat'],   
      chartOptions: {
        title: {
          text: barChartTitle,
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
          ],
        },
      },
   
    },
  });

  indicatorOne = [];

  indicator = d.Dimension("time").id.map((a, b) => {
    obj = {
      key: a,
      value: d.value[b],
    };
    indicatorOne.push(obj);
  });

  var min = Infinity;
  var max = -Infinity;
  for (var { key, value } of indicatorOne) {
    if (value < min) {
      min = value;
      lowest = [key, min];
    }
    if (max < value) {
      max = value;
      highest = [key, max];
    }
  }

  $("#firstSection").append(
    '<div id="fuelTitle" class="">' +
      languageNameSpace.labels[objAmex.CODE] +
      "</div>" +
      '<div id="fuelCode">Fuel code: <span style="font-weight: bold;">' +
      objAmex.CODE +
      "</span></div>" +
      '<div id="fuelText">' +
      objAmex[REF.language] +
      "</div>"
  );

  $("#accord1").append(
    "<div>" +
    "<span>" + languageNameSpace.labels["MAXVAL"] + languageNameSpace.labels[objAmex.CODE] + languageNameSpace.labels["ENDFRASE"] + "<span style='font-weight: 600;'> " + highest[0] + "</span> - "+ languageNameSpace.labels["EU27_2020"]+"</span>" +
    "<br>" +
    "<span style='font-weight: 600; padding: 10px;'>" + Number(highest[1]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " KTOE</span>" +
    "</div>" +
    "<div style='margin-top: 12px;'>" +
    "<span>" + languageNameSpace.labels["MINVAL"] + languageNameSpace.labels[objAmex.CODE] + languageNameSpace.labels["ENDFRASE"] + "<span style='font-weight: 600;'> " + lowest[0] + "</span> - "+ languageNameSpace.labels["EU27_2020"]+"</span>" +
    "<br>" +
    "<span style='font-weight: 600; padding: 10px;'>" + Number(lowest[1]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " KTOE</span>" +
    "</div>"
  );

  $("#fuelText").each(function () {
    $(this).html(
      $(this)
        .html()
        .replace(/&nbsp;/gi, " ")
    );
  });

  $("#firstSection").removeClass("d-none");
  $("#secondSection").removeClass("d-none");
}

function populateInfo() {
  $(document).on("click", ".product", function (e) {
    document.getElementById("search-input").value = "";
    $(listAmex).hide();
    $("#firstSection").empty();
    $("#accord1").empty();
    $("#infoAmex").css("display", "flex");
    const objAmex = excelInfoData[0].find((o) => o.CODE === e.currentTarget.id);

    nrgAmex = e.currentTarget.id;

    ipFetch(nrgAmex).then(function () {
      dataReceived(objAmex);
    });
  });
}

function handleUserTyping() {
  $(input).keyup((e) => {
    const objAmex = excelInfoData[0].filter((object) => Object.values(object).some((i) => i.toString().toLowerCase().includes(e.currentTarget.value.toString().toLowerCase()))).reverse();

    hasText = document.getElementById("search-input").value.length;
    stop = 0;
    $(listAmex).empty();
    if (objAmex.length === 0) {
      $(listAmex).append(
        "<div " + "<p>Try to refine your shearch</p>" + "</div>"
      );
    } else {
      for (let i = 0; i < objAmex.length; i++) {
        lang = toString(REF.language)
        if (stop == 15) {
          stop = 0;
          break;
        } else {
          if (hasText > 0) {
            $(listAmex).show();
          } else {
            $(listAmex).hide();
          }
          if (objAmex[i].CODE == undefined || objAmex[i].CODE == "") {
          } else {

          // console.log(objAmex[i].+lang)
             $(listAmex).append(
              "<div id=" +
                objAmex[i].CODE +
                " class='product'>" +
                "<h6>" +
                languageNameSpace.labels[objAmex[i].CODE] +
                "</h6>" +
                "<h6>" +
                objAmex[i].CODE +
                "</h6>" +
                "<p>" + objAmex[i][REF.language] +"</p>" +
                "</div>"
            );
            stop++;
          }
        }
      }
    }
  });
}

function handleSearcheBox() {
  $(".form").css({
    height: "60vh",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    position: "relative",
  });
  $(".form .fa-search").css({
    top: "29vh",
  });
  $(".left-pan").css({
    top: "29vh",
  });

  $(".form").focusin(function () {
    $(".form").removeAttr("style");
    $(".form .fa-search").removeAttr("style");
    $(".left-pan").removeAttr("style");
    $("h1.amexTitle").css("display", "none");
  });
}

var myModalEl = document.getElementById("amexModal");
myModalEl.addEventListener("hidden.bs.modal", function () {
  $("#firstSection").addClass("d-none");
  $("#secondSection").addClass("d-none");
});

$("#amexModal").on("shown.bs.modal", function () {
  (function () {
    const container = document.getElementById("globe");
    const canvas = container.getElementsByTagName("canvas")[0];

    const globeRadius = 100;
    const globeWidth = 4098 / 2;
    const globeHeight = 1968 / 2;

    function convertFlatCoordsToSphereCoords(x, y) {
      let latitude = ((x - globeWidth) / globeWidth) * -180;
      let longitude = ((y - globeHeight) / globeHeight) * -90;
      latitude = (latitude * Math.PI) / 180;
      longitude = (longitude * Math.PI) / 180;
      const radius = Math.cos(longitude) * globeRadius;

      return {
        x: Math.cos(latitude) * radius,
        y: Math.sin(longitude) * globeRadius,
        z: Math.sin(latitude) * radius,
      };
    }

    function makeMagic(points) {
      const { width, height } = container.getBoundingClientRect();

      // 1. Setup scene
      const scene = new THREE.Scene();
      // 2. Setup camera
      const camera = new THREE.PerspectiveCamera(45, width / height);
      // 3. Setup renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(width, height);
      // 4. Add points to canvas
      // - Single geometry to contain all points.
      const mergedGeometry = new THREE.Geometry();
      // - Material that the dots will be made of.
      const pointGeometry = new THREE.SphereGeometry(0.5, 1, 1);
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffffe6",
      });

      for (let point of points) {
        const { x, y, z } = convertFlatCoordsToSphereCoords(
          point.x,
          point.y,
          width,
          height
        );

        if (x && y && z) {
          pointGeometry.translate(x, y, z);
          mergedGeometry.merge(pointGeometry);
          pointGeometry.translate(-x, -y, -z);
        }
      }

      const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial);
      scene.add(globeShape);

      container.classList.add("peekaboo");

      // Setup orbital controls
      camera.orbitControls = new THREE.OrbitControls(camera, canvas);
      camera.orbitControls.enableKeys = false;
      camera.orbitControls.enablePan = false;
      camera.orbitControls.enableZoom = false;
      camera.orbitControls.enableDamping = false;
      camera.orbitControls.enableRotate = true;
      camera.orbitControls.autoRotate = true;
      camera.position.z = -265;

      function animate() {
        // orbitControls.autoRotate is enabled so orbitControls.update
        // must be called inside animation loop.
        camera.orbitControls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    }

    function hasWebGL() {
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl && gl instanceof WebGLRenderingContext) {
        return true;
      } else {
        return false;
      }
    }

    function init() {
      if (hasWebGL()) {
        window;
        window
          .fetch("../data/points.json")
          .then((response) => response.json())
          .then((data) => {
            makeMagic(data.points);
          });
      }
    }
    init();
  })();
});
