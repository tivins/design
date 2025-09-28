// test/checkbox-event-listeners-test.js
// Test if event listeners are attached to indeterminate checkbox

const { chromium } = require('playwright');

async function testEventListeners() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing event listeners on indeterminate checkbox...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    
    if (await indeterminateCheckbox.count() > 0) {
      console.log('✅ Found indeterminate checkbox');
      
      // Check if event listeners are attached
      const hasListeners = await indeterminateCheckbox.evaluate(el => {
        const shadow = el.shadowRoot;
        if (shadow) {
          const custom = shadow.querySelector('.checkbox-custom');
          if (custom) {
            // Check if the element has click event listeners
            // This is a bit tricky to detect, but we can try to trigger the event
            let eventTriggered = false;
            
            // Add a temporary listener to see if our listener is working
            const tempListener = () => { eventTriggered = true; };
            custom.addEventListener('click', tempListener);
            
            // Trigger a click
            custom.click();
            
            // Remove temp listener
            custom.removeEventListener('click', tempListener);
            
            return eventTriggered;
          }
        }
        return false;
      });
      
      console.log('Has click listeners:', hasListeners);
      
      // Test direct toggle
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

testEventListeners();
