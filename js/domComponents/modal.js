class Modal {
        constructor(info, obj) {
          this.info = info;
          this.obj = obj;
          this.modal = document.createElement('div');
          this.modal.classList.add('modal', 'fade', 'show');
          this.modal.id = 'definitionsModal';
          this.modal.setAttribute('tabindex', '-1');
          this.modal.setAttribute('aria-labelledby', 'definitionsModalLabel');
          this.modal.setAttribute('aria-hidden', 'true');
          this.modal.setAttribute('role', 'dialog');
          this.modal.setAttribute('aria-modal', 'true');
      
          this.create();
        }
      
        create() {

log(this.obj)

          this.modal.innerHTML = `
            <div  style="display: block; padding-right: 17px;" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body">
                    <div id="info" role="document">
                      <div id="infoCard" class="card">
                        <img src="./img/fuels/${this.obj.PICTURE}.jpg" class="card-img-top" alt="${this.obj.PICTURE}.jpg">
                        <div class="card-body">
                          <h5 class="card-title"><b>${languageNameSpace.labels[this.info]}</b></h5>
                          <p class="card-text text-left text-wrap">${this.obj[REF.language]}</p>
                          <div class="d-flex justify-content-end pt-2">
                            <button type="button" onclick="openLink('https://ec.europa.eu/eurostat/cache/metadata/en/nrg_bal_esms.htm')" class="btn btn-primary min-with--nav Metadata" aria-label="Open metadata">${languageNameSpace.labels["POPMETA"]}</button>
                            <button type="button" onclick="openLink('https://ec.europa.eu/eurostat/databrowser/view/nrg_bal_c/default/table?lang=en')" class="btn btn-primary min-with--nav Dataset" aria-label="Open database">${languageNameSpace.labels["POPDB"]}</button>
                          </div>
                          <div class="modal-footer">
                          <button type="button" class="btn btn-primary min-with--nav" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
      


  
      // Add a reference to the modal content for managing focus
      this.modalContent = this.modal.querySelector('.modal-content');
  
      // Add an event listener to handle keyboard interactions
      this.modal.addEventListener('keydown', this.handleKeyDown.bind(this));

      function openLink(url) {
        window.location.href = url;
      };
    }
  
    open() {
      const bootstrapModal = new bootstrap.Modal(this.modal);
      bootstrapModal.show();
      this.modal.style.display = 'block';
      this.modal.setAttribute('aria-hidden', 'false');
    
      // Trap keyboard focus within the modal
      this.modal.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          const focusableElements = this.modal.querySelectorAll('button, select, [tabindex="0"]');
          const focusedElement = document.activeElement;
          const firstFocusableElement = focusableElements[0];
          const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
          if (event.shiftKey && focusedElement === firstFocusableElement) {
            // Shift + Tab key pressed (backward) - focus the last focusable element
            event.preventDefault();
            lastFocusableElement.focus();
          } else if (!event.shiftKey && focusedElement === lastFocusableElement) {
            // Tab key pressed (forward) - focus the first focusable element
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      });
    
      // Set focus to the first focusable element inside the modal
      const firstFocusableElement = this.modal.querySelector('button, select, [tabindex="0"]');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
    
  
    close() {
      this.modal.style.display = 'none';
      this.modal.setAttribute('aria-hidden', 'true');
    }
  
    handleKeyDown(event) {
      const isEscapeKey = event.key === 'Escape' || event.key === 'Esc';
  
      if (isEscapeKey) {
        // Close the modal when the "Esc" key is pressed
        this.close();
      }
    }
  
    addToDOM(targetElement) {
      const container = document.querySelector(targetElement);
      container.appendChild(this.modal);
    }
  }
  

