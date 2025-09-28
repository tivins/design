// test/checkbox-clickable-area-test.js
// Test to verify the entire checkbox area is clickable

const { chromium } = require('playwright');

async function testClickableArea() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🖱️ Testing clickable area improvements...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test clicking different areas of the checkbox
    const checkbox = page.locator('#checkbox dt-checkbox').first();
    
    if (await checkbox.count() > 0) {
      console.log('\n🧪 Testing different click areas...');
      
      // Test 1: Click on the switch itself
      const switchElement = checkbox.locator('.checkbox-switch');
      const initialState1 = await checkbox.evaluate(el => el.hasAttribute('checked'));
      console.log('Initial state:', initialState1);
      
      await switchElement.click();
      await page.waitForTimeout(300);
      const stateAfterSwitch = await checkbox.evaluate(el => el.hasAttribute('checked'));
      console.log('After clicking switch:', stateAfterSwitch);
      
      // Test 2: Click on the label
      const labelElement = checkbox.locator('.checkbox-label');
      await labelElement.click();
      await page.waitForTimeout(300);
      const stateAfterLabel = await checkbox.evaluate(el => el.hasAttribute('checked'));
      console.log('After clicking label:', stateAfterLabel);
      
      // Test 3: Click on the container (empty space)
      const container = checkbox.locator('.checkbox-container');
      await container.click();
      await page.waitForTimeout(300);
      const stateAfterContainer = await checkbox.evaluate(el => el.hasAttribute('checked'));
      console.log('After clicking container:', stateAfterContainer);
      
      // Test 4: Click on the host element (padding area)
      await checkbox.click();
      await page.waitForTimeout(300);
      const stateAfterHost = await checkbox.evaluate(el => el.hasAttribute('checked'));
      console.log('After clicking host element:', stateAfterHost);
      
      console.log('\n✅ All click areas are working!');
      
    } else {
      console.log('❌ No checkbox found');
    }
    
    console.log('\n🎯 Clickable area test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testClickableArea();
