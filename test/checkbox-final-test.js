// test/checkbox-final-test.js
// Final test for all checkbox functionality

const { chromium } = require('playwright');

async function testFinalCheckbox() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Final test for all checkbox functionality...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test 1: Basic checkbox
    console.log('\n🧪 Test 1: Basic checkbox');
    const basicCheckbox = page.locator('#checkbox dt-checkbox').first();
    const basicSwitch = basicCheckbox.locator('.checkbox-switch');
    
    await basicSwitch.click();
    await page.waitForTimeout(500);
    const basicState1 = await basicCheckbox.evaluate(el => el.hasAttribute('checked'));
    console.log('Basic checkbox after click:', basicState1);
    
    await basicSwitch.click();
    await page.waitForTimeout(500);
    const basicState2 = await basicCheckbox.evaluate(el => el.hasAttribute('checked'));
    console.log('Basic checkbox after second click:', basicState2);
    
    // Test 2: Different sizes
    console.log('\n🧪 Test 2: Different sizes');
    const sizeCheckboxes = page.locator('#checkbox dt-checkbox[size]');
    const sizeCount = await sizeCheckboxes.count();
    
    for (let i = 0; i < Math.min(sizeCount, 3); i++) {
      const sizeCheckbox = sizeCheckboxes.nth(i);
      const sizeSwitch = sizeCheckbox.locator('.checkbox-switch');
      
      const sizeInitial = await sizeCheckbox.evaluate(el => el.hasAttribute('checked'));
      console.log(`Size checkbox ${i + 1} initial state:`, sizeInitial);
      
      await sizeSwitch.click();
      await page.waitForTimeout(500);
      const sizeAfter = await sizeCheckbox.evaluate(el => el.hasAttribute('checked'));
      console.log(`Size checkbox ${i + 1} after click:`, sizeAfter);
    }
    
    // Test 3: Label clicking
    console.log('\n🧪 Test 3: Label clicking');
    const labelCheckbox = page.locator('#checkbox dt-checkbox').nth(1); // Second checkbox
    const label = labelCheckbox.locator('.checkbox-label');
    
    if (await label.count() > 0) {
      const labelInitial = await labelCheckbox.evaluate(el => el.hasAttribute('checked'));
      console.log('Label checkbox initial state:', labelInitial);
      
      await label.click();
      await page.waitForTimeout(500);
      const labelAfter = await labelCheckbox.evaluate(el => el.hasAttribute('checked'));
      console.log('Label checkbox after label click:', labelAfter);
    } else {
      console.log('No label found');
    }
    
    console.log('\n🎯 Final test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testFinalCheckbox();
