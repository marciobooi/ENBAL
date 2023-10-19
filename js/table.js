var key;
var newRowData = [];
var newdata;
var fetches = 0;
var urls = 0
var firstTime = 0
var excelInfoData = []

function drawTable() {
  newApiCall()
}

// function drawTable() {
//   dataNameSpace.setRefURL()
//   newapicall()
//   if (fetches ==  urls) {
//     hideSpinner();
//     firstTime++
//     arangedData = [];
//     balances.forEach((element) => {
//       newBalOrder = languageNameSpace.labels[element];
//       data.forEach((elementData) => {
//         if (elementData[0].indexOf(newBalOrder) !== -1) {
//           arangedData.push(elementData);
//         }
//       });
//     });

//     table = $("#ENTable").DataTable({
//         dom: "Bfrtip",
//         createdRow: function (row, data, dataIndex) {
//           $(row).attr("id", balances[dataIndex]);
//         },
//         // fixedHeader: true,
//         // scrollY:"350px",
//         scrollX:"true",
//         columns: column,
//         columnDefs: [
//           {
//             targets: 0,
//             orderable: false,
//           },
//           {
//             targets: [Object.keys(column).length],
//             orderable: false,
//             data: null,
//             width: "80px",
//             defaultContent:
//               '<div class="icoContainer"><div class="chartIcon barChart"><i class="fas fa-chart-bar"></i></div><div class="chartIcon pieChart"><i class="fas fa-chart-pie"></i></div><div class="chartIcon lineChart"><i class="fas fa-chart-line"></i></div><div class="chartIcon info"><i class="fas fa-info"></i></div></div>',
//           },
//         ],
//         ordering: false,
//         data: arangedData,
//         searching: false,
//         paging: false,
//         info: false,
//         responsive: true,
//         language: {
//           decimal: ",",
//           thousands: " ",
//         },
//         colReorder: true,
//         colReorder: {
//           // order: order,
//         },

      

//         buttons: [
//           {
//             className: 'exportpdf d-none',
//             text: '<i class="fas fa-file-pdf"></i>',
//             // titleAttr: "PDF",       
//             dontBreakRows: true,   
//           },
//           {
//             className: 'exportxcel d-none',
//             extend: "excelHtml5",
//             text: '<i class="fas fa-file-excel"></i>',
//             // titleAttr: "Excel",
//             title: languageNameSpace.labels["pub2"],
//             messageTop: languageNameSpace.labels[REF.geo] + " - " +languageNameSpace.labels[REF.fuel],
//             messageBottom: "\r\n" + languageNameSpace.labels["eurostat"],
//             customize:function (xlsx) { 
//               var sheet = xlsx.xl.worksheets['sheet1.xml'];
//               $('c[r=A3] t', sheet).text( languageNameSpace.labels["tableYear"] + ": " + REF.year + " / " + languageNameSpace.labels["tableUnit"] + ": " + REF.unit );
              
//               var COLUMNS = ['B','C','D','E','F', 'G','H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];            
//               for ( i=0; i < COLUMNS.length; i++ ) {
//                   $('row c[r^='+COLUMNS[i]+']', sheet).attr( 's', '52' );
//                   $('row c[r^='+COLUMNS[i]+"3"+']', sheet).attr( 's', '2' );
//               }
//           }
         
//           },
//           {
//             className: 'exportcsv d-none',
//             extend: "csvHtml5",
//             bom: true,
//             text: '<i class="fas fa-file-csv"></i>',
//             // titleAttr: "CSV",
//             customize: function (csv) {
//               var csvRows = csv.split('\n');
//               csvRows[0] = csvRows[0].replace('"Year: 2019Unit: KTOE"', languageNameSpace.labels["tableYear"] + ": " + REF.year + " / " + languageNameSpace.labels["tableUnit"] + ": " + REF.unit)
//               csv = csvRows.join('\n');  
//               return languageNameSpace.labels["pub2"] +"\n"+ languageNameSpace.labels[REF.geo] +" - "+ languageNameSpace.labels[REF.fuel] +"\n"+  csv +"\n\n" + languageNameSpace.labels["eurostat"]
//            }
//           },
//         ],

//         initComplete: function( ) {
//           $(".tutorial").attr("data-tippy-content", "");  
//           $(".expand").attr("data-tippy-content", languageNameSpace.labels["POPEXP"]);
//           $("#ENTable_wrapper > div.dt-buttons > button:nth-child(1)").attr("data-tippy-content", languageNameSpace.labels["POPDOWNLOADTABLEPDF"]);


//           $(".buttons-excel").attr("data-tippy-content", languageNameSpace.labels["POPDOWNLOADTABLEEXCEL"]);
//           $(".buttons-csv").attr("data-tippy-content", languageNameSpace.labels["POPDOWNLOADTABLECSV"]);      
//           $(".barChart").attr("data-tippy-content", languageNameSpace.labels["POPBARCHART"]);
//           $(".pieChart").attr("data-tippy-content", languageNameSpace.labels["POPPIECHART"]);
//           $(".lineChart").attr("data-tippy-content", languageNameSpace.labels["POPLINECHART"]);
//           $(".info").attr("data-tippy-content", languageNameSpace.labels["POPINFO"]);
//           $(".tableInfoIcon > i.fas.fa-info-circle").attr("data-tippy-content", languageNameSpace.labels["POPINFOPRODUCTS"]);
//           // $(".dt-button[title='book']").attr("data-tippy-content", languageNameSpace.labels["BALGUIDE"]);
//           // $(".dt-button[title='search']").attr("data-tippy-content", languageNameSpace.labels["AMEX"]);   
          
//           $("#ENTable_wrapper > div.dt-buttons > button:nth-child(4)").attr("data-tippy-content", languageNameSpace.labels["AMEX"]);  
//           $("#ENTable_wrapper > div.dt-buttons > button:nth-child(5)").attr("data-tippy-content", languageNameSpace.labels["BALGUIDE"]);  


//           $("#barChartOptionagregates").attr("data-tippy-content", languageNameSpace.labels["AGREGATES"]);
//           $(".Twitter").attr("data-tippy-content", languageNameSpace.labels["POPTW"]);
//           $(".Facebook").attr("data-tippy-content", languageNameSpace.labels["POPFB"]);
//           $(".LinkedIn").attr("data-tippy-content", languageNameSpace.labels["POPLK"]);
//           $(".Email").attr("data-tippy-content", languageNameSpace.labels["POPMAIL"]);
//           $(".Links").attr("data-tippy-content", languageNameSpace.labels["LINKS"]);    
//           $(".details").attr("data-tippy-content", languageNameSpace.labels["POPDETAILS"]);
//           $(".share").attr("data-tippy-content", languageNameSpace.labels["POPSHARE"]);    
//           $(".tutorial").attr("data-tippy-content", languageNameSpace.labels["POPTUT"]);  
//           $(".percentages").attr("data-tippy-content", languageNameSpace.labels["POPPERCENTAGES"]);

//           $("#links").empty();

//           linksContent = 	"<div class='modalHeader'>"
//           + '<button type="button" class="btn-close2" data-bs-dismiss="modal" aria-label="Close">x</button>'
//           + "<h5>" + languageNameSpace.labels["LINKS"] + "</h5>"
//           + "</div>"
//           + "<div>"
//           + '<a href=\"https://ec.europa.eu/info/cookies_'+ REF.language.toLowerCase() +'\" target=\"_blank\" class="underline"><span>'+languageNameSpace.labels["COOKIES"]+'</span><svg viewBox="0 0 13 20"><polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" /></svg></a>'
//           + "</div>"
//           + "<div>"
//           + '<a href=\"https://ec.europa.eu/info/privacy-policy_'+ REF.language.toLowerCase() +'\" target=\"_blank\" class="underline"><span>'+languageNameSpace.labels["PRIVACY"]+'</span><svg viewBox="0 0 13 20"><polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" /></svg></a>'
//           + "</div>"
//           + "<div>"
//           + '<a href=\"https://ec.europa.eu/info/legal-notice_'+ REF.language.toLowerCase() +'\" target=\"_blank\" class="underline"><span>'+languageNameSpace.labels["LEGAL"]+'</span><svg viewBox="0 0 13 20"><polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" /></svg></a>'
//           + "</div>" 
//           + "<div>"
//           + "</div>"     
        
//           if($("#links").html() === "") {
//             $("#links").append(linksContent);
//           }
        
         

//         },

//       }).draw();


//     // $("#ENTable > thead").append('<tr class="unitRow" role="row"></tr>');

//     // for (let index = 0; index < Object.keys(column).length; index++) {
//     //   if (index == 0) {
//     //     $("tr.unitRow").append("<th></th>");
//     //   } else {
//     //     $("tr.unitRow").append('<th><div class="tableInfoIcon"><i class="fasfa-info"></i></div></th>');
//     //   }
//     // }

//     $("#ENTable tbody").on("click", "tr td:first-child", function () {
//       var tr = $(this).closest("tr");
//       var row = table.row(tr);
//       key = tr[0].id;
//       indexOrder = key
//       // console.log(key)
//       index = table.row(this).index();      
//       if (
//         key == "NRGSUP" ||
//         key == "TI_E" ||
//         key == "TO" ||
//         key == "NRG_E" ||
//         key == "FC_E"
//       ) {
//         if (row.child.isShown()) {
//           row.child.hide();
//           tr.find("div.expand > i").attr("class", "");
//           tr.find("div.expand > i").addClass("fas fa-plus");
//           const removeElements = (elms) => elms.forEach((el) => el.remove());
//           removeElements(document.querySelectorAll(".secondLayerTR"));
//         } else {
//           showSpinner();        
//           format(row.data()).then(function(result) {
//             row.child(result).show(); 
//             tr.find("div.expand > i").attr("class", "");
//             tr.find("div.expand > i").addClass("fas fa-minus");              
//             hideSpinner();
//             newRowData = [];
//           });
//           // table.colReorder.reset(); 
//           // table.draw(true); 
//           // table.colReorder.order(order); 
//         }
//       } else {
//         return;
//       }
//     });

//     $("#ENTable tbody").on("click", ".secondLayer", function (e) { 
//       var tr = $(this).closest("tr");
//       key = tr[0].id;
//       selector = "#" + e.currentTarget.id + " > td:nth-child(1) > span > div > i";
//       showSpinner();
//       format().then(function () {
//         if ($(selector).hasClass("fa-minus-circle")) {
//           $(selector).attr("class", "");
//           $(selector).addClass("fas fa-plus");
//           const removeElements = (elms) => elms.forEach((el) => el.remove());
//           removeElements(document.querySelectorAll(".secondLayerTR"));
//         } else {         
//           $(selector).attr("class", "");
//           $(selector).addClass("fal fa-minus-circle");
//           key = tr[0].id;
//           for (let i = 0; i < newdata.length; i++) {
//             $("#ENTable tbody > #" + key).after(
//               "<tr id='" +
//                 newdata[i][0].id +
//                 "' class='secondLayerTR'>" +
//                 newdata[i][0].innerHTML +
//                 "</tr>"
//             );
//           }
//         }
//         // table.colReorder.reset(); 
//         // table.draw(true); 
//         // table.colReorder.order(order); 
//         newRowData = [];
//         hideSpinner();      
//       });
//     });

  


//     if (isMobile) {         
//       $('.dataTables_scrollBody').css({
//         'height':'360px',
//         'max-height':'360px',
//       })       
//     } else {    
//       $('.dataTables_scrollBody').css({
//         'min-height':'600px',
//         'max-height':'800px',
//       })
//     }

//     const tableHeight = $('#ENTable').height();
//     const scrollBodyHeight = $('#ENTable').closest('.dataTables_scrollBody').height();
    
//     if (tableHeight > scrollBodyHeight) {
//         $('#ENTable').closest('.dataTables_scrollBody').css({
//             width: "calc(100% + 15px)",
//         })
//     } else {
//         $('#ENTable' ).closest('.dataTables_scrollBody').css({
//             width: "100%",
//         })
//     }





//     document.querySelector(".fa-file-pdf").addEventListener("click", download_DIVPdf);
    
    
//   }
// }

async function format() {
  await newRowApiCall();
  newdata = [];
  if(indexOrder == "NRG_E" || indexOrder == "TO" || indexOrder == "TI_E" || indexOrder == "NRGSUP") {
    newRowData = newRowData;
  } else {
    newRowData = newRowData.reverse();
  }

  for (let i = 0; i < newRowData.length; i++) {
    const element = newRowData[i];
    if (
      element[0] == "FC_IND_E" ||
      element[0] == "FC_TRA_E" ||
      element[0] == "TI_EHG_E" ||
      element[0] == "TI_RPI_E" ||
      element[0] == "TO_EHG" ||
      element[0] == "TO_RPI" ||
      element[0] == "FC_OTH_E"
    ) {
      data =
        '<tr id="' +
        element[0] +
        '" class="show secondLayer" style="background-color: aliceblue;">' +
        '<td ><span class="expandTd">' +
        element[1] +
        '<div class="expand"><i class="fas fa-plus"></i></div></span></td>';
      for (let i = 2; i < element.length; i++) {
        data += "<td>" + element[i] + "</td>";
      }
      data +=
        '<td><div class="icoContainer"><div class="chartIcon barChart"><i class="fas fa-chart-bar"></i></div><div class="chartIcon pieChart"><i class="fas fa-chart-pie"></i></div><div class="chartIcon lineChart"><i class="fas fa-chart-line"></i></div><div class="chartIcon info"><i class="fas fa-info"></i></div></div></td></tr>';
      newdata.push($(data));
    } else {
      data =
        '<tr id="' +
        element[0] +
        '" class="show" style="background-color: aliceblue;">' +
        '<td class="secondLayertd2">' +
        element[1] +
        "</td>";
      for (let i = 2; i < element.length; i++) {
        data += "<td>" + element[i] + "</td>";
      }
      data +=
        '<td><div class="icoContainer"><div class="chartIcon barChart"><i class="fas fa-chart-bar"></i></div><div class="chartIcon pieChart"><i class="fas fa-chart-pie"></i></div><div class="chartIcon lineChart"><i class="fas fa-chart-line"></i></div><div class="chartIcon info"><i class="fas fa-info"></i></div></div></td></tr>';
      newdata.push($(data));
    }
  }

  return newdata;

}

function tableData() {
  if (REF.full == 1) {
    var table = $("#ENTable").DataTable();
    table.destroy();
    $("#ENTable").empty();
  }
  if (REF.geo == undefined) {
    REF.geo = "EU27_2020";
  }
  if (REF.year == undefined) {
    REF.year = "2020";
  }
  if (REF.fuel == undefined) {
    REF.fuel = "fuelMainFuel";
  }

  if (REF.fuel == "fuelMainFuel") {
    REF.dataset = "nrg_bal_s";
  } else {
    REF.dataset = "nrg_bal_c";
  }


  siecs = siec(REF.fuel) 


  newApiCall();

  getTitle()
}


