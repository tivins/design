// test/code-encoding-test.js
const { chromium } = require('playwright');
const path = require('path');

async function testCodeEncoding() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the local development server
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find the code example component
    const codeExample = await page.locator('dt-code-example').first();
    
    if (await codeExample.count() > 0) {
      console.log('✓ Code example component found');
      
      // Get the text content from the code element
      const codeText = await codeExample.locator('code').textContent();
      
      console.log('Code content preview:');
      console.log(codeText.substring(0, 100) + '...');
      
      // Check if content is properly encoded (not double-encoded)
      const hasDoubleEncoding = codeText.includes('&lt;') && codeText.includes('&amp;');
      const hasProperEncoding = codeText.includes('<') && codeText.includes('>');
      
      if (hasDoubleEncoding) {
        console.log('✗ Content is double-encoded (contains &lt; and &amp;)');
      } else if (hasProperEncoding) {
        console.log('✓ Content is properly encoded (contains < and >)');
      } else {
        console.log('? Content encoding status unclear');
      }
      
      // Test copy functionality and check clipboard content
      const copyButton = await codeExample.locator('.copy-button');
      if (await copyButton.count() > 0) {
        await copyButton.click();
        await page.waitForTimeout(1000);
        
        // Get clipboard content (this might not work in all browsers)
        try {
          const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
          console.log('Clipboard content preview:');
          console.log(clipboardText.substring(0, 100) + '...');
          
          if (clipboardText.includes('<') && clipboardText.includes('>')) {
            console.log('✓ Clipboard content is properly formatted');
          } else {
            console.log('✗ Clipboard content might be double-encoded');
          }
        } catch (error) {
          console.log('⚠ Could not read clipboard content (browser security)');
        }
      }
      
      // Take a screenshot to verify visual appearance
      await codeExample.screenshot({ 
        path: path.join(__dirname, 'screenshots', 'code-example-encoding-fixed.png')
      });
      
      console.log('✓ Encoding test completed');
      
    } else {
      console.log('✗ Code example component not found');
    }
    
  } catch (error) {
    console.error('✗ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testCodeEncoding().catch(console.error);
