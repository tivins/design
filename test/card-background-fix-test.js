// Test to verify card background fix in dark mode
const { chromium } = require('playwright');
const path = require('path');

async function testCardBackgroundFix() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to the local HTML file
    const htmlPath = path.resolve(__dirname, '../index.html');
    await page.goto(`file://${htmlPath}`);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Wait for checker to initialize
    await page.waitForFunction(() => window.cardBackgroundChecker, { timeout: 5000 });

    // Test 1: Light mode
    console.log('Testing Light Mode...');
    const lightModeResults = await page.evaluate(() => {
      const checker = window.cardBackgroundChecker;
      return checker ? checker.manualCheck() : null;
    });
    
    if (lightModeResults && lightModeResults.results) {
      console.log(`Light Mode: ${lightModeResults.results.issues.length}/${lightModeResults.results.total} cards have issues`);
    }

    // Switch to dark mode
    const themeToggle = await page.locator('dt-theme-toggle');
    await themeToggle.click();
    
    // Wait for theme transition
    await page.waitForTimeout(1000);

    // Test 2: Dark mode
    console.log('Testing Dark Mode...');
    const darkModeResults = await page.evaluate(() => {
      const checker = window.cardBackgroundChecker;
      return checker ? checker.manualCheck() : null;
    });
    
    if (darkModeResults && darkModeResults.results) {
      console.log(`Dark Mode: ${darkModeResults.results.issues.length}/${darkModeResults.results.total} cards have issues`);
    }

    // Take screenshot of cards section in dark mode
    const cardsSection = await page.locator('section:has-text("Cards")').nth(1);
    await cardsSection.scrollIntoViewIfNeeded();
    
    // Take screenshot
    await page.screenshot({
      path: 'test/screenshots/card-background-dark-mode-after.png',
      fullPage: false,
      clip: await cardsSection.boundingBox()
    });

    console.log('Screenshot taken: card-background-dark-mode-after.png');
    
    // Check if card bodies have background color
    const cardBodies = await page.locator('dt-card .card-body').all();
    console.log(`Found ${cardBodies.length} card bodies`);
    
    let transparentCount = 0;
    for (let i = 0; i < cardBodies.length; i++) {
      const body = cardBodies[i];
      const backgroundColor = await body.evaluate(el => {
        const computedStyle = window.getComputedStyle(el);
        return computedStyle.backgroundColor;
      });
      
      if (backgroundColor === 'rgba(0, 0, 0, 0)') {
        transparentCount++;
      }
      
      console.log(`Card body ${i + 1} background color: ${backgroundColor}`);
    }

    console.log(`\nSummary:`);
    console.log(`- Total card bodies: ${cardBodies.length}`);
    console.log(`- Transparent backgrounds: ${transparentCount}`);
    console.log(`- Fixed backgrounds: ${cardBodies.length - transparentCount}`);
    
    if (transparentCount === 0) {
      console.log('✅ SUCCESS: All card bodies now have proper backgrounds in dark mode!');
    } else {
      console.log('❌ ISSUE: Some card bodies still have transparent backgrounds');
    }

    // Export checker results
    const checkerResults = await page.evaluate(() => {
      const checker = window.cardBackgroundChecker;
      return checker ? checker.exportResults() : null;
    });
    
    if (checkerResults) {
      console.log('\nChecker Results:', JSON.stringify(checkerResults, null, 2));
    }

  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
}

testCardBackgroundFix().catch(console.error);
