// var key;
// var newRowData = [];
// var newdata;
// var fetches = 0;
// var urls = 0
// var firstTime = 0
var excelInfoData = []

// function drawTable() {
//   apiCall()
// }

function createDataTable(dataTable) {

  destroyTable()

  loadTranslations(REF.language)

  dataTableHandler(dataTable);
  const column = tableHeader(dataTable)

  table = $("#dataTableContainer").DataTable({
    "autoWidth": true,
    dom: "Bfrtip",
    responsive: true,
    createdRow: function (row, dataTable, dataIndex) {
      $('td:eq(0)', row).css('min-width', '12rem');
      $(row).attr("id", dataTable[0]);

     if (expandables.includes(dataTable[0])) {

        if (expandStatus.includes(dataTable[0])) {
          $(row).find("td:first-child").html(`<span data-i18n="${dataTable[0]}"></span><div><button class="tableRowIcon" data-i18n-title="POPCOLAPSE" data-i18n-label="POPEXP"><i class="fas toggle-icon fa-minus" aria-hidden="true"></i></button></div>`);
        } else {
          $(row).find("td:first-child").html(`<span data-i18n="${dataTable[0]}"></span><div><button class="tableRowIcon" data-i18n-title="POPEXP" data-i18n-label="POPEXP"><i class="fas toggle-icon fa-plus" aria-hidden="true"></i></button></div>`);
        }
      
        $(row).find("td:first-child").on('click', function() {
          const clickedRowIndex = $("#dataTableContainer").DataTable().row($(this).closest("tr")).index();
          addExtraBal(dataTable[0], clickedRowIndex);
        });
 

        $(row).find("td:first-child").css('cursor', 'pointer');
      } else {
        $(row).find("td:first-child").html(`<span data-i18n="${dataTable[0]}"></span>`);
      }
    },
    scrollX:"true",
    columns: column,
    columnDefs: [      
      // {
      //   targets: 0,
      //   orderable: false,
      // },
      {
        targets: [dataTable[0].length],
        orderable: false,
        data: null,
        width: "80px",
        defaultContent: 
          `   <div class="icoContainer">
        <button class="chartIcon barChart" data-i18n-title="POPBARCHART" data-i18n-label="POPBARCHART">
            <i class="fas fa-chart-bar" aria-hidden="true"></i>
        </button>
        <button class="chartIcon pieChart" data-i18n-title="POPPIECHART" data-i18n-label="POPPIECHART">
            <i class="fas fa-chart-pie" aria-hidden="true"></i>
        </button>
        <button class="chartIcon lineChart" data-i18n-title="POPLINECHART" data-i18n-label="POPLINECHART">
            <i class="fas fa-chart-line" aria-hidden="true"></i>
        </button>
        <button class="chartIcon info" data-i18n-title="POPINFO" data-i18n-label="POPINFO">
            <i class="fas fa-info" aria-hidden="true"></i>
        </button>
    </div>`,
      },
    ],
    ordering: false,
    data: dataTable.slice(1),
    searching: false,
    paging: false,
    info: false,
    responsive: true,
    language: {
      decimal: ",",
      thousands: " ",
    },  
    fixedColumns: true,
    scrollCollapse: true,
    scrollX: true,
    buttons: [
      {
        className: 'exportpdf d-none',
        text: '<i class="fas fa-file-pdf"></i>',
        // titleAttr: "PDF",       
        dontBreakRows: true,   
      },
      {
        className: 'exportxcel d-none',
        extend: "excelHtml5",
        text: '<i class="fas fa-file-excel"></i>',
        // titleAttr: "Excel",
        title: translationsCache["TOOLTITLE"] || "Default Title", // Use dynamic translation or fallback
        messageTop: (translationsCache[REF.geo] || REF.geo) + " - " + (translationsCache[REF.fuel] || REF.fuel), // Dynamic based on REF
        messageBottom: "\r\n" + ("Eurostat"), // Fallback to "Eurostat" if translation is missing
        customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets['sheet1.xml'];
            
            // Dynamically replace year and unit in cell A3
            $('c[r=A3] t', sheet).text(
                (translationsCache["tableYear"] || "Year") + ": " + REF.year + " / " + 
                (translationsCache["tableUnit"] || "Unit") + ": " + REF.unit
            );
            
            var COLUMNS = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
            for (var i = 0; i < COLUMNS.length; i++) {
                $('row c[r^=' + COLUMNS[i] + ']', sheet).attr('s', '52');
                $('row c[r^=' + COLUMNS[i] + "3" + ']', sheet).attr('s', '2');
            }
        }
    },
    
    {
      className: 'exportcsv d-none',
      extend: "csvHtml5",
      bom: true,
      text: '<i class="fas fa-file-csv"></i>',
      // titleAttr: "CSV",
      customize: function (csv) {
          var csvRows = csv.split('\n');
          
          // Replacing the text in the first CSV row dynamically
          csvRows[0] = csvRows[0].replace(
              '"Year: 2019Unit: KTOE"', 
              (translationsCache["tableYear"] || "Year") + ": " + REF.year + " / " + 
              (translationsCache["tableUnit"] || "Unit") + ": " + REF.unit
          );
          
          csv = csvRows.join('\n');
          
          // Returning the final CSV content with dynamic translations
          return (translationsCache["TOOLTITLE"] || "Default Title") + "\n" + 
                 (translationsCache[REF.geo] || REF.geo) + " - " + 
                 (translationsCache[REF.fuel] || REF.fuel) + "\n" + 
                 csv + "\n\n" + 
                 ("Eurostat");
      }
  }
  
  
    ],
    initComplete: function(settings, json) {
      // Call initCustomScrollbar once DataTables initialization is complete
      setTimeout(() => {
        document.querySelector("#dataTableContainer > thead").remove();

        $("#dataTableContainer_wrapper > div.dt-scroll > div.dt-scroll-head > div > table > thead > tr > th:first-child").each(function () {
          const $th = $(this); // Get the current <th>
          const $td = $("<td>"); // Create a new <td> element
        
          // Copy the inner HTML from <th> to <td>
          $td.html($th.html());
        
          // Copy all attributes from <th> to <td>
          $.each($th[0].attributes, function (_, attr) {
            $td.attr(attr.name, attr.value);
          });
        
          // Replace <th> with the new <td>
          $th.replaceWith($td);
        });
  
      }, 1000);

      initCustomScrollbar();
    }

  })


  
table.draw();



 
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

    // $("#dataTableContainer tbody").on("click", "tr td:first-child", function () {
    //   var tr = $(this).closest("tr");
    //   var row = table.row(tr);
    //   key = tr[0].id;
    //   indexOrder = key
    //   log('here')

    //   log(tr)
    //   log(row)
 
    // });

    // $("#ENTable tbody").on("click", ".secondLayer", function (e) { 
    //   var tr = $(this).closest("tr");
    //   key = tr[0].id;
    //   selector = "#" + e.currentTarget.id + " > td:nth-child(1) > span > div > i";
    //   showSpinner();
    //   format().then(function () {
    //     if ($(selector).hasClass("fa-minus-circle")) {
    //       $(selector).attr("class", "");
    //       $(selector).addClass("fas fa-plus");
    //       const removeElements = (elms) => elms.forEach((el) => el.remove());
    //       removeElements(document.querySelectorAll(".secondLayerTR"));
    //     } else {         
    //       $(selector).attr("class", "");
    //       $(selector).addClass("fal fa-minus-circle");
    //       key = tr[0].id;
    //       for (let i = 0; i < newdata.length; i++) {
    //         $("#ENTable tbody > #" + key).after(
    //           "<tr id='" +
    //             newdata[i][0].id +
    //             "' class='secondLayerTR'>" +
    //             newdata[i][0].innerHTML +
    //             "</tr>"
    //         );
    //       }
    //     }
    //     // table.colReorder.reset(); 
    //     // table.draw(true); 
    //     // table.colReorder.order(order); 
    //     newRowData = [];
    //     hideSpinner();      
    //   });
    // });

  


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

// async function format() {
//   await newRowApiCall();
//   newdata = [];
//   if(indexOrder == "NRG_E" || indexOrder == "TO" || indexOrder == "TI_E" || indexOrder == "NRGSUP") {
//     newRowData = newRowData;
//   } else {
//     newRowData = newRowData.reverse();
//   }

//   for (let i = 0; i < newRowData.length; i++) {
//     const element = newRowData[i];
//     if (
//       element[0] == "FC_IND_E" ||
//       element[0] == "FC_TRA_E" ||
//       element[0] == "TI_EHG_E" ||
//       element[0] == "TI_RPI_E" ||
//       element[0] == "TO_EHG" ||
//       element[0] == "TO_RPI" ||
//       element[0] == "FC_OTH_E"
//     ) {
//       data =
//         '<tr id="' +
//         element[0] +
//         '" class="show secondLayer" style="background-color: aliceblue;">' +
//         '<td ><span class="expandTd">' +
//         element[1] +
//         '<div class="expand"><i class="fas fa-plus"></i></div></span></td>';
//       for (let i = 2; i < element.length; i++) {
//         data += "<td>" + element[i] + "</td>";
//       }
//       data +=
//         '<td><div class="icoContainer"><div class="chartIcon barChart"><i class="fas fa-chart-bar"></i></div><div class="chartIcon pieChart"><i class="fas fa-chart-pie"></i></div><div class="chartIcon lineChart"><i class="fas fa-chart-line"></i></div><div class="chartIcon info"><i class="fas fa-info"></i></div></div></td></tr>';
//       newdata.push($(data));
//     } else {
//       data =
//         '<tr id="' +
//         element[0] +
//         '" class="show" style="background-color: aliceblue;">' +
//         '<td class="secondLayertd2">' +
//         element[1] +
//         "</td>";
//       for (let i = 2; i < element.length; i++) {
//         data += "<td>" + element[i] + "</td>";
//       }
//       data +=
//         '<td><div class="icoContainer"><div class="chartIcon barChart"><i class="fas fa-chart-bar"></i></div><div class="chartIcon pieChart"><i class="fas fa-chart-pie"></i></div><div class="chartIcon lineChart"><i class="fas fa-chart-line"></i></div><div class="chartIcon info"><i class="fas fa-info"></i></div></div></td></tr>';
//       newdata.push($(data));
//     }
//   }

//   return newdata;

// }

function tableData() {

  if (REF.full == 1) {
    defaultData = [];
    dataTable = []
    rowIndex = []
    expandStatus = [];
    destroyTable()      
  } 

  apiCall();

  // getTitle()

  dataNameSpace.setRefURL();
}


