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
            <optgroup label="${languageNameSpace.labels['AGGREGATE']}">
                ${AGGREGATES_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''}>${languageNameSpace.labels[ctr]}</option>`).join('')}
            </optgroup>            
            <optgroup label="${languageNameSpace.labels['EUCTR']}">
                ${EU_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''}>${languageNameSpace.labels[ctr]}</option>`).join('')}
            </optgroup>
            <optgroup label="${languageNameSpace.labels['EFTA']}">
                ${EFTA_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''}>${languageNameSpace.labels[ctr]}</option>`).join('')}
            </optgroup>
            <optgroup label="${languageNameSpace.labels['ENLARGEMENT']}">
                ${ENLARGEMENT_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''}>${languageNameSpace.labels[ctr]}</option>`).join('')}
            </optgroup>
            <optgroup label="${languageNameSpace.labels['OTHERCTR']}">
                ${OTHER_THIRD_COUNTRY_CODES.map(ctr => `<option value="${ctr}" ${this.activeElement === ctr ? 'selected' : ''}>${languageNameSpace.labels[ctr]}</option>`).join('')}
            </optgroup>
            
        `;
        } else {
            const translatedOptions = this.optionsArray.map(option => {
                const isNumber = !isNaN(option);
                return {
                    value: option,
                    label: isNumber ? option : (languageNameSpace.labels[option] !== undefined ? languageNameSpace.labels[option] : option),
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
                <option value="${option.value}" ${this.activeElement === option.value ? 'selected' : ''}>
                    ${option.label}
                </option>
            `).join('');
        }

    

        // Generate the full HTML for the single select element
        const singleSelectHTML = `
            <div class="ecl-form-group" role="application">
                <label for="${this.elementId}" class="ecl-form-label">${this.labelDescription}</label>
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

        selectElement.addEventListener('mouseenter', () => {
            labelElement.textContent = this.textChange;
        });

        selectElement.addEventListener('mouseleave', () => {
            labelElement.textContent = this.labelDescription;
        });
    }
}
