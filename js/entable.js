var countries = [];

function drawEntable() {
  languageNameSpace.initLanguage(REF.language);

  countries.length = 0;
  for (let i = 0; i < defGeos.length; i++) {
    countries.push([defGeos[i], languageNameSpace.labels[defGeos[i]]]);
  }

  getYear();

  tableData();
 

 
}


function infoModal(info) {

  let obj = excelInfoData[0].find((o) => o.CODE === info);

  let infoMeta = "https://ec.europa.eu/eurostat/cache/metadata/en/nrg_bal_esms.htm";
  let dataBrowser = "https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table?lang="+REF.language.toLowerCase();

  $("#info").append(
    '<div id="infoCard" class="card">' 
    + '<img src="./img/fuels/' + obj.PICTURE +'.jpg" class="card-img-top" alt="' +obj.PICTURE +'.jpg">' 
    + '<div class="card-body">' 
    + '<h5 class="card-title"><b>' + languageNameSpace.labels[info] + "</b></h5>" 
    + '<p class="card-text text-left text-wrap">' + obj[REF.language] + "</p>" 
    + '<div class="d-flex justify-content-end pt-2">' 
    + '<a href="' + infoMeta + '" target="_blank" class="modalBtn btn Metadata" data-tippy-content="'+ languageNameSpace.labels["POPMETA"] +'">'+ languageNameSpace.labels["META"] +'</a>' 
    + '<a href="' + dataBrowser +'" target="_blank" class="modalBtn btn ms-2 Dataset" data-tippy-content="'+ languageNameSpace.labels["POPDB"] +'">'+ languageNameSpace.labels["DATASET"] +'</a>' 
    + '</div>'
    + '</div>'
    + '</div>'
  );

  $("#definitionsModal").modal("show");
  $("#definitionsModal").on("hidden.bs.modal", function () {
    $("#info").empty();
  });
}

function getYear(params) { 

  let url = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_c?";
  url += "format=JSON";
  url += "&nrg_bal=" + "NRGSUP";
  url += "&siec=" + "TOTAL";
  url += "&unit=" + REF.unit;
  url += "&geo=" + "EU27_2020";

  a = JSONstat(url).Dataset(0);


    years = a.Dimension("time").id;
    geo = a.Dimension("geo").id;
    fuelList = REF.fuelList;   


    REF.year ||= years[years.length - 1];
  
  
  // condition to check if the last year in DB has data and define the REFERENCE YEAR only runs on the first try
  for (let i = 0; i < years.length; i++) {
    if (REF.year === years[years.length - 1]) {
      if (a.value[i]) {
        REF.year = years[years.length - 1]
      } else {
        REF.year = years[years.length - 2];
      }
    } else {
      REF.year = REF.year
    }
  }
  // }

  return years
}



function formDown() {
  // uncomment for test email  
  //  let content =  '<form class="d-none" name="formDown" id="formDown" autocomplete="off" action="https://formsubmit.co/8375494eb3d6bd8acad30d6f99835d6c" method="POST">'

  // uncomment production email
  let content =  '<form class="d-none" name="formDown" id="formDown" autocomplete="off" action="https://formsubmit.co/e466de393c51be5bb8265025772c5712" method="POST">'
  + '<div class="card-body">'
  + '<div class="input-group mb-4 input-group-static">'
  + '<label class="text-white">Your message</label>'
  + '<textarea id="message" name="message" class="form-control text-white" rows="4" required="">The ENBAL tool is down since:     '+ new Date() +'</textarea>'
  + '</div>'
  + '<input type="hidden" name="_subject" value="ENBAL is down">'
  + '<input type="hidden" name="_captcha" value="false">     '
  + '<input type="hidden" name="_template" value="table">'
  + '<!-- local 404 test -->'
  + '<!-- <input type="hidden" name="_next" value="http://127.0.0.1:5500/404.html"> -->'
  + '<!-- live eurostat test -->'
  + '<!-- <input type="hidden" name="_next" value="https://ec.europa.eu/eurostat/cache/infographs/test_energy_enviz/ENBAL/404.html"> -->'
  + '<!-- production -->'
  + '<input type="hidden" name="_next" value="https://ec.europa.eu/eurostat/cache/infographs/energy_balances/404.html">'
  + '<div class="row">'
  + '<div class="col-md-12">'
  + '<button id="contactSend" type="btnSubmit" name="btnSubmit" class="btn bg-gradient-primary w-100">Send Message</button>'
  + '</div>'
  + '</div>'
  + '</div>'
  + '</form>'
  $("#hiddenFormDiv").append(content);
  
}