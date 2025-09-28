// test/checkbox-toggle-direct-test.js
// Test toggle method directly

const { chromium } = require('playwright');

async function testToggleDirect() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing toggle method directly...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    
    console.log('✅ Found checkbox, testing toggle method...');
    
    // Test toggle method directly
    for (let i = 0; i < 4; i++) {
      console.log(`\n--- Toggle ${i + 1} ---`);
      
      const result = await checkbox.evaluate((el, iteration) => {
        const before = el.hasAttribute('checked');
        console.log('Before toggle - hasChecked:', before);
        
        el.toggle();
        
        const after = el.hasAttribute('checked');
        console.log('After toggle - hasChecked:', after);
        
        return {
          iteration: iteration,
          before,
          after
        };
      }, i + 1);
      
      console.log('Result:', JSON.stringify(result, null, 2));
      await page.waitForTimeout(500);
    }
    
    console.log('\n🎯 Test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testToggleDirect();
