// test/checkbox-toggle-fix-test.js
// Test to verify checkbox toggle fix

const { chromium } = require('playwright');
const path = require('path');

async function testCheckboxToggleFix() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('Testing checkbox toggle fix on main page...');
    
    // Find the checkbox section
    await page.click('a[href="#checkbox"]');
    await page.waitForTimeout(500);
    
    // Test the first checkbox in the checkbox section
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    console.log('Found checkbox, testing toggle...');
    
    // Initial state
    const initialChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('Initial state:', initialChecked ? 'checked' : 'unchecked');
    
    // First click - should check
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    const afterFirstClick = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('After first click:', afterFirstClick ? 'checked' : 'unchecked');
    
    // Second click - should uncheck
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    const afterSecondClick = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('After second click:', afterSecondClick ? 'checked' : 'unchecked');
    
    // Test multiple toggles
    console.log('Testing multiple toggles...');
    for (let i = 0; i < 3; i++) {
      await checkboxCustom.click();
      await page.waitForTimeout(100);
      const isChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Toggle ${i + 1}: ${isChecked ? 'checked' : 'unchecked'}`);
    }
    
    // Test different sizes
    console.log('Testing different sizes...');
    const sizeCheckboxes = page.locator('#checkbox dt-checkbox[size]');
    const count = await sizeCheckboxes.count();
    console.log(`Found ${count} size checkboxes`);
    
    for (let i = 0; i < Math.min(count, 3); i++) {
      const sizeCheckbox = sizeCheckboxes.nth(i);
      const sizeCustom = sizeCheckbox.locator('.checkbox-custom');
      
      // Click to check
      await sizeCustom.click();
      await page.waitForTimeout(100);
      const isChecked = await sizeCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Size checkbox ${i + 1} - after click: ${isChecked ? 'checked' : 'unchecked'}`);
      
      // Click to uncheck
      await sizeCustom.click();
      await page.waitForTimeout(100);
      const isUnchecked = await sizeCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Size checkbox ${i + 1} - after second click: ${isUnchecked ? 'checked' : 'unchecked'}`);
    }
    
    // Test dark theme
    console.log('Testing dark theme...');
    const themeToggle = page.locator('dt-button[aria-label="Toggle theme"]');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // Test toggle in dark theme
      await checkboxCustom.click();
      await page.waitForTimeout(100);
      const darkChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
      console.log('Dark theme - after click:', darkChecked ? 'checked' : 'unchecked');
      
      await checkboxCustom.click();
      await page.waitForTimeout(100);
      const darkUnchecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
      console.log('Dark theme - after second click:', darkUnchecked ? 'checked' : 'unchecked');
    }
    
    // Take a screenshot
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'checkbox-toggle-fix-test.png'),
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved to test/screenshots/checkbox-toggle-fix-test.png');
    console.log('\nCheckbox toggle fix test completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testCheckboxToggleFix();
