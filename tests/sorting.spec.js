const { test, expect } = require('@playwright/test');

// Testira sortiranje na proizvodi po cena od najniska kon najvisoka.
test('user can sort products by price from low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const numericPrices = prices.map((price) => Number(price.replace('$', '')));
  const sortedPrices = [...numericPrices].sort((a, b) => a - b);

  expect(numericPrices).toEqual(sortedPrices);
});
