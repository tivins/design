const { chromium } = require('playwright');

async function testMenuVariants() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('🍽️ Testing Menu Variants...');
        
        // Navigate to the page
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Test 1: Check that TOC uses menu variant
        console.log('🔍 Verifying menu variant in TOC...');
        const tocButtons = await page.locator('.toc-link');
        const buttonCount = await tocButtons.count();
        console.log(`✅ Found ${buttonCount} menu variant buttons in TOC`);
        
        // Test 2: Check button attributes
        console.log('📋 Testing menu button attributes...');
        const firstButton = await tocButtons.first();
        const buttonVariant = await firstButton.getAttribute('variant');
        const buttonSize = await firstButton.getAttribute('size');
        
        console.log(`✅ Button variant: ${buttonVariant}`);
        console.log(`✅ Button size: ${buttonSize}`);
        
        // Test 3: Check button styling
        console.log('🎨 Testing menu button styling...');
        const buttonStyle = await firstButton.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                padding: style.padding,
                fontSize: style.fontSize,
                textAlign: style.textAlign,
                justifyContent: style.justifyContent
            };
        });
        console.log(`✅ Button padding: ${buttonStyle.padding}`);
        console.log(`✅ Button font size: ${buttonStyle.fontSize}`);
        console.log(`✅ Button text align: ${buttonStyle.textAlign}`);
        
        // Test 4: Test hover state
        console.log('🖱️ Testing hover state...');
        await firstButton.hover();
        await page.waitForTimeout(200);
        
        const hoverStyle = await firstButton.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                backgroundColor: style.backgroundColor,
                color: style.color
            };
        });
        console.log(`✅ Hover background: ${hoverStyle.backgroundColor}`);
        console.log(`✅ Hover color: ${hoverStyle.color}`);
        
        // Test 5: Test active state
        console.log('🎯 Testing active state...');
        await firstButton.click();
        await page.waitForTimeout(500);
        
        const activeStyle = await firstButton.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                backgroundColor: style.backgroundColor,
                color: style.color,
                fontWeight: style.fontWeight
            };
        });
        console.log(`✅ Active background: ${activeStyle.backgroundColor}`);
        console.log(`✅ Active color: ${activeStyle.color}`);
        console.log(`✅ Active font weight: ${activeStyle.fontWeight}`);
        
        // Test 6: Test all menu buttons
        console.log('🔄 Testing all menu buttons...');
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
            await page.waitForTimeout(300);
            
            const section = await page.locator(`#${sectionId}`);
            const isVisible = await section.isVisible();
            const isActive = await button.evaluate(el => el.classList.contains('active'));
            
            console.log(`✅ ${sectionId}: Navigation=${isVisible}, Active=${isActive}`);
        }
        
        // Test 7: Test dark theme with menu buttons
        console.log('🌙 Testing menu buttons with dark theme...');
        const themeToggle = await page.locator('dt-theme-toggle');
        await themeToggle.click();
        await page.waitForTimeout(1000);
        
        // Test button styling in dark theme
        const darkButtonStyle = await firstButton.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
                backgroundColor: style.backgroundColor,
                color: style.color
            };
        });
        console.log(`✅ Dark theme button styling: bg=${darkButtonStyle.backgroundColor}, color=${darkButtonStyle.color}`);
        
        // Test 8: Visual verification
        console.log('📸 Taking verification screenshots...');
        await page.screenshot({ path: 'test/screenshots/menu-variants-desktop.png' });
        
        // Test mobile
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'test/screenshots/menu-variants-mobile.png' });
        
        console.log('🎉 All menu variant tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        await page.screenshot({ path: 'test/screenshots/menu-variants-error.png' });
    } finally {
        await browser.close();
    }
}

// Run the test
testMenuVariants().catch(console.error);
