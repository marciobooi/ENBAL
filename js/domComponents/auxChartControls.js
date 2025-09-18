class ChartControls {
	constructor() {
	  this.controls = document.createElement("div");
	  // Instance variables to store chart button references
	  this.barChart = null;
	  this.pieChart = null;
	  this.lineChart = null;
  
	  const select = document.createElement("select");
	  // select.id = REF.chartId;
	  select.classList.add("form-select", "mx-2");
	  select.setAttribute("aria-label", "Select flow");
  
	  const notMobileContent = `
		
		  <nav aria-label="Chart controls" id="chartControls" class="navbar navbar-expand-sm navbar-light bg-light navChartControls">
			<div class="">
			  <div id="auxChartTitle">
				<h2 id="title" class="title">title</h2>
				<h6 id="subtitle" class="subtitle">subtitle</h6>
			  </div>
			  <div class="menu">
				<ul id="chartBtns" aria-label="options graph toolbox" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
				  <li class="nav-item button px-1" id="toggleBarChart" role="none"></li>
				  <li class="nav-item button px-1" id="togglePieChart" role="none"></li>
				  <li class="nav-item button px-1" id="toggleLineChart" role="none"></li>
				  <li class="nav-item button px-1" id="toggleAuxTable" role="none" style="margin-left: 1rem; margin-right: 2rem;"></li>

				  <li class="nav-item button px-1" id="printChart" role="none"></li>
				  <li class="nav-item dropdown px-1" id="downloadChart" role="none"></li>
				  <li class="nav-item button px-1" id="downloadExcel" role="none"></li>
				  <li class="nav-item button px-1" id="embebedChart" role="none" style="margin-left: 1rem; margin-right: 2rem;"></li>
				  <li class="nav-item button px-1" id="closeChart" role="none"></li>
				</ul>
			  </div>
			</div>
		  </nav>
		`;
  
	  const mobileContent = `
		<div id="chartOptions">
		  <div class="col-12 subNavOne auxChartbtn">
			<button id="tools" class="btnGroup pe-2" type="button" data-i18n="TOOLS" data-i18n-title="TOOLS" aria-haspopup="true">
			  <i class="fas fa-ellipsis-h" aria-hidden="true"></i>
			  <span class="iconText" data-i18n="TOOLS"></span>
			</button>
			<div class="menu d-none">
			  <ul id="chartBtns" aria-label="options graph toolbox" class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 50vw;">
				<li class="nav-item button px-1" id="toggleBarChart" role="none"></li>
				<li class="nav-item button px-1" id="togglePieChart" role="none"></li>
				<li class="nav-item button px-1" id="toggleLineChart" role="none"></li>
				<li class="nav-item button px-1" id="printChart" role="none"></li>
				<li class="nav-item dropdown px-1" id="downloadChart" role="none"></li>
				<li class="nav-item button px-1" id="downloadExcel" role="none"></li>
				<li class="nav-item button px-1" id="embebedChart" role="none"></li>
				<li class="nav-item button px-1" id="closeChart" role="none"></li>
			  </ul>
			</div>
		  </div>
		  <div class="col-12 subNavTwo">
			<div id="auxChartTitle">
			  <h2 id="title" class="title">title</h2>
			  <h6 id="subtitle" class="subtitle">subtitle</h6>
			</div>
		  </div>
		</div>`;	
		
  
	  if (isMobile) {
		log(isMobile);
		this.controls.innerHTML = mobileContent;
		this.toolsButton = this.controls.querySelector("#tools");
		this.chartToolsMenu = this.controls.querySelector(".menu");
  
		this.toolsButton.addEventListener("click", () => {
		  this.chartToolsMenu.classList.toggle("d-none");
		  this.toolsButton.style.display = "none";
		});
	  } else {
		this.controls.innerHTML = notMobileContent;
	  }
	}
  
	addToDOM(targetElement) {
	  $("#menuToolbar").toggle();	
	  const container = document.querySelector(targetElement);
	  container.insertBefore(this.controls, container.firstChild);




	    // Create the button instances
		this.barChart = new Button("barChart", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPBARCHART", "barChart", "true");
		this.pieChart = new Button("pieChart", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPPIECHART", "pieChart", "false");
		this.lineChart = new Button("lineChart", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPLINECHART", "lineChart", "false");
		const table = new Button("toggleTableBtn", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPTABLE", "table", "false");

		// const createprintChart = new Button("printBtn", ["btn", "btn-primary", "min-with--nav", "round-btn"], "Print chart", "false");
		const downloadChart = new Button("downloadBtn", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPDOWNLOADTABLEPDF", "false");
		const downloadExcel = new Button("excelBtn", ["btn", "btn-primary", "min-with--nav", "round-btn"], "POPDOWNLOADTABLEEXCEL", "false");
		const embebedeChart = new Button("embebedBtn", ["btn", "btn-primary", "min-with--nav", "round-btn"], "EMBEDDED_CHART_IFRAME", "false");
		const closeChart = new Button("btnCloseModalChart", ["btn", "btn-primary", "min-with--nav", "round-btn"], "CLOSE", "false");
	
		// Set inner HTML content for each button
		this.barChart.setInnerHtml('<i class="fas fa-chart-bar" aria-hidden="true"></i>');
		this.pieChart.setInnerHtml('<i class="fas fa-chart-pie" aria-hidden="true"></i>');
		this.lineChart.setInnerHtml('<i class="fas fa-chart-line" aria-hidden="true"></i>');
		table.setInnerHtml('<i class="fas fa-table"></i>');
		// createprintChart.setInnerHtml('<i class="fas fa-print" aria-hidden="true"></i>');
		downloadChart.setInnerHtml('<i class="fas fa-download" aria-hidden="true"></i>');
		downloadExcel.setInnerHtml('<i class="fas fa-file-excel" aria-hidden="true"></i>');
		embebedeChart.setInnerHtml('<i class="fas fa-code" aria-hidden="true"></i>');
		closeChart.setInnerHtml('<i class="fas fa-times" aria-hidden="true"></i>');
	
		// Set click handlers for each button
		this.barChart.setClickHandler(() => {
		  chartType = "barChart"
		  REF.chart = chartType;
		//   console.log('Bar chart clicked, REF.chart set to:', REF.chart);
		  disableChatOptionsBtn();
		  handleChartAction(chartType, chartBal, chartBalText);
		});
		this.pieChart.setClickHandler(() => {
		  chartType = "pieChart"
		  REF.chart = chartType;
		//   console.log('Pie chart clicked, REF.chart set to:', REF.chart);
		  disableChatOptionsBtn();
		  handleChartAction(chartType, chartBal, chartBalText);
		});
		this.lineChart.setClickHandler(() => {
		  chartType = "lineChart"
		  REF.chart = chartType;
		//   console.log('Line chart clicked, REF.chart set to:', REF.chart);
		  disableChatOptionsBtn();
		  handleChartAction(chartType, chartBal, chartBalText);
		});
		table.setClickHandler(function() {

			const tableBtn = document.querySelector("#toggleTableBtn");
			const tableIcon = document.querySelector("#toggleTableBtn > i");
			
			if (tableIcon.classList.contains("fa-table")) {
				tableIcon.classList.remove("fa-table");
				tableIcon.classList.add("fa-chart-bar");
			
				tableBtn.setAttribute('aria-label', 'Toggle chart');
				tableBtn.setAttribute('title', 'Toggle chart');
				tableBtn.setAttribute('aria-pressed', 'true');

				// Use the Button class methods to disable all chart buttons
				const chartControls = auxiliarBarGraphOptions;
				if (chartControls) {
					chartControls.barChart.setDisabled(true);
					chartControls.barChart.setPressed(false);
					chartControls.pieChart.setDisabled(true);
					chartControls.pieChart.setPressed(false);
					chartControls.lineChart.setDisabled(true);
					chartControls.lineChart.setPressed(false);
				}

				$("#"+REF.chart).addClass('highlighDisbleBtn');

				$('#menuSwitch').css('display','none')
			
				openVizTable();

				tableBtn.focus();
			} else {
				tableIcon.classList.remove("fa-chart-bar");
				tableIcon.classList.add("fa-table");
			
				tableBtn.setAttribute('aria-label', 'Toggle table');
				tableBtn.setAttribute('title', 'Toggle table');
				tableBtn.setAttribute('aria-pressed', 'false');

				$('#menuSwitch').css('display','flex')
			
				closeTable();

				$("#"+REF.chart).removeClass('highlighDisbleBtn');

				// Restore chart button states using Button class methods
				disableChatOptionsBtn();

				tableBtn.focus();


			}			
		});
		// createprintChart.setClickHandler(function() {
		// 	exportHandling(this.id);
		// });
		downloadChart.setClickHandler(function() {
			exportHandling(this.id);
		});
		downloadExcel.setClickHandler(function() {
			exportHandling(this.id);
		});
		embebedeChart.setClickHandler(function() {
			exportIframe();
		});
		closeChart.setClickHandler(function() {
		  removeAuxiliarBarGraphOptions();
		  auxiliarBarGraphOptions = undefined
		  closeTable()
		});

		  	  // Create the button elements
			const barChartElement = this.barChart.createButton();
			const pieChartElement = this.pieChart.createButton();
			const lineChartElement = this.lineChart.createButton();
			const tableChartElement = table.createButton();
			// const printChartElement = createprintChart.createButton();
			const downloadChartElement = downloadChart.createButton();
			const downloadExcelElement = downloadExcel.createButton();
			const embebedeChartElement = embebedeChart.createButton();
			const closeChartElement = closeChart.createButton();

		
			// Append the button elements to the document
			document.getElementById("toggleBarChart").appendChild(barChartElement);
			document.getElementById("togglePieChart").appendChild(pieChartElement);
			document.getElementById("toggleLineChart").appendChild(lineChartElement);
			document.getElementById("toggleAuxTable").appendChild(tableChartElement);
			// document.getElementById("printChart").appendChild(printChartElement);
			document.getElementById("downloadChart").appendChild(downloadChartElement);
			document.getElementById("downloadExcel").appendChild(downloadExcelElement);
			document.getElementById("embebedChart").appendChild(embebedeChartElement);
			document.getElementById("closeChart").appendChild(closeChartElement);

			loadTranslations(REF.language);	}
  
	removeFromDOM() {
	  let navElement;
	  if (isMobile) {
		navElement = document.querySelector("#chartOptions");
	  } else {
		navElement = document.querySelector("div > nav.navChartControls");
	  }
  
	  if (navElement) {
		const parentContainer = navElement.closest("#subnavbar-container > div");
		if (parentContainer) {
		  parentContainer.parentNode.removeChild(parentContainer);
		}
	  }
	  $("#menuToolbar").toggle();
	}
  }
  
  function disableChatOptionsBtn(chartid) {
	// console.log('disableChatOptionsBtn called with REF.chart:', REF.chart);
	
	// Get the chart controls instance to access button references
	const chartControls = auxiliarBarGraphOptions;
	// console.log('chartControls found:', chartControls);
	
	if (!chartControls) return;

	const chartButtons = [
	  { name: "barChart", button: chartControls.barChart },
	  { name: "pieChart", button: chartControls.pieChart },
	  { name: "lineChart", button: chartControls.lineChart }
	];
	
	chartButtons.forEach(({ name, button }) => {
	//   console.log(`Processing button ${name}, current chart: ${REF.chart}`);
	  if (REF.chart === name) {
		// Current active chart - disabled (can't click again) and pressed (shows current state)
		// console.log(`Setting ${name} as active (disabled=true, pressed=true)`);
		button.setDisabled(true);
		button.setPressed(true);
	  } else {
		// Inactive charts - enabled (can be clicked) and not pressed
		// console.log(`Setting ${name} as inactive (disabled=false, pressed=false)`);
		button.setDisabled(false);
		button.setPressed(false);
	  }
	});
  }
  