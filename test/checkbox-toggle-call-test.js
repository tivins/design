// test/checkbox-toggle-call-test.js
// Test if toggle() is called on indeterminate checkbox

const { chromium } = require('playwright');

async function testToggleCall() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing if toggle() is called on indeterminate checkbox...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    
    if (await indeterminateCheckbox.count() > 0) {
      console.log('✅ Found indeterminate checkbox');
      
      // Override toggle method to add logging
      await indeterminateCheckbox.evaluate(el => {
        const originalToggle = el.toggle;
        el.toggle = function() {
          console.log('TOGGLE_CALLED: toggle() method was called');
          return originalToggle.call(this);
        };
      });
      
      // Click the checkbox
      const indeterminateCustom = indeterminateCheckbox.locator('.checkbox-custom');
      await indeterminateCustom.click();
      await page.waitForTimeout(500);
      
      // Check final state
      const finalState = await indeterminateCheckbox.evaluate(el => ({
        indeterminate: el.hasAttribute('indeterminate'),
        checked: el.hasAttribute('checked')
      }));
      
      console.log('Final state:', JSON.stringify(finalState, null, 2));
      
    } else {
      console.log('❌ No indeterminate checkbox found');
    }
    
    console.log('\n🎯 Test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testToggleCall();
