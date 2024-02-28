class SubNavbar {
    constructor() {
      this.subNavbar = document.createElement('nav');
      this.subNavbar.setAttribute('aria-label', 'Menu toolbar');
      this.subNavbar.setAttribute('id', 'menuToolbar');
      this.subNavbar.setAttribute('class', 'navbar navbar-expand-sm navbar-light bg-light');

      const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768
  

      const notMobileContent = /*html*/`<div class="container-fluid">
        <div class="col-1">              
        <button id="menu" class="btnGroup" type="button" aria-label="${languageNameSpace.labels["MAINMENU"]}" title="${languageNameSpace.labels["MAINMENU"]}" aria-haspopup="true">
        <i class="fas fa-bars"></i>
        <span>Menu</span>             
      </button>
        </div>
            <div class="col-8">
              <div class="text-group">
                <h2 id="title" class="title"></h2>
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

            
            <div id="chartOptionsMenu" class="d-none">
              <div class="close-button-container">
                <button id="closeChartMenuBtn" class="btn btn-primary close-chart-menu-btn" aria-label="Close chart menu">
                <i class="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div class="dropdown-grid">
              <div class="row w-75">
                <div id="containerCountries" class="col-12 col-sm-4 p-2"></div>
                <div id="containerFuel" class="col-12 col-sm-4 p-2"></div>
                <div id="containerYear" class="col-12 col-sm-4 p-2"></div>
                <div id="containerDecimals" class="col-12 col-sm-4 p-2"></div>
                <div id="containerUnit" class="col-12 col-sm-4 p-2"></div>
              </div>
              </div>
            </div>
          </div>`;


      const mobileContent = `<div class="">
        <div class="col-12 subNavOne">
          <div class="menuBtn">              
              <button id="tools" class="btnGroup" type="button" aria-label="${languageNameSpace.labels["TOOLS"]}" title="${languageNameSpace.labels["TOOLS"]}" aria-haspopup="true">
                <i class="fas fa-ellipsis-h" aria-hidden="true"></i>      
                <span class="iconText">${languageNameSpace.labels["TOOLS"]}</span>    
              </button>
          </div>
          <div class="menuBtn">              
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

            <div id="chartOptionsMenu" class="d-none">
              <div class="close-button-container">
                <button id="closeChartMenuBtn" class="btn btn-primary close-chart-menu-btn" aria-label="Close chart menu">
                <i class="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div class="dropdown-grid">
                <div class="row">    
                  <div id="containerCountries" class="col-12 col-sm-4 p-2"></div>
                  <div id="containerFuel" class="col-12 col-sm-4 p-2"></div>
                  <div id="containerYear" class="col-12 col-sm-4 p-2"></div>
                  <div id="containerDecimals" class="col-12 col-sm-4 p-2"></div>
                  <div id="containerUnit" class="col-12 col-sm-4 p-2"></div>    
                </div>
              </div>
            </div>


        </div>
        <div class="col-12 subNavTwo">
          <div class="text-group">
              <h2 id="title" class="title"></h2> 
            </div>
        </div>
      </div>`;


         


      if (isMobile) {          
        this.subNavbar.innerHTML = mobileContent               
        
        this.toolsButton = this.subNavbar.querySelector('#tools');
        this.chartToolsMenu = this.subNavbar.querySelector('.chartMenuMobile');

        this.chartOptionsMenu = this.subNavbar.querySelector('#chartOptionsMenu');
        this.chartMenuOpen = this.subNavbar.querySelector('#menu');


    
        this.toolsButton.addEventListener('click', () => {        
          this.chartOptionsMenu.classList.contains("d-none") ? "" : this.chartOptionsMenu.classList.toggle('d-none');          
          this.chartToolsMenu.classList.toggle('d-none');
        });

        this.chartMenuOpen.addEventListener('click', () => {
          this.chartToolsMenu.classList.contains("d-none") ? "" : this.chartToolsMenu.classList.toggle('d-none');
          this.chartOptionsMenu.classList.toggle('d-none');          
        });

      } else {

          this.subNavbar.innerHTML = notMobileContent      

          this.menuButton = this.subNavbar.querySelector('#menu');
          this.menu = this.subNavbar.querySelector('#chartOptionsMenu');

  
          this.menuButton.addEventListener('click', () => {
            $('#tableArea').toggleClass('pushup pushDown')        
            this.menu.classList.toggle('d-none');    
            trapTab()
          });
  
          this.closeChartMenuBtn = this.subNavbar.querySelector('#closeChartMenuBtn');
  
          this.closeChartMenuBtn.addEventListener('click', () => {
            this.menu.classList.toggle('d-none');
            $('#tableArea').toggleClass('pushup pushDown')
          });

        }     
    }


      addToDOM(targetElement) {
        const container = document.querySelector(targetElement);
        container.appendChild(this.subNavbar);   
      }
  }











  