// test/manual-checkbox-test.js
// Manual test to verify checkbox toggle fix

const { chromium } = require('playwright');

async function manualCheckboxTest() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Opening browser for manual testing...');
    console.log('Please test the checkboxes in the checkbox section');
    console.log('Click on checkboxes multiple times to verify they toggle correctly');
    
    // Navigate to the main page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Navigate to checkbox section
    await page.click('a[href="#checkbox"]');
    await page.waitForTimeout(500);
    
    console.log('Page loaded. Please test the checkboxes manually.');
    console.log('Press Ctrl+C to close the browser when done testing.');
    
    // Keep the browser open for manual testing
    await page.waitForTimeout(300000); // 5 minutes
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
manualCheckboxTest();
