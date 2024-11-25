class Modal {
        constructor(info, obj) {
          this.info = info;
          this.obj = obj;
          this.modal = document.createElement('div');         
          this.modal.id = 'infoModal';
      
          this.create();
        }
      
        create() {

        //   function capitalizeFirstLetter(string) {
        //     // Convert the entire string to lowercase first if needed
        //     string = string.toLowerCase();
        
        //     // Replace &nbsp; with spaces
        //     string = string.replace(/&nbsp;/g, ' ');
        
        //     // Capitalize the first letter of the string
        //     string = string.charAt(0).toUpperCase() + string.slice(1);
        
        //     // Capitalize the first letter after every period followed by a space
        //     string = string.replace(/(\.\s+)([a-z])/g, function(match, separator, char) {
        //         return separator + char.toUpperCase();
        //     });
        
        //     return string;
        // }

          this.modal.innerHTML = /*html*/
    `<dialog data-ecl-auto-init="Modal" id="${this.modal.id}" data-ecl-modal-toggle="modal-toggle" class="ecl-modal ecl-modal--s">
      <div class="ecl-modal__container ecl-container">
        <div class="ecl-modal__content ecl-col-12 ecl-col-m-10 ecl-col-l-10">
          <header class="ecl-modal__header">
            <div class="ecl-modal__header-content">
            <h5 class="card-title"><b>${translationsCache[this.info]}</b></h5>
            </div>
            <button 
            class="ecl-button ecl-button--tertiary ecl-modal__close ecl-button--icon-only" 
            type="button" 
            data-i18n-label="CLOSE" 
            aria-expanded="true" 
            data-ecl-modal-close
            aria-controls="chartOptionsMenu">
            <span class="ecl-button__container">
              <!-- Visually hidden but accessible label -->
              <span class="ecl-button__label sr-only" data-ecl-label="true">Close</span>
              <!-- SVG Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
              </svg>    
              </span>
          </button>
          </header>
          <div class="ecl-modal__body">
              <img src="./img/fuels/${this.obj.PICTURE}.jpg" class="card-img-top" alt="${translationsCache[this.info]} representation">
              <div id="dialog-picture-credit" style="font-size: .7rem">
					      <p class="text-end">${this.obj.SOURCE}</p>
              </div>
                <p id="desc" class="card-text text-left text-wrap">${this.obj[REF.language]}</p>
                <div id="btnControl" class="d-flex justify-content-end p-2">
                  <button type="button" onclick="openLink('https://ec.europa.eu/eurostat/cache/metadata/en/nrg_bal_esms.htm')" class="ecl-button ecl-button--secondary" aria-label="Open metadata">${translationsCache["POPMETA"]}</button>
                  <button type="button" onclick="openLink('https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table?lang=en')" class="ecl-button ecl-button--secondary" aria-label="Open database">${translationsCache["POPDB"]}</button>
                </div>
              </div>
          <footer class="ecl-modal__footer">
            <div class="ecl-modal__footer-content">
              <button id="close" class="ecl-button ecl-button--primary" type="button" data-ecl-modal-close>${translationsCache["CLOSE"]}</button>
              </div>
          </footer>
        </div>
      </div>
    </dialog>`

    $('#definitionsModal').append(this.modal.innerHTML);

    const modal = document.getElementById('infoModal');

    modal.showModal();

    ECL.autoInit();



    const parentElement = document.getElementById('definitionsModal');
  
    parentElement.addEventListener('click', event => {
        if (event.target.closest('.ecl-modal__close')) {
            this.close(); 
        }
    });
  } 

    close() {    
      $("#definitionsModal").html("");

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
  }

  
    addToDOM(targetElement) {
      const container = document.querySelector(targetElement);
      container.appendChild(this.modal);
      $('#desc').html($('#desc').html().replace(/&nbsp;/g, ' '));
    }
  }
  

