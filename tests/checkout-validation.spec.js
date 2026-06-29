const { test, expect } = require('@playwright/test');

// Testira validation na checkout forma koga zadolzitelnoto pole first name e prazno.
test('checkout form shows validation error when first name is missing', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="lastName"]').fill('Student');
  await page.locator('[data-test="postalCode"]').fill('1000');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});
