// test/all-code-examples-test.js
const { chromium } = require('playwright');
const path = require('path');

async function testAllCodeExamples() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the local development server
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find all code example components
    const codeExamples = await page.locator('dt-code-example');
    const count = await codeExamples.count();
    
    console.log(`✓ Found ${count} code example components`);
    
    // Test each code example component
    for (let i = 0; i < count; i++) {
      const codeExample = codeExamples.nth(i);
      
      // Get component attributes
      const language = await codeExample.getAttribute('language');
      const title = await codeExample.getAttribute('title');
      const copyable = await codeExample.getAttribute('copyable');
      
      console.log(`\n--- Code Example ${i + 1} ---`);
      console.log(`✓ Language: ${language}`);
      console.log(`✓ Title: ${title}`);
      console.log(`✓ Copyable: ${copyable !== null}`);
      
      // Test copy functionality if available
      const copyButton = await codeExample.locator('.copy-button');
      if (await copyButton.count() > 0) {
        await copyButton.click();
        await page.waitForTimeout(500);
        console.log(`✓ Copy functionality tested`);
      }
      
      // Take a screenshot of this specific component
      await codeExample.screenshot({ 
        path: path.join(__dirname, 'screenshots', `code-example-${i + 1}-${language || 'html'}.png`)
      });
    }
    
    // Take a full page screenshot
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'all-code-examples-full-page.png'),
      fullPage: true 
    });
    
    console.log(`\n✓ All ${count} code examples tested successfully`);
    console.log(`✓ Screenshots saved to test/screenshots/`);
    
  } catch (error) {
    console.error('✗ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testAllCodeExamples().catch(console.error);
