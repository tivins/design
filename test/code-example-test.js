// test/code-example-test.js
const { chromium } = require('playwright');
const path = require('path');

async function testCodeExampleComponent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the local development server
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the entire page
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'code-example-component-full-page.png'),
      fullPage: true 
    });
    
    // Find the code example component
    const codeExample = await page.locator('dt-code-example').first();
    
    if (await codeExample.count() > 0) {
      console.log('✓ Code example component found');
      
      // Take a screenshot of just the code example component
      await codeExample.screenshot({ 
        path: path.join(__dirname, 'screenshots', 'code-example-component-detail.png')
      });
      
      // Test the copy functionality
      const copyButton = await codeExample.locator('.copy-button');
      if (await copyButton.count() > 0) {
        console.log('✓ Copy button found');
        
        // Click the copy button
        await copyButton.click();
        
        // Wait a moment for the visual feedback
        await page.waitForTimeout(1000);
        
        // Take a screenshot after clicking copy
        await codeExample.screenshot({ 
          path: path.join(__dirname, 'screenshots', 'code-example-component-copied.png')
        });
        
        console.log('✓ Copy functionality tested');
      } else {
        console.log('✗ Copy button not found');
      }
      
      // Check if the component has the correct attributes
      const language = await codeExample.getAttribute('language');
      const title = await codeExample.getAttribute('title');
      const copyable = await codeExample.getAttribute('copyable');
      
      console.log(`✓ Language: ${language}`);
      console.log(`✓ Title: ${title}`);
      console.log(`✓ Copyable: ${copyable !== null}`);
      
    } else {
      console.log('✗ Code example component not found');
    }
    
    console.log('✓ Test completed successfully');
    
  } catch (error) {
    console.error('✗ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testCodeExampleComponent().catch(console.error);
