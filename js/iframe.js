function exportIframe() {

    $('ecl-modal__header-content').html(languageNameSpace.labels['sharemodaltitle'])
    $('.targetUrl').html(window.location.href)     
 
    const modal = document.getElementById('iframeModal');

    // Open the modal
    modal.showModal();

    ECL.autoInit();
}


function copyUrl() {
    dataNameSpace.setRefURL()
    var currentUrl = window.location.href;
    
    // Modify the "share" parameter to "true" in the URL
    currentUrl = currentUrl.replace("share=false", "share=true");
    
    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.setAttribute("type", "text");

    // Create a text node with the iframe code and append it to the tempInput
    var iframeCode = '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" src="'+ currentUrl +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    tempInput.appendChild(document.createTextNode(iframeCode));

    document.body.appendChild(tempInput);

    // Select the input content
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(iframeCode).then(function() {
        // Success callback (optional)
        // alert("URL copied to clipboard: " + currentUrl);
    }).catch(function(error) {
        // Error callback (optional)
        console.error("Unable to copy URL to clipboard: ", error);
    });

    // Remove the temporary input element
    document.body.removeChild(tempInput);
    
}

function hideForIframe() {
    if(REF.share == "true") {
        document.querySelector("#body > header").style.display = 'none'
        document.querySelector("#allContainer").style.display = 'none'
        document.querySelector("#menuSwitch").style.display = 'none'
        document.querySelector("#floatingMenu").style.display = 'none'
        document.querySelector("#componentFooter").style.display = 'none'
        document.querySelector(".highcharts-title").style.display = 'block'
    }    
}