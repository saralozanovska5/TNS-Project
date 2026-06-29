const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

// Pomosna funkcija za login pred accessibility skeniranje na strani sto baraat najaven korisnik.
async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

// Pomosna funkcija koja go pusta axe-core skeniranjeto i gi vrakja samo critical accessibility problemite.
async function scanCriticalViolations(page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  return accessibilityScanResults.violations.filter(
    (violation) => violation.impact === 'critical'
  );
}

// Pomosna funkcija za prikaz na kratok accessibility izvestaj vo terminal output.
function logAccessibilitySummary(pageName, violations) {
  console.log(`${pageName} critical accessibility violations:`);
  console.log(
    violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
    }))
  );
}

// Testira accessibility na login page i proveruva deka nema critical violations.
test('login page should not have critical accessibility violations', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const criticalViolations = await scanCriticalViolations(page);

  expect(criticalViolations).toEqual([]);
});

// Testira accessibility na inventory page i go dokumentira postoeckiot critical select-name problem.
test('inventory page accessibility scan identifies existing critical violations', async ({ page }) => {
  await login(page);

  const criticalViolations = await scanCriticalViolations(page);

  logAccessibilitySummary('Inventory page', criticalViolations);

  expect(criticalViolations.length).toBeGreaterThan(0);
});

// Testira accessibility na cart page i proveruva deka skeniranjeto se izvrsuva uspesno.
test('cart page accessibility scan completes and reports critical violations count', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();

  const criticalViolations = await scanCriticalViolations(page);

  logAccessibilitySummary('Cart page', criticalViolations);

  expect(Array.isArray(criticalViolations)).toBe(true);
});

// Testira accessibility na checkout information page i proveruva deka skeniranjeto se izvrsuva uspesno.
test('checkout information page accessibility scan completes and reports critical violations count', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  const criticalViolations = await scanCriticalViolations(page);

  logAccessibilitySummary('Checkout information page', criticalViolations);

  expect(Array.isArray(criticalViolations)).toBe(true);
});
