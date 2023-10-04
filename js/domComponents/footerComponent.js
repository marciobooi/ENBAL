class Footer {
    constructor() {
      this.footer = document.createElement('footer');
  
      const footerContainer = document.createElement('div');
      footerContainer.id = 'footer';
  
      const footerCreditsList = document.createElement('ul');
      footerCreditsList.id = 'footerCredits';
      footerCreditsList.classList.add('nav', 'justify-content-end');
  
      footerContainer.appendChild(footerCreditsList);
      this.footer.appendChild(footerContainer);
    }



/**
 * Builds the links for the footer.
 */
  
    buildLinksFooter() {
      const footerCredits = document.querySelector('#footerCredits');
      footerCredits.innerHTML = '';
  
      const linksContent = ` <li>
      <a href="https://ec.europa.eu/info/cookies_${REF.language.toLowerCase()}" target="_blank" rel="noreferrer noopener" id="footer-cookies" class="footer-decoration"></a>
    </li>
    <hr>
    <li>
      <a href="https://ec.europa.eu/info/privacy-policy_${REF.language.toLowerCase()}" target="_blank" rel="noreferrer noopener" id="footer-privacy" class="footer-decoration"></a>
    </li>
    <hr>
    <li>
      <a href="https://ec.europa.eu/info/legal-notice_${REF.language.toLowerCase()}" target="_blank" rel="noreferrer noopener" id="footer-legal" class="footer-decoration"></a>
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
  