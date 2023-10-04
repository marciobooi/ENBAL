let buttonTimer;
let currentStep;
let isOpen = false


function tutorial(buttonTimer) {

	closeTutorial()

	const introProfile = introJs();

	itens = [
		{
			element: document.querySelector("#find-more-menu-icon"),
			title: languageNameSpace.tutorial["TUTO_1"],
			intro: languageNameSpace.tutorial["TUTO_2"],
			position: 'auto'
		},
		{			
		  element: document.querySelector("rect.highcharts-point.highcharts-color-0:nth-child(2)"),
		  title: languageNameSpace.tutorial["TUTO_3"],
		  intro: languageNameSpace.tutorial["TUTO_4"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#menu"),
		  title: languageNameSpace.tutorial["TUTO_5"],
		  intro: languageNameSpace.tutorial["TUTO_6"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#tb-togle-table"),
		  title: languageNameSpace.tutorial["TUTO_7"],
		  intro: languageNameSpace.tutorial["TUTO_8"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#tb-togle-order"),
		  title: languageNameSpace.tutorial["TUTO_9"],
		  intro: languageNameSpace.tutorial["TUTO_10"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#toggleAgregates"),
		  title: languageNameSpace.tutorial["TUTO_11"],
		  intro: languageNameSpace.tutorial["TUTO_12"],
		  position: 'auto'
		},
		{			
		  element: document.querySelector("#infoBtn"),
		  title: languageNameSpace.tutorial["TUTO_13"],
		  intro: languageNameSpace.tutorial["TUTO_14"],
		  position: 'auto'
		},
		{			
		  element: document.querySelector("#downloadBtn"),
		  title: languageNameSpace.tutorial["TUTO_15"],
		  intro: languageNameSpace.tutorial["TUTO_16"],
		  position: 'auto'
		},
		{			
		  element:document.querySelector("#embebedBtn"),
		  title: languageNameSpace.tutorial["TUTO_17"],
		  intro: languageNameSpace.tutorial["TUTO_18"],
		  position: 'auto'
		},
		{			
		  element: document.querySelector("#lang-selection"),
		  title: languageNameSpace.tutorial["TUTO_19"],
		  intro: languageNameSpace.tutorial["TUTO_20"],
		  position: 'auto'
		},
		{			
		  element: document.querySelector("#social-media"),
		  title: languageNameSpace.tutorial["TUTO_21"],
		  intro: languageNameSpace.tutorial["TUTO_22"],
		  position: 'auto'
		},
		]

	introProfile.setOptions({
		showProgress: false,
		scrollToElement: false,
		showBullets: false,
		autoPosition:false,
		tooltipClass: "customTooltip",
		exitOnEsc: true,
		nextLabel:  languageNameSpace.labels['tutNEXT'],
		prevLabel: languageNameSpace.labels['tutBACK'],
		doneLabel: languageNameSpace.labels['tutFINISH'],
		steps: itens
	  });  	 
	  
	  introProfile.onexit(function () { window.scrollTo(0, 0) });

	  introProfile.start();
  
	  isOpen = true

	  introProfile.onchange(function () {

		currentStep = this._currentStep

		if (currentStep === 0) {
			document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").innerHTML = languageNameSpace.labels['tutFINISH']
			setTimeout(() => {
				$("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton.introjs-disabled").addClass( "close" )
			}, 100);
		} else {
			document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").innerHTML = languageNameSpace.labels['tutBACK']
			$("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").removeClass( "close" )

			$(".introjs-tooltip.customTooltip.introjs-auto").css({
				"left": "50% !important",
				"top": "50%",
				"margin-left": "auto",
				"margin-top": "auto",
				"transform": "translate(-50%,-50%)"
			})
	}

			});

	$("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltip-header > a").attr({
		"alt": "Close",
		"id": "tutorialClose",
		"tabindex": "0",
		"href": "javascript:",
		"class": "btn btn-primary min-with--nav"
	});

	document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").innerHTML = languageNameSpace.labels['tutFINISH']
	$("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").addClass( "close " )


}

function closeTutorial() {
	buttonTimer = setTimeout("introJs().exit()", 4000);	
	isOpen = false
}

btn = document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton")
$(document).on('click', btn, function() {
	clearTimeout(buttonTimer)	
});

function closeProcess(params) {
	event.preventDefault();
	introJs().exit()
	buttonTimer = setTimeout("introJs().exit()", 4000);
	clearTimeout(buttonTimer);
	document.querySelector("#tb-tutorial-btn");
	// const button = document.getElementById('tb-tutorial-btn');
	// button.focus();
	isOpen = false
}

$(document).on("click keydown", "#tutorialClose", function(event) {
	const isClickEvent = event.type === "click";
	const isKeyEvent = event.type === "keydown" && (event.key === "Escape" || event.key === "Enter" || event.keyCode === 13);
	if (isClickEvent || isKeyEvent) {
		closeProcess();
	}
  });


$(document).on("click keydown", ".close", function(event) {
	const isClickEvent = event.type === "click";
	const isKeyEvent = event.type === "keydown" && (event.key === "Escape" || event.key === "Enter" || event.keyCode === 13);
	if (isClickEvent || isKeyEvent) {
		closeProcess();
	}
});

  document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		if(isOpen){
			closeProcess()
		} 
	}
  });


