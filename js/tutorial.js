let buttonTimer;
let currentStep;
let isOpen = false

function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

function checkAndShowTutorial() {
    const tutorialCookie = getCookie("tutorialeShown");
    if (!tutorialCookie) {
        // If the cookie doesn't exist, show the tutorial and set the cookie
        setTimeout(() => {
            tutorial(); // Function to show the tutorial
            setCookie("tutorialShown", "true", 30); // Set cookie for 30 days
        }, 600);
    }
}


function tutorial(buttonTimer) {

	closeTutorial()

	const introProfile = introJs();

	itens = [
		{
			title: translationsTuturialCache["START_TOUR_TITLE"],
			intro: translationsTuturialCache["START_TOUR_TEXT"],
			position: 'auto'
		},
		{
		  element: document.querySelector("#menu"),
		  title: translationsTuturialCache["TUTO_1"],
		  intro: translationsTuturialCache["TUTO_2"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#INFO"),
		  title: translationsTuturialCache["TUTO_3"],
		  intro: translationsTuturialCache["TUTO_4"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#downloadBtn"),
		  title: translationsTuturialCache["TUTO_5"],
		  intro: translationsTuturialCache["TUTO_6"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("#embebedBtn"),
		  title: translationsTuturialCache["TUTO_7"],
		  intro: translationsTuturialCache["TUTO_8"],
		  position: 'auto'
		},
		{
		  element: document.querySelector("td:nth-child(1) > div > button"),
		  title: translationsTuturialCache["TUTO_9"],
		  intro: translationsTuturialCache["TUTO_10"],
		  position: 'auto'
		},
		{
		  element: document.querySelectorAll(".icoContainer")[0],
		  title: translationsTuturialCache["TUTO_11"],
		  intro: translationsTuturialCache["TUTO_12"],
		  position: 'auto',
		  scrollTo: true,
		  scrollToElement: true,
		},	
		{			
		  element: document.querySelector("#shareChart1"),
		  title: translationsTuturialCache["TUTO_21"],
		  intro: translationsTuturialCache["TUTO_22"],
		  position: 'auto'
		},
		{			
		  title: translationsTuturialCache["END_TOUR_TITLE"],
		  intro: translationsTuturialCache["END_TOUR_TEXT"],
		  position: 'auto'
		},
		]

	introProfile.setOptions({
		showProgress: false,
		scrollToElement: true,
		showBullets: false,
		autoPosition:false,
		tooltipClass: "customTooltip",
		exitOnEsc: true,
		nextLabel:  translationsCache['NEXT'],
		prevLabel: translationsCache['BACK'],
		doneLabel: translationsCache['CLOSE'],
		steps: itens
	  });  	 
	  
	  introProfile.onexit(function () { window.scrollTo(0, 0) });

	  const observer = new MutationObserver(() => {
		// Locate the tooltip and title elements
		const tooltip = document.querySelector('.introjs-tooltip');
		const currentStep = introProfile._currentStep; 
		
		if (tooltip) {
		  const titleId = `introjs-title-${currentStep}`;
		  
		  const titleElement = tooltip.querySelector('.introjs-tooltip-title');
		  if (titleElement) {
			titleElement.id = titleId;
			tooltip.setAttribute('aria-labelledby', titleId);
		  }
		}
	  });
	  
	  observer.observe(
		document.body,
		{
		  childList: true, 
		  subtree: true,
		}
	  );


	horizontalNavigation(1800, event);


		  introProfile.start();

  
	  isOpen = true

	  introProfile.onchange(function () {

		currentStep = this._currentStep



		if (currentStep === 0) {
			document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").innerHTML = translationsCache['CLOSE']
			setTimeout(() => {
				$("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton.introjs-disabled").addClass( "close" )
			}, 100);
		}  else {
			document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").innerHTML = translationsCache['BACK']
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

	document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").innerHTML = translationsCache['CLOSE']
	$("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-prevbutton").addClass( "close " )

	traptutorialfocus()
}

function horizontalNavigation(position, event) {
	$('.dt-scroll-body').scrollLeft(position);
	
}

function closeTutorial() {
	isOpen = false
	$('button#INFO').focus();
}

btn = document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton")
$(document).on('click', btn, function() {
	clearTimeout(buttonTimer)	
});

function closeProcess(params) {
	horizontalNavigation(-1800, event);
	event.preventDefault();
	introJs().exit()
	buttonTimer = setTimeout("introJs().exit()", 4000);
	clearTimeout(buttonTimer);
	document.querySelector("#tb-tutorial-btn");
	// const button = document.getElementById('tb-tutorial-btn');
	$('button#INFO').focus();
	isOpen = false
}

$(document).on("click keydown", "#tutorialClose", function(event) {
	const isClickEvent = event.type === "click";
	const isKeyEvent = event.type === "keydown" && (event.key === "Escape" || event.key === "Enter" || event.keyCode === 13);
	if (isClickEvent || isKeyEvent) {
		closeProcess();
		$('button#INFO').focus();
		horizontalNavigation(-1800, event);
	}
  });


$(document).on("click keydown", ".close", function(event) {
	const isClickEvent = event.type === "click";
	const isKeyEvent = event.type === "keydown" && (event.key === "Escape" || event.key === "Enter" || event.keyCode === 13);
	if (isClickEvent || isKeyEvent) {
		closeProcess();
		$('button#INFO').focus();
		horizontalNavigation(-1800, event);
	}
});

  document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		if(isOpen){
			closeProcess()
			$('button#INFO').focus();
			horizontalNavigation(-1800, event);
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
