// test/checkbox-indeterminate-debug.js
// Debug indeterminate checkbox issue

const { chromium } = require('playwright');

async function debugIndeterminateCheckbox() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Debugging indeterminate checkbox...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    
    if (await indeterminateCheckbox.count() > 0) {
      console.log('✅ Found indeterminate checkbox');
      
      // Get initial state
      const initialState = await indeterminateCheckbox.evaluate(el => ({
        indeterminate: el.indeterminate,
        hasIndeterminateAttr: el.hasAttribute('indeterminate'),
        checked: el.checked,
        hasCheckedAttr: el.hasAttribute('checked')
      }));
      
      console.log('Initial state:', JSON.stringify(initialState, null, 2));
      
      // Click and check state
      const indeterminateCustom = indeterminateCheckbox.locator('.checkbox-custom');
      await indeterminateCustom.click();
      await page.waitForTimeout(500);
      
      const afterClickState = await indeterminateCheckbox.evaluate(el => ({
        indeterminate: el.indeterminate,
        hasIndeterminateAttr: el.hasAttribute('indeterminate'),
        checked: el.checked,
        hasCheckedAttr: el.hasAttribute('checked')
      }));
      
      console.log('After click state:', JSON.stringify(afterClickState, null, 2));
      
      // Test toggle method directly
      console.log('\n--- Testing toggle method directly ---');
      const toggleResult = await indeterminateCheckbox.evaluate(el => {
        const before = {
          indeterminate: el.indeterminate,
          hasIndeterminateAttr: el.hasAttribute('indeterminate'),
          checked: el.checked,
          hasCheckedAttr: el.hasAttribute('checked')
        };
        
        el.toggle();
        
        const after = {
          indeterminate: el.indeterminate,
          hasIndeterminateAttr: el.hasAttribute('indeterminate'),
          checked: el.checked,
          hasCheckedAttr: el.hasAttribute('checked')
        };
        
        return { before, after };
      });
      
      console.log('Toggle result:', JSON.stringify(toggleResult, null, 2));
      
    } else {
      console.log('❌ No indeterminate checkbox found');
    }
    
    console.log('\n🎯 Debug completed');
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

debugIndeterminateCheckbox();
