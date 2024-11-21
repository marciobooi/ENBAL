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
          <button id="menu" class="btnGroup" type="button" data-i18n-label="MAINMENU" data-i18n-title="MAINMENU" aria-haspopup="menu">
            <i class="fas fa-bars"></i>
            <span data-i18n="MAINMENU">Menu</span>
          </button>
        </div>
        <div class="col-8">
          <div class="text-group">
            <h2 id="title" class="title"></h2>
          </div>
        </div>
        <div class="col-3" role="navigation" aria-label="Chart options">
          <ul id="chartBtns" role="menubar" data-i18n-label="OPTIONS_GRAPH_TOOLBOX" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
            <li class="nav-item dropdown px-1" id="infoBtnChart">
              <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="INFO" data-bs-toggle="dropdown" aria-haspopup="menu" aria-expanded="true" id="INFO">
                <i class="fas fa-info" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="INFO">
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="openDataset()" data-i18n-label="DATASET" data-i18n="DATASET"></button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="openMeta()" data-i18n-label="META" data-i18n="META"></button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="socialNameSpace.email()" data-i18n-label="FEED" data-i18n="FEED"></button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="openBalDefinitions()" data-i18n-label="BALGUIDE" data-i18n="BALGUIDE"></button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="tutorial()" data-i18n-label="TUTORIAL" data-i18n="TUTORIAL"></button>
              </ul>
            </li>
            <li class="nav-item dropdown px-1" id="downloadChart">
              <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="DOWNLOAD_CHART_IMAGE" data-bs-toggle="dropdown" aria-haspopup="menu" aria-expanded="true" id="downloadBtn">
                <i class="fas fa-download" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="DOWNLOAD_CHART_IMAGE">
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="download_DIVPdf()" data-i18n-label="POPDOWNLOADTABLEPDF" data-i18n="POPDOWNLOADTABLEPDF"></button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="exportToExcel()" data-i18n-label="POPDOWNLOADTABLEEXCEL" data-i18n="POPDOWNLOADTABLEEXCEL"></button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="table.button('.exportcsv').trigger();" data-i18n-label="POPDOWNLOADTABLECSV" data-i18n="POPDOWNLOADTABLECSV"></button>
              </ul>
            </li>
            <li class="nav-item button px-1" id="embebedChart">
              <button id="embebedBtn" data-i18n-title="EMBEDDED_CHART_IFRAME" type="button" class="btn btn-primary min-with--nav round-btn" data-i18n-label="EMBEDDED_CHART_IFRAME" onclick="exportIframe()">
                <i class="fas fa-code" aria-hidden="true"></i>
              </button>
            </li>
            <li class="nav-item dropdown px-1" id="social-media-dropdown">
              <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="SHARE" data-bs-toggle="dropdown" aria-haspopup="menu" aria-expanded="true" id="shareChart1">
                <i class="fas fa-share-alt" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" style="padding: 12px;" role="menu" data-i18n-labelledby="SHARE">
                <p class="ecl-social-media-share__description" style="font-weight: normal;" data-i18n="SHARE"></p>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="socialNameSpace.twitter()" data-i18n-label="SHARE_T">
                  <span class="socialImg ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon">
                    <img class="ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon" src="img/social-media/twiter.svg" alt="Twitter Icon" width="24" height="24" focusable="false" aria-hidden="true">
                  </span>
                  <span class="ecl-link__label" data-i18n="SHARE_T"></span>
                </button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="socialNameSpace.facebook()" data-i18n-label="SHARE_F">
                  <span class="socialImg ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon">
                    <img class="ecl-icon ecl-icon--m ecl-link__icon ecl-social-media-share__icon" src="img/social-media/face.svg" alt="Facebook Icon" width="24" height="24" focusable="false" aria-hidden="true">
                  </span>
                  <span class="ecl-link__label" data-i18n="SHARE_F"></span>
                </button>
                <button class="dropdown-item ecl-link ecl-link--standalone" onclick="socialNameSpace.linkedIn()" data-i18n-label="SHARE_L">
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
        <button 
        id="closeChartMenuBtn" 
        class="ecl-button ecl-button--tertiary ecl-modal__close ecl-button--icon-only" 
        type="button" 
        data-i18n-label="CLOSE" 
        aria-expanded="true" 
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
      <div class="col-12 subNavOne" role="navigation" aria-label="Menu navigation">
        <div class="menuBtn">              
          <button id="tools" class="btnGroup" type="button" data-i18n-label="TOOLS" data-i18n-title="TOOLS" aria-haspopup="menu">
            <i class="fas fa-ellipsis-h" aria-hidden="true"></i>      
            <span class="iconText" data-i18n="TOOLS"></span>    
          </button>
        </div>
        <div class="menuBtn">              
          <button id="menu" class="btnGroup" type="button" data-i18n-label="MAINMENU" data-i18n-title="MAINMENU" aria-haspopup="menu">
            <i class="fas fa-bars" aria-hidden="true"></i>                    
            <span class="iconText" data-i18n="MAINMENU"></span>           
          </button>
        </div>
  
        <div class="chartMenuMobile d-none">
          <ul id="chartBtns" role="menubar" data-i18n-label="OPTIONS_GRAPH_TOOLBOX" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
            <li class="nav-item dropdown px-1" id="infoBtnChart">
              <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="INFO" data-bs-toggle="dropdown" aria-haspopup="menu" aria-expanded="true" id="INFO">
                <i class="fas fa-info" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="INFO">     					
                <button class="dropdown-item" onclick="openDataset()" data-i18n-label="DATASET" data-i18n="DATASET"></button>
                <button class="dropdown-item" onclick="openMeta()" data-i18n-label="META" data-i18n="META"></button>
                <button class="dropdown-item" onclick="socialNameSpace.email()" data-i18n-label="FEED" data-i18n="FEED"></button>          		
                <button class="dropdown-item" onclick="openBalDefinitions()" data-i18n-label="BALGUIDE" data-i18n="BALGUIDE"></button>          		
                <button class="dropdown-item" onclick="tutorial()" data-i18n-label="TUTORIAL" data-i18n="TUTORIAL"></button>                		
              </ul>
            </li>
            <li class="nav-item dropdown px-1" id="downloadChart">
              <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="DOWNLOAD_CHART_IMAGE" data-bs-toggle="dropdown" aria-haspopup="menu" aria-expanded="true" id="downloadBtn">
                <i class="fas fa-download" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="DOWNLOAD_CHART_IMAGE">     					
                <button class="dropdown-item" onclick="exportJpegChart()" data-i18n-label="DOWNLOAD_CHART_IMAGE" data-i18n="DOWNLOAD_CHART_IMAGE"></button>
                <button class="dropdown-item" onclick="exportXlsChart()" data-i18n-label="POPDOWNLOADTABLEEXCEL" data-i18n="POPDOWNLOADTABLEEXCEL"></button>        		
              </ul>
            </li>     
  
            <li class="nav-item dropdown px-1" id="social-media-dropdown">
              <button class="btn btn-primary min-with--nav round-btn" type="button" data-i18n-label="SHARE" data-bs-toggle="dropdown" aria-haspopup="menu" aria-expanded="true" id="shareChart1">
                <i class="fas fa-share-alt" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end" role="menu" data-i18n-labelledby="SHARE">     					
                <button class="dropdown-item" onclick="socialNameSpace.twitter()" data-i18n-label="SHARE_T" data-i18n="SHARE_T"></button>
                <button class="dropdown-item" onclick="socialNameSpace.facebook()" data-i18n-label="SHARE_F" data-i18n="SHARE_F"></button>
                <button class="dropdown-item" onclick="socialNameSpace.linkedin()" data-i18n-label="SHARE_L" data-i18n="SHARE_L"></button>        		
              </ul>
            </li>  
            <li class="nav-item button px-1" id="embebedChart">
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
      <div class="col-12 subNavTwo" role="navigation" aria-label="Sub navigation">
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
            this.menuButton.focus();
          });

        }     
    }


      addToDOM(targetElement) {
        const container = document.querySelector(targetElement);
        container.appendChild(this.subNavbar);   
      }
  }











  