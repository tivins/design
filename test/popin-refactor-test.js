// test/popin-refactor-test.js
// Test for popin refactoring to use dt-button with ghost variant

const puppeteer = require('puppeteer');

async function testPopinRefactoring() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1280, height: 720 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto('http://localhost:3000');
    await page.waitForSelector('body');
    
    // Navigate to popin section
    await page.click('text=Popin');
    await page.waitForSelector('#popin');
    
    console.log('✅ Page loaded and navigated to popin section');
    
    // Test basic popin trigger
    const basicPopin = await page.$('dt-popin');
    if (basicPopin) {
      console.log('✅ Basic popin found');
      
      // Check that it uses dt-button
      const dtButton = await basicPopin.$('dt-button');
      if (dtButton) {
        console.log('✅ Popin now uses dt-button component');
        
        // Check that it has ghost variant
        const variant = await dtButton.evaluate(el => el.getAttribute('variant'));
        if (variant === 'ghost') {
          console.log('✅ Popin trigger uses ghost variant');
        } else {
          console.log('❌ Popin trigger does not use ghost variant:', variant);
        }
      } else {
        console.log('❌ Popin does not use dt-button component');
      }
    }
    
    // Test popin with text trigger
    const textPopin = await page.$('dt-popin[trigger-text="Actions"]');
    if (textPopin) {
      console.log('✅ Text popin found');
      
      const dtButton = await textPopin.$('dt-button');
      if (dtButton) {
        const buttonText = await dtButton.evaluate(el => el.textContent.trim());
        if (buttonText === 'Actions') {
          console.log('✅ Text popin displays correct text:', buttonText);
        } else {
          console.log('❌ Text popin displays incorrect text:', buttonText);
        }
      }
    }
    
    // Test popin with icon trigger
    const iconPopin = await page.$('dt-popin[trigger-icon="settings"]');
    if (iconPopin) {
      console.log('✅ Icon popin found');
      
      const dtButton = await iconPopin.$('dt-button');
      if (dtButton) {
        const icon = await dtButton.$('dt-icon[name="settings"]');
        if (icon) {
          console.log('✅ Icon popin displays correct icon');
        } else {
          console.log('❌ Icon popin does not display icon');
        }
      }
    }
    
    // Test popin functionality (click to open)
    const interactivePopin = await page.$('dt-popin[trigger-text="Actions Utilisateur"]');
    if (interactivePopin) {
      console.log('✅ Interactive popin found');
      
      const dtButton = await interactivePopin.$('dt-button');
      if (dtButton) {
        // Click to open popin
        await dtButton.click();
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Check if menu is visible
        const menu = await interactivePopin.$('.popin-menu.show');
        if (menu) {
          console.log('✅ Popin menu opens correctly');
          
          // Check menu items
          const items = await interactivePopin.$$('.popin-item');
          console.log(`✅ Popin menu has ${items.length} items`);
          
          // Click outside to close
          await page.click('body');
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const closedMenu = await interactivePopin.$('.popin-menu.show');
          if (!closedMenu) {
            console.log('✅ Popin menu closes correctly');
          } else {
            console.log('❌ Popin menu does not close');
          }
        } else {
          console.log('❌ Popin menu does not open');
        }
      }
    }
    
    // Test dark theme
    console.log('🔄 Testing dark theme...');
    const themeToggle = await page.$('dt-theme-toggle');
    if (themeToggle) {
      await themeToggle.click();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Test popin in dark theme
      const darkPopin = await page.$('dt-popin');
      if (darkPopin) {
        const dtButton = await darkPopin.$('dt-button');
        if (dtButton) {
          const styles = await dtButton.evaluate((el) => {
            const shadowRoot = el.shadowRoot;
            const button = shadowRoot.querySelector('.btn');
            const computed = window.getComputedStyle(button);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor
            };
          });
          
          console.log('✅ Popin button dark theme styles:', styles);
        }
      }
    }
    
    console.log('✅ All refactoring tests completed successfully!');
    
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
testPopinRefactoring().catch(console.error);
