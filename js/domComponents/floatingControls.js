class FloatingChartControls {
  constructor() {
    this.chartControls = document.createElement('div');
    this.chartControls.className = 'menuSwitch';
    this.chartControls.id = 'menuSwitch';
    // Instance variables to store button references
    this.percentageButton = null;
    this.agregatesButton = null;

    this.chartControls.innerHTML = /*html*/` 
    <div id="switchBtn">
    <label id="HIDE" class="form-check-label" for="switchDetails" data-i18n="HIDEDETAILS" aria-hidden="${REF.details == 1 ? false : true}"></label>
    <div class="form-check form-switch d-inline-block">
      <input
        class="form-check-input focus-ring"
        type="checkbox"
        value="${REF.details == 1 ? '1' : '0'}"
        role="switch"
        id="switchDetails"
        ${REF.details == 1 ? 'checked' : ''}
        data-i18n-label="${REF.details == 1 ? 'HIDEDETAILS' : 'DETAILS'}"
      >
      <label id="SHOW" class="form-check-label" for="switchDetails" data-i18n="DETAILS" aria-hidden="${REF.details == 1 ? true : false}"></label>
    </div>
  </div>
  
  
      <div>   
        <ul id="floatingMenu">   
          <li class="nav-item px-1" id="togglePercentage" role="none" style="display:${REF.details == 1 ? "" : "none"}"></li>
          <li class="nav-item px-1" id="Agregates" role="none"></li>			  
            <li class="nav-item dropdown px-1" id="ChartOrder" role="none">
              <ul class="dropdown-menu dropdown-menu-end" role="menu">     
                <li><a href="#" id="DESC" class="dropdown-item ecl-link notLink ${REF.order == "DESC" ? "selected" : ""}" role="menuitem" data-i18n-label="DESC" value="DESC" data-i18n="DESC"></a></li>					
                <li><a href="#" id="ASC" class="dropdown-item ecl-link notLink ${REF.order == "ASC" ? "selected" : ""}" aria-selected="true" role="menuitem" data-i18n-label="ASC" value="ASC" data-i18n="ASC"></a></li>
                <li><a href="#" id="ALPHA" class="dropdown-item ecl-link notLink ${REF.order == "ALPHA" ? "selected" : ""}" role="menuitem" data-i18n-label="ALPHA" value="ALPHA" data-i18n="ALPHA"></a></li> 
                <li><a href="#" id="PROTO" class="dropdown-item ecl-link notLink ${REF.order == "PROTO" ? "selected" : ""}" role="menuitem" data-i18n-label="PROTO" value="PROTO" data-i18n="PROTO"></a></li>
              </ul>
            </li>

            <li class="nav-item px-1" id="toggleTable" role="none"></li>
        </ul>
      </div>`;


    this.dopdownListSelect();

    // Get all the switch elements
    const switchElements = this.chartControls.querySelectorAll('[role="switch"]');

    // Add event listeners for keyboard navigation
    switchElements.forEach(switchElement => {

      const updateSwitchState = () => { 

        const isChecked = switchElement.checked;
        REF.details = isChecked ? 1 : 0; // 1 means "Show Details"
        REF.chartInDetails = REF.details;

        const hide = document.getElementById('HIDE');
        const show = document.getElementById('SHOW');   

        hide.style.fontWeight = isChecked ? "bold" : "initial";
        hide.setAttribute("aria-hidden", isChecked ? "false" : "true");    
        show.style.fontWeight = isChecked ? "initial" : "bold";
        show.setAttribute("aria-hidden", isChecked ? "true" : "false");    
        // aria-label should reflect the current visual state (what's bold/active)
        switchElement.setAttribute("aria-label", isChecked ? translationsCache['HIDEDETAILS'] : translationsCache['DETAILS'] );
        
          
        const percentageButton = this.chartControls.querySelector('#togglePercentage');
        percentageButton.style.display = REF.details == 1 ? '' : 'none';
        REF.stacking = "normal"
        populateDropdownData()
        createBarChart()


      }

      switchElement.addEventListener("click", updateSwitchState);

      switchElement.addEventListener("keyup", (e) => {
        if (e.key === "Enter" || e.key === 32) {
          e.preventDefault();
          switchElement.checked = !switchElement.checked; 
          updateSwitchState();
        }
      });

  
          
       });
  }

  setSelectedOrder() {
    const dropdownItems = this.chartControls.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.classList.remove('selected');
      if (item.getAttribute('value') === REF.order) {
        item.classList.add('selected');
      }
    });
  }

  dopdownListSelect() {
    const dropdownItems = this.chartControls.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove 'selected' class from all items
        dropdownItems.forEach(item => {
          item.classList.remove('selected');
        });

        // Add 'selected' class to the clicked item
        item.classList.add('selected');

        // Set the aria-selected attribute
        dropdownItems.forEach(item => {
          item.setAttribute('aria-selected', 'false');
        });
        item.setAttribute('aria-selected', 'true');

        const selectedValue = item.getAttribute('value');
        REF.order = selectedValue; // Update REF.order with the selected value

        this.setSelectedOrder();
        createBarChart()

      });
    });
  }

  toggleChartPercentage() {
    REF.stacking = REF.stacking == "normal" ? "percent" : "normal";
    
    // Update aria-label to reflect current visual state (what's active/pressed)
    if (this.percentageButton && this.percentageButton.buttonElement) {
      const isShowingPercentages = REF.stacking === "percent";
      // When button is pressed (showing percentages), aria-label should say "Hide percentages"
      // When button is not pressed (not showing percentages), aria-label should say "Show percentages"
      const ariaLabel = isShowingPercentages ? 
        translationsCache['HIDEPERCENTAGES'] : 
        translationsCache['POPPERCENTAGES'];
      this.percentageButton.buttonElement.setAttribute('aria-label', ariaLabel);
      this.percentageButton.buttonElement.setAttribute('title', ariaLabel);
    }
    
    createBarChart()
  }

  toggleChartAgregates() {
    REF.agregates = REF.agregates == 0 ? 1 : 0;

    // Update aria-label to reflect current visual state (what's active/pressed)
    if (this.agregatesButton && this.agregatesButton.buttonElement) {
      const isShowingAgregates = REF.agregates === 1;
      // When button is pressed (showing aggregates), aria-label should say "Hide aggregates"  
      // When button is not pressed (not showing aggregates), aria-label should say "Show aggregates"
      const ariaLabel = isShowingAgregates ? 
        translationsCache['HIDEAGREGATES'] : 
        translationsCache['TOGGLEAGREGATES'];
      this.agregatesButton.buttonElement.setAttribute('aria-label', ariaLabel);
      this.agregatesButton.buttonElement.setAttribute('title', ariaLabel);
    }

    createBarChart();
  }

  updateButtonAriaLabels() {
    // Update percentage button aria-label to reflect current visual state
    if (this.percentageButton && this.percentageButton.buttonElement) {
      const isShowingPercentages = REF.stacking === "percent";
      // When pressed (showing percentages): aria-label should be "Hide percentages"
      // When not pressed (not showing percentages): aria-label should be "Show percentages"
      const percentageLabel = isShowingPercentages ? 
        translationsCache['HIDEPERCENTAGES'] : 
        translationsCache['POPPERCENTAGES'];
      this.percentageButton.buttonElement.setAttribute('aria-label', percentageLabel);
      this.percentageButton.buttonElement.setAttribute('title', percentageLabel);
    }

    // Update aggregates button aria-label to reflect current visual state
    if (this.agregatesButton && this.agregatesButton.buttonElement) {
      const isShowingAgregates = REF.agregates === 1;
      // When pressed (showing aggregates): aria-label should be "Hide aggregates"  
      // When not pressed (not showing aggregates): aria-label should be "Show aggregates"
      const agregatesLabel = isShowingAgregates ? 
        translationsCache['HIDEAGREGATES'] : 
        translationsCache['TOGGLEAGREGATES'];
      this.agregatesButton.buttonElement.setAttribute('aria-label', agregatesLabel);
      this.agregatesButton.buttonElement.setAttribute('title', agregatesLabel);
    }
  }

  toggleIcons() {
    const tableIcon = this.chartControls.querySelector('#table-icon');
    const chartIcon = this.chartControls.querySelector('#chart-icon');
    const toggleButton = this.chartControls.querySelector('#tb-togle-table');
  
  
    tableIcon.style.display = tableIcon.style.display === 'none' ? '' : 'none';
    chartIcon.style.display = chartIcon.style.display === 'none' ? '' : 'none';
  
    if (tableIcon.style.display === 'none') {
      toggleButton.setAttribute('aria-label', 'Toggle chart');
      toggleButton.title = 'Toggle chart';
      openVizTable()
    } else {
      toggleButton.setAttribute('aria-label', 'Toggle table');
      toggleButton.title = 'Toggle table';      
      closeTable()
    }
  }


  
  addToDOM(targetElement) {
    const container = document.querySelector(targetElement);
    container.appendChild(this.chartControls);

    const self = this; 

		this.percentageButton = new Button("tb-togle-percentage", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPPERCENTAGES", "", "true");
		this.agregatesButton = new Button("toggleAgregates", ["btn", "btn-primary", "min-with--nav", "round-btn"], "TOGGLEAGREGATES", "", "true");
		// const tableButton = new Button("tb-togle-table", ["btn", "btn-primary", "min-with--nav", "round-btn"], "Toggle table", "", "true");
		const orderButton = new Button("tb-togle-order", ["btn", "btn-primary", "min-with--nav", "round-btn"], "ORDER", "", "true");

    this.percentageButton.setInnerHtml('<i id="percentage-icon" class="fas fa-percentage" aria-hidden="true"></i>');
    this.agregatesButton.setInnerHtml(agregateIcon())
    // tableButton.setInnerHtml('<i id="table-icon" class="fas fa-table" aria-hidden="true"></i><i id="chart-icon" class="fas fa-chart-bar" style="display: none;" aria-hidden="true"></i>');
    orderButton.setInnerHtml('<i class="fas fa-sort-amount-down" aria-hidden="true"></i>');

    this.percentageButton.setClickHandler(function() {
      self.toggleChartPercentage(); // Call the class method using the stored reference
    });

    this.agregatesButton.setClickHandler(function() {
      self.toggleChartAgregates(); // Call the class method using the stored reference
    });

    // tableButton.setClickHandler(function() {
    //   self.toggleIcons(); // Call the class method using the stored reference
    // });

    const percentageElement = this.percentageButton.createButton();
    const agregatesElement = this.agregatesButton.createButton();
    // const tableElement = tableButton.createButton();
    const orderElement = orderButton.createButton();
    

    document.getElementById("togglePercentage").appendChild(percentageElement);
    document.getElementById("Agregates").appendChild(agregatesElement);
    // document.getElementById("toggleTable").appendChild(tableElement);
    document.getElementById("ChartOrder").appendChild(orderElement);

    // Set initial aria-labels based on current state
    this.updateButtonAriaLabels();

    const dropdownOrderBtn = document.querySelector("#tb-togle-order")

 

    dropdownOrderBtn.setAttribute("data-bs-toggle", "dropdown");
    dropdownOrderBtn.setAttribute("role", "menuitem");
    dropdownOrderBtn.setAttribute("aria-haspopup", "true");
    dropdownOrderBtn.setAttribute("data-bs-auto-close", "true");
    dropdownOrderBtn.setAttribute("aria-expanded", "false");
    dropdownOrderBtn.setAttribute("data", "dropdown");

    hideMenuSwitch()

  }
}


$(document).on('shown.bs.dropdown', function(event) {
const floatingChartControls = new FloatingChartControls(); // Replace this with a reference to the actual instance of the class
  floatingChartControls.setSelectedOrder();
});

// On dropdown close
$(document).on('hidden.bs.dropdown', function(event) {
  var dropdown = $(event.target);
  
  // Set aria-expanded to false        
  dropdown.find('.dropdown-menu').attr('aria-expanded', false);
  
  // Set focus back to dropdown toggle
  dropdown.find('.dropdown-toggle').focus();
});

