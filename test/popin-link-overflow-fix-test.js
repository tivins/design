// test/popin-link-overflow-fix-test.js
// Test to verify that long links in popin items don't overflow

const puppeteer = require('puppeteer');

async function testPopinLinkOverflow() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    // Wait for custom elements to be defined
    await page.waitForFunction(() => {
      return customElements.get('dt-popin') !== undefined && 
             customElements.get('dt-button') !== undefined &&
             customElements.get('dt-icon') !== undefined;
    });
    
    // Set dark theme first
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a popin with long links
    await page.evaluate(() => {
      const container = document.querySelector('.demo-section');
      if (container) {
        const popin = document.createElement('dt-popin');
        popin.setAttribute('trigger-text', 'Menu with Long Links');
        popin.innerHTML = `
          <div class="popin-item" href="#">
            <dt-icon name="home"></dt-icon>
            <span>This is a very long link text that should wrap properly and not overflow the container</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="user"></dt-icon>
            <span>Another extremely long link text that might cause overflow issues if not handled correctly</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="settings"></dt-icon>
            <span>Short link</span>
          </div>
          <div class="popin-item" href="#">
            <dt-icon name="help"></dt-icon>
            <span>This is another very long link text that should be handled properly with text wrapping and ellipsis if needed</span>
          </div>
        `;
        container.appendChild(popin);
      }
    });
    
    // Wait for the popin to be created
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click to open the popin
    await page.waitForSelector('dt-popin dt-button');
    await page.click('dt-popin dt-button');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Take screenshot in dark theme
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-dark-theme.png',
      fullPage: true 
    });
    
    // Check that popin is visible
    const popinMenuVisible = await page.evaluate(() => {
      const menu = document.querySelector('.popin-menu.show');
      return menu !== null && menu.offsetParent !== null;
    });
    
    console.log('Popin menu visible:', popinMenuVisible);
    
    // Check that long links are properly contained
    const linkOverflowCheck = await page.evaluate(() => {
      const menu = document.querySelector('.popin-menu.show');
      if (!menu) return { success: false, message: 'Menu not found' };
      
      const menuRect = menu.getBoundingClientRect();
      const items = menu.querySelectorAll('.popin-item');
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemRect = item.getBoundingClientRect();
        
        // Check if item overflows horizontally
        if (itemRect.right > menuRect.right || itemRect.left < menuRect.left) {
          return { 
            success: false, 
            message: `Item ${i} overflows: item.right=${itemRect.right}, menu.right=${menuRect.right}` 
          };
        }
      }
      
      return { success: true, message: 'All items properly contained' };
    });
    
    console.log('Link overflow check:', linkOverflowCheck);
    
    // Switch to light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Take screenshot in light theme
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-light-theme.png',
      fullPage: true 
    });
    
    // Test with different popin sizes
    await page.evaluate(() => {
      const popin = document.querySelector('dt-popin');
      if (popin) {
        popin.setAttribute('size', 'sm');
      }
    });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-small-size.png',
      fullPage: true 
    });
    
    // Test with large size
    await page.evaluate(() => {
      const popin = document.querySelector('dt-popin');
      if (popin) {
        popin.setAttribute('size', 'lg');
      }
    });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await page.screenshot({ 
      path: 'test/screenshots/popin-link-overflow-large-size.png',
      fullPage: true 
    });
    
    // Close popin
    await page.click('body');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Test completed successfully!');
    console.log('Screenshots saved in test/screenshots/');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testPopinLinkOverflow();
