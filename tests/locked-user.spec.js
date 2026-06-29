const { test, expect } = require('@playwright/test');

// Testira login so locked out user i proveruva deka se prikazuva tocna error poraka.
test('locked out user cannot login and sees locked out error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Sorry, this user has been locked out'
  );
});
