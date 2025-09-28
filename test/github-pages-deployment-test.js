const { test, expect } = require('@playwright/test');

test.describe('GitHub Pages Deployment Test', () => {
  test('should access the deployed site', async ({ page }) => {
    // Test the GitHub Pages URL
    const githubPagesUrl = 'https://tivins.github.io/design/';
    
    console.log(`Testing GitHub Pages deployment at: ${githubPagesUrl}`);
    
    try {
      await page.goto(githubPagesUrl, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait for the page to load completely
      await page.waitForLoadState('networkidle');
      
      // Check if the page title is correct
      const title = await page.title();
      console.log(`Page title: ${title}`);
      
      // Check if the main content is loaded
      const mainContent = await page.locator('body').textContent();
      expect(mainContent).toBeTruthy();
      
      // Check if CSS is loaded (look for design toolkit specific classes)
      const hasDesignClasses = await page.locator('.btn, .card, .form-control').count() > 0;
      expect(hasDesignClasses).toBeTruthy();
      
      console.log('✅ GitHub Pages deployment test passed!');
      
    } catch (error) {
      console.log('❌ GitHub Pages deployment test failed:', error.message);
      
      // Take a screenshot for debugging
      await page.screenshot({ 
        path: 'test/screenshots/github-pages-deployment-failed.png',
        fullPage: true 
      });
      
      throw error;
    }
  });
  
  test('should have correct base path configuration', async ({ page }) => {
    const githubPagesUrl = 'https://tivins.github.io/design/';
    
    await page.goto(githubPagesUrl, { waitUntil: 'networkidle' });
    
    // Check if CSS is loaded from correct path
    const cssLinks = await page.locator('link[rel="stylesheet"]').all();
    let cssLoaded = false;
    
    for (const link of cssLinks) {
      const href = await link.getAttribute('href');
      if (href && href.includes('/design/')) {
        cssLoaded = true;
        break;
      }
    }
    
    expect(cssLoaded).toBeTruthy();
    console.log('✅ Base path configuration is correct');
  });
});
