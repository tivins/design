// test/popin-debug-test.js
// Debug test to check if dt-button is available

const puppeteer = require('puppeteer');

async function debugPopinRefactoring() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    // Check if dt-button is available
    const dtButtonAvailable = await page.evaluate(() => {
      return customElements.get('dt-button') !== undefined;
    });
    
    console.log('dt-button available:', dtButtonAvailable);
    
    // Check all custom elements
    const customElementsList = await page.evaluate(() => {
      const elements = [];
      for (const [name, constructor] of customElements) {
        elements.push(name);
      }
      return elements;
    });
    
    console.log('Available custom elements:', customElementsList);
    
    // Navigate to popin section
    await page.click('text=Popin');
    await page.waitForSelector('#popin');
    
    // Check what's actually rendered in the popin
    const popinHTML = await page.evaluate(() => {
      const popin = document.querySelector('dt-popin');
      if (popin) {
        return popin.shadowRoot.innerHTML;
      }
      return null;
    });
    
    console.log('Popin HTML:', popinHTML);
    
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
debugPopinRefactoring().catch(console.error);
