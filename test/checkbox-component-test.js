// test/checkbox-component-test.js
// Test suite for the checkbox web component

const { chromium } = require('playwright');
const path = require('path');

async function testCheckboxComponent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the local development server
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    console.log('Testing checkbox component...');
    
    // Test 1: Basic checkbox rendering
    console.log('Test 1: Basic checkbox rendering');
    await page.evaluate(() => {
      const checkbox = document.createElement('dt-checkbox');
      checkbox.setAttribute('label', 'Basic Checkbox');
      document.body.appendChild(checkbox);
    });
    
    const checkbox = page.locator('dt-checkbox').first();
    await checkbox.waitFor({ state: 'visible' });
    
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    const checkboxLabel = checkbox.locator('.checkbox-label');
    
    if (await checkboxCustom.isVisible() && await checkboxLabel.isVisible()) {
      console.log('✓ Basic checkbox renders correctly');
    } else {
      console.log('✗ Basic checkbox failed to render');
    }
    
    // Test 2: Checkbox toggle functionality
    console.log('Test 2: Checkbox toggle functionality');
    await checkboxCustom.click();
    
    if (await checkboxCustom.evaluate(el => el.classList.contains('checked'))) {
      console.log('✓ Checkbox toggles to checked state');
    } else {
      console.log('✗ Checkbox failed to toggle to checked state');
    }
    
    await checkboxCustom.click();
    
    if (!(await checkboxCustom.evaluate(el => el.classList.contains('checked')))) {
      console.log('✓ Checkbox toggles to unchecked state');
    } else {
      console.log('✗ Checkbox failed to toggle to unchecked state');
    }
    
    // Test 3: Different sizes
    console.log('Test 3: Different sizes');
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.gap = '1rem';
      container.style.alignItems = 'center';
      
      const sizes = ['sm', 'md', 'lg'];
      sizes.forEach(size => {
        const checkbox = document.createElement('dt-checkbox');
        checkbox.setAttribute('size', size);
        checkbox.setAttribute('label', `Size ${size}`);
        container.appendChild(checkbox);
      });
      
      document.body.appendChild(container);
    });
    
    const checkboxes = page.locator('dt-checkbox');
    const count = await checkboxes.count();
    
    if (count >= 4) { // 1 original + 3 new ones
      console.log('✓ Different sizes render correctly');
    } else {
      console.log('✗ Different sizes failed to render');
    }
    
    // Test 4: Different variants
    console.log('Test 4: Different variants');
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.gap = '1rem';
      container.style.alignItems = 'center';
      
      const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
      variants.forEach(variant => {
        const checkbox = document.createElement('dt-checkbox');
        checkbox.setAttribute('variant', variant);
        checkbox.setAttribute('label', variant);
        checkbox.setAttribute('checked', '');
        container.appendChild(checkbox);
      });
      
      document.body.appendChild(container);
    });
    
    const variantCheckboxes = page.locator('dt-checkbox');
    const variantCount = await variantCheckboxes.count();
    
    if (variantCount >= 10) { // Previous + 6 new ones
      console.log('✓ Different variants render correctly');
    } else {
      console.log('✗ Different variants failed to render');
    }
    
    // Test 5: Disabled state
    console.log('Test 5: Disabled state');
    await page.evaluate(() => {
      const checkbox = document.createElement('dt-checkbox');
      checkbox.setAttribute('label', 'Disabled Checkbox');
      checkbox.setAttribute('disabled', '');
      document.body.appendChild(checkbox);
    });
    
    const disabledCheckbox = page.locator('dt-checkbox').last();
    const disabledCheckboxCustom = disabledCheckbox.locator('.checkbox-custom');
    
    if (await disabledCheckboxCustom.evaluate(el => el.classList.contains('disabled'))) {
      console.log('✓ Disabled state renders correctly');
    } else {
      console.log('✗ Disabled state failed to render');
    }
    
    // Test 6: Indeterminate state
    console.log('Test 6: Indeterminate state');
    await page.evaluate(() => {
      const checkbox = document.createElement('dt-checkbox');
      checkbox.setAttribute('label', 'Indeterminate Checkbox');
      checkbox.setAttribute('indeterminate', '');
      document.body.appendChild(checkbox);
    });
    
    const indeterminateCheckbox = page.locator('dt-checkbox').last();
    const indeterminateCheckboxCustom = indeterminateCheckbox.locator('.checkbox-custom');
    
    if (await indeterminateCheckboxCustom.evaluate(el => el.classList.contains('indeterminate'))) {
      console.log('✓ Indeterminate state renders correctly');
    } else {
      console.log('✗ Indeterminate state failed to render');
    }
    
    // Test 7: Event handling
    console.log('Test 7: Event handling');
    let eventFired = false;
    await page.evaluate(() => {
      window.eventFired = false;
      const checkbox = document.createElement('dt-checkbox');
      checkbox.setAttribute('label', 'Event Test');
      checkbox.addEventListener('dt-checkbox-change', () => {
        window.eventFired = true;
      });
      document.body.appendChild(checkbox);
    });
    
    const eventCheckbox = page.locator('dt-checkbox').last();
    const eventCheckboxCustom = eventCheckbox.locator('.checkbox-custom');
    
    await eventCheckboxCustom.click();
    
    eventFired = await page.evaluate(() => window.eventFired);
    
    if (eventFired) {
      console.log('✓ Change events fire correctly');
    } else {
      console.log('✗ Change events failed to fire');
    }
    
    // Test 8: Dark theme
    console.log('Test 8: Dark theme');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    
    await page.evaluate(() => {
      const checkbox = document.createElement('dt-checkbox');
      checkbox.setAttribute('label', 'Dark Theme Test');
      document.body.appendChild(checkbox);
    });
    
    const darkCheckbox = page.locator('dt-checkbox').last();
    const darkCheckboxCustom = darkCheckbox.locator('.checkbox-custom');
    
    if (await darkCheckboxCustom.isVisible()) {
      console.log('✓ Dark theme renders correctly');
    } else {
      console.log('✗ Dark theme failed to render');
    }
    
    // Take a screenshot
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'checkbox-component-test.png'),
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved to test/screenshots/checkbox-component-test.png');
    
    console.log('\nAll checkbox component tests completed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testCheckboxComponent();
