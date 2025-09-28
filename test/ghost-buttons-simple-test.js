// test/ghost-buttons-simple-test.js
// Simple test for ghost buttons using Puppeteer

const puppeteer = require('puppeteer');

async function testGhostButtons() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    // Navigate to buttons section
    await page.click('text=Buttons');
    await page.waitForSelector('#buttons');
    
    console.log('✅ Page loaded and navigated to buttons section');
    
    // Test ghost button in light theme
    const ghostButton = await page.$('dt-button[variant="ghost"]');
    if (ghostButton) {
      console.log('✅ Ghost button found');
      
      // Get computed styles
      const styles = await page.evaluate((el) => {
        const shadowRoot = el.shadowRoot;
        const button = shadowRoot.querySelector('.btn');
        const computed = window.getComputedStyle(button);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          borderColor: computed.borderColor
        };
      }, ghostButton);
      
      console.log('Ghost button styles:', styles);
      
      // Test hover effect
      await ghostButton.hover();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const hoverStyles = await page.evaluate((el) => {
        const shadowRoot = el.shadowRoot;
        const button = shadowRoot.querySelector('.btn');
        const computed = window.getComputedStyle(button);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor
        };
      }, ghostButton);
      
      console.log('Ghost button hover styles:', hoverStyles);
    }
    
    // Test ghost-primary button
    const ghostPrimaryButton = await page.$('dt-button[variant="ghost-primary"]');
    if (ghostPrimaryButton) {
      console.log('✅ Ghost-primary button found');
      
      const primaryStyles = await page.evaluate((el) => {
        const shadowRoot = el.shadowRoot;
        const button = shadowRoot.querySelector('.btn');
        const computed = window.getComputedStyle(button);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor
        };
      }, ghostPrimaryButton);
      
      console.log('Ghost-primary button styles:', primaryStyles);
      
      // Test hover effect
      await ghostPrimaryButton.hover();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const primaryHoverStyles = await page.evaluate((el) => {
        const shadowRoot = el.shadowRoot;
        const button = shadowRoot.querySelector('.btn');
        const computed = window.getComputedStyle(button);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor
        };
      }, ghostPrimaryButton);
      
      console.log('Ghost-primary button hover styles:', primaryHoverStyles);
    }
    
    // Test dark theme
    console.log('🔄 Switching to dark theme...');
    const themeToggle = await page.$('dt-theme-toggle');
    if (themeToggle) {
      await themeToggle.click();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Test ghost button in dark theme
      const darkGhostButton = await page.$('dt-button[variant="ghost"]');
      if (darkGhostButton) {
        const darkStyles = await page.evaluate((el) => {
          const shadowRoot = el.shadowRoot;
          const button = shadowRoot.querySelector('.btn');
          const computed = window.getComputedStyle(button);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor
          };
        }, darkGhostButton);
        
        console.log('Ghost button dark theme styles:', darkStyles);
        
        // Test hover effect in dark theme
        await darkGhostButton.hover();
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const darkHoverStyles = await page.evaluate((el) => {
          const shadowRoot = el.shadowRoot;
          const button = shadowRoot.querySelector('.btn');
          const computed = window.getComputedStyle(button);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor
          };
        }, darkGhostButton);
        
        console.log('Ghost button dark theme hover styles:', darkHoverStyles);
      }
    }
    
    console.log('✅ All tests completed successfully!');
    
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
testGhostButtons().catch(console.error);
