let buttonTimer;
let currentStep;
let isOpen = false


function tutorial(buttonTimer) {

	closeTutorial()

	const introProfile = introJs();

	itens = [
		{
			title: languageNameSpace.tutorial["START_TOUR_TITLE"],
			intro: languageNameSpace.tutorial["START_TOUR_TEXT"],
			position: 'auto'
		},
		{
		  element: document.querySelector("#menu"),
		  title: languageNameSpace.tutorial["TUTO_1"],
		  intro: languageNameSpace.tutorial["TUTO_2"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#infoBtn"),
		  title: languageNameSpace.tutorial["TUTO_3"],
		  intro: languageNameSpace.tutorial["TUTO_4"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#downloadBtn"),
		  title: languageNameSpace.tutorial["TUTO_5"],
		  intro: languageNameSpace.tutorial["TUTO_6"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#embebedBtn"),
		  title: languageNameSpace.tutorial["TUTO_7"],
		  intro: languageNameSpace.tutorial["TUTO_8"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("td:nth-child(1) > div > button"),
		  title: languageNameSpace.tutorial["TUTO_9"],
		  intro: languageNameSpace.tutorial["TUTO_10"],
		  position: 'auto'
		},
		{
		  element: document.querySelectorAll(".icoContainer")[0],
		  title: languageNameSpace.tutorial["TUTO_11"],
		  intro: languageNameSpace.tutorial["TUTO_12"],
		  position: 'auto'
		},
	
		{			
		  element: document.querySelector("#shareChart1"),
		  title: languageNameSpace.tutorial["TUTO_21"],
		  intro: languageNameSpace.tutorial["TUTO_22"],
		  position: 'auto'
		},
		{			
		  title: languageNameSpace.tutorial["END_TOUR_TITLE"],
		  intro: languageNameSpace.tutorial["END_TOUR_TEXT"],
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

	traptutorialfocus()
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

  function traptutorialfocus() {	

	const focusableElements = '.introjs-tooltip.customTooltip.introjs-floating a[role="button"][tabindex="0"]:not([tabindex="-1"])';
	const element = document.querySelector('.introjs-tooltip.customTooltip.introjs-floating');

	// log(element)

	if (element) {
	  const focusableContent = element.querySelectorAll(focusableElements);
	  const firstFocusableElement = focusableContent[0];
	  const lastFocusableElement = focusableContent[focusableContent.length - 1];

	  document.addEventListener('keydown', function (e) {
		const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

		if (!isTabPressed) {
		  return;
		}

		if (e.shiftKey) {
		  if (document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus();
			e.preventDefault();
		  }
		} else {
		  if (document.activeElement === lastFocusableElement) {
			firstFocusableElement.focus();
			e.preventDefault();
		  }
		}
	  });

	  // Set initial focus on the first focusable element
	  if (focusableContent.length > 0) {
		firstFocusableElement.focus();
	  }
	}
  };
