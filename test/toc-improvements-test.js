const { chromium } = require('playwright');

async function testTOCImprovements() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('🔧 Testing TOC Improvements...');
        
        // Navigate to the page
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Test 1: Check for horizontal scrollbar
        console.log('📏 Testing horizontal scrollbar removal...');
        const tocList = await page.locator('.toc-list');
        const hasHorizontalScroll = await tocList.evaluate(el => {
            return el.scrollWidth > el.clientWidth;
        });
        console.log(`✅ Horizontal scrollbar removed: ${!hasHorizontalScroll}`);
        
        // Test 2: Check animation durations
        console.log('⏱️ Testing animation durations...');
        const tocContainer = await page.locator('.toc-container');
        const computedStyle = await tocContainer.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                transition: style.transition,
                transitionDuration: style.transitionDuration
            };
        });
        console.log(`✅ Transition duration: ${computedStyle.transitionDuration}`);
        
        // Test 3: Test toggle responsiveness
        console.log('🔄 Testing toggle responsiveness...');
        const tocToggle = await page.locator('#tocToggle');
        
        const startTime = Date.now();
        await tocToggle.click();
        await page.waitForTimeout(100); // Wait for animation
        const collapseTime = Date.now() - startTime;
        
        await tocToggle.click();
        await page.waitForTimeout(100); // Wait for animation
        const expandTime = Date.now() - startTime - collapseTime;
        
        console.log(`✅ Collapse time: ${collapseTime}ms`);
        console.log(`✅ Expand time: ${expandTime}ms`);
        
        // Test 4: Test link hover animations
        console.log('🎯 Testing link hover animations...');
        const firstLink = await page.locator('.toc-link').first();
        
        const linkStyle = await firstLink.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                transition: style.transition,
                transitionDuration: style.transitionDuration
            };
        });
        console.log(`✅ Link transition duration: ${linkStyle.transitionDuration}`);
        
        // Test 5: Visual verification
        console.log('📸 Taking verification screenshots...');
        await page.screenshot({ path: 'test/screenshots/toc-improvements-desktop.png' });
        
        // Test mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test/screenshots/toc-improvements-mobile.png' });
        
        console.log('🎉 All TOC improvements verified!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        await page.screenshot({ path: 'test/screenshots/toc-improvements-error.png' });
    } finally {
        await browser.close();
    }
}

// Run the test
testTOCImprovements().catch(console.error);
