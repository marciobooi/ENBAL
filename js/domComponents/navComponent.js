class Navbar {
  constructor() {
    this.createNavbar();
    this.setupInitialLanguage();
    this.setupEventListeners();
  }

  createNavbar() {
    this.navbar = document.createElement('div');
    this.navbar.className = 'navbar navbar-top';
    this.navbar.setAttribute('role', 'navigation');

    this.navbar.innerHTML = `
    <div class="container-fluid">

      <div class="col-6 col-lg-9">
        <div id="header-title">
        <h1 id="header-title-label">${languageNameSpace.labels["pub2"]}</h1>
        </div>
      </div>

      <div class="col-3 col-lg-1" id="lang-section">
      <label for="lang-selection" class="visually-hidden">Select Language:</label>
        <select id="lang-selection" class="form-select langSelect" tabindex="0" aria-labelledby="Select language" aria-expanded="false">
          <option value="EN"><span class="bold">EN</span> English</option>
          <option value="FR"><span class="bold">FR</span> Français</option>
          <option value="DE"><span class="bold">DE</span> Deutsch</option>
        </select>
      </div>

      <div class="col-3  col-lg-2 logo"> 
        <a id="home" href="https://ec.europa.eu/eurostat/web/main/home">
          <img id="eurostatLogo" src="img/logo/estat_RGB_neg.png" alt="Eurostat - Official Logo">
        </a>
      </div>


    </div>`;

    this.langSelection = this.navbar.querySelector("#lang-selection");
  }

  setupInitialLanguage() {
    const initialLanguage = REF.language;
    for (let i = 0; i < this.langSelection.options.length; i++) {
      if (this.langSelection.options[i].value === initialLanguage) {
        this.langSelection.selectedIndex = i;
        break;
      }
    }
  }

  setupEventListeners() {
    this.langSelection.addEventListener("change", this.handleLangSelectionChange.bind(this));
    this.langSelection.addEventListener("keydown", this.handleLangSelectionKeydown.bind(this));

    // Adding the click event listener
    this.langSelection.addEventListener("click", function (event) {
      const isExpanded = this.langSelection.getAttribute("aria-expanded") === "true";
      this.langSelection.setAttribute("aria-expanded", !isExpanded);
    }.bind(this));
  }

  handleLangSelectionChange(event) {
    const selectedValue = this.langSelection.value;
    languageNameSpace.setLanguage(selectedValue);
    REF.language = selectedValue;
  }

  handleLangSelectionKeydown(event) {
    const key = event.key;
    if (key === Key.ARROW_UP && this.langSelection.selectedIndex > 0) {
      this.langSelection.selectedIndex -= 1;
    } else if (key === Key.ARROW_DOWN && this.langSelection.selectedIndex < this.langSelection.options.length - 1) {
      this.langSelection.selectedIndex += 1;
    } else if (key === Key.ENTER) {
      event.preventDefault();
      const selectedValue = this.langSelection.value;
      languageNameSpace.ChangeLanguage(selectedValue);
    }
  }

  addToDOM(targetElement) {
    const container = document.querySelector(targetElement);
    container.appendChild(this.navbar);
  }
}

const Key = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ENTER: "Enter"
};
