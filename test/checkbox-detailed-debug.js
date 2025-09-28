// test/checkbox-detailed-debug.js
// Detailed debug to understand the toggle issue

const { chromium } = require('playwright');

async function detailedDebugCheckbox() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Detailed checkbox debug...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    
    // Add detailed logging
    await page.evaluate(() => {
      const checkbox = document.querySelector('#checkbox dt-checkbox');
      if (checkbox) {
        // Override console.log to capture all logs
        const originalLog = console.log;
        console.log = function(...args) {
          originalLog.apply(console, args);
          window.debugLogs = window.debugLogs || [];
          window.debugLogs.push(args.join(' '));
        };
        
        // Add event listeners to track everything
        checkbox.addEventListener('dt-checkbox-change', (e) => {
          console.log('EVENT: dt-checkbox-change', JSON.stringify(e.detail));
        });
        
        // Override the toggle method to add logging
        const originalToggle = checkbox.toggle;
        checkbox.toggle = function() {
          console.log('TOGGLE: called, current checked:', this.checked);
          const result = originalToggle.call(this);
          console.log('TOGGLE: after toggle, checked:', this.checked);
          return result;
        };
        
        // Override the checked setter
        const originalCheckedSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(checkbox), 'checked').set;
        Object.defineProperty(checkbox, 'checked', {
          get: function() {
            const value = this._checked;
            console.log('GETTER: checked called, returning:', value);
            return value;
          },
          set: function(value) {
            console.log('SETTER: checked called with:', value);
            this._checked = Boolean(value);
            console.log('SETTER: _checked set to:', this._checked);
            if (this._checked) {
              this.setAttribute('checked', '');
            } else {
              this.removeAttribute('checked');
            }
            console.log('SETTER: attribute updated');
          }
        });
      }
    });
    
    console.log('✅ Debugging setup complete');
    
    // Test the toggle
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    console.log('🧪 Test 1: First click');
    await checkboxCustom.click();
    await page.waitForTimeout(500);
    
    const logs1 = await page.evaluate(() => window.debugLogs || []);
    console.log('Logs after first click:', logs1);
    
    console.log('🧪 Test 2: Second click');
    await checkboxCustom.click();
    await page.waitForTimeout(500);
    
    const logs2 = await page.evaluate(() => window.debugLogs || []);
    console.log('Logs after second click:', logs2);
    
    // Get final state
    const finalState = await checkbox.evaluate(el => {
      const shadow = el.shadowRoot;
      if (shadow) {
        const custom = shadow.querySelector('.checkbox-custom');
        const input = shadow.querySelector('.checkbox-input');
        return {
          _checked: el._checked,
          hasCheckedAttr: el.hasAttribute('checked'),
          customChecked: custom ? custom.classList.contains('checked') : false,
          inputChecked: input ? input.checked : false
        };
      }
      return {};
    });
    
    console.log('Final state:', JSON.stringify(finalState, null, 2));
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await browser.close();
  }
}

detailedDebugCheckbox();
