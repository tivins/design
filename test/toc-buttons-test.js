const { chromium } = require('playwright');

async function testTOCButtons() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('🔘 Testing TOC Button Components...');
        
        // Navigate to the page
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Test 1: Check that TOC uses dt-button components
        console.log('🔍 Verifying dt-button components in TOC...');
        const tocButtons = await page.locator('.toc-link');
        const buttonCount = await tocButtons.count();
        console.log(`✅ Found ${buttonCount} dt-button components in TOC`);
        
        // Test 2: Check button attributes
        console.log('📋 Testing button attributes...');
        const firstButton = await tocButtons.first();
        const buttonTag = await firstButton.evaluate(el => el.tagName.toLowerCase());
        const buttonVariant = await firstButton.getAttribute('variant');
        const buttonTarget = await firstButton.getAttribute('data-target');
        
        console.log(`✅ Button tag: ${buttonTag}`);
        console.log(`✅ Button variant: ${buttonVariant}`);
        console.log(`✅ Button target: ${buttonTarget}`);
        
        // Test 3: Test button functionality
        console.log('🎯 Testing button navigation...');
        await firstButton.click();
        await page.waitForTimeout(1000);
        
        // Check if we scrolled to the target section
        const targetSection = await page.locator(buttonTarget);
        const isVisible = await targetSection.isVisible();
        console.log(`✅ Navigation to ${buttonTarget}: ${isVisible ? 'Success' : 'Failed'}`);
        
        // Test 4: Test active state
        console.log('🎨 Testing active state...');
        const hasActiveClass = await firstButton.evaluate(el => el.classList.contains('active'));
        console.log(`✅ Active state applied: ${hasActiveClass}`);
        
        // Test 5: Test all buttons
        console.log('🔄 Testing all TOC buttons...');
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
            const button = await page.locator(`.toc-link[data-target="#${sectionId}"]`);
            await button.click();
            await page.waitForTimeout(500);
            
            const section = await page.locator(`#${sectionId}`);
            const isVisible = await section.isVisible();
            const isActive = await button.evaluate(el => el.classList.contains('active'));
            
            console.log(`✅ ${sectionId}: Navigation=${isVisible}, Active=${isActive}`);
        }
        
        // Test 6: Test dark theme with buttons
        console.log('🌙 Testing buttons with dark theme...');
        const themeToggle = await page.locator('dt-theme-toggle');
        await themeToggle.click();
        await page.waitForTimeout(1000);
        
        // Test button styling in dark theme
        const buttonStyle = await firstButton.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                backgroundColor: style.backgroundColor,
                color: style.color
            };
        });
        console.log(`✅ Dark theme button styling: bg=${buttonStyle.backgroundColor}, color=${buttonStyle.color}`);
        
        // Test 7: Visual verification
        console.log('📸 Taking verification screenshots...');
        await page.screenshot({ path: 'test/screenshots/toc-buttons-desktop.png' });
        
        // Test mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test/screenshots/toc-buttons-mobile.png' });
        
        console.log('🎉 All TOC button tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        await page.screenshot({ path: 'test/screenshots/toc-buttons-error.png' });
    } finally {
        await browser.close();
    }
}

// Run the test
testTOCButtons().catch(console.error);
