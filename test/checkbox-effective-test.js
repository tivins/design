// test/checkbox-effective-test.js
// Effective test for checkbox component using direct Playwright API

const { chromium } = require('playwright');
const path = require('path');

async function testCheckboxEffectively() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Starting effective checkbox test...');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page loaded successfully');
    
    // Navigate to checkbox section
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(500);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test 1: Basic toggle functionality
    console.log('🧪 Test 1: Basic toggle functionality');
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    // Check if checkbox exists
    const checkboxExists = await checkbox.isVisible();
    console.log('Checkbox exists:', checkboxExists);
    
    if (!checkboxExists) {
      console.log('❌ No checkbox found!');
      return;
    }
    
    // Get initial state
    const initialChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('Initial state:', initialChecked ? 'checked' : 'unchecked');
    
    // First click
    console.log('Clicking checkbox...');
    await checkboxCustom.click();
    await page.waitForTimeout(200);
    
    const afterFirstClick = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('After first click:', afterFirstClick ? 'checked' : 'unchecked');
    
    // Second click
    console.log('Clicking checkbox again...');
    await checkboxCustom.click();
    await page.waitForTimeout(200);
    
    const afterSecondClick = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
    console.log('After second click:', afterSecondClick ? 'checked' : 'unchecked');
    
    // Test 2: Multiple clicks
    console.log('🧪 Test 2: Multiple clicks test');
    
    for (let i = 0; i < 5; i++) {
      await checkboxCustom.click();
      await page.waitForTimeout(100);
      const isChecked = await checkboxCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Click ${i + 1}: ${isChecked ? 'checked' : 'unchecked'}`);
    }
    
    // Test 3: Check DOM structure
    console.log('🧪 Test 3: DOM structure analysis');
    
    const shadowRoot = await checkbox.evaluate(el => el.shadowRoot ? 'exists' : 'missing');
    console.log('Shadow root:', shadowRoot);
    
    const inputElement = await checkbox.evaluate(el => {
      const shadow = el.shadowRoot;
      if (shadow) {
        const input = shadow.querySelector('.checkbox-input');
        return input ? 'exists' : 'missing';
      }
      return 'no shadow root';
    });
    console.log('Input element:', inputElement);
    
    const customElement = await checkbox.evaluate(el => {
      const shadow = el.shadowRoot;
      if (shadow) {
        const custom = shadow.querySelector('.checkbox-custom');
        return custom ? 'exists' : 'missing';
      }
      return 'no shadow root';
    });
    console.log('Custom element:', customElement);
    
    // Test 4: Event handling
    console.log('🧪 Test 4: Event handling');
    
    // Listen for console logs
    const events = [];
    page.on('console', msg => {
      if (msg.text().includes('Checkbox changed:')) {
        events.push(msg.text());
        console.log('Event captured:', msg.text());
      }
    });
    
    // Add event listener to the page
    await page.evaluate(() => {
      const checkbox = document.querySelector('#checkbox dt-checkbox');
      if (checkbox) {
        checkbox.addEventListener('dt-checkbox-change', (e) => {
          console.log('Checkbox changed:', e.detail);
        });
      }
    });
    
    // Trigger events
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    await checkboxCustom.click();
    await page.waitForTimeout(100);
    
    console.log('Events captured:', events.length);
    
    // Test 5: Different sizes
    console.log('🧪 Test 5: Different sizes');
    
    const sizeCheckboxes = page.locator('#checkbox dt-checkbox[size]');
    const sizeCount = await sizeCheckboxes.count();
    console.log('Size checkboxes found:', sizeCount);
    
    for (let i = 0; i < Math.min(sizeCount, 3); i++) {
      const sizeCheckbox = sizeCheckboxes.nth(i);
      const sizeCustom = sizeCheckbox.locator('.checkbox-custom');
      
      console.log(`Testing size checkbox ${i + 1}...`);
      
      // Click to check
      await sizeCustom.click();
      await page.waitForTimeout(100);
      const isChecked = await sizeCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Size ${i + 1} after click: ${isChecked ? 'checked' : 'unchecked'}`);
      
      // Click to uncheck
      await sizeCustom.click();
      await page.waitForTimeout(100);
      const isUnchecked = await sizeCustom.evaluate(el => el.classList.contains('checked'));
      console.log(`Size ${i + 1} after second click: ${isUnchecked ? 'checked' : 'unchecked'}`);
    }
    
    // Test 6: Debug the component
    console.log('🧪 Test 6: Component debugging');
    
    const componentInfo = await checkbox.evaluate(el => {
      return {
        tagName: el.tagName,
        hasShadowRoot: !!el.shadowRoot,
        attributes: Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`),
        innerHTML: el.innerHTML,
        shadowHTML: el.shadowRoot ? el.shadowRoot.innerHTML.substring(0, 200) + '...' : 'none'
      };
    });
    
    console.log('Component info:', JSON.stringify(componentInfo, null, 2));
    
    // Take a screenshot
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'checkbox-effective-test.png'),
      fullPage: true 
    });
    
    console.log('✅ Screenshot saved to test/screenshots/checkbox-effective-test.png');
    console.log('\n🎯 Effective checkbox test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testCheckboxEffectively();
