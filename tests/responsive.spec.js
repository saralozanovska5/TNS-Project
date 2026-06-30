const { test, expect } = require('@playwright/test');

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 768 },
];

const screenshotFolder = 'test-results/responsive-screenshots';

async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

for (const viewport of viewports) {
  // Testira dali login page se prikazuva pravilno na mobile, tablet i desktop golemina.
  test(`login page is usable on ${viewport.name} viewport`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await page.goto('https://www.saucedemo.com/');

    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    await page.screenshot({
      path: `${screenshotFolder}/login-${viewport.name}.png`,
      fullPage: true,
    });
  });

  // Testira dali inventory page i kosnickata se dostapni na mobile, tablet i desktop golemina.
  test(`inventory page is usable on ${viewport.name} viewport`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    await login(page);

    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.shopping_cart_link')).toBeVisible();

    await page.screenshot({
      path: `${screenshotFolder}/inventory-${viewport.name}.png`,
      fullPage: true,
    });
  });
}
