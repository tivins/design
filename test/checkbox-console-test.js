// test/checkbox-console-test.js
// Test with console logs visible

const { chromium } = require('playwright');

async function testCheckboxConsole() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing checkbox with console logs...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    console.log('✅ Found checkbox, testing toggle...');
    console.log('Please check the browser console for toggle logs');
    
    // Test 3 clicks
    for (let i = 0; i < 3; i++) {
      console.log(`\n--- Click ${i + 1} ---`);
      await checkboxCustom.click();
      await page.waitForTimeout(500);
      
      const state = await checkbox.evaluate(el => {
        return {
          _checked: el._checked,
          hasCheckedAttr: el.hasAttribute('checked'),
          customChecked: el.shadowRoot.querySelector('.checkbox-custom').classList.contains('checked')
        };
      });
      
      console.log('State:', JSON.stringify(state));
    }
    
    console.log('\n🎯 Test completed - check browser console for detailed logs');
    console.log('Press Ctrl+C to close the browser');
    
    // Keep browser open to see console
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCheckboxConsole();
