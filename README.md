# Functional UI, Accessibility, Responsive and Visual Testing with Playwright

This project contains automated tests for the SauceDemo web application:

https://www.saucedemo.com/

## Tools

- Playwright: automated UI and end-to-end testing.
- axe-core for Playwright: automated accessibility testing.
- Playwright projects: cross-browser execution in Chromium, Firefox, and WebKit.
- Playwright screenshots: responsive screenshots and visual regression testing.

## Tested Functionalities

- Valid login redirects the user to the inventory page.
- Invalid login displays an error message.
- Locked out user receives the expected login error.
- A logged-in user can add a product to the shopping cart.
- A logged-in user can remove a product from the shopping cart.
- A logged-in user can complete the checkout flow.
- Checkout form validation is displayed when required fields are missing.
- Products can be sorted by price from low to high.
- Accessibility scan of the login page.
- Accessibility scan of the inventory page, including documentation of an existing critical violation.
- Accessibility scan of the cart page.
- Accessibility scan of the checkout information page.
- Responsive testing of the login and inventory pages on mobile, tablet, and desktop viewport sizes.
- Visual regression testing of the login and inventory pages with screenshot comparison.
- Cross-browser execution of the full test suite in Chromium, Firefox, and WebKit.

## How to Run

Install dependencies:

```powershell
npm.cmd install
```

Install Playwright browsers:

```powershell
npx.cmd playwright install
```

Run tests:

```powershell
npx.cmd playwright test
```

Run only responsive tests:

```powershell
npx.cmd playwright test tests/responsive.spec.js
```

Run only visual regression tests:

```powershell
npx.cmd playwright test tests/visual.spec.js
```

Update visual baseline screenshots:

```powershell
npx.cmd playwright test tests/visual.spec.js --update-snapshots
```

Open HTML report:

```powershell
npx.cmd playwright show-report
```

## Visual and Responsive Screenshots

Visual baseline screenshots are stored next to the visual test file:

```text
tests/visual.spec.js-snapshots/
```

These files are part of the visual regression tests and should be committed to the repository.

Responsive screenshots are generated as test evidence:

```text
test-results/responsive-screenshots/
```

The `test-results` folder is generated during test execution and usually does not need to be committed.

## Accessibility Finding

The inventory page contains a critical accessibility violation reported by axe-core:

- id: `select-name`
- impact: `critical`
- description: `Ensure select element has an accessible name`
- suggested fix: add a visible label or an `aria-label` to the product sorting select element.
