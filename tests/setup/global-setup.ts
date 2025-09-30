// Global setup for Playwright tests
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global setup for Playwright tests...');
  
  // Start browser for setup tasks
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Wait for dev server to be ready
    console.log('⏳ Waiting for development server...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Verify the page loads correctly
    const title = await page.title();
    console.log(`✅ Development server ready. Page title: ${title}`);
    
    // Set up test data or perform any global setup
    await page.evaluate(() => {
      // Set default theme to light for consistent testing
      localStorage.setItem('theme', 'light');
      
      // Clear any existing test data
      localStorage.removeItem('test-data');
    });
    
    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
