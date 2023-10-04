  $(async function() {
     
        urlPath = "./excelFile/codesInfo.xlsx"       
            
        return new Promise(resolve => {
            fetch(urlPath).then(function(res) {
                /* get the data as a Blob */
                if(!res.ok) throw new Error("fetch failed");
                return res.arrayBuffer();
              }).then(function(ab) {
                /* parse the data when it is received */
                var data = new Uint8Array(ab);
                var workbook = XLSX.read(data, {type:"array"});
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                var excelData = XLSX.utils.sheet_to_json(worksheet, {raw: true})
                excelInfoData.push(excelData)
              });  
        })
         
});