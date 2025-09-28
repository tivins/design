// test/checkbox-visual-test.js
// Visual test for the new modern checkbox design

const { chromium } = require('playwright');

async function testVisualCheckbox() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🎨 Testing visual checkbox design...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Take screenshot of the checkbox section
    await page.screenshot({ 
      path: 'test/screenshots/checkbox-modern-design.png',
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 800 }
    });
    
    console.log('📸 Screenshot saved: test/screenshots/checkbox-modern-design.png');
    
    // Test different variants
    console.log('\n🎨 Testing different variants...');
    const variantCheckboxes = page.locator('#checkbox dt-checkbox[variant]');
    const variantCount = await variantCheckboxes.count();
    
    for (let i = 0; i < Math.min(variantCount, 5); i++) {
      const variantCheckbox = variantCheckboxes.nth(i);
      const variantSwitch = variantCheckbox.locator('.checkbox-switch');
      
      const variant = await variantCheckbox.evaluate(el => el.getAttribute('variant'));
      console.log(`Testing ${variant} variant...`);
      
      await variantSwitch.click();
      await page.waitForTimeout(300);
    }
    
    // Test dark theme
    console.log('\n🌙 Testing dark theme...');
    const themeToggle = page.locator('dt-button[data-theme-toggle]');
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      await page.screenshot({ 
        path: 'test/screenshots/checkbox-dark-theme.png',
        fullPage: false,
        clip: { x: 0, y: 0, width: 1200, height: 800 }
      });
      
      console.log('📸 Dark theme screenshot saved: test/screenshots/checkbox-dark-theme.png');
    }
    
    console.log('\n🎯 Visual test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testVisualCheckbox();
