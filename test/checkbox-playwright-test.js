// test/checkbox-playwright-test.js
// Proper Playwright test for checkbox component

const { test, expect } = require('@playwright/test');

test.describe('Checkbox Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Navigate to checkbox section
    await page.click('a[href="#checkbox"]');
    await page.waitForTimeout(500);
  });

  test('should toggle checkbox state correctly', async ({ page }) => {
    // Get the first checkbox
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    // Initial state should be unchecked
    await expect(checkboxCustom).not.toHaveClass(/checked/);
    
    // Click to check
    await checkboxCustom.click();
    await expect(checkboxCustom).toHaveClass(/checked/);
    
    // Click to uncheck
    await checkboxCustom.click();
    await expect(checkboxCustom).not.toHaveClass(/checked/);
  });

  test('should handle multiple clicks correctly', async ({ page }) => {
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    // Test 5 clicks
    for (let i = 0; i < 5; i++) {
      await checkboxCustom.click();
      const isChecked = i % 2 === 0; // Even clicks should be checked
      if (isChecked) {
        await expect(checkboxCustom).toHaveClass(/checked/);
      } else {
        await expect(checkboxCustom).not.toHaveClass(/checked/);
      }
    }
  });

  test('should work with different sizes', async ({ page }) => {
    const sizeCheckboxes = page.locator('#checkbox dt-checkbox[size]');
    const count = await sizeCheckboxes.count();
    
    for (let i = 0; i < count; i++) {
      const checkbox = sizeCheckboxes.nth(i);
      const checkboxCustom = checkbox.locator('.checkbox-custom');
      
      // Initial state
      await expect(checkboxCustom).not.toHaveClass(/checked/);
      
      // Click to check
      await checkboxCustom.click();
      await expect(checkboxCustom).toHaveClass(/checked/);
      
      // Click to uncheck
      await checkboxCustom.click();
      await expect(checkboxCustom).not.toHaveClass(/checked/);
    }
  });

  test('should work with different variants', async ({ page }) => {
    const variantCheckboxes = page.locator('#checkbox dt-checkbox[variant]');
    const count = await variantCheckboxes.count();
    
    for (let i = 0; i < count; i++) {
      const checkbox = variantCheckboxes.nth(i);
      const checkboxCustom = checkbox.locator('.checkbox-custom');
      
      // Initial state
      await expect(checkboxCustom).not.toHaveClass(/checked/);
      
      // Click to check
      await checkboxCustom.click();
      await expect(checkboxCustom).toHaveClass(/checked/);
      
      // Click to uncheck
      await checkboxCustom.click();
      await expect(checkboxCustom).not.toHaveClass(/checked/);
    }
  });

  test('should dispatch change events', async ({ page }) => {
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    // Listen for change events
    const changeEvents = [];
    page.on('console', msg => {
      if (msg.text().includes('Checkbox changed:')) {
        changeEvents.push(msg.text());
      }
    });
    
    // Click to trigger event
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    
    // Should have triggered a change event
    expect(changeEvents.length).toBeGreaterThan(0);
  });

  test('should work in dark theme', async ({ page }) => {
    // Switch to dark theme
    const themeToggle = page.locator('dt-button[aria-label="Toggle theme"]');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(200);
    }
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    // Should still work in dark theme
    await expect(checkboxCustom).not.toHaveClass(/checked/);
    await checkboxCustom.click();
    await expect(checkboxCustom).toHaveClass(/checked/);
    await checkboxCustom.click();
    await expect(checkboxCustom).not.toHaveClass(/checked/);
  });

  test('should handle disabled state', async ({ page }) => {
    // Find a disabled checkbox
    const disabledCheckbox = page.locator('#checkbox dt-checkbox[disabled]').first();
    if (await disabledCheckbox.isVisible()) {
      const checkboxCustom = disabledCheckbox.locator('.checkbox-custom');
      
      // Should have disabled class
      await expect(checkboxCustom).toHaveClass(/disabled/);
      
      // Click should not change state
      await checkboxCustom.click();
      await expect(checkboxCustom).not.toHaveClass(/checked/);
    }
  });

  test('should handle indeterminate state', async ({ page }) => {
    // Find an indeterminate checkbox
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    if (await indeterminateCheckbox.isVisible()) {
      const checkboxCustom = indeterminateCheckbox.locator('.checkbox-custom');
      
      // Should have indeterminate class
      await expect(checkboxCustom).toHaveClass(/indeterminate/);
      
      // Click should clear indeterminate and set checked
      await checkboxCustom.click();
      await expect(checkboxCustom).toHaveClass(/checked/);
      await expect(checkboxCustom).not.toHaveClass(/indeterminate/);
    }
  });
});
