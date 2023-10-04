var buttonTimer

function tutorial() {

	closeTutorial()

	if(isMobile) {
		elementName = document.querySelector(".nothing")
	} else {
		elementName = document.querySelectorAll(".icoContainer")[0]
	}

	introJs().setOptions({
		showProgress: true,
		scrollToElement: true,
		nextLabel: languageNameSpace.labels['next'], 
		prevLabel: languageNameSpace.labels['back'], 
		doneLabel: languageNameSpace.labels['close'], 
		tooltipClass: 'customTooltip',
		steps: [
		{
			title: languageNameSpace.tutorial["START_TOUR_TITLE"],
			intro: languageNameSpace.tutorial["START_TOUR_TEXT"],
		},
		{
		  element: document.querySelectorAll(".select-box")[0],
		  title: languageNameSpace.tutorial["STEP1_TITLE"],
		  intro: languageNameSpace.tutorial["STEP1_TEXT"],
		  position: 'bottom'
		},
		{
		  element: document.querySelectorAll(".select-box")[1],
		  title: languageNameSpace.tutorial["STEP2_TITLE"],
		  intro: languageNameSpace.tutorial["STEP2_TEXT"],
		  position: 'bottom'
		},
		{
		  element: document.querySelectorAll(".select-box")[2],
		  title: languageNameSpace.tutorial["STEP3_TITLE"],
		  intro: languageNameSpace.tutorial["STEP3_TEXT"],
		  position: 'bottom'
		},
		{			
		  element: document.querySelector("#ENTable_wrapper > div.dt-buttons"),
		  title: languageNameSpace.tutorial["STEP4_TITLE"],
		  intro: languageNameSpace.tutorial["STEP4_TEXT"],
		  position: 'bottom-middle-aligned',
		},
		{			
		  element: document.querySelectorAll("th")[2],
		  title: languageNameSpace.tutorial["STEP5_TITLE"],
		  intro: languageNameSpace.tutorial["STEP5_TEXT"],
		  position: 'bottom'
		},
		{			
		  element: document.querySelectorAll(".expand > i.fal.fa-plus-circle")[0],
		  title: languageNameSpace.tutorial["STEP6_TITLE"],
		  intro: languageNameSpace.tutorial["STEP6_TEXT"],
		  position: 'bottom'
		},
		{			
		  element: elementName,
		  title: languageNameSpace.tutorial["STEP7_TITLE"],
		  intro: languageNameSpace.tutorial["STEP7_TEXT"],
		  position: 'left'
		},
		// {			
		//   element: document.querySelector("#page > div.container.mt-5.mb-5 > div.d-flex.justify-content-center > div > div > div > div.swiper-wrapper > div.swiper-slide.swiper-slide-active > div"),
		//   title: languageNameSpace.tutorial["STEP8_TITLE"],
		//   intro: languageNameSpace.tutorial["STEP8_TEXT"],
		//   position: 'left'
		// },
		{			
		  element: document.querySelector(".tutorial"),
		  title: languageNameSpace.tutorial["STEP9_TITLE"],
		  intro: languageNameSpace.tutorial["STEP9_TEXT"],
		  position: 'left'
		},
		{			
		  element: document.querySelector("#social-media"),
		  title: languageNameSpace.tutorial["STEP10_TITLE"],
		  intro: languageNameSpace.tutorial["STEP10_TEXT"],
		  position: 'left'
		},
		{
			element: document.querySelector('.card__image'),
			title: languageNameSpace.tutorial["END_TOUR_TITLE"],			
			intro: languageNameSpace.tutorial["END_TOUR_TEXT"],			
		  }
		]
	  }).start();	  	  

}

function closeTutorial() {
	buttonTimer = setTimeout("introJs().exit()", 4000);	
}

btn = document.querySelector("body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton")
$(document).on('click', btn, function() {
	clearTimeout(buttonTimer)	
});
