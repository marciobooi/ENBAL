# ENBAL - Energy Balance Visualization Tool Instructions

## Architecture Overview

**ENBAL** is a Eurostat interactive energy balance visualization tool built with vanilla JavaScript, DataTables, and Highcharts. The application follows a modular service-oriented architecture with component-based UI patterns.

### Core Systems

**Data Flow**: `ApiService` → `DataService` → `StateManager` → UI Components → Charts/Tables
- **API Layer**: Eurostat REST API integration with caching (`js/services/ApiService.js`)
- **State Management**: Global `REF` object managed by `StateManager` with pub/sub pattern
- **UI Components**: ES6 classes in `js/domComponents/` (Navbar, SubNavbar, Chart controls)
- **Visualization**: Highcharts for charts, DataTables for tabular data

### Key Global Variables
```javascript
REF // Global state object (geo, unit, language, year, fuel, chart type, etc.)
translationsCache // i18n translations loaded from data/labels_{LANG}.json
dataNameSpace // Core data configuration and URL management
```

## Service Architecture

### Initialization Order (Critical)
Services must initialize in dependency order via `js/services/initServices.js`:
1. `ApiService` - HTTP requests and caching
2. `DataService` - Data transformation 
3. `StateManager` - Application state with REF proxy
4. `AccessibilityService` - WCAG compliance features
5. `PerformanceService` - Optimization utilities

### Service Usage Patterns
```javascript
// Modern async pattern (preferred for new code)
const data = await apiService.getChartData(params);

// Legacy synchronous pattern (maintaining compatibility)
const d = chartApiCall(); // Uses cache-first approach
```

## Chart Implementation

### Chart Types & Data Flow
- **Bar Chart**: `renderBarChart()` → country comparisons
- **Pie Chart**: `renderPieChart()` → fuel distribution 
- **Line Chart**: `renderLineChart()` → time series trends

### Chart Configuration Pattern
```javascript
const chartOptions = {
  containerId: "chart",
  type: "column|pie|line", 
  series: processedData,
  accessibility: { description: `${chartType} showing ${REF.chartBal} for ${REF.geo}` }
};
const chart = new Chart(chartOptions);
```

### Responsive Charts
Charts use progressive responsive fixes in `css/newStiles/mediaqueries.css`:
- 200% zoom: Basic element visibility
- 400% zoom: Aggressive sizing with `min-width: 3px !important`
- 500%+ zoom: Ultra-compact with forced visibility

## Multilingual System

### Translation Loading
```javascript
loadTranslations(lang); // Loads data/labels_{LANG}.json
// Auto-translates elements with data-i18n, data-i18n-label, data-i18n-title
```

### Language Support
- **Supported**: EN (default), DE, FR
- **Translation Keys**: Use existing keys from `data/labels_EN.json`
- **UI Updates**: Charts, buttons, and tooltips auto-update on language change

## Data API Patterns

### URL Construction
API URLs follow Eurostat format: `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{dataset}`

### Chart-Specific Parameters
- **Line Chart**: `&nrg_bal=${chartBal}&unit=${unit}&geo=${geo}`
- **Bar Chart**: `&nrg_bal=${chartBal}&unit=${unit}&time=${year}` + filtered SIEC codes  
- **Pie Chart**: `&nrg_bal=${chartBal}&unit=${unit}&time=${year}&geo=${geo}`

### Caching Strategy
```javascript
// Check cache first, fallback to API
if (cache[url]) return JSONstat(cache[url]).Dataset(0);
// Always cache API responses
addToCache(url, data);
```

## Development Workflows

### Component Creation
1. Create ES6 class in `js/domComponents/`
2. Implement `addToDOM(targetElement)` method
3. Add to component initialization in `buildComponents()`
4. Include i18n attributes: `data-i18n`, `data-i18n-label`

### State Updates
```javascript
// Update global state
REF.property = newValue;
dataNameSpace.setRefURL(); // Sync URL parameters
// Components auto-react to REF changes
```

### Chart Development
1. Follow existing patterns in `barChart.js`, `pieChart.js`, `lineChart.js`
2. Use `Chart` class from `js/domComponents/chartObject.js`
3. Implement accessibility descriptions
4. Test responsive behavior at 200%/400% zoom

## Debugging & Testing

### Browser Compatibility
- **Modern browsers**: Chrome, Firefox, Safari 10+, Edge
- **Mobile detection**: `isMobile` variable for responsive behavior
- **Feature detection**: Use `isFirefox`, `isChrome`, `isSafari` variables

### Common Issues
- **Chart disappearing**: Check zoom-responsive CSS rules
- **Translation missing**: Verify key exists in `data/labels_{LANG}.json`
- **State sync**: Ensure `dataNameSpace.setRefURL()` after REF updates
- **Service errors**: Check initialization order in `initServices.js`

### Error Handling
```javascript
// API errors
try {
  const data = await apiService.getData(url);
} catch (error) {
  console.error(`API error: ${error.status}`);
}
```

## File Organization

### Critical Files
- `enbal.html` - Main entry point with script load order
- `js/data.js` - Core configuration and REF defaults
- `js/createComponents.js` - UI component orchestration  
- `js/language.js` - i18n system and translation loading
- `css/newStiles/mediaqueries.css` - Responsive design including zoom fixes

### External Dependencies
- **Highcharts**: Charts with accessibility plugin
- **DataTables**: Table functionality with responsive extensions
- **Bootstrap 5.3**: UI framework and ECL design system
- **JSONstat**: Eurostat data parsing

## Testing & Automation

### Browser Automation with MCP Puppeteer
The project includes MCP Puppeteer integration for automated testing and quality assurance:

```javascript
// Available capabilities:
// - Screenshot capture for visual regression testing
// - UI interaction testing (clicks, form filling, navigation)
// - Performance monitoring and page load testing
// - Cross-browser compatibility validation
// - Accessibility testing automation
```

### Testing Workflows
- **Visual Testing**: Capture screenshots at different zoom levels (200%, 400%, 500%)
- **Responsive Testing**: Validate layout behavior across device sizes
- **Chart Functionality**: Verify chart rendering and interactivity
- **i18n Testing**: Test translation loading and UI updates across languages
- **Accessibility Validation**: Automated WCAG compliance checks

### Log Monitoring
Check `logs/mcp-puppeteer-*.log` for automation service status and debugging information.

When modifying this codebase, preserve the existing component patterns, maintain backward compatibility with legacy synchronous code, and ensure all UI elements include proper i18n attributes and accessibility features.