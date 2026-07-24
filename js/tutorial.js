let driverObj;

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

function tutorial() {

	closeTutorial()

	if (driverObj) {
		driverObj.destroy();
	}

	const steps = [
		{
			popover: {
				title: translationsTuturialCache["START_TOUR_TITLE"],
				description: translationsTuturialCache["START_TOUR_TEXT"]
			}
		},
		{
			element: "#menu",
			popover: {
				title: translationsTuturialCache["TUTO_1"],
				description: translationsTuturialCache["TUTO_2"]
			}
		},
		{
			element: "#INFO",
			popover: {
				title: translationsTuturialCache["TUTO_3"],
				description: translationsTuturialCache["TUTO_4"]
			}
		},
		{
			element: "#downloadBtn",
			popover: {
				title: translationsTuturialCache["TUTO_5"],
				description: translationsTuturialCache["TUTO_6"]
			}
		},
		{
			element: "#embebedBtn",
			popover: {
				title: translationsTuturialCache["TUTO_7"],
				description: translationsTuturialCache["TUTO_8"]
			}
		},
		{
			element: "td:nth-child(1) > div > button",
			popover: {
				title: translationsTuturialCache["TUTO_9"],
				description: translationsTuturialCache["TUTO_10"]
			}
		},
		{
			element: ".icoContainer",
			popover: {
				title: translationsTuturialCache["TUTO_11"],
				description: translationsTuturialCache["TUTO_12"]
			}
		},
		{
			element: "#shareChart1",
			popover: {
				title: translationsTuturialCache["TUTO_21"],
				description: translationsTuturialCache["TUTO_22"]
			}
		},
		{
			popover: {
				title: translationsTuturialCache["END_TOUR_TITLE"],
				description: translationsTuturialCache["END_TOUR_TEXT"]
			}
		},
	]

	horizontalNavigation(1800, event);

	driverObj = window.driver.js.driver({
		showProgress: false,
		smoothScroll: true,
		stageRadius: 0,
		overlayColor: "#ffffff",
		overlayOpacity: 0.03,
		allowClose: true,
		overlayClickBehavior: "close",
		nextBtnText: translationsCache['NEXT'],
		prevBtnText: translationsCache['BACK'],
		doneBtnText: translationsCache['CLOSE'],
		steps: steps,
		onPopoverRender: (popover) => {
			popover.closeButton.setAttribute("aria-label", translationsCache['CLOSE']);
		},
		onDestroyed: () => {
			window.scrollTo(0, 0);
			horizontalNavigation(-1800, event);
			closeTutorial();
		}
	});

	driverObj.drive();
}

function horizontalNavigation(position, event) {
	$('.dt-scroll-body').scrollLeft(position);

}

function closeTutorial() {
	$('button#INFO').focus();
}
