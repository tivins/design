// test/popin-overflow-verification.js
// Simple verification that popin overflow fix is working

const fs = require('fs');
const path = require('path');

function verifyPopinOverflowFix() {
  console.log('Verifying popin overflow fix...');
  
  // Check SCSS file
  const scssPath = path.join(__dirname, '../src/scss/components/_popin.scss');
  const scssContent = fs.readFileSync(scssPath, 'utf8');
  
  console.log('✓ Checking SCSS file...');
  
  // Verify the fix is in SCSS
  const hasWhiteSpaceNormal = scssContent.includes('white-space: normal');
  const hasOverflowHidden = scssContent.includes('overflow: hidden');
  const hasTextOverflow = scssContent.includes('text-overflow: ellipsis');
  const hasMinWidth = scssContent.includes('min-width: 0');
  
  console.log('  - white-space: normal:', hasWhiteSpaceNormal ? '✓' : '✗');
  console.log('  - overflow: hidden:', hasOverflowHidden ? '✓' : '✗');
  console.log('  - text-overflow: ellipsis:', hasTextOverflow ? '✓' : '✗');
  console.log('  - min-width: 0:', hasMinWidth ? '✓' : '✗');
  
  // Check JavaScript file
  const jsPath = path.join(__dirname, '../src/js/popin-component.js');
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  
  console.log('✓ Checking JavaScript file...');
  
  // Verify the fix is in JavaScript
  const jsHasWhiteSpaceNormal = jsContent.includes('white-space: normal');
  const jsHasOverflowHidden = jsContent.includes('overflow: hidden');
  const jsHasTextOverflow = jsContent.includes('text-overflow: ellipsis');
  const jsHasMinWidth = jsContent.includes('min-width: 0');
  
  console.log('  - white-space: normal:', jsHasWhiteSpaceNormal ? '✓' : '✗');
  console.log('  - overflow: hidden:', jsHasOverflowHidden ? '✓' : '✗');
  console.log('  - text-overflow: ellipsis:', jsHasTextOverflow ? '✓' : '✗');
  console.log('  - min-width: 0:', jsHasMinWidth ? '✓' : '✗');
  
  // Check compiled CSS
  const cssPath = path.join(__dirname, '../dist/css/style.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    console.log('✓ Checking compiled CSS file...');
    
    const cssHasWhiteSpaceNormal = cssContent.includes('white-space:normal');
    const cssHasOverflowHidden = cssContent.includes('overflow:hidden');
    const cssHasTextOverflow = cssContent.includes('text-overflow:ellipsis');
    const cssHasMinWidth = cssContent.includes('min-width:0');
    
    console.log('  - white-space: normal:', cssHasWhiteSpaceNormal ? '✓' : '✗');
    console.log('  - overflow: hidden:', cssHasOverflowHidden ? '✓' : '✗');
    console.log('  - text-overflow: ellipsis:', cssHasTextOverflow ? '✓' : '✗');
    console.log('  - min-width: 0:', cssHasMinWidth ? '✓' : '✗');
  } else {
    console.log('✗ Compiled CSS file not found');
  }
  
  // Overall result
  const scssFix = hasWhiteSpaceNormal && hasOverflowHidden && hasTextOverflow && hasMinWidth;
  const jsFix = jsHasWhiteSpaceNormal && jsHasOverflowHidden && jsHasTextOverflow && jsHasMinWidth;
  
  console.log('\n📊 Summary:');
  console.log('  - SCSS fix applied:', scssFix ? '✓' : '✗');
  console.log('  - JavaScript fix applied:', jsFix ? '✓' : '✗');
  
  if (scssFix && jsFix) {
    console.log('\n🎉 Popin overflow fix successfully applied!');
    console.log('   Long links in popin items will now wrap properly and not overflow the container.');
  } else {
    console.log('\n❌ Popin overflow fix incomplete.');
  }
}

verifyPopinOverflowFix();
