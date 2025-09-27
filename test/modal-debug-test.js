// test/modal-debug-test.js
// Debug test for modal component

const { chromium } = require('playwright');

async function debugModalComponent() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Debugging Modal Component...');
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the initial page
    await page.screenshot({ path: 'test/screenshots/debug-initial-page.png' });
    
    // Check if modal elements exist
    const modalExists = await page.locator('dt-modal').count();
    console.log(`Found ${modalExists} modal elements`);
    
    // Check if buttons exist
    const buttonExists = await page.locator('text=Open Basic Modal').count();
    console.log(`Found ${buttonExists} "Open Basic Modal" buttons`);
    
    // Try to click the button
    console.log('Clicking "Open Basic Modal" button...');
    await page.click('text=Open Basic Modal');
    
    // Wait a bit
    await page.waitForTimeout(1000);
    
    // Check modal state
    const modal = await page.locator('#basicModal');
    const isOpen = await modal.getAttribute('open');
    const displayStyle = await modal.evaluate(el => el.style.display);
    const computedStyle = await modal.evaluate(el => window.getComputedStyle(el).display);
    
    console.log(`Modal open attribute: ${isOpen}`);
    console.log(`Modal style.display: ${displayStyle}`);
    console.log(`Modal computed display: ${computedStyle}`);
    
    // Take screenshot
    await page.screenshot({ path: 'test/screenshots/debug-after-click.png' });
    
    // Check if modal content is visible
    const modalContent = await page.locator('#basicModal .modal-container');
    const contentVisible = await modalContent.isVisible();
    console.log(`Modal content visible: ${contentVisible}`);
    
    // Check shadow DOM
    const shadowRoot = await modal.evaluate(el => el.shadowRoot ? 'exists' : 'missing');
    console.log(`Shadow root: ${shadowRoot}`);
    
    if (shadowRoot === 'exists') {
      const shadowContent = await modal.evaluate(el => {
        return el.shadowRoot.innerHTML.substring(0, 200) + '...';
      });
      console.log(`Shadow content preview: ${shadowContent}`);
    }
    
  } catch (error) {
    console.error('Debug test failed:', error);
    await page.screenshot({ path: 'test/screenshots/debug-error.png' });
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the debug test
debugModalComponent().catch(console.error);
