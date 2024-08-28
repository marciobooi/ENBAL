class SubNavbar {
    constructor() {
      this.subNavbar = document.createElement('nav');
      this.subNavbar.setAttribute('aria-label', 'Menu toolbar');
      this.subNavbar.setAttribute('id', 'menuToolbar');
      this.subNavbar.setAttribute('class', 'navbar navbar-expand-sm navbar-light bg-light');

      const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768
  

      const notMobileContent = /*html*/ `
      <div class="container-fluid">
          <div class="col-1">              
              <button id="menu" class="btnGroup" type="button" data-i18n-label="MAINMENU" data-i18n-title="MAINMENU" aria-haspopup="true">
                  <i class="fas fa-bars"></i>
                  <span data-i18n="MAINMENU">Menu</span>             
              </button>
          </div>
          <div class="col-8">
              <div class="text-group">
                  <h2 id="title" class="title"></h2>
              </div>
          </div>
          <div class="col-3">
              <ul id="chartBtns" role="menubar" data-i18n-label="OPTIONS_GRAPH_TOOLBOX" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
                  <li class="nav-item dropdown px-1" id="infoBtnChart" role="none">
                      <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="INFO" data-bs-toggle="dropdown" role="menuitem" data-i18n-title="INFO" aria-haspopup="true" aria-expanded="true" id="INFO">
                          <i class="fas fa-info" aria-hidden="true"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="INFO">     					
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="openDataset()" data-i18n-label="DATASET" value="dataset" data-i18n="DATASET"></button>
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="openMeta()" data-i18n-label="META" value="Metadata" data-i18n="META"></button>
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="socialNameSpace.email()" data-i18n-label="FEED" value="Feedback" data-i18n="FEED"></button>          		
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="openBalDefinitions()" data-i18n-label="BALGUIDE" value="guide" data-i18n="BALGUIDE"></button>          		
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="tutorial()" data-i18n-label="TUTORIAL" value="tutorial" data-i18n="TUTORIAL"></button>          		
                      </ul>
                  </li>
                  <li class="nav-item dropdown px-1" id="downloadChart" role="none">
                      <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="DOWNLOAD_CHART_IMAGE" data-bs-toggle="dropdown" role="menuitem" data-i18n-title="DOWNLOAD_CHART_IMAGE" aria-haspopup="true" aria-expanded="true" id="downloadBtn">
                          <i class="fas fa-download" aria-hidden="true"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="DOWNLOAD_CHART_IMAGE">     					
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="download_DIVPdf()" data-i18n-label="POPDOWNLOADTABLEPDF" data-i18n="POPDOWNLOADTABLEPDF"></button>
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="table.button('.exportxcel').trigger();" data-i18n-label="POPDOWNLOADTABLEEXCEL" data-i18n="POPDOWNLOADTABLEEXCEL"></button>
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="table.button('.exportcsv').trigger();" data-i18n-label="POPDOWNLOADTABLECSV" data-i18n="POPDOWNLOADTABLECSV"></button>        		
                      </ul>
                  </li>
                  <li class="nav-item button px-1" id="embebedChart" role="none">
                      <button id="embebedBtn" data-i18n-title="EMBEDDED_CHART_IFRAME" type="button" class="btn btn-primary min-with--nav round-btn" data-i18n-label="EMBEDDED_CHART_IFRAME" onclick="exportIframe()">
                          <i class="fas fa-code" aria-hidden="true"></i>
                      </button>
                  </li>             
                  <li class="nav-item dropdown px-1" id="social-media-dropdown" role="none">
                      <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="SHARE" data-bs-toggle="dropdown" role="menuitem" data-i18n-title="SHARE" aria-haspopup="true" aria-expanded="true" id="shareChart1">
                          <i class="fas fa-share-alt" aria-hidden="true"></i>
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end" style="padding: 12px;" role="menu" data-i18n-labelledby="SHARE">     			
                          <p class="ecl-social-media-share__description" style="font-weight: normal;" data-i18n="SHARE"></p>   		
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="socialNameSpace.twitter()" data-i18n-label="SHARE_T">                  
                              <span class="socialImg ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon">
                                  <img class="ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon" src="img/social-media/twiter.svg" alt="Twitter Icon" width="24" height="24" focusable="false" aria-hidden="true">
                              </span>
                              <span class="ecl-link__label" data-i18n="SHARE_T"></span>                  
                          </button>  
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="socialNameSpace.facebook()" data-i18n-label="SHARE_F">
                              <span class="socialImg ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon">
                                  <img class="ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon" src="img/social-media/face.svg" alt="Facebook Icon" width="24" height="24" focusable="false" aria-hidden="true">
                              </span>
                              <span class="ecl-link__label" data-i18n="SHARE_F"></span>                  
                          </button>
                          <button class="dropdown-item ecl-link ecl-link--standalone" role="menuitem" onclick="socialNameSpace.linkedIn()" data-i18n-label="SHARE_L">
                              <span class="socialImg ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon">
                                  <img class="ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon" src="img/social-media/linkdin.svg" alt="Linkedin Icon" width="24" height="24" focusable="false" aria-hidden="true">
                              </span>
                              <span class="ecl-link__label" data-i18n="SHARE_L"></span>                  
                          </button>
                      </ul>
                  </li>  
              </ul>
          </div>
      </div>
      
      <div id="chartOptionsMenu" class="d-none">
          <div class="close-button-container">
              <button id="closeChartMenuBtn" class="btn btn-primary close-chart-menu-btn" data-i18n-label="CLOSE">
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
      </div>
      `;
      


      const mobileContent = /*html*/ `
      <div class="">
          <div class="col-12 subNavOne">
              <div class="menuBtn">              
                  <button id="tools" class="btnGroup" type="button" data-i18n-label="TOOLS" data-i18n-title="TOOLS" aria-haspopup="true">
                      <i class="fas fa-ellipsis-h" aria-hidden="true"></i>      
                      <span class="iconText" data-i18n="TOOLS"></span>    
                  </button>
              </div>
              <div class="menuBtn">              
                  <button id="menu" class="btnGroup" type="button" data-i18n-label="MAINMENU" data-i18n-title="MAINMENU" aria-haspopup="true">
                      <i class="fas fa-bars" aria-hidden="true"></i>                    
                      <span class="iconText" data-i18n="MAINMENU"></span>           
                  </button>
              </div>
      
              <div class="chartMenuMobile d-none">
                  <ul id="chartBtns" role="menubar" data-i18n-label="OPTIONS_GRAPH_TOOLBOX" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
                      <li class="nav-item dropdown px-1" id="infoBtnChart" role="none">
                          <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="INFO" data-bs-toggle="dropdown" role="menuitem" data-i18n-title="INFO" aria-haspopup="true" aria-expanded="true" id="INFO">
                              <i class="fas fa-info" aria-hidden="true"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="INFO">     					
                              <button class="dropdown-item" role="menuitem" onclick="openDataset()" data-i18n-label="DATASET" data-i18n="DATASET"></button>
                              <button class="dropdown-item" role="menuitem" onclick="openMeta()" data-i18n-label="META" data-i18n="META"></button>
                              <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.email()" data-i18n-label="FEED" data-i18n="FEED"></button>          		
                              <button class="dropdown-item" role="menuitem" onclick="openBalDefinitions()" data-i18n-label="BALGUIDE" data-i18n="BALGUIDE"></button>          		
                              <button class="dropdown-item" role="menuitem" onclick="tutorial()" data-i18n-label="TUTORIAL" data-i18n="TUTORIAL"></button>                		
                          </ul>
                      </li>
                      <li class="nav-item dropdown px-1" id="downloadChart" role="none">
                          <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="DOWNLOAD_CHART_IMAGE" data-bs-toggle="dropdown" role="menuitem" data-i18n-title="DOWNLOAD_CHART_IMAGE" aria-haspopup="true" aria-expanded="true" id="downloadBtn">
                              <i class="fas fa-download" aria-hidden="true"></i>
                          </button>




                          <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="DOWNLOAD_CHART_IMAGEt">     					
                              <button class="dropdown-item" role="menuitem" onclick="exportJpegChart()" data-i18n-label="DOWNLOAD_CHART_IMAGE" data-i18n="DOWNLOAD_CHART_IMAGE"></button>
                              <button class="dropdown-item" role="menuitem" onclick="exportXlsChart()" data-i18n-label="POPDOWNLOADTABLEEXCEL" data-i18n="POPDOWNLOADTABLEEXCEL"></button>        		
                          </ul>
                      </li>     
      
                      <li class="nav-item dropdown px-1" id="social-media-dropdown" role="none">
                          <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="SHARE" data-bs-toggle="dropdown" role="menuitem" data-i18n-title="SHARE" aria-haspopup="true" aria-expanded="true" id="shareChart1">
                              <i class="fas fa-share-alt" aria-hidden="true"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="Share chart">     					
                              <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.twitter()" data-i18n-label="SHARE_T" data-i18n="SHARE_T"></button>
                              <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.facebook()" data-i18n-label="SHARE_F" data-i18n="SHARE_F"></button>
                              <button class="dropdown-item" role="menuitem" onclick="socialNameSpace.linkedin()" data-i18n-label="SHARE_L" data-i18n="SHARE_L"></button>        		
                          </ul>
                      </li>  
                      <li class="nav-item button px-1" id="embebedChart" role="none">
                          <button id="embebedBtn" data-i18n-title="EMBEDDED_CHART_IFRAME" type="button" class="btn btn-primary min-with--nav round-btn" data-i18n-label="EMBEDDED_CHART_IFRAME" onclick="exportIframe()">
                              <i class="fas fa-code" aria-hidden="true"></i>
                          </button>
                      </li>
                  </ul>
              </div>
      
              <div id="chartOptionsMenu" class="d-none">
                  <div class="close-button-container">
                      <button id="closeChartMenuBtn" class="btn btn-primary close-chart-menu-btn" data-i18n-label="CLOSE">
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











  