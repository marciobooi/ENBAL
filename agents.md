# Agents Guide — HTML/CSS/JS Project

> Purpose: This file tells any contributor or AI agent **how to work in this codebase**.
> Use **modern JS (ES6+)**, follow **SOLID**, and **always check for existing functions** before creating new ones.

---

## 1) Coding Standards

### JavaScript (ES6+)
- Use `const`/`let` (no `var`).
- Prefer **arrow functions**, **template literals**, **destructuring**, **spread/rest**.
- Use **modules** for new code (`type="module"` or bundler) when feasible; otherwise keep files **small & single-purpose**.
- Prefer **pure functions** and **immutability** where practical.
- Use **JSDoc** for public functions and services.
- Centralize **error handling**; never swallow errors silently.

### SOLID (applied to JS)
- **S**ingle Responsibility: one file/function = one reason to change.
- **O**pen/Closed: extend via parameters or composition; avoid editing stable code.
- **L**iskov Substitution: functions/classes should work with their abstractions.
- **I**nterface Segregation: keep props/options small and specific.
- **D**ependency Inversion: depend on abstractions (interfaces), not concrete impls.

### Reuse First
- Before adding a function/class: **search** in `js/` and `services/` for similar logic.
- If similar exists, **extend or refactor** instead of duplicating.
- If creating something new, add it in the **appropriate folder** and document it.

### Naming
- Files (JS/CSS): **kebab-case** (e.g., `data-service.js`, `aux-chart-controls.css`).
- Variables/functions: **camelCase**. Classes/constructors: **PascalCase**.
- Be descriptive (avoid `tmp`, `foo`, `bar`).

---

## 2) Libraries, Assets & Load Order

These are the declared assets in the HTML. Keep versions aligned and avoid duplicates.

### CSS Files
- `img/tabIco.jpg` (favicon)
- `css/rowReorder.dataTables.min.css`
- `css/colReorder.bootstrap5.min.css`
- `css/all.css`
- `css/style.css`
- `css/bootstrap/bootstrap@5.3.0.css`
- `css/newStiles/main.css`
- `css/newStiles/nav.css`
- `css/newStiles/subnavbar.css`
- `css/newStiles/footer.css`
- `css/newStiles/btn.css`
- `css/newStiles/loader.css`
- `css/newStiles/chartOptionsMenu.css`
- `css/newStiles/highchartsTable.css`
- `css/newStiles/auxChartControls.css`
- `css/EC/ecl-reset.css`
- `css/EC/ecl-eu-default.css`
- `css/EC/ecl-eu.css`
- `css/newStiles/modal.css`
- `css/newStiles/mediaqueries.css`
- `css/newStiles/zoom-accessibility.css`
- `css/intro/intro.css`
- `css/tutorial.css`
- `css/dataTable.css`
- `css/fixedColumns.dataTables.css`

### JavaScript Files
Core & utilities:
- `js/jquery/jquery-3.7.0.js`
- `js/basics.js`, `js/tooltip.js`, `js/pdfGenerator.js`, `js/language.js`, `js/data.js`, `js/codes.js`, `js/json-stat.js`

DataTables & table plugins:
- `js/external/table/dataTables.min.js`
- `js/external/table/dataTables.buttons.min.js`
- `js/external/table/buttons.flash.min.js`
- `js/external/table/jszip.min.js`
- `js/external/table/pdfmake.min.js`
- `js/external/table/buttons.html5.min.js`
- `js/external/table/dataTables.fixedColumns.js`
- `js/external/table/fixedColumns.dataTables.js`

App tables/charts:
- `js/table.js`, `js/apiCall.js`, `js/tableFunctions.js`
- `js/barChart.js`, `js/piechart.js`, `js/lineChart.js`

Tutorial & social:
- `js/tutorial.js`, `js/social.js`

Highcharts & modules:
- `js/external/chart/highcharts.js`
- `js/external/chart/no-data-to-display.js`
- `js/external/chart/exporting.js`
- `js/external/chart/export-data.js`
- `js/external/chart/accessibility.js`
- `js/external/chart/data.js`

Services layer:
- `js/services/ApiService.js`
- `js/services/DataService.js`
- `js/services/StateManager.js`
- `js/services/AccessibilityService.js`
- `js/services/PerformanceService.js`
- `js/services/initServices.js`

DOM Components:
- `js/domComponents/navComponent.js`
- `js/domComponents/subNavBarComponent.js`
- `js/domComponents/footerComponent.js`
- `js/domComponents/auxChartControls.js`
- `js/domComponents/floatingControls.js`
- `js/domComponents/chartObject.js`
- `js/domComponents/btns.js`
- `js/domComponents/modal.js`
- `js/domComponents/singleSelect.js`

Other application scripts:
- `js/createComponents.js`
- `js/populateCountries.js`, `js/populateFuels.js`, `js/populateYears.js`, `js/populateDecimals.js`, `js/populateUnit.js`
- `js/keyboardNavigationLogic.js`
- `js/iframe.js`
- `js/entable.js`
- `js/requests.js`
- `js/excelReader.js`

External (additional):
- `js/external/table/ExcelJS.js`
- `js/external/table/jspdf.umd.min.js`, `js/external/table/jspdf.plugin.autotable.min.js`
- `js/external/table/xlsx.full.min.js`
- `js/bootstrap/bootstrap@5.3.0.js`
- `js/external/intro7.0.1.js`
- `js/external/ecl-eu.js`
- `https://europa.eu/webtools/load.js` (deferred)

### Load Order Guidance
1. **jQuery** → **DataTables core** → **DataTables plugins**.
2. **Highcharts core** → **modules** (exporting, export-data, accessibility, no-data, data).
3. **Services** before **components** (so components can consume services).
4. **Bootstrap JS** after CSS and after jQuery if a dependency exists in any plugin.
5. Use `defer` for non-critical scripts to avoid blocking.

> ⚠️ Note: `dataTables.fixedColumns.js` and `fixedColumns.dataTables.js` appear related; ensure you really need both to avoid duplicate behavior or conflicts.

---

## 3) Folder Structure & Naming Conventions

```
project-root/
  assets/           # images, fonts, static
  styles/           # global + feature styles
    newStyles/
    EC/
  services/         # ApiService, DataService, etc.
  components/       # DOM components (Nav, Footer, Modals, etc.)
  charts/           # chart configs/wrappers
  utils/            # small helpers (formatters, validators)
  js/               # legacy or to-be-migrated scripts
  index.html
```

- Prefer **components/** and **services/** for new code; keep `js/` for legacy-only.
- One module per responsibility; avoid deep nesting.

---

## 4) Code Review Checklist

- [ ] ES6+ syntax used (arrow functions, destructuring, template literals).
- [ ] SOLID respected; functions/classes have a single responsibility.
- [ ] No duplication; reuses existing utilities/services.
- [ ] Accessible (keyboard, ARIA, contrast) and responsive.
- [ ] Error handling and logging are present and clear.
- [ ] Measured performance (no unnecessary reflows, heavy loops minimized).
- [ ] Clear comments for complex logic; JSDoc where public.

---

## 5) Performance & Security Guidelines

- Minimize DOM thrash: batch updates, prefer event delegation.
- Lazy-load heavy assets (charts, large tables) when visible.
- Use `async`/`defer` for non-critical scripts; avoid inline JS/CSS.
- Sanitize any user-provided content; validate API responses.
- Never embed secrets in frontend; use environment/servers for keys.
- Compress images; minify CSS/JS for production.

---

## 6) Accessibility & SEO Best Practices

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Keyboard navigation, focus states, and skip-links.
- `alt` text for images; ARIA roles/labels when necessary.
- Maintain color contrast (WCAG AA+ where feasible).
- Meta tags: description, viewport, social (OG/Twitter) where needed.

---

## 7) Short Example Code Snippets

### ES6 — Arrow Function + Template Literal
```js
const greet = (name) => `Hello, ${name}!`;
```

### SOLID — Single Responsibility
```js
// One responsibility: formatting numbers
export class NumberFormatter {
  constructor(locale = 'en-GB', options = { maximumFractionDigits: 2 }) {
    this.formatter = new Intl.NumberFormat(locale, options);
  }
  format(value) { return this.formatter.format(value); }
}
```

### SOLID — Dependency Inversion (inject abstraction)
```js
// Abstraction: anything with a `get(url)` method can be injected
export class ApiService {
  constructor(httpClient) { this.http = httpClient; }
  async fetchData(url) { return this.http.get(url); }
}

// Concrete dependency
export const fetchClient = {
  async get(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
};

// Usage (compose via injection)
const api = new ApiService(fetchClient);
```

---

## 8) Before You Commit

- Run linters/formatters (Prettier/ESLint if configured).
- Update docs/JSDoc for any new public surface.
- Add/adjust unit tests for critical logic.
- Ensure the page loads without console errors.

---

## 9) Agent Tasks (TL;DR)

- Use **ES6+** and **SOLID**.
- **Search for existing functions** before adding new.
- Keep logic **modular**, **testable**, and **documented**.
- Respect **load order** and **performance**.
- Ensure **accessibility** in all new UI.
