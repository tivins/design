// test/checkbox-console-logs-test.js
// Test to capture console logs from browser

const { chromium } = require('playwright');

async function testCheckboxConsoleLogs() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing checkbox console logs...');
    
    // Capture console logs
    const logs = [];
    page.on('console', msg => {
      logs.push(msg.text());
      console.log('BROWSER LOG:', msg.text());
    });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test indeterminate checkbox
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    
    if (await indeterminateCheckbox.count() > 0) {
      console.log('✅ Found indeterminate checkbox');
      
      // Clear logs before click
      logs.length = 0;
      
      // Click the checkbox
      const indeterminateCustom = indeterminateCheckbox.locator('.checkbox-custom');
      await indeterminateCustom.click();
      await page.waitForTimeout(500);
      
      console.log('Logs after click:', logs);
      
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

testCheckboxConsoleLogs();
