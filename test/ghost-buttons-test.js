// test/ghost-buttons-test.js
// Test for the new ghost button styles inspired by popin triggers

const { test, expect } = require('@playwright/test');

test.describe('Ghost Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('should display ghost buttons correctly in light theme', async ({ page }) => {
    // Ensure we're in light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    
    // Navigate to buttons section
    await page.click('text=Buttons');
    await page.waitForSelector('#buttons');
    
    // Check that ghost buttons are visible
    const ghostButton = page.locator('dt-button[variant="ghost"]');
    await expect(ghostButton).toBeVisible();
    
    // Check ghost button styles
    const ghostButtonStyles = await ghostButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        borderColor: computed.borderColor
      };
    });
    
    // Ghost button should have transparent background and gray text
    expect(ghostButtonStyles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(ghostButtonStyles.color).toContain('rgb(107, 114, 128)'); // gray-600
    
    // Test hover effect
    await ghostButton.hover();
    const hoverStyles = await ghostButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    
    // On hover, should have gray background and darker text
    expect(hoverStyles.backgroundColor).toContain('rgb(243, 244, 246)'); // gray-100
    expect(hoverStyles.color).toContain('rgb(31, 41, 55)'); // gray-800
  });

  test('should display ghost buttons correctly in dark theme', async ({ page }) => {
    // Switch to dark theme
    await page.click('dt-theme-toggle');
    await page.waitForTimeout(500); // Wait for theme transition
    
    // Navigate to buttons section
    await page.click('text=Buttons');
    await page.waitForSelector('#buttons');
    
    // Check ghost button in dark theme
    const ghostButton = page.locator('dt-button[variant="ghost"]');
    await expect(ghostButton).toBeVisible();
    
    const darkThemeStyles = await ghostButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    
    // In dark theme, ghost button should have lighter gray text
    expect(darkThemeStyles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(darkThemeStyles.color).toContain('rgb(156, 163, 175)'); // gray-400
    
    // Test hover effect in dark theme
    await ghostButton.hover();
    const darkHoverStyles = await ghostButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    
    // On hover in dark theme, should have dark background and light text
    expect(darkHoverStyles.backgroundColor).toContain('rgb(31, 41, 55)'); // gray-800
    expect(darkHoverStyles.color).toContain('rgb(229, 231, 235)'); // gray-200
  });

  test('should display colored ghost buttons correctly', async ({ page }) => {
    // Navigate to buttons section
    await page.click('text=Buttons');
    await page.waitForSelector('#buttons');
    
    // Test ghost-primary button
    const ghostPrimaryButton = page.locator('dt-button[variant="ghost-primary"]');
    await expect(ghostPrimaryButton).toBeVisible();
    
    const primaryStyles = await ghostPrimaryButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    
    // Ghost primary should have primary color text and transparent background
    expect(primaryStyles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(primaryStyles.color).toContain('rgb(59, 130, 246)'); // primary color
    
    // Test hover effect for ghost-primary
    await ghostPrimaryButton.hover();
    const primaryHoverStyles = await ghostPrimaryButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    
    // On hover, should have primary background and white text
    expect(primaryHoverStyles.backgroundColor).toContain('rgb(59, 130, 246)'); // primary
    expect(primaryHoverStyles.color).toContain('rgb(255, 255, 255)'); // white
    
    // Test ghost-success button
    const ghostSuccessButton = page.locator('dt-button[variant="ghost-success"]');
    await expect(ghostSuccessButton).toBeVisible();
    
    const successStyles = await ghostSuccessButton.evaluate((el) => {
      const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor
      };
    });
    
    expect(successStyles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(successStyles.color).toContain('rgb(34, 197, 94)'); // success color
  });

  test('should work with different button sizes', async ({ page }) => {
    // Navigate to buttons section
    await page.click('text=Buttons');
    await page.waitForSelector('#buttons');
    
    // Test small ghost button
    const smallGhostButton = page.locator('dt-button[variant="ghost-primary"][size="sm"]');
    if (await smallGhostButton.count() > 0) {
      await expect(smallGhostButton).toBeVisible();
      
      const smallStyles = await smallGhostButton.evaluate((el) => {
        const computed = window.getComputedStyle(el.shadowRoot.querySelector('.btn'));
        return {
          padding: computed.padding,
          fontSize: computed.fontSize
        };
      });
      
      // Small button should have smaller padding and font size
      expect(smallStyles.padding).toContain('0.25rem'); // xs padding
      expect(smallStyles.fontSize).toContain('0.875rem'); // sm font size
    }
  });

  test('should work with icons', async ({ page }) => {
    // Navigate to buttons section
    await page.click('text=Buttons');
    await page.waitForSelector('#buttons');
    
    // Create a ghost button with icon for testing
    await page.evaluate(() => {
      const button = document.createElement('dt-button');
      button.setAttribute('variant', 'ghost-primary');
      button.setAttribute('icon', 'plus');
      button.textContent = 'Ghost with Icon';
      document.querySelector('#buttons .component-demo').appendChild(button);
    });
    
    await page.waitForTimeout(100);
    
    const ghostWithIcon = page.locator('dt-button[variant="ghost-primary"][icon="plus"]').last();
    await expect(ghostWithIcon).toBeVisible();
    
    // Check that icon is present
    const icon = ghostWithIcon.locator('dt-icon[name="plus"]');
    await expect(icon).toBeVisible();
  });
});
