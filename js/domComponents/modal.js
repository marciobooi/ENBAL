class Modal {
        constructor(info, obj) {
          this.info = info;
          this.obj = obj;
          this.modal = document.createElement('div');         
          this.modal.id = 'infoModal';
      
          this.create();
        }
      
        create() {

          function capitalizeFirstLetter(string) {
            string = string.toLowerCase() // Convert the string to lowercase
            // string = string.replace(/&nbsp;/g, ' '); // Replace all occurrences of &nbsp; with space
            return string.charAt(0).toUpperCase() + string.slice(1);
        }    

          this.modal.innerHTML = /*html*/
    `<dialog data-ecl-auto-init="Modal" id="${this.modal.id}" data-ecl-modal-toggle="modal-toggle" class="ecl-modal ecl-modal--s">
      <div class="ecl-modal__container ecl-container">
        <div class="ecl-modal__content ecl-col-12 ecl-col-m-10 ecl-col-l-10">
          <header class="ecl-modal__header">
            <div class="ecl-modal__header-content">
            <h5 class="card-title"><b>${languageNameSpace.labels[this.info]}</b></h5>
            </div>
            <button class="ecl-button ecl-button--ghost ecl-modal__close" type="button" data-ecl-modal-close="">
              <span class="ecl-button__container">
                
                  <span class="ecl-u-sr-only" data-ecl-label="true">Close</span>
                  <svg class="ecl-icon ecl-icon--s ecl-button__icon ecl-button__icon--after" focusable="false" aria-hidden="true" data-ecl-icon="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="24" height="24">
                      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                  </svg>
              </span>
          </button>
          </header>
          <div class="ecl-modal__body">
              <img src="./img/fuels/${this.obj.PICTURE}.jpg" class="card-img-top" alt="${languageNameSpace.labels[this.info]} representation">
              <div id="dialog-picture-credit" style="font-size: .7rem">
					      <p class="text-end">${this.obj.SOURCE}</p>
              </div>
                <p id="desc" class="card-text text-left text-wrap">${capitalizeFirstLetter(this.obj[REF.language])}</p>
                <div id="btnControl" class="d-flex justify-content-end p-2">
                  <button type="button" onclick="openLink('https://ec.europa.eu/eurostat/cache/metadata/en/nrg_bal_esms.htm')" class="ecl-button ecl-button--secondary" aria-label="Open metadata">${languageNameSpace.labels["POPMETA"]}</button>
                  <button type="button" onclick="openLink('https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table?lang=en')" class="ecl-button ecl-button--secondary" aria-label="Open database">${languageNameSpace.labels["POPDB"]}</button>
                </div>
              </div>
          <footer class="ecl-modal__footer">
            <div class="ecl-modal__footer-content">
              <button id="close" class="ecl-button ecl-button--primary" type="button" data-ecl-modal-close>${languageNameSpace.labels["close"]}</button>
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
  }

  
    addToDOM(targetElement) {
      const container = document.querySelector(targetElement);
      container.appendChild(this.modal);

      log($('#desc'))

      $('#desc').html($('#desc').html().replace(/&nbsp;/g, ' '));
    }
  }
  

