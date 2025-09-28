// test/popin-simple-debug.js
// Simple debug test to check popin HTML

const puppeteer = require('puppeteer');

async function simpleDebug() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    // Navigate to popin section
    await page.click('text=Popin');
    await page.waitForSelector('#popin');
    
    // Check what's actually rendered in the first popin
    const popinInfo = await page.evaluate(() => {
      const popin = document.querySelector('dt-popin');
      if (popin) {
        const shadowRoot = popin.shadowRoot;
        const dtButton = shadowRoot.querySelector('dt-button');
        const popinTrigger = shadowRoot.querySelector('.popin-trigger');
        
        return {
          hasDtButton: !!dtButton,
          hasPopinTrigger: !!popinTrigger,
          dtButtonVariant: dtButton ? dtButton.getAttribute('variant') : null,
          shadowHTML: shadowRoot.innerHTML.substring(0, 500) + '...'
        };
      }
      return null;
    });
    
    console.log('Popin info:', JSON.stringify(popinInfo, null, 2));
    
    // Keep browser open for manual inspection
    console.log('🔍 Browser will stay open for manual inspection...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
simpleDebug().catch(console.error);
