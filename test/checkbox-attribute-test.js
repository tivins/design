// test/checkbox-attribute-test.js
// Test to see what happens with attributes

const { chromium } = require('playwright');

async function testCheckboxAttributes() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing checkbox attributes...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const checkboxCustom = checkbox.locator('.checkbox-custom');
    
    console.log('✅ Found checkbox, testing attributes...');
    
    // Get initial state
    const initialState = await checkbox.evaluate(el => {
      return {
        hasCheckedAttr: el.hasAttribute('checked'),
        checkedAttrValue: el.getAttribute('checked'),
        allAttributes: Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`)
      };
    });
    
    console.log('Initial state:', JSON.stringify(initialState, null, 2));
    
    // Test clicks
    for (let i = 0; i < 4; i++) {
      console.log(`\n--- Click ${i + 1} ---`);
      
      await checkboxCustom.click();
      await page.waitForTimeout(500);
      
      const state = await checkbox.evaluate(el => {
        return {
          hasCheckedAttr: el.hasAttribute('checked'),
          checkedAttrValue: el.getAttribute('checked'),
          allAttributes: Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`)
        };
      });
      
      console.log('State:', JSON.stringify(state, null, 2));
    }
    
    console.log('\n🎯 Test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCheckboxAttributes();
