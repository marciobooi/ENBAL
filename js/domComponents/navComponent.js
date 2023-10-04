class Navbar {
  constructor() {
    this.navbar = document.createElement('div');
    this.navbar.className = 'navbar navbar-top';

    this.navbar.innerHTML = `
      <div class="container-fluid">
        <div class="col-5 col-xs-6">
          <div id="header-title">
            <h1 id="header-title-label"></h1>
          </div>
        </div>
        <div class="col-3 col-xs-3" id="lang-section">
          <select id="lang-selection" class="form-select langSelect" tabindex="0" aria-labelledby="Select language">
            <option value="EN"><span class="bold">EN</span> English</option>
            <option value="FR"><span class="bold">FR</span> Français</option>
            <option value="DE"><span class="bold">DE</span> Deutsch</option>
          </select>
        </div>
        <div class="col-4  col-xs-3 social-media-section">
        <div id="social-media" class="me-4 d-flex">
          <button type="button" class="btn btn-primary social-media-icon" onclick="socialNameSpace.twitter();">
            <i class="fab fa-twitter fa-lg" aria-hidden="true"></i>
            <span class="visually-hidden">Share on Twitter</span>
          </button>
          <button type="button" class="btn btn-primary social-media-icon" onclick="socialNameSpace.facebook();">
            <i class="fab fa-facebook fa-lg" aria-hidden="true"></i>
            <span class="visually-hidden">Share on facebook</span>
          </button>
          <button type="button" class="btn btn-primary social-media-icon" onclick="socialNameSpace.linkedIn();">
            <i class="fab fa-linkedin fa-lg" aria-hidden="true"></i>
            <span class="visually-hidden">Share on linkedin</span>
          </button>
        </div>
          <a id="home" href="https://ec.europa.eu/eurostat/web/main/home">
            <img id="eurostatLogo" src="img/estat_RGB_neg.png" alt="Eurostat - Home">
          </a>
        </div>
      </div>`;

        this.langSelection = this.navbar.querySelector("#lang-selection");
        const initialLanguage = REF.language; // Assuming REF.language holds the selected language value
          for (let i = 0; i < this.langSelection.options.length; i++) {
            if (this.langSelection.options[i].value === initialLanguage) {
              this.langSelection.selectedIndex = i;
              break;
            }
          }

    const langSelection = this.navbar.querySelector("#lang-selection");
    langSelection.addEventListener("change", function (event) {
      const selectedValue = langSelection.value;
      languageNameSpace.ChangeLanguage(selectedValue);
    });

    langSelection.addEventListener("keydown", function (event) {
      const key = event.key;
      if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault(); // Prevent default scrolling behavior

        const currentIndex = langSelection.selectedIndex;
        if (key === "ArrowUp" && currentIndex > 0) {
          langSelection.selectedIndex = currentIndex - 1;
        } else if (key === "ArrowDown" && currentIndex < langSelection.options.length - 1) {
          langSelection.selectedIndex = currentIndex + 1;
        }
      } else if (key === "Enter") {
        event.preventDefault(); // Prevent form submission
        const selectedValue = langSelection.value;
        languageNameSpace.ChangeLanguage(selectedValue);
      }
    });
  }

  addToDOM(targetElement) {
    const container = document.querySelector(targetElement);
    container.appendChild(this.navbar);
  }
}
