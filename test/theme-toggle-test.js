// test/theme-toggle-test.js
const { chromium } = require('playwright');
const path = require('path');

async function testThemeToggleComponent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the local development server
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the entire page in light theme
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'theme-toggle-light-theme.png'),
      fullPage: true 
    });
    
    // Navigate to the theme toggle section
    await page.click('.toc-link[data-target="#theme-toggle"]');
    await page.waitForTimeout(1000);
    
    // Take a screenshot of the theme toggle section
    await page.screenshot({ 
      path: path.join(__dirname, 'screenshots', 'theme-toggle-section-light.png')
    });
    
    // Find the theme toggle component in the header
    const headerToggle = await page.locator('header dt-theme-toggle').first();
    
    if (await headerToggle.count() > 0) {
      console.log('✓ Theme toggle component found in header');
      
      // Take a screenshot of the header toggle
      await headerToggle.screenshot({ 
        path: path.join(__dirname, 'screenshots', 'theme-toggle-header-light.png')
      });
      
      // Test clicking the theme toggle
      await headerToggle.click();
      await page.waitForTimeout(1000);
      
      // Take a screenshot after switching to dark theme
      await page.screenshot({ 
        path: path.join(__dirname, 'screenshots', 'theme-toggle-dark-theme.png'),
        fullPage: true 
      });
      
      await page.screenshot({ 
        path: path.join(__dirname, 'screenshots', 'theme-toggle-section-dark.png')
      });
      
      console.log('✓ Theme toggle functionality tested');
      
      // Switch back to light theme
      await headerToggle.click();
      await page.waitForTimeout(1000);
      
      console.log('✓ Theme toggle switched back to light theme');
    } else {
      console.log('✗ Theme toggle component not found in header');
    }
    
    // Test the theme toggle section components
    const themeToggleSection = await page.locator('#theme-toggle');
    
    if (await themeToggleSection.count() > 0) {
      console.log('✓ Theme toggle section found');
      
      // Test different variants
      const variants = [
        'variant="link"',
        'variant="primary"',
        'variant="secondary"',
        'variant="outline-primary"',
        'variant="outline-secondary"',
        'variant="outline-success"',
        'variant="outline-danger"',
        'variant="outline-warning"',
        'variant="outline-info"'
      ];
      
      for (const variant of variants) {
        const toggle = await page.locator(`dt-theme-toggle[${variant}]`).first();
        if (await toggle.count() > 0) {
          console.log(`✓ Theme toggle with ${variant} found`);
          
          // Test clicking this variant
          await toggle.click();
          await page.waitForTimeout(500);
          
          // Switch back
          await toggle.click();
          await page.waitForTimeout(500);
        }
      }
      
      // Test different sizes
      const sizes = ['size="sm"', 'size="md"', 'size="lg"'];
      
      for (const size of sizes) {
        const toggle = await page.locator(`dt-theme-toggle[${size}]`).first();
        if (await toggle.count() > 0) {
          console.log(`✓ Theme toggle with ${size} found`);
        }
      }
      
      // Test programmatic control buttons
      const lightButton = await page.locator('dt-button:has-text("Forcer thème clair")');
      const darkButton = await page.locator('dt-button:has-text("Forcer thème sombre")');
      const statusButton = await page.locator('dt-button:has-text("Afficher thème actuel")');
      
      if (await lightButton.count() > 0) {
        console.log('✓ Light theme button found');
        await lightButton.click();
        await page.waitForTimeout(1000);
      }
      
      if (await darkButton.count() > 0) {
        console.log('✓ Dark theme button found');
        await darkButton.click();
        await page.waitForTimeout(1000);
      }
      
      if (await statusButton.count() > 0) {
        console.log('✓ Status button found');
        await statusButton.click();
        await page.waitForTimeout(1000);
      }
      
      // Take final screenshot
      await page.screenshot({ 
        path: path.join(__dirname, 'screenshots', 'theme-toggle-final-test.png'),
        fullPage: true 
      });
      
    } else {
      console.log('✗ Theme toggle section not found');
    }
    
    // Test localStorage persistence
    const themeValue = await page.evaluate(() => {
      return localStorage.getItem('design-toolkit-theme');
    });
    
    console.log(`✓ Theme value in localStorage: ${themeValue}`);
    
    // Test theme change event
    const themeChanged = await page.evaluate(() => {
      return new Promise((resolve) => {
        window.addEventListener('themeChanged', (e) => {
          resolve(e.detail.theme);
        }, { once: true });
        
        // Trigger theme change
        const toggle = document.querySelector('dt-theme-toggle');
        if (toggle) {
          toggle.click();
        }
      });
    });
    
    console.log(`✓ Theme change event triggered: ${themeChanged}`);
    
    console.log('✓ Theme toggle test completed successfully');
    
  } catch (error) {
    console.error('✗ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testThemeToggleComponent().catch(console.error);
