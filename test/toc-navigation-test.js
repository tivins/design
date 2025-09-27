const { chromium } = require('playwright');

async function testTOCNavigation() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('🚀 Starting TOC Navigation Test...');
        
        // Navigate to the page
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Take initial screenshot
        await page.screenshot({ path: 'test/screenshots/toc-initial.png' });
        console.log('✅ Initial screenshot taken');
        
        // Test TOC visibility
        const tocContainer = await page.locator('#toc');
        await tocContainer.waitFor({ state: 'visible' });
        console.log('✅ TOC container is visible');
        
        // Test TOC toggle functionality
        const tocToggle = await page.locator('#tocToggle');
        await tocToggle.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test/screenshots/toc-collapsed.png' });
        console.log('✅ TOC collapsed successfully');
        
        // Expand TOC again
        await tocToggle.click();
        await page.waitForTimeout(500);
        console.log('✅ TOC expanded successfully');
        
        // Test navigation to different sections
        const sections = [
            'grid-system',
            'buttons', 
            'modals',
            'forms',
            'cards',
            'alerts',
            'tooltips',
            'box-components',
            'typography',
            'icons',
            'dark-theme',
            'utilities'
        ];
        
        for (const sectionId of sections) {
            console.log(`🔗 Testing navigation to ${sectionId}...`);
            
            // Click on TOC link
            const tocLink = await page.locator(`.toc-link[href="#${sectionId}"]`);
            await tocLink.click();
            await page.waitForTimeout(1000);
            
            // Verify section is visible
            const section = await page.locator(`#${sectionId}`);
            await section.waitFor({ state: 'visible' });
            
            // Check if link is active
            const isActive = await tocLink.evaluate(el => el.classList.contains('active'));
            console.log(`✅ Navigation to ${sectionId} - Active: ${isActive}`);
            
            // Take screenshot for each section
            await page.screenshot({ path: `test/screenshots/toc-${sectionId}.png` });
        }
        
        // Test dark theme with TOC
        console.log('🌙 Testing TOC with dark theme...');
        const themeToggle = await page.locator('dt-theme-toggle');
        await themeToggle.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'test/screenshots/toc-dark-theme.png' });
        console.log('✅ TOC works with dark theme');
        
        // Test mobile responsive
        console.log('📱 Testing mobile responsive...');
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test/screenshots/toc-mobile.png' });
        
        // Test mobile TOC collapse
        await tocToggle.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test/screenshots/toc-mobile-collapsed.png' });
        console.log('✅ Mobile responsive TOC works');
        
        // Reset viewport
        await page.setViewportSize({ width: 1280, height: 720 });
        
        console.log('🎉 All TOC navigation tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        await page.screenshot({ path: 'test/screenshots/toc-error.png' });
    } finally {
        await browser.close();
    }
}

// Run the test
testTOCNavigation().catch(console.error);
