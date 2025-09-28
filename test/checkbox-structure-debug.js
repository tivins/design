// test/checkbox-structure-debug.js
// Debug checkbox structure

const { chromium } = require('playwright');

async function debugCheckboxStructure() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Debugging checkbox structure...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    
    if (await indeterminateCheckbox.count() > 0) {
      console.log('✅ Found indeterminate checkbox');
      
      // Check structure
      const structure = await indeterminateCheckbox.evaluate(el => {
        const shadow = el.shadowRoot;
        if (shadow) {
          const custom = shadow.querySelector('.checkbox-custom');
          const label = shadow.querySelector('.checkbox-label');
          const input = shadow.querySelector('.checkbox-input');
          
          return {
            hasCustom: !!custom,
            hasLabel: !!label,
            hasInput: !!input,
            customClasses: custom ? custom.className : 'none',
            labelText: label ? label.textContent.trim() : 'none',
            customHTML: custom ? custom.outerHTML.substring(0, 200) : 'none'
          };
        }
        return { error: 'No shadow root' };
      });
      
      console.log('Structure:', JSON.stringify(structure, null, 2));
      
      // Test if custom element is clickable
      const customElement = indeterminateCheckbox.locator('.checkbox-custom');
      const customExists = await customElement.count() > 0;
      console.log('Custom element exists:', customExists);
      
      if (customExists) {
        const isVisible = await customElement.isVisible();
        console.log('Custom element visible:', isVisible);
        
        // Try to click with different methods
        try {
          await customElement.click({ timeout: 1000 });
          console.log('✅ Click successful');
        } catch (error) {
          console.log('❌ Click failed:', error.message);
        }
      }
      
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

debugCheckboxStructure();
