// test/checkbox-variant-colors-test.js
// Test to verify variant colors are working correctly

const { chromium } = require('playwright');

async function testVariantColors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🎨 Testing variant colors...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Test different variants
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    for (const variant of variants) {
      console.log(`\n🧪 Testing ${variant} variant...`);
      
      const variantCheckbox = page.locator(`#checkbox dt-checkbox[variant="${variant}"]`).first();
      
      if (await variantCheckbox.count() > 0) {
        const variantSwitch = variantCheckbox.locator('.checkbox-switch');
        
        // Get initial state
        const initialState = await variantCheckbox.evaluate(el => el.hasAttribute('checked'));
        console.log(`  Initial state: ${initialState}`);
        
        // Click to activate (if not already active)
        if (!initialState) {
          await variantSwitch.click();
          await page.waitForTimeout(200);
        }
        
        const activeState = await variantCheckbox.evaluate(el => el.hasAttribute('checked'));
        console.log(`  Active state: ${activeState}`);
        
        // Get computed styles to verify color when active
        const computedStyle = await variantSwitch.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            borderColor: styles.borderColor
          };
        });
        
        console.log(`  Background color: ${computedStyle.backgroundColor}`);
        console.log(`  Border color: ${computedStyle.borderColor}`);
        
        // Click to deactivate
        await variantSwitch.click();
        await page.waitForTimeout(200);
        
        const finalState = await variantCheckbox.evaluate(el => el.hasAttribute('checked'));
        console.log(`  After second click: ${finalState}`);
        
      } else {
        console.log(`  ❌ No ${variant} variant found`);
      }
    }
    
    console.log('\n🎯 Variant colors test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testVariantColors();
