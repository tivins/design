// test/checkbox-debug-test.js
// Quick debug test for checkbox component

const { chromium } = require('playwright');

async function debugCheckbox() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Debugging checkbox component...');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Page loaded');
    
    // Check if checkbox component is defined
    const componentDefined = await page.evaluate(() => {
      return typeof customElements !== 'undefined' && 
             customElements.get('dt-checkbox') !== undefined;
    });
    
    console.log('Checkbox component defined:', componentDefined);
    
    // Navigate to checkbox section
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Count checkboxes
    const checkboxCount = await page.locator('#checkbox dt-checkbox').count();
    console.log('Checkboxes found:', checkboxCount);
    
    if (checkboxCount === 0) {
      console.log('❌ No checkboxes found in the checkbox section!');
      
      // Check what's actually in the checkbox section
      const sectionContent = await page.locator('#checkbox').innerHTML();
      console.log('Checkbox section content:', sectionContent.substring(0, 500));
      
      return;
    }
    
    // Test the first checkbox
    const firstCheckbox = page.locator('#checkbox dt-checkbox').first();
    const isVisible = await firstCheckbox.isVisible();
    console.log('First checkbox visible:', isVisible);
    
    if (isVisible) {
      // Get checkbox state
      const checkboxState = await firstCheckbox.evaluate(el => {
        const shadow = el.shadowRoot;
        if (shadow) {
          const custom = shadow.querySelector('.checkbox-custom');
          const input = shadow.querySelector('.checkbox-input');
          return {
            hasShadowRoot: true,
            hasCustomElement: !!custom,
            hasInputElement: !!input,
            customClasses: custom ? custom.className : 'none',
            inputChecked: input ? input.checked : false,
            customChecked: custom ? custom.classList.contains('checked') : false
          };
        }
        return { hasShadowRoot: false };
      });
      
      console.log('Checkbox state:', JSON.stringify(checkboxState, null, 2));
      
      // Try to click
      const checkboxCustom = firstCheckbox.locator('.checkbox-custom');
      const customExists = await checkboxCustom.count() > 0;
      console.log('Custom element exists:', customExists);
      
      if (customExists) {
        console.log('Clicking checkbox...');
        await checkboxCustom.click();
        await page.waitForTimeout(500);
        
        const afterClick = await firstCheckbox.evaluate(el => {
          const shadow = el.shadowRoot;
          if (shadow) {
            const custom = shadow.querySelector('.checkbox-custom');
            return custom ? custom.classList.contains('checked') : false;
          }
          return false;
        });
        
        console.log('After click - checked:', afterClick);
        
        // Click again
        console.log('Clicking again...');
        await checkboxCustom.click();
        await page.waitForTimeout(500);
        
        const afterSecondClick = await firstCheckbox.evaluate(el => {
          const shadow = el.shadowRoot;
          if (shadow) {
            const custom = shadow.querySelector('.checkbox-custom');
            return custom ? custom.classList.contains('checked') : false;
          }
          return false;
        });
        
        console.log('After second click - checked:', afterSecondClick);
      }
    }
    
    console.log('🎯 Debug completed');
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the debug
debugCheckbox();
