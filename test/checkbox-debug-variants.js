// test/checkbox-debug-variants.js
// Debug variant classes

const { chromium } = require('playwright');

async function debugVariants() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Debugging variant classes...');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await page.click('dt-button[data-target="#checkbox"]');
    await page.waitForTimeout(1000);
    
    console.log('✅ Navigated to checkbox section');
    
    // Check the HTML structure of variants
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    for (const variant of variants) {
      console.log(`\n🧪 Debugging ${variant} variant...`);
      
      const variantCheckbox = page.locator(`#checkbox dt-checkbox[variant="${variant}"]`).first();
      
      if (await variantCheckbox.count() > 0) {
        // Get the HTML structure
        const htmlStructure = await variantCheckbox.evaluate(el => {
          const shadow = el.shadowRoot;
          if (shadow) {
            const switchElement = shadow.querySelector('.checkbox-switch');
            return {
              outerHTML: el.outerHTML.substring(0, 200),
              switchClasses: switchElement ? switchElement.className : 'not found',
              switchHTML: switchElement ? switchElement.outerHTML : 'not found'
            };
          }
          return { error: 'No shadow root' };
        });
        
        console.log(`  HTML: ${htmlStructure.outerHTML}`);
        console.log(`  Switch classes: ${htmlStructure.switchClasses}`);
        console.log(`  Switch HTML: ${htmlStructure.switchHTML}`);
        
      } else {
        console.log(`  ❌ No ${variant} variant found`);
      }
    }
    
    console.log('\n🎯 Debug completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

debugVariants();
