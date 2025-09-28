// test/checkbox-animation-speed-test.js
// Test to verify animation speed improvements

const { chromium } = require('playwright');

async function testAnimationSpeed() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('⚡ Testing animation speed...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test animation speed by measuring time
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    const switchElement = checkbox.locator('.checkbox-switch');
    
    console.log('\n🧪 Testing animation responsiveness...');
    
    // Multiple rapid clicks to test responsiveness
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      
      await switchElement.click();
      await page.waitForTimeout(50); // Very short wait
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const state = await checkbox.evaluate(el => el.hasAttribute('checked'));
      console.log(`  Click ${i + 1}: ${state ? 'ON' : 'OFF'} (${responseTime}ms)`);
    }
    
    console.log('\n✅ Animation speed test completed');
    console.log('💡 Animation should feel snappy and responsive!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAnimationSpeed();
