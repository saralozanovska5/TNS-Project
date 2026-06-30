const { test, expect } = require('@playwright/test');

async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

// Visual regression test za login page: ja sporeduva momentalnata slika so zacuvana baseline slika.
test('login page matches visual baseline', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveScreenshot('login-page.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });
});

// Visual regression test za inventory page: proveruva dali izgledot na produktite ostanal ist.
test('inventory page matches visual baseline', async ({ page }) => {
  await login(page);

  await expect(page).toHaveScreenshot('inventory-page.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });
});
