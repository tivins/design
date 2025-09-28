// test/checkbox-remove-attr-test.js
// Test removeAttribute directly

const { chromium } = require('playwright');

async function testRemoveAttribute() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing removeAttribute directly...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    
    console.log('✅ Found checkbox, testing removeAttribute...');
    
    // Test removeAttribute directly
    const result = await checkbox.evaluate(el => {
      console.log('Before setAttribute - hasChecked:', el.hasAttribute('checked'));
      
      el.setAttribute('checked', '');
      console.log('After setAttribute - hasChecked:', el.hasAttribute('checked'));
      
      el.removeAttribute('checked');
      console.log('After removeAttribute - hasChecked:', el.hasAttribute('checked'));
      
      return {
        beforeSet: false, // Initial state
        afterSet: el.hasAttribute('checked'),
        afterRemove: el.hasAttribute('checked')
      };
    });
    
    console.log('Result:', JSON.stringify(result, null, 2));
    
    // Test multiple times
    console.log('\n--- Testing multiple times ---');
    
    for (let i = 0; i < 3; i++) {
      const testResult = await checkbox.evaluate((el, iteration) => {
        const before = el.hasAttribute('checked');
        el.setAttribute('checked', '');
        const afterSet = el.hasAttribute('checked');
        el.removeAttribute('checked');
        const afterRemove = el.hasAttribute('checked');
        
        return {
          iteration: iteration,
          before,
          afterSet,
          afterRemove
        };
      }, i + 1);
      
      console.log(`Iteration ${i + 1}:`, JSON.stringify(testResult, null, 2));
    }
    
    console.log('\n🎯 Test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testRemoveAttribute();
