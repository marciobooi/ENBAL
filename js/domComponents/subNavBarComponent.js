class SubNavbar {
    constructor() {
      this.subNavbar = document.createElement('nav');
      this.subNavbar.setAttribute('aria-label', 'Menu toolbar');
      this.subNavbar.setAttribute('id', 'menuToolbar');
      this.subNavbar.setAttribute('class', 'navbar navbar-expand-sm navbar-light bg-light');

      // const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768
  

      const notMobileContent = `<div class="container-fluid">
        <div class="col-1">              
        <button id="menu" class="btnGroup" type="button" aria-label="${languageNameSpace.labels["MAINMENU"]}" title="${languageNameSpace.labels["MAINMENU"]}" aria-haspopup="true">
        <i class="fas fa-bars"></i>
        <span>Menu</span>             
      </button>
        </div>
            <div class="col-8">
              <div class="text-group">
                <h2 id="title" class="title"></h2>
                <h6 id="subtitle" class="subtitle"></h6>      
              </div>
            </div>
            <div class="col-3">
            <ul id="chartBtns" role="menubar" aria-label="Options graph toolbox" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
              <li class="nav-item dropdown px-1" id="infoBtnChart" role="none">
                  <button class="btn btn-primary  min-with--nav round-btn" type="button" aria-label="InfoBtn" data-bs-toggle="dropdown" role="menuitem" title="${languageNameSpace.labels['INFO']}" aria-haspopup="true" aria-expanded="true" id="infoBtn">
                    <i class="fas fa-info" aria-hidden="true"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="infoBtn">     					
                    <button class="dropdown-item" role="menuitem" onclick="openDataset()" aria-label="${languageNameSpace.labels['DATASET']}" value="dataset">${languageNameSpace.labels['DATASET']}</button>
                    <button class="dropdown-item" role="menuitem" onclick="openMeta()" aria-label="${languageNameSpace.labels['META']}" value="Metadata" >${languageNameSpace.labels['META']}</button>
                    <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.email()" aria-label="${languageNameSpace.labels['FEED']}" value="Feedback">${languageNameSpace.labels['FEED']}</button>          		
                    <button class="dropdown-item" role="menuitem" onclick="openBalDefinitions()" aria-label="${languageNameSpace.labels['BALGUIDE']}" value="guide">${languageNameSpace.labels['BALGUIDE']}</button>          		
                    <button class="dropdown-item" role="menuitem" onclick="tutorial()" aria-label="${languageNameSpace.labels['POPTUT']}" value="tuturial">${languageNameSpace.labels['POPTUT']}</button>          		
                  </ul>
                </li>
                <li class="nav-item dropdown px-1" id="downloadChart" role="none">
                  <button class="btn btn-primary  min-with--nav round-btn" type="button" aria-label="download chart image" data-bs-toggle="dropdown" role="menuitem" title="Download chart image" aria-haspopup="true" aria-expanded="true" id="downloadBtn">
                    <i class="fas fa-download" aria-hidden="true"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="Download chart">     					
                    <button class="dropdown-item" role="menuitem" onclick="download_DIVPdf()" aria-label="${languageNameSpace.labels['POPDOWNLOADTABLEPDF']}">${languageNameSpace.labels["POPDOWNLOADTABLEPDF"]}</button>
                    <button class="dropdown-item" role="menuitem" onclick="table.button( '.exportxcel' ).trigger();" aria-label="${languageNameSpace.labels['POPDOWNLOADTABLEEXCEL']}">${languageNameSpace.labels["POPDOWNLOADTABLEEXCEL"]}</button>
                    <button class="dropdown-item" role="menuitem" onclick="table.button( '.exportcsv' ).trigger();" aria-label="${languageNameSpace.labels['POPDOWNLOADTABLECSV']}">${languageNameSpace.labels["POPDOWNLOADTABLECSV"]}</button>        		
                  </ul>
                </li>     

                <!-- <li class="nav-item button px-1" id="shareChart" role="none">
                  <button id="shareBtn" title="share chart" type="button" class="btn btn-primary  min-with--nav round-btn" aria-label="share chart" onclick="">
                    <i class="fas fa-share-alt" aria-hidden="true"></i>
                  </button>
                </li> -->
                <li class="nav-item button px-1" id="embebedChart" role="none">
                  <button id="embebedBtn" title="Embebed chart iframe" type="button" class="btn btn-primary  min-with--nav round-btn" aria-label="Embebed chart iframe" onclick="exportIframe()">
                    <i class="fas fa-code" aria-hidden="true"></i>
                  </button>
                </li>             
                <li class="nav-item dropdown px-1" id="social-media-dropdown" role="none">
                <button class="btn btn-primary min-with--nav round-btn" type="button" aria-label="Share in social media" data-bs-toggle="dropdown" role="menuitem" title="Share chart" aria-haspopup="true" aria-expanded="true" id="shareChart1">
                  <i class="fas fa-share-alt" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="Share chart">     					
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.twitter()" aria-label="${languageNameSpace.labels['SHARE_T']}">${languageNameSpace.labels["SHARE_T"]}</button>
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.facebook()" aria-label="${languageNameSpace.labels['SHARE_F']}">${languageNameSpace.labels["SHARE_F"]}</button>
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.linkedin()" aria-label="${languageNameSpace.labels['SHARE_L']}">${languageNameSpace.labels["SHARE_L"]}</button>        
                </ul>
              </li>  

              </ul>
            </div>
            </div>

            
            <div id="chartOptionsMenu" class="toggleMenu">
              <div class="close-button-container">
                <button id="closeChartMenuBtn" class="btn btn-primary close-chart-menu-btn" aria-label="Close chart menu">
                <i class="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div class="dropdown-grid">
              <div class="row w-75"></div>
              </div>
            </div>
          </div>`;


      const mobileContent = `<div class="">
        <div class="col-12 subNavOne">
          <div class="">              
              <button id="tools" class="btnGroup" type="button" aria-label="${languageNameSpace.labels["TOOLS"]}" title="${languageNameSpace.labels["TOOLS"]}" aria-haspopup="true">
                <i class="fas fa-ellipsis-h" aria-hidden="true"></i>      
                <span class="iconText">${languageNameSpace.labels["TOOLS"]}</span>    
              </button>
          </div>
          <div class="">              
              <button id="menu" class="btnGroup" type="button" aria-label="${languageNameSpace.labels["MAINMENU"]}" title="${languageNameSpace.labels["MAINMENU"]}" aria-haspopup="true">
                <i class="fas fa-bars" aria-hidden="true"></i>                    
                <span class="iconText">${languageNameSpace.labels["MAINMENU"]}</span>           
              </button>
          </div>

        <div class="chartMenuMobile d-none">
          <ul id="chartBtns" role="menubar" aria-label="Options graph toolbox" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
              <li class="nav-item dropdown px-1" id="infoBtnChart" role="none">
                <button class="btn btn-primary  min-with--nav round-btn" type="button" aria-label="InfoBtn" data-bs-toggle="dropdown" role="menuitem" title="Info" aria-haspopup="true" aria-expanded="true" id="infoBtn">
                  <i class="fas fa-info" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="infoBtn">     					
                <button class="dropdown-item" role="menuitem" onclick="openDataset()" aria-label="${languageNameSpace.labels['DATASET']}" value="dataset">${languageNameSpace.labels['DATASET']}</button>
                <button class="dropdown-item" role="menuitem" onclick="openMeta()" aria-label="${languageNameSpace.labels['META']}" value="Metadata" >${languageNameSpace.labels['META']}</button>
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.email()" aria-label="${languageNameSpace.labels['FEED']}" value="Feedback">${languageNameSpace.labels['FEED']}</button>          		
                <button class="dropdown-item" role="menuitem" onclick="openBalDefinitions()" aria-label="${languageNameSpace.labels['BALGUIDE']}" value="Feedback">${languageNameSpace.labels['BALGUIDE']}</button>          		
                <button class="dropdown-item" role="menuitem" onclick="tutorial()" aria-label="${languageNameSpace.labels['POPTUT']}" value="Feedback">${languageNameSpace.labels['POPTUT']}</button>                		
                </ul>
              </li>
              <li class="nav-item dropdown px-1" id="downloadChart" role="none">
                <button class="btn btn-primary  min-with--nav round-btn" type="button" aria-label="download chart image" data-bs-toggle="dropdown" role="menuitem" title="Download chart image" aria-haspopup="true" aria-expanded="true" id="downloadBtn">
                  <i class="fas fa-download" aria-hidden="true"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="Download chart">     					
                  <button class="dropdown-item" role="menuitem" onclick="exportPngChart()" aria-label="${languageNameSpace.labels['downloadPNG']}">${languageNameSpace.labels["downloadPNG"]}</button>
                  <button class="dropdown-item" role="menuitem" onclick="exportJpegChart()" aria-label="${languageNameSpace.labels['downloadJPEG']}">${languageNameSpace.labels["downloadJPEG"]}</button>
                  <button class="dropdown-item" role="menuitem" onclick="exportXlsChart()" aria-label="${languageNameSpace.labels['downloadXLS']}">${languageNameSpace.labels["downloadXLS"]}</button>        		
                </ul>
              </li>     
              <li class="nav-item button px-1" id="shareChart" role="none">
                <button id="shareBtn" title="share chart" type="button" class="btn btn-primary  min-with--nav round-btn" aria-label="share chart" onclick="">
                  <i class="fas fa-share-alt" aria-hidden="true"></i>
                </button>
              </li>
              <li class="nav-item dropdown px-1" id="social-media-dropdown" role="none">
              <button class="btn btn-primary min-with--nav round-btn" type="button" aria-label="Share in social media" data-bs-toggle="dropdown" role="menuitem" title="Share chart" aria-haspopup="true" aria-expanded="true" id="shareChart1">
                <i class="fas fa-share-alt" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="Share chart">     					
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.twitter()" aria-label="${languageNameSpace.labels['SHARE_T']}">${languageNameSpace.labels["SHARE_T"]}</button>
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.facebook()" aria-label="${languageNameSpace.labels['SHARE_F']}">${languageNameSpace.labels["SHARE_F"]}</button>
                <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.linkedin()" aria-label="${languageNameSpace.labels['SHARE_L']}">${languageNameSpace.labels["SHARE_L"]}</button>        		
              </ul>
            </li>  
              <li class="nav-item button px-1" id="embebedChart" role="none">
                <button id="embebedBtn" title="Embebed chart iframe" type="button" class="btn btn-primary  min-with--nav round-btn" aria-label="Embebed chart iframe" onclick="exportIframe()">
                  <i class="fas fa-code" aria-hidden="true"></i>
                </button>
              </li>
          </ul>
        </div>

            <div id="chartOptionsMenu" class="toggleMenu">
              <div class="close-button-container">
                <button id="closeChartMenuBtn" class="btn btn-primary close-chart-menu-btn" aria-label="Close chart menu">
                <i class="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div class="dropdown-grid">
                <div class="row">        
                </div>
              </div>
            </div>


        </div>
        <div class="col-12 subNavTwo">
          <div class="text-group">
              <h2 id="title" class="title"></h2>
              <h6 id="subtitle" class="subtitle"></h6>      
            </div>
        </div>
      </div>`;


         


        if (isMobile) {          
          this.subNavbar.innerHTML = mobileContent         
          
          this.toolsButton = this.subNavbar.querySelector('#tools');
          this.chartToolsMenu = this.subNavbar.querySelector('.chartMenuMobile');
          this.menuButton = this.subNavbar.querySelector('#menu');
          this.chartOptionsMenu = this.subNavbar.querySelector('#chartOptionsMenu');
          this.chartMenuOpen = this.subNavbar.querySelector('#menu');
      
          this.toolsButton.addEventListener('click', () => {        
            this.chartOptionsMenu.classList.contains("toggleMenu") ? "" : this.toggleChartOptionsMenu();
            this.chartToolsMenu.classList.toggle('d-none');
          });

          this.menuButton.addEventListener('click', () => {
            this.chartToolsMenu.classList.contains("d-none") ? "" : this.chartToolsMenu.classList.toggle('d-none');
            this.toggleChartOptionsMenu();
          });

        } else {

          this.subNavbar.innerHTML = notMobileContent         

          this.dropdownButton = this.subNavbar.querySelector('.dropdown-toggle');

          this.menuButton = this.subNavbar.querySelector('#menu');
          this.chartOptionsMenu = this.subNavbar.querySelector('#chartOptionsMenu');
          this.chartMenuOpen = this.subNavbar.querySelector('#menu');



  
          this.menuButton.addEventListener('click', () => {
            this.toggleChartOptionsMenu();
            trapTab()
          });
  
          this.closeChartMenuBtn = this.subNavbar.querySelector('#closeChartMenuBtn');
  
          this.closeChartMenuBtn.addEventListener('click', () => {
              this.toggleChartOptionsMenu();
          });
  
  
  
          document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || event.keyCode === 27) {
              $('#chartOptionsMenu').addClass('toggleMenu')
              // toggleMenu
              // this.toggleChartOptionsMenu();
            }        
            if (event.key === 'Enter' && document.activeElement === closeChartMenuBtn) {
              this.toggleChartOptionsMenu();
            }  
          });

        }     
    }

    toggleChartOptionsMenu() {
      this.chartOptionsMenu.classList.toggle('toggleMenu');
      this.chartMenuOpen.classList.toggle('menuOpen');
    }

    createDropdownBtnGroups() {
      const dropdownBtnGroupData = [
        {
          label: languageNameSpace.labels["COUNTRY"],
          id: "selectCountry",
          defaultText: languageNameSpace.labels[REF.geo],
          area: languageNameSpace.labels["MENU_COUNTRY"],
          data: `<div class="d-flex justify-content-evenly py-2">
                  <button class="btn btn-outline-secondary btn-sm px-2 min-with--geo" type="button" id="btn-country-reset">Reset</button>
                  <button class="btn btn-outline-secondary btn-sm px-2 min-with--geo" type="button" id="btn-country-cancel">Cancel</button>
                  <button class="btn btn-secondary btn-sm px-2 min-with--geo" type="button" id="btn-country-ok">OK</button>
                </div>`
        },
        {
          label: languageNameSpace.labels["FUEL"],
          id: "selectFuel",
          defaultText: languageNameSpace.labels[REF.fuel],
          area: languageNameSpace.labels["MENU_FUEL"],
          data: ``
        },
        // {
        //   label: languageNameSpace.labels["CONSUMER"],
        //   id: "selectConsumer",
        //   defaultText: languageNameSpace.labels["HOUSEHOLD"],
        //   area: languageNameSpace.labels["MENU_CONSUMER"],
        //   data: ``
        // },
        {
          label: languageNameSpace.labels["REFERENCE"],
          id: "selectYear",
          defaultText: "2022 - S2",
          area: languageNameSpace.labels["MENU_YEARS"],
          data: ``
        },
        {
          label: languageNameSpace.labels["DECIMALS"],
          id: "selectDecimals",
          defaultText: REF.decimals,
          area: languageNameSpace.labels["MENU_DEC"],
          data: ``
        },
        {
          label: languageNameSpace.labels["UNIT"],
          id: "selectUnit",
          defaultText: languageNameSpace.labels[REF.unit],
          area: languageNameSpace.labels["MENU_UNIT"],
          data: ``
        }
      ];
    
      const dropdownGrid = this.subNavbar.querySelector('.dropdown-grid');
      const dropdownRow = dropdownGrid.querySelector('.row');
    
      dropdownBtnGroupData.forEach(data => {
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-sm-4');
    
        const dropdownBtnGroup = document.createElement('div');
        dropdownBtnGroup.classList.add('dropdownBtnGroup');
    
        const label = document.createElement('label');
        label.setAttribute('for', data.id);
        label.classList.add('form-label');
        label.textContent = data.label;
    
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'dropdown-toggle');
        button.setAttribute('type', 'button');
        button.setAttribute('id', data.id);
        button.setAttribute('data-bs-toggle', 'dropdown');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-labelledby', data.area);
        button.innerHTML = `${data.defaultText}<i class="fas fa-angle-down" aria-hidden="true"></i>`;
    
        button.addEventListener('click', event => {
          this.handleDropdownItemClick(event, data);
        });
    
        const dropdownMenu = document.createElement('ul');
        dropdownMenu.classList.add('dropdown-menu');
        dropdownMenu.setAttribute('aria-labelledby', data.id);    
       
        if (data.data) {
          dropdownMenu.innerHTML = data.data;
        }
    
        dropdownBtnGroup.appendChild(label);
        dropdownBtnGroup.appendChild(button);
        dropdownBtnGroup.appendChild(dropdownMenu);
    
        col.appendChild(dropdownBtnGroup);
        dropdownRow.appendChild(col);
      });
    }
    





    handleDropdownItemClick(event, data) {
      const selectedItem = event.target;
      const selectedValue = selectedItem.getAttribute('value');
      const selectedText = selectedItem.textContent;
    
      // Update the dropdown button's text and value
      const dropdownButton = selectedItem.closest('.dropdownBtnGroup').querySelector('.dropdown-toggle');
      dropdownButton.innerHTML = `${selectedText}<i class="fas fa-angle-down" aria-hidden="true"></i>`;
      dropdownButton.setAttribute('value', selectedValue);
    
      // this.addHoverEvent();
      
    }

    highlightSelectedValue() {
      const dropdownToggles = this.subNavbar.querySelectorAll('.dropdown-toggle');
    
      dropdownToggles.forEach(dropdownToggle => {
        const selectedValue = dropdownToggle.getAttribute('value');
        const dropdownItems = dropdownToggle.nextElementSibling.querySelectorAll('.dropdown-item');
    
        dropdownItems.forEach(dropdownItem => {
          const itemValue = dropdownItem.getAttribute('value');
    
          if (itemValue === selectedValue) {
            dropdownItem.classList.add('selected');
          } else {
            dropdownItem.classList.remove('selected');
          }
        });
      });
    }


    addToDOM(targetElement) {
      const container = document.querySelector(targetElement);
      container.appendChild(this.subNavbar);
      this.createDropdownBtnGroups();
      // this.addHoverEvent();
    
      const dropdownItems = this.subNavbar.querySelectorAll('.dropdown-item');
    
      dropdownItems.forEach(dropdownItem => {
        dropdownItem.addEventListener('click', (event) => {
          // event.stopPropagation();
          const selectedItem = event.target;
          const selectedValue = selectedItem.getAttribute('value');
          const selectedText = selectedItem.textContent;
          const dropdownGroup = selectedItem.closest('.dropdownBtnGroup');
          if (dropdownGroup) {
            const dropdownToggle = dropdownGroup.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
              dropdownToggle.innerHTML = `${selectedText}<i class="fas fa-angle-down" aria-hidden="true"></i>`;
              dropdownToggle.setAttribute('value', selectedValue);
              // this.addHoverEvent();
              this.highlightSelectedValue();
            }
          }
        });
      });      
    }
  }











  