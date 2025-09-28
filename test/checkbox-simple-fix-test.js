// test/checkbox-simple-fix-test.js
// Simple test to verify the fix

const { chromium } = require('playwright');

async function testCheckboxFix() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing checkbox fix...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    console.log('✅ Found checkbox, testing toggle...');
    
    // Test multiple clicks and log the state
    for (let i = 0; i < 6; i++) {
      await checkboxCustom.click();
      await page.waitForTimeout(200);
      
      const state = await checkbox.evaluate(el => {
        const shadow = el.shadowRoot;
        if (shadow) {
          const custom = shadow.querySelector('.checkbox-custom');
          return {
            _checked: el._checked,
            hasCheckedAttr: el.hasAttribute('checked'),
            customChecked: custom ? custom.classList.contains('checked') : false
          };
        }
        return {};
      });
      
      console.log(`Click ${i + 1}:`, JSON.stringify(state));
    }
    
    console.log('🎯 Test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCheckboxFix();
