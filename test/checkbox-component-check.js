// test/checkbox-component-check.js
// Check if indeterminate checkbox is a proper web component

const { chromium } = require('playwright');

async function testComponentCheck() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Checking if indeterminate checkbox is a proper web component...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    
    if (await indeterminateCheckbox.count() > 0) {
      console.log('✅ Found indeterminate checkbox');
      
      // Check if it's a proper web component
      const componentInfo = await indeterminateCheckbox.evaluate(el => {
        return {
          tagName: el.tagName,
          constructor: el.constructor.name,
          hasShadowRoot: !!el.shadowRoot,
          isConnected: el.isConnected,
          hasAttribute: el.hasAttribute('indeterminate'),
          getAttribute: el.getAttribute('indeterminate'),
          allAttributes: Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`)
        };
      });
      
      console.log('Component info:', JSON.stringify(componentInfo, null, 2));
      
      // Check if toggle method exists
      const hasToggle = await indeterminateCheckbox.evaluate(el => {
        return typeof el.toggle === 'function';
      });
      
      console.log('Has toggle method:', hasToggle);
      
      // Try to call toggle directly
      if (hasToggle) {
        const toggleResult = await indeterminateCheckbox.evaluate(el => {
          const before = {
            indeterminate: el.hasAttribute('indeterminate'),
            checked: el.hasAttribute('checked')
          };
          
          el.toggle();
          
          const after = {
            indeterminate: el.hasAttribute('indeterminate'),
            checked: el.hasAttribute('checked')
          };
          
          return { before, after };
        });
        
        console.log('Toggle result:', JSON.stringify(toggleResult, null, 2));
      }
      
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

testComponentCheck();
