class Singleselect {
    constructor(elementId, optionsArray, labelDescription, activeElement, textChange, changeCallback) {
        // Assigning constructor parameters to class properties
        this.elementId = elementId;
        this.optionsArray = optionsArray;
        this.labelDescription = labelDescription;
        this.activeElement = activeElement;
        this.textChange = textChange;
        this.changeHandler = changeCallback;
        this.svgArrow = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24" enable-background="new 0 0 24 24" focusable="false" aria-hidden="true" class="ecl-icon ecl-icon--s ecl-select__icon-shape ecl-icon--rotate-180"><path d="M18.2 17.147c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-7.1-7.1c-.4-.4-1-.4-1.4 0l-7 7c-.3.4-.3 1 .1 1.4.4.4 1 .4 1.4 0l6.2-6.2 6.4 6.3z"></path></svg>';

        // Adding event listener to handle change events
        document.addEventListener('change', (event) => {
            // Check if the change event is for this select element
            if (event.target.id === this.elementId && this.changeHandler) {
                // If yes, invoke the change handler callback with the selected value
                this.changeHandler(event.target.value);
            }
        });
    }

    createSingleSelect() {
        let optionsHTML = '';

        if (this.elementId === "selectCountry") {
            optionsHTML = `
                <optgroup data-i18n-label="AGGREGATES_COUNTRY_CODES">
                    ${AGGREGATES_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''} data-i18n="${ctr}"></option>`).join('')}
                </optgroup>
                <optgroup data-i18n-label="EU_COUNTRY_CODES">
                    ${EU_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''} data-i18n="${ctr}"></option>`).join('')}
                </optgroup>
                <optgroup data-i18n-label="EFTA_COUNTRY_CODES">
                    ${EFTA_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''} data-i18n="${ctr}"></option>`).join('')}
                </optgroup>
                <optgroup data-i18n-label="ENLARGEMENT_COUNTRY_CODES">
                    ${ENLARGEMENT_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''} data-i18n="${ctr}"></option>`).join('')}
                </optgroup>

            `;
        } else {
            const translatedOptions = this.optionsArray.map(option => {
                const isNumber = !isNaN(option);
                return {
                    value: option,
                    label: isNumber ? option : option,
                    isNumber: isNumber
                };
            });

            translatedOptions.sort((a, b) => {
                if (a.isNumber && b.isNumber) return 0; // Do not sort numbers
                if (a.isNumber) return -1; // Keep numbers at the beginning
                if (b.isNumber) return 1;  // Keep numbers at the beginning
                return a.label.localeCompare(b.label); // Sort by label
            });

            optionsHTML = translatedOptions.map(option => `
                <option value="${option.value}" ${this.activeElement === option.value ? 'selected' : ''} data-i18n="${option.label}"></option>
            `).join('');
        }

        // Generate the full HTML for the single select element
        const singleSelectHTML = `
            <div class="ecl-form-group" role="application">
                <label for="${this.elementId}" class="ecl-form-label" data-i18n="${this.labelDescription}"></label>
                <div class="ecl-select__container ecl-select__container--l">
                    <select class="ecl-select" id="${this.elementId}" name="country" required="">
                        ${optionsHTML}
                    </select>
                    <div class="ecl-select__icon">
                        ${this.svgArrow}
                    </div>
                </div>
            </div>
        `;

        return singleSelectHTML;
    }

    attachEventListeners() {
        // Attach event listeners for mouseenter and mouseleave events to show/hide textChange
        const labelElement = document.querySelector(`label[for="${this.elementId}"]`);
        const selectElement = document.getElementById(this.elementId);
    
        if (!labelElement || !selectElement) return; // Check if elements exist
    
        selectElement.addEventListener('mouseenter', () => {
            // Use the translationsCache to get the translated text for textChange key
            const translatedText = translationsCache[this.textChange] || this.textChange;
            labelElement.textContent = translatedText;
        });
    
        selectElement.addEventListener('mouseleave', () => {
            // Use the translationsCache to get the translated text for labelDescription key
            const translatedText = translationsCache[this.labelDescription] || this.labelDescription;
            labelElement.textContent = translatedText;
        });
    }
}
