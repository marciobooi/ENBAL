class Footer {
  constructor() {
    this.footer = document.createElement('footer');

    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer';
    footerContainer.classList.add("ecl-site-footer");

    const footerCreditsList = document.createElement('ul');
    footerCreditsList.id = 'footerCredits';
    footerCreditsList.classList.add("ecl-site-footer__list");

    footerContainer.appendChild(footerCreditsList);
    this.footer.appendChild(footerContainer);
  }



/**
* Builds the links for the footer.
*/

  buildLinksFooter() {
    const footerCredits = document.querySelector('#footerCredits');
    footerCredits.innerHTML = '';

    const linksContent = /*html*/`     
    <li class="ecl-site-footer__list-item">
      <a id="footer-cookies" href="https://ec.europa.eu/info/cookies_${REF.language.toLowerCase()}" class="ecl-link ecl-link--standalone ecl-site-footer__link"></a>
    </li>
    <hr>
    <li class="ecl-site-footer__list-item">
      <a id="footer-privacy" href="https://ec.europa.eu/info/privacy-policy_${REF.language.toLowerCase()}" class="ecl-link ecl-link--standalone ecl-site-footer__link"></a>
      </li>
      <hr>
    <li class="ecl-site-footer__list-item">
      <a id="footer-legal" href="https://ec.europa.eu/info/legal-notice_${REF.language.toLowerCase()}" class="ecl-link ecl-link--standalone ecl-site-footer__link"></a>
      </li>
      <hr>
    <li class="ecl-site-footer__list-item">
      <a id="footer-access" href="/eurostat/web/main/help/accessibility" class="ecl-link ecl-link--standalone ecl-site-footer__link">${languageNameSpace.labels["ACCESS"]}</a>
    </li>`;




    footerCredits.innerHTML = linksContent;
  }

  addToDOM(targetElement) {
    const container = document.querySelector(targetElement);
    container.appendChild(this.footer);


  // Call the buildLinksFooter method after inserting the footer into the DOM
  this.buildLinksFooter();
}
}
