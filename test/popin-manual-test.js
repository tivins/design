// test/popin-manual-test.js
const { chromium } = require('playwright');

async function testPopinComponent() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('Taking screenshot of the page...');
    await page.screenshot({ path: 'test/screenshots/popin-page-dark.png' });
    
    // Test basic popin
    console.log('Testing basic popin component...');
    const popin = page.locator('dt-popin').first();
    await popin.waitFor({ state: 'visible' });
    
    console.log('Taking screenshot of closed popin...');
    await popin.screenshot({ path: 'test/screenshots/popin-closed-dark.png' });
    
    // Click trigger to open menu
    console.log('Opening popin menu...');
    const trigger = popin.locator('.popin-trigger');
    await trigger.click();
    
    console.log('Taking screenshot of opened popin...');
    await popin.screenshot({ path: 'test/screenshots/popin-opened-dark.png' });
    
    // Check menu is visible
    const menu = popin.locator('.popin-menu');
    await menu.waitFor({ state: 'visible' });
    console.log('Menu opened successfully!');
    
    // Test menu items
    const items = menu.locator('.popin-item');
    const itemCount = await items.count();
    console.log(`Found ${itemCount} menu items`);
    
    // Click on first item
    if (itemCount > 0) {
      console.log('Clicking on first menu item...');
      await items.first().click();
      await page.waitForTimeout(500);
    }
    
    // Test different positioning variants
    console.log('Testing positioning variants...');
    const leftPopin = page.locator('dt-popin[position="left"]').first();
    const centerPopin = page.locator('dt-popin[position="center"]').first();
    const rightPopin = page.locator('dt-popin[position="right"]').first();
    const upPopin = page.locator('dt-popin[position="up"]').first();
    
    await leftPopin.waitFor({ state: 'visible' });
    await centerPopin.waitFor({ state: 'visible' });
    await rightPopin.waitFor({ state: 'visible' });
    await upPopin.waitFor({ state: 'visible' });
    
    console.log('All positioning variants are visible!');
    
    // Test size variants
    console.log('Testing size variants...');
    const smallPopin = page.locator('dt-popin[size="sm"]').first();
    const mediumPopin = page.locator('dt-popin[size="md"]').first();
    const largePopin = page.locator('dt-popin[size="lg"]').first();
    
    await smallPopin.waitFor({ state: 'visible' });
    await mediumPopin.waitFor({ state: 'visible' });
    await largePopin.waitFor({ state: 'visible' });
    
    console.log('All size variants are visible!');
    
    // Test variant styles
    console.log('Testing variant styles...');
    const primaryPopin = page.locator('dt-popin[variant="primary"]').first();
    const successPopin = page.locator('dt-popin[variant="success"]').first();
    const warningPopin = page.locator('dt-popin[variant="warning"]').first();
    const dangerPopin = page.locator('dt-popin[variant="danger"]').first();
    
    await primaryPopin.waitFor({ state: 'visible' });
    await successPopin.waitFor({ state: 'visible' });
    await warningPopin.waitFor({ state: 'visible' });
    await dangerPopin.waitFor({ state: 'visible' });
    
    console.log('All variant styles are visible!');
    
    // Test text trigger
    console.log('Testing text trigger...');
    const textPopin = page.locator('dt-popin[trigger-text="Actions"]').first();
    await textPopin.waitFor({ state: 'visible' });
    
    const textTrigger = textPopin.locator('.popin-trigger');
    const triggerText = await textTrigger.textContent();
    console.log(`Text trigger content: "${triggerText}"`);
    
    // Switch to light theme
    console.log('Switching to light theme...');
    const themeToggle = page.locator('dt-theme-toggle').first();
    await themeToggle.click();
    await page.waitForTimeout(1000);
    
    console.log('Taking screenshot in light theme...');
    await page.screenshot({ path: 'test/screenshots/popin-page-light.png' });
    
    // Test popin in light theme
    const lightPopin = page.locator('dt-popin').first();
    await lightPopin.screenshot({ path: 'test/screenshots/popin-closed-light.png' });
    
    const lightTrigger = lightPopin.locator('.popin-trigger');
    await lightTrigger.click();
    
    await lightPopin.screenshot({ path: 'test/screenshots/popin-opened-light.png' });
    
    console.log('All tests completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testPopinComponent();
