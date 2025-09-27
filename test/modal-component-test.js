// test/modal-component-test.js
// Test file for modal component functionality

const { chromium } = require('playwright');

async function testModalComponent() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Testing Modal Component...');
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of the initial page
    await page.screenshot({ path: 'test/screenshots/modal-initial-page.png' });
    
    // Test Basic Modal
    console.log('Testing Basic Modal...');
    await page.click('text=Open Basic Modal');
    await page.waitForSelector('#basicModal[open]', { timeout: 5000 });
    
    // Take screenshot of basic modal
    await page.screenshot({ path: 'test/screenshots/modal-basic-open.png' });
    
    // Test modal backdrop blur effect
    const modalBackdrop = await page.locator('#basicModal .modal-backdrop');
    const isBackdropVisible = await modalBackdrop.isVisible();
    if (!isBackdropVisible) {
      throw new Error('Modal backdrop is not visible');
    }
    
    // Test close button
    await page.click('#basicModal .modal-close');
    await page.waitForSelector('#basicModal:not([open])', { timeout: 5000 });
    
    // Test Modal with Footer
    console.log('Testing Modal with Footer...');
    await page.click('text=Open Modal with Footer');
    await page.waitForSelector('#footerModal[open]', { timeout: 5000 });
    
    // Take screenshot of modal with footer
    await page.screenshot({ path: 'test/screenshots/modal-with-footer.png' });
    
    // Test footer buttons
    const cancelButton = await page.locator('#footerModal text=Cancel');
    const isCancelVisible = await cancelButton.isVisible();
    if (!isCancelVisible) {
      throw new Error('Cancel button is not visible');
    }
    await cancelButton.click();
    await page.waitForSelector('#footerModal:not([open])', { timeout: 5000 });
    
    // Test Large Modal
    console.log('Testing Large Modal...');
    await page.click('text=Open Large Modal');
    await page.waitForSelector('#largeModal[open]', { timeout: 5000 });
    
    // Take screenshot of large modal
    await page.screenshot({ path: 'test/screenshots/modal-large.png' });
    
    // Test backdrop click to close
    await page.click('#largeModal .modal-backdrop');
    await page.waitForSelector('#largeModal:not([open])', { timeout: 5000 });
    
    // Test Modal without Header
    console.log('Testing Modal without Header...');
    await page.click('text=Open Modal without Header');
    await page.waitForSelector('#noHeaderModal[open]', { timeout: 5000 });
    
    // Take screenshot of modal without header
    await page.screenshot({ path: 'test/screenshots/modal-no-header.png' });
    
    // Test escape key to close
    await page.keyboard.press('Escape');
    await page.waitForSelector('#noHeaderModal:not([open])', { timeout: 5000 });
    
    // Test modal creation via JavaScript
    console.log('Testing Modal Creation via JavaScript...');
    await page.evaluate(() => {
      const modal = DtModal.create({
        title: 'Dynamic Modal',
        size: 'md',
        content: '<p>This modal was created dynamically!</p>',
        footerContent: '<dt-button variant="primary">Dynamic Button</dt-button>'
      });
      document.body.appendChild(modal);
      modal.open();
    });
    
    await page.waitForSelector('dt-modal[open]', { timeout: 5000 });
    await page.screenshot({ path: 'test/screenshots/modal-dynamic.png' });
    
    // Close dynamic modal
    await page.click('.modal-close');
    await page.waitForSelector('dt-modal:not([open])', { timeout: 5000 });
    
    console.log('All modal tests passed! ✅');
    
  } catch (error) {
    console.error('Modal test failed:', error);
    await page.screenshot({ path: 'test/screenshots/modal-error.png' });
    throw error;
  } finally {
    await browser.close();
  }
}


// Run the test
if (require.main === module) {
  testModalComponent().catch(console.error);
}

module.exports = { testModalComponent };
