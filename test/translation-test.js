const { test, expect } = require('@playwright/test');

test.describe('Translation Test', () => {
  test('should display English content', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Check that the table of contents is in English
    const tocTitle = await page.locator('.toc-title').textContent();
    expect(tocTitle).toBe('Table of Contents');
    
    // Check that the toggle button has English title
    const toggleButton = page.locator('#tocToggle');
    const title = await toggleButton.getAttribute('title');
    expect(title).toBe('Collapse/Expand');
    
    // Check that section titles are in English
    const gridSection = page.locator('#grid-system h2');
    expect(await gridSection.textContent()).toBe('Grid System');
    
    const buttonsSection = page.locator('#buttons h2');
    expect(await buttonsSection.textContent()).toBe('Buttons');
    
    const popinSection = page.locator('#popin h2');
    expect(await popinSection.textContent()).toBe('Popin (Dropdown Menu)');
    
    const modalsSection = page.locator('#modals h2');
    expect(await modalsSection.textContent()).toBe('Modals');
    
    const formsSection = page.locator('#forms h2');
    expect(await formsSection.textContent()).toBe('Forms');
    
    const cardsSection = page.locator('#cards h2');
    expect(await cardsSection.textContent()).toBe('Cards');
    
    const alertsSection = page.locator('#alerts h2');
    expect(await alertsSection.textContent()).toBe('Alerts');
    
    const tooltipsSection = page.locator('#tooltips h2');
    expect(await tooltipsSection.textContent()).toBe('Tooltips');
    
    const boxComponentsSection = page.locator('#box-components h2');
    expect(await boxComponentsSection.textContent()).toBe('Box Components');
    
    const typographySection = page.locator('#typography h2');
    expect(await typographySection.textContent()).toBe('Typography');
    
    const iconsSection = page.locator('#icons h2');
    expect(await iconsSection.textContent()).toBe('Icons');
    
    const themeToggleSection = page.locator('#theme-toggle h2');
    expect(await themeToggleSection.textContent()).toBe('Theme Toggle');
    
    const darkThemeSection = page.locator('#dark-theme h2');
    expect(await darkThemeSection.textContent()).toBe('Dark Theme');
    
    const utilitiesSection = page.locator('#utilities h2');
    expect(await utilitiesSection.textContent()).toBe('Utilities');
  });
  
  test('should display English content in alerts', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Check alert content
    const alertText = await page.locator('.alert strong').first().textContent();
    expect(alertText).toBe('Important Information!');
    
    // Check that code examples have English titles
    const codeExample = page.locator('dt-code-example').first();
    const title = await codeExample.getAttribute('title');
    expect(title).toBe('Responsive Grid System');
  });
  
  test('should display English content in interactive elements', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Check popin interactive examples
    const popinTrigger = page.locator('#interactive-popin-1');
    const triggerText = await popinTrigger.getAttribute('trigger-text');
    expect(triggerText).toBe('User Actions');
    
    // Check that popin items are in English
    const editItem = page.locator('#interactive-popin-1 .popin-item').first();
    expect(await editItem.textContent()).toContain('Edit');
    
    // Check settings popin
    const settingsPopin = page.locator('#interactive-popin-2');
    const settingsText = await settingsPopin.getAttribute('trigger-text');
    expect(settingsText).toBe('Settings');
    
    // Check navigation popin
    const navPopin = page.locator('#interactive-popin-3');
    const navText = await navPopin.getAttribute('trigger-text');
    expect(navText).toBe('Navigation');
  });
  
  test('should display English content in theme toggle section', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Check theme toggle section content
    const themeToggleDescription = page.locator('#theme-toggle p').first();
    expect(await themeToggleDescription.textContent()).toContain('allows switching between light and dark themes');
    
    // Check available variants text
    const variantsText = page.locator('#theme-toggle h4').first();
    expect(await variantsText.textContent()).toBe('Available Variants:');
    
    // Check features section
    const featuresText = page.locator('#theme-toggle h4').nth(2);
    expect(await featuresText.textContent()).toBe('Features:');
  });
  
  test('should display English content in icons section', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Check icons section content
    const iconsDescription = page.locator('#icons p').first();
    expect(await iconsDescription.textContent()).toContain('complete SVG icon system');
    
    // Check icon names are in English
    const iconNames = page.locator('.icon-name');
    const firstIconName = await iconNames.first().textContent();
    expect(firstIconName).toBe('Plus');
    
    const secondIconName = await iconNames.nth(1).textContent();
    expect(secondIconName).toBe('Minus');
  });
});
