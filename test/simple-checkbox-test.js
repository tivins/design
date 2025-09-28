// test/simple-checkbox-test.js
// Simple test for checkbox toggle functionality

const { chromium } = require('playwright');
const path = require('path');

async function testSimpleCheckbox() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Load the test HTML file
    const htmlPath = path.join(__dirname, 'simple-checkbox-test.html');
    await page.goto(`file://${htmlPath}`);
    
    console.log('Simple checkbox test page loaded');
    
    // Wait for components to load
    await page.waitForLoadState('networkidle');
    
    // Test basic toggle functionality
    console.log('Testing basic toggle...');
    
    const checkbox = page.locator('dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    // Initial state should be unchecked
    const initialChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('Initial state (should be unchecked):', initialChecked);
    
    // Click to check
    await checkboxCustom.click();
    await page.waitForTimeout(100); // Small delay for state update
    
    const afterFirstClick = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('After first click (should be checked):', afterFirstClick);
    
    // Click to uncheck
    await checkboxCustom.click();
    await page.waitForTimeout(100); // Small delay for state update
    
    const afterSecondClick = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('After second click (should be unchecked):', afterSecondClick);
    
    // Test multiple clicks
    console.log('Testing multiple clicks...');
    for (let i = 0; i < 5; i++) {
      await checkboxCustom.click();
      await page.waitForTimeout(50);
      const isChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Click ${i + 1}: ${isChecked ? 'checked' : 'unchecked'}`);
    }
    
    // Test different sizes
    console.log('Testing different sizes...');
    const sizeCheckboxes = page.locator('dt-checkbox[size]');
    const count = await sizeCheckboxes.count();
    
    for (let i = 0; i < count; i++) {
      const sizeCheckbox = sizeCheckboxes.nth(i);
      const sizeCustom = sizeCheckbox.locator('.checkbox-custom');
      
      await sizeCustom.click();
      await page.waitForTimeout(50);
      const isChecked = await sizeCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Size checkbox ${i + 1}: ${isChecked ? 'checked' : 'unchecked'}`);
      
      // Click again to uncheck
      await sizeCustom.click();
      await page.waitForTimeout(50);
      const isUnchecked = await sizeCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Size checkbox ${i + 1} after second click: ${isUnchecked ? 'checked' : 'unchecked'}`);
    }
    
    // Test dark theme
    console.log('Testing dark theme...');
    await page.click('.theme-toggle');
    await page.waitForTimeout(100);
    
    // Test toggle in dark theme
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    const darkThemeChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('Dark theme - after click:', darkThemeChecked);
    
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    const darkThemeUnchecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('Dark theme - after second click:', darkThemeUnchecked);
    
    // Take a screenshot
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'simple-checkbox-test.png'),
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved to test/screenshots/simple-checkbox-test.png');
    console.log('\nSimple checkbox test completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testSimpleCheckbox();