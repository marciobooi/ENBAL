class Timeline {
    constructor(targetElement) {
        this.targetElement = targetElement;
        this.createTimeline();
        this.addToDOM();
        this.initializeSlider();
    }

    createTimeline() {
        this.timeline = document.createElement('div');
        this.timeline.innerHTML = `
            <div id="chartSliderContainer">
                <div id="chartSlider" class="ui-corner-all ui-slider ui-slider-horizontal ui-widget ui-widget-content" role="slider" aria-valuenow="2013" aria-valuemin="2011" aria-valuemax="2022" style="background: rgb(38, 68, 168);">
                    <div class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min" style="width: 18.1818%;"></div>
                    <span tabindex="0" class="ui-slider-handle sliderHandle ui-state-default" aria-valuenow="2013" style="left: 18.1818%;">
                        <div id="sliderTimePeriod">
                            <span>2013</span>
                        </div>
                    </span>
                </div>
            </div>`;
    }

    initializeSlider() {
        const minYear = 1990;
        const maxYear = 2022;

        // Initialize the slider using jQuery
        $(this.timeline).find("#chartSlider").slider({
            range: "min",
            value: REF.year,
            min: minYear,
            max: maxYear,
            slide: (event, ui) => {
                $(this.timeline).find("#sliderTimePeriod span").text(ui.value);
                $(this.timeline).find("#chartSlider").attr("aria-valuenow", ui.value);
                const rangeWidth = this.calculateRangeWidth(ui.value, minYear, maxYear);
                $(this.timeline).find(".ui-slider-range").css("width", rangeWidth + "%");
            },
            stop: (event, ui) => {
                REF.chartOpt = "compareChart";
                REF.year = ui.value;
                if(REF.chartCreated === true) {
                    if(REF.chartType === "barChart") {
                        createBarChart()
                    } else {
                        piechartdata()
                    }                    
                } else {
                    compareCountries();
                }
                
            },
            animate: "slow"
        });

        const currentValue = $(this.timeline).find("#chartSlider").slider("value");
        $(this.timeline).find("#chartSlider").attr("aria-valuenow", currentValue);
        $(this.timeline).find("#sliderTimePeriod span").text(currentValue);

        const initialRangeWidth = this.calculateRangeWidth(currentValue, minYear, maxYear);
        $(this.timeline).find(".ui-slider-range").css("width", initialRangeWidth + "%");
    }

    calculateRangeWidth(value, minValue, maxValue) {
        return ((value - minValue) / (maxValue - minValue)) * 100;
    }

    addToDOM() {
        this.targetElement.appendChild(this.timeline);
    }

    removeFromDOM() {
        if (this.timeline.parentNode) {
            this.timeline.parentNode.removeChild(this.timeline);
        }
    }
}
