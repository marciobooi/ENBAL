class Button {
    constructor(id, classes, ariaLabel, value, otherAccessibilityParams) {
      this.id = id;
      this.classes = classes;
      this.ariaLabel = ariaLabel;
      this.value = value;
      this.otherAccessibilityParams = otherAccessibilityParams;
      this.clickHandler = null;
      this.buttonElement = null;
      this.innerHtml = "";

    }
  
    setClickHandler(handler) {
        this.clickHandler = handler;
        if (this.buttonElement) {
          this.buttonElement.addEventListener("click", this.clickHandler);
        }
      }
  
    setInnerHtml(html) {
      this.innerHtml = html;
      if (this.buttonElement) {
        this.buttonElement.innerHTML = html;
      }
    }

    setDisabled(disabled) {
        if (this.buttonElement) {
          this.buttonElement.disabled = disabled;
        }
      }
  
      createButton() {
        log(this.ariaLabel)
        this.buttonElement = document.createElement("button");
        this.buttonElement.id = this.id;
        this.buttonElement.classList.add(...this.classes);
        this.buttonElement.setAttribute("value", this.value);
        this.buttonElement.setAttribute("data-i18n-label", this.ariaLabel);
        this.buttonElement.setAttribute("data-i18n-title", this.ariaLabel);
        this.buttonElement.innerHTML = this.innerHtml;

        // Apply other accessibility parameters as needed
        if (this.clickHandler) {
          this.buttonElement.addEventListener("click", this.clickHandler);
        }
        return this.buttonElement;
      }
  }