const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testInputBorders() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.form-control');
    
    // Take screenshot in light mode
    await page.screenshot({ 
      path: 'test/screenshots/input-borders-light-mode.png', 
      fullPage: true 
    });
    
    // Switch to dark mode
    await page.click('dt-theme-toggle');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot in dark mode
    await page.screenshot({ 
      path: 'test/screenshots/input-borders-dark-mode.png', 
      fullPage: true 
    });
    
    // Check border color in dark mode
    const borderColor = await page.evaluate(() => {
      const input = document.querySelector('.form-control');
      const computedStyle = window.getComputedStyle(input);
      return computedStyle.borderColor;
    });
    
    console.log('Border color in dark mode:', borderColor);
    
    // Check if the border color is the expected subtle color
    const expectedColor = 'rgb(48, 54, 61)'; // #30363d
    if (borderColor === expectedColor) {
      console.log('✅ Border color is correct - subtle and delicate');
    } else {
      console.log('❌ Border color is not as expected. Expected:', expectedColor, 'Got:', borderColor);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testInputBorders();
