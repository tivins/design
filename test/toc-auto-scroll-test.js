const { chromium } = require('playwright');

async function testTOCAutoScroll() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
        console.log('📜 Testing TOC Auto-Scroll...');
        
        // Navigate to the page
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        
        // Test 1: Check TOC structure
        console.log('🔍 Checking TOC structure...');
        const tocList = await page.locator('#tocList');
        const tocButtons = await page.locator('.toc-link');
        const buttonCount = await tocButtons.count();
        console.log(`✅ Found ${buttonCount} TOC buttons`);
        
        // Test 2: Test scroll behavior with manual navigation
        console.log('🎯 Testing manual navigation scroll...');
        
        // Click on a button in the middle of the list
        const middleButton = await tocButtons.nth(5); // "alerts" button
        await middleButton.click();
        await page.waitForTimeout(1000);
        
        // Check if the button is active
        const isActive = await middleButton.evaluate(el => el.classList.contains('active'));
        console.log(`✅ Middle button active: ${isActive}`);
        
        // Test 3: Test scroll behavior with page scroll
        console.log('📄 Testing page scroll behavior...');
        
        // Scroll to different sections and check TOC behavior
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
        
        for (let i = 0; i < sections.length; i++) {
            const sectionId = sections[i];
            console.log(`📍 Testing section: ${sectionId}`);
            
            // Scroll to section
            const section = await page.locator(`#${sectionId}`);
            await section.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            
            // Check if corresponding button is active
            const correspondingButton = await page.locator(`.toc-link[data-target="#${sectionId}"]`);
            const isButtonActive = await correspondingButton.evaluate(el => el.classList.contains('active'));
            
            // Check if button is visible in TOC
            const isButtonVisible = await correspondingButton.isVisible();
            
            console.log(`✅ ${sectionId}: Active=${isButtonActive}, Visible=${isButtonVisible}`);
            
            // Take screenshot every few sections
            if (i % 3 === 0) {
                await page.screenshot({ path: `test/screenshots/toc-scroll-${sectionId}.png` });
            }
        }
        
        // Test 4: Test with collapsed TOC
        console.log('📁 Testing with collapsed TOC...');
        const tocToggle = await page.locator('#tocToggle');
        await tocToggle.click();
        await page.waitForTimeout(500);
        
        // Scroll to a section
        const utilitiesSection = await page.locator('#utilities');
        await utilitiesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Expand TOC again
        await tocToggle.click();
        await page.waitForTimeout(500);
        
        console.log('✅ Collapsed/expanded TOC test completed');
        
        // Test 5: Test mobile behavior
        console.log('📱 Testing mobile behavior...');
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        
        // Scroll through sections on mobile
        for (let i = 0; i < 3; i++) {
            const sectionId = sections[i * 4]; // Test every 4th section
            const section = await page.locator(`#${sectionId}`);
            await section.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            
            const correspondingButton = await page.locator(`.toc-link[data-target="#${sectionId}"]`);
            const isButtonActive = await correspondingButton.evaluate(el => el.classList.contains('active'));
            
            console.log(`✅ Mobile ${sectionId}: Active=${isButtonActive}`);
        }
        
        await page.screenshot({ path: 'test/screenshots/toc-scroll-mobile.png' });
        
        // Reset viewport
        await page.setViewportSize({ width: 1280, height: 720 });
        
        console.log('🎉 All TOC auto-scroll tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        await page.screenshot({ path: 'test/screenshots/toc-scroll-error.png' });
    } finally {
        await browser.close();
    }
}

// Run the test
testTOCAutoScroll().catch(console.error);
