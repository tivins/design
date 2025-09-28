// test/popin-link-overflow-simple-test.js
// Simple test to verify popin link overflow fix

const puppeteer = require('puppeteer');

async function simpleTest() {
  console.log('Starting simple popin link overflow test...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    // Wait for custom elements
    console.log('Waiting for custom elements...');
    await page.waitForFunction(() => {
      return customElements.get('dt-popin') !== undefined;
    });
    
    // Set dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    
    // Create popin with long links
    console.log('Creating popin with long links...');
    await page.evaluate(() => {
      const container = document.querySelector('.demo-section');
      if (container) {
        const popin = document.createElement('dt-popin');
        popin.setAttribute('trigger-text', 'Long Links Test');
        popin.innerHTML = `
          <div class="popin-item" href="#">
            <dt-icon name="home"></dt-icon>
            <span>Very long link text that should wrap properly</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="user"></dt-icon>
            <span>Another extremely long link text</span>
          </div>
        `;
        container.appendChild(popin);
      }
    });
    
    // Wait a bit for rendering
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click to open popin
    console.log('Opening popin...');
    await page.waitForSelector('dt-popin dt-button');
    await page.click('dt-popin dt-button');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Take screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-test.png',
      fullPage: true 
    });
    
    // Check overflow
    const result = await page.evaluate(() => {
      const menu = document.querySelector('.popin-menu.show');
      if (!menu) return { success: false, message: 'Menu not found' };
      
      const menuRect = menu.getBoundingClientRect();
      const items = menu.querySelectorAll('.popin-item');
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemRect = item.getBoundingClientRect();
        
        if (itemRect.right > menuRect.right || itemRect.left < menuRect.left) {
          return { 
            success: false, 
            message: `Item ${i} overflows` 
          };
        }
      }
      
      return { success: true, message: 'All items contained properly' };
    });
    
    console.log('Test result:', result);
    console.log('Screenshot saved to test/screenshots/popin-link-overflow-test.png');
    
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
    console.log('Test completed.');
  }
}

simpleTest();
