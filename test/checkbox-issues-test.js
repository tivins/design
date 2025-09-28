// test/checkbox-issues-test.js
// Test to identify the specific issues

const { chromium } = require('playwright');

async function testCheckboxIssues() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Testing checkbox issues...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test 1: Basic checkbox (should work)
    console.log('\n🧪 Test 1: Basic checkbox');
    const basicCheckbox = page.locator('#checkbox dt-checkbox').first();
    const basicCustom = basicCheckbox.locator('.checkbox-custom');
    
    await basicCustom.click();
    await page.waitForTimeout(200);
    const basicState1 = await basicCheckbox.evaluate(el => el.hasAttribute('checked'));
    console.log('Basic checkbox after click:', basicState1);
    
    await basicCustom.click();
    await page.waitForTimeout(200);
    const basicState2 = await basicCheckbox.evaluate(el => el.hasAttribute('checked'));
    console.log('Basic checkbox after second click:', basicState2);
    
    // Test 2: Indeterminate checkbox
    console.log('\n🧪 Test 2: Indeterminate checkbox');
    const indeterminateCheckbox = page.locator('#checkbox dt-checkbox[indeterminate]').first();
    if (await indeterminateCheckbox.count() > 0) {
      const indeterminateCustom = indeterminateCheckbox.locator('.checkbox-custom');
      
      const indeterminateInitial = await indeterminateCheckbox.evaluate(el => ({
        hasIndeterminateAttr: el.hasAttribute('indeterminate'),
        hasCheckedAttr: el.hasAttribute('checked'),
        customClasses: el.shadowRoot.querySelector('.checkbox-custom').className
      }));
      console.log('Indeterminate initial state:', JSON.stringify(indeterminateInitial, null, 2));
      
      await indeterminateCustom.click();
      await page.waitForTimeout(200);
      const indeterminateAfter = await indeterminateCheckbox.evaluate(el => ({
        hasIndeterminateAttr: el.hasAttribute('indeterminate'),
        hasCheckedAttr: el.hasAttribute('checked'),
        customClasses: el.shadowRoot.querySelector('.checkbox-custom').className
      }));
      console.log('Indeterminate after click:', JSON.stringify(indeterminateAfter, null, 2));
    } else {
      console.log('No indeterminate checkbox found');
    }
    
    // Test 3: Label clicking
    console.log('\n🧪 Test 3: Label clicking');
    const labelCheckbox = page.locator('#checkbox dt-checkbox').nth(1); // Second checkbox
    const label = labelCheckbox.locator('.checkbox-label');
    
    if (await label.count() > 0) {
      const labelInitial = await labelCheckbox.evaluate(el => el.hasAttribute('checked'));
      console.log('Label checkbox initial state:', labelInitial);
      
      await label.click();
      await page.waitForTimeout(200);
      const labelAfter = await labelCheckbox.evaluate(el => el.hasAttribute('checked'));
      console.log('Label checkbox after label click:', labelAfter);
    } else {
      console.log('No label found');
    }
    
    console.log('\n🎯 Test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testCheckboxIssues();
