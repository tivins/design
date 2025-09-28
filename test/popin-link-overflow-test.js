// Test for popin component link overflow fix
import { test, expect } from '@playwright/test';

test.describe('Popin Link Overflow Fix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should handle long links in popin items without overflow', async ({ page }) => {
    // Set dark theme first
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);

    // Create a popin with long links
    await page.evaluate(() => {
      const container = document.querySelector('.demo-section');
      if (container) {
        const popin = document.createElement('dt-popin');
        popin.setAttribute('trigger-text', 'Menu with Long Links');
        popin.innerHTML = `
          <div class="popin-item" href="#">
            <dt-icon name="home"></dt-icon>
            <span>This is a very long link text that should wrap properly and not overflow the container</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="user"></dt-icon>
            <span>Another extremely long link text that might cause overflow issues if not handled correctly</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="settings"></dt-icon>
            <span>Short link</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="help"></dt-icon>
            <span>This is another very long link text that should be handled properly with text wrapping and ellipsis if needed</span>
          </div>
        `;
        container.appendChild(popin);
      }
    });

    // Click to open the popin
    await page.click('dt-popin dt-button');
    await page.waitForTimeout(300);

    // Take screenshot in dark theme
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-dark-theme.png',
      fullPage: true 
    });

    // Check that popin is visible
    const popinMenu = page.locator('.popin-menu.show');
    await expect(popinMenu).toBeVisible();

    // Check that long links are properly contained
    const longLinkItems = page.locator('.popin-item');
    const count = await longLinkItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = longLinkItems.nth(i);
      const boundingBox = await item.boundingBox();
      const popinMenuBox = await popinMenu.boundingBox();
      
      // Check that item doesn't overflow the popin menu
      expect(boundingBox.x).toBeGreaterThanOrEqual(popinMenuBox.x);
      expect(boundingBox.x + boundingBox.width).toBeLessThanOrEqual(popinMenuBox.x + popinMenuBox.width);
    }

    // Switch to light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(500);

    // Take screenshot in light theme
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-light-theme.png',
      fullPage: true 
    });

    // Verify the popin is still working in light theme
    await expect(popinMenu).toBeVisible();

    // Test with different popin sizes
    await page.evaluate(() => {
      const popin = document.querySelector('dt-popin');
      if (popin) {
        popin.setAttribute('size', 'sm');
      }
    });
    await page.waitForTimeout(300);

    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-small-size.png',
      fullPage: true 
    });

    // Test with large size
    await page.evaluate(() => {
      const popin = document.querySelector('dt-popin');
      if (popin) {
        popin.setAttribute('size', 'lg');
      }
    });
    await page.waitForTimeout(300);

    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-large-size.png',
      fullPage: true 
    });

    // Close popin
    await page.click('body');
    await page.waitForTimeout(300);

    // Verify popin is closed
    await expect(popinMenu).not.toBeVisible();
  });

  test('should handle very long URLs in popin items', async ({ page }) => {
    // Set dark theme first
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);

    // Create a popin with very long URLs
    await page.evaluate(() => {
      const container = document.querySelector('.demo-section');
      if (container) {
        const popin = document.createElement('dt-popin');
        popin.setAttribute('trigger-text', 'Menu with Long URLs');
        popin.innerHTML = `
          <div class="popin-item" href="https://www.very-long-domain-name-that-might-cause-overflow-issues.com/very/long/path/to/some/resource/with/many/parameters?param1=value1&param2=value2&param3=value3">
            <dt-icon name="external-link"></dt-icon>
            <span>Very Long URL Link</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="link"></dt-icon>
            <span>https://www.example.com/very/long/path/to/resource</span>
          </div>
        `;
        container.appendChild(popin);
      }
    });

    // Click to open the popin
    await page.click('dt-popin dt-button');
    await page.waitForTimeout(300);

    // Take screenshot
    await page.screenshot({ 
      path: 'test/screenshots/popin-long-urls-dark-theme.png',
      fullPage: true 
    });

    // Check that popin is visible and URLs are contained
    const popinMenu = page.locator('.popin-menu.show');
    await expect(popinMenu).toBeVisible();

    const urlItems = page.locator('.popin-item');
    const count = await urlItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = urlItems.nth(i);
      const boundingBox = await item.boundingBox();
      const popinMenuBox = await popinMenu.boundingBox();
      
      // Check that item doesn't overflow the popin menu
      expect(boundingBox.x).toBeGreaterThanOrEqual(popinMenuBox.x);
      expect(boundingBox.x + boundingBox.width).toBeLessThanOrEqual(popinMenuBox.x + popinMenuBox.width);
    }
  });
});
