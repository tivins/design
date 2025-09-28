# Design Toolkit Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.32.0] - 2025-01-29

### Improved
- **Input Borders Dark Mode**: Enhanced input border styling for dark mode following 2025 web design trends
  - **Subtle Border Colors**: Added new CSS variables for delicate dark mode borders
    - `--border-primary: #30363d` - Main border color for inputs and form controls
    - `--border-secondary: #21262d` - Secondary border color for containers
    - `--border-tertiary: #161b22` - Tertiary border color for subtle elements
  - **Form Controls Enhancement**: Updated `.form-control` styles for dark mode
    - Applied subtle border colors instead of bright gray-500
    - Enhanced focus states with proper primary color highlighting
    - Improved placeholder text color for better readability
    - Added smooth transitions for theme switching
  - **Custom Select Styling**: Enhanced `.custom-select` component for dark mode
    - Applied consistent subtle border colors
    - Updated dropdown arrow color for dark theme
    - Improved disabled state styling
  - **Input Group Components**: Updated `.input-group-text` styling
    - Applied consistent border colors across all input group elements
    - Enhanced background and text colors for dark mode
  - **Design Philosophy**: Implemented 2025 web design best practices
    - Discreet, fine, and delicate borders as requested
    - Better visual hierarchy without overwhelming contrast
    - Smooth transitions between light and dark themes
  - **Testing**: Added comprehensive testing for border color verification
    - Automated tests confirm correct RGB values in dark mode
    - Screenshots captured for visual verification
    - Both light and dark mode compatibility ensured

## [1.31.0] - 2025-01-28

### Fixed
- **Popin Component Link Overflow**: Fixed issue where long links in popin items would overflow the container
  - **CSS Improvements**: Updated `.popin-item` styles to handle long text properly
    - Changed `white-space: nowrap` to `white-space: normal` to allow text wrapping
    - Added `overflow: hidden` and `text-overflow: ellipsis` for proper text truncation
    - Added `min-width: 0` to allow flex items to shrink below their content size
    - Enhanced `word-wrap`, `word-break`, and `overflow-wrap` properties for better text handling
  - **JavaScript Component**: Updated inline styles in `popin-component.js` to match SCSS changes
    - Applied same overflow handling properties to both render methods
    - Ensured consistency between SCSS and JavaScript component styles
  - **Responsive Design**: Improved popin behavior across different screen sizes
    - Better handling of long URLs and text content
    - Proper containment within popin menu boundaries
    - Enhanced user experience for popin items with extensive text

### Technical Details
- **File Changes**: 
  - `src/scss/components/_popin.scss`: Updated `.popin-item` styles for overflow handling
  - `src/js/popin-component.js`: Synchronized inline styles with SCSS changes
  - `dist/css/style.css`: Rebuilt with updated styles
- **CSS Properties Added**:
  - `white-space: normal` (replaced `nowrap`)
  - `overflow: hidden`
  - `text-overflow: ellipsis`
  - `min-width: 0`
- **Testing**: Created comprehensive tests to verify link overflow fix
  - Dark and light theme testing
  - Different popin sizes (sm, md, lg)
  - Long URL and text content validation

### Files Modified
- `src/scss/components/_popin.scss`: Enhanced popin item overflow handling
- `src/js/popin-component.js`: Updated inline styles for consistency
- `dist/css/style.css`: Rebuilt with overflow fixes
- `test/popin-link-overflow-test.js`: Added comprehensive test suite
- `test/popin-link-overflow-fix-test.js`: Created Puppeteer-based test
- `test/popin-link-overflow-simple-test.js`: Added simple validation test

## [1.30.0] - 2025-01-28

### Changed
- **Complete Translation to English**: Translated all French content to English throughout the project
  - **index.html**: Translated all demo sections, code examples, and interactive content
    - Table of Contents: "Table des matières" → "Table of Contents"
    - All section titles and descriptions translated
    - Code examples with English comments and titles
    - Interactive popin examples with English labels
    - Alert messages and tooltip content translated
    - Icon names and descriptions in English
    - Theme toggle documentation and examples
    - JavaScript function comments and messages translated
  - **docs/DOCUMENTATION.md**: Complete translation of project documentation
    - Overview and feature descriptions
    - Installation and usage instructions
    - Code examples and customization guides
    - Development guidelines and contribution instructions
  - **Consistent English Language**: All user-facing content now in English
    - Component descriptions and usage examples
    - Error messages and notifications
    - Interactive elements and tooltips
    - Documentation and help text

### Technical Details
- **Translation Scope**: All French text in demo page and documentation translated
- **Code Examples**: HTML comments and JavaScript messages updated to English
- **User Interface**: All interactive elements now display English text
- **Documentation**: Complete translation of technical documentation
- **Consistency**: Maintained consistent terminology throughout the project
- **Accessibility**: Improved accessibility for English-speaking users

### Files Modified
- `index.html`: Complete translation of demo content and examples
- `docs/DOCUMENTATION.md`: Full documentation translation
- All interactive elements and user-facing content now in English

## [1.29.0] - 2025-09-28

### Added
- **Comprehensive Project Audit**: Completion of a full audit of the Design Toolkit project
  - **Structure Analysis**: Evaluation of overall architecture and organization
  - **Component Review**: Detailed analysis of JavaScript components and Web Components
  - **Style Verification**: Audit of SCSS styles and CSS architecture
  - **Functional Testing**: Validation of features and automated tests
  - **Performance Analysis**: Assessment of performance metrics and optimizations
  - **Security Review**: Security audit and best practices verification
  - **Maintainability Evaluation**: Analysis of code maintainability and organization
  - **Final Report**: Generation of a complete audit report with recommendations

### Technical Details
- **Overall Score**: 8.7/10 with detailed evaluation of all aspects
- **Audit Report**: Creation of the file `docs/audit/AUDIT_REPORT_COMPLET.md`
- **Performance Metrics**: CSS 94.95 kB (14.67 kB gzipped), build time 732ms
- **Security**: 4 moderate vulnerabilities in development dependencies
- **Recommendations**: Sass migration, unit tests, dependency updates
- **Conclusion**: Project approved for production with minor improvements

## [1.28.0] - 2025-01-27

### Fixed
- **JavaScript Errors Resolution**: Fixed all JavaScript errors on page load
  - **DtTooltip Error**: Added global export `window.DtTooltip` and wrapped usage in DOMContentLoaded
  - **DtToast Error**: Added global export `window.DtToast` and wrapped usage in DOMContentLoaded  
  - **DtIcon Error**: Added global export `window.DtIcon` and wrapped usage in DOMContentLoaded
  - **ThemeToggle Error**: Fixed `getCurrentTheme is not a function` by adding proper error handling
  - **Card Background Checker Error**: Fixed `checkAllCards is not a function` by correcting method name to `checkAllComponents`
  - **Script Loading Order**: Ensured all component scripts execute after DOM is ready
  - **Error Prevention**: Added type checks before calling component methods

### Technical Details
- **Global Exports**: Added `window.DtTooltip`, `window.DtToast`, `window.DtIcon` exports
- **DOM Ready Wrapping**: Wrapped all inline component usage in `DOMContentLoaded` events
- **Error Handling**: Added `typeof` checks before calling component methods
- **Method Name Correction**: Fixed `checkAllCards()` to `checkAllComponents()` in card background checker
- **Testing**: Created comprehensive test suite to verify error resolution
- **Screenshots**: Added test screenshots for verification

## [1.27.0] - 2025-01-27

### Refactored
- **Popin Component Refactoring**: Eliminated code duplication by refactoring popin triggers to use dt-button with ghost variant
  - **Code Deduplication**: Removed duplicate CSS styles between popin triggers and ghost buttons
  - **Unified Button System**: Popin triggers now use the same dt-button component with ghost variant
  - **Maintained Functionality**: All popin features (text, icons, positioning, variants) work identically
  - **Improved Maintainability**: Single source of truth for ghost button styling
  - **Backward Compatibility**: No breaking changes to popin API or behavior
  - **Performance**: Reduced CSS bundle size by eliminating duplicate styles

### Technical Details
- **Popin Trigger Migration**: Changed from custom `.popin-trigger` to `<dt-button variant="ghost">`
- **Event Handling**: Updated event listeners to work with both dt-button and fallback implementations
- **Focus Management**: Improved keyboard navigation and focus handling for dt-button integration
- **Shadow DOM**: Maintained proper Shadow DOM encapsulation for both implementations
- **Theme Support**: Preserved full dark/light theme support through unified ghost button styles

## [1.26.0] - 2025-01-27

### Added
- **New Ghost Button Style**: Added ghost button variants inspired by popin trigger design
  - **Ghost Base Style**: Transparent background with subtle hover effects
  - **Ghost Color Variants**: ghost-primary, ghost-secondary, ghost-success, ghost-danger, ghost-warning, ghost-info
  - **Dark Theme Support**: Proper adaptation to dark theme with appropriate colors
  - **Hover Effects**: Smooth transitions with background color changes on hover
  - **Focus States**: Proper focus indicators for accessibility
  - **Disabled States**: Appropriate styling for disabled ghost buttons

### Enhanced
- **Button Component**: Extended dt-button component to support ghost variants
  - Added ghost button styles to both SCSS and JavaScript components
  - Maintained consistency with existing button architecture
  - Proper Shadow DOM styling for all ghost variants
  - Full integration with existing size and icon support

### Technical Details
- Added comprehensive ghost button styles to `src/scss/components/_buttons.scss`
- Updated `src/js/button-component.js` with ghost button support
- Added ghost button examples to `index.html` with code examples
- Created automated test suite with Puppeteer for ghost button functionality
- Verified proper styling in both light and dark themes
- All ghost buttons maintain consistent behavior with existing button variants

### Testing
- **Automated Testing**: Created comprehensive test suite for ghost buttons
  - Tested all ghost variants in light and dark themes
  - Verified hover effects and color transitions
  - Tested focus states and accessibility features
  - Confirmed proper integration with existing button system
- **Visual Verification**: Screenshots captured for both themes
- **Cross-browser Compatibility**: Tested with Puppeteer for consistent behavior

## [1.25.5] - 2025-01-27

### Changed
- **Popin Examples**: Replaced emojis with dt-icon system in interactive popin examples
  - Updated all popin menu items to use `<dt-icon>` components instead of emojis
  - Improved consistency with the design system's iconography
  - Enhanced accessibility and visual consistency
  - Updated code examples to reflect the new icon usage

### Technical Details
- Replaced emoji icons (✏️, 📋, 🔗, 🗑️, 🌙, 🌍, 🔔, ❓, ℹ️, 🏠, 👤, 💬, 📁, 🚪) with appropriate dt-icon names
- Updated popin item styles to support flexbox layout for proper icon alignment
- Enhanced `.popin-item` CSS with `display: flex`, `align-items: center`, and `gap` for icon spacing
- Added specific styles for `dt-icon` within popin items for proper rendering
- Updated both interactive examples and code documentation

### Icon Mappings
- ✏️ → `dt-icon name="edit"`
- 📋 → `dt-icon name="copy"`
- 🔗 → `dt-icon name="share"`
- 🗑️ → `dt-icon name="delete"`
- 🌙 → `dt-icon name="moon"`
- 🌍 → `dt-icon name="globe"`
- 🔔 → `dt-icon name="bell"`
- ❓ → `dt-icon name="help"`
- ℹ️ → `dt-icon name="info"`
- 🏠 → `dt-icon name="home"`
- 👤 → `dt-icon name="user"`
- 💬 → `dt-icon name="message"`
- 📁 → `dt-icon name="folder"`
- 🚪 → `dt-icon name="log-out"`

## [1.25.4] - 2025-01-27

### Fixed
- **Popin Menu Width Adaptation**: Improved menu width to better adapt to content
  - Changed from fixed width constraints to `width: max-content`
  - Removed minimum width constraints that forced uniform sizing
  - Enhanced responsive behavior for different content lengths
  - Improved clickable area sizing to match content width
  - Better visual consistency with content-based sizing

### Technical Details
- Updated `.popin-menu` CSS with `width: max-content` for content adaptation
- Removed `min-width` constraints that prevented proper content sizing
- Enhanced `.popin-item` with `white-space: nowrap` for consistent text display
- Improved responsive design for popin menus with varying content lengths
- Better user experience with appropriately sized clickable areas

## [1.25.3] - 2025-01-27

### Fixed
- **Popin Item Sizing**: Improved sizing management for clickable elements in popin menus
  - Removed fixed width constraints that caused overflow issues
  - Added `flex: 1 1 auto` for better flexbox behavior
  - Added `min-width: 0` to prevent flex items from overflowing
  - Added `word-wrap: break-word` and `overflow-wrap: break-word` for proper text handling
  - Changed popin menu to use `display: flex` and `flex-direction: column`
  - Increased max-width from 300px to 400px for better content accommodation
  - Enhanced responsive behavior for different content lengths

### Technical Details
- Updated `.popin-item` CSS with improved flexbox properties
- Enhanced `.popin-menu` container with flexbox layout
- Improved text wrapping and overflow handling
- Better responsive design for popin menus with varying content

## [1.25.2] - 2025-01-27

### Fixed
- **Popin Single Menu Behavior**: Fixed issue where multiple popin menus could be open simultaneously
  - Added `closeAllOtherPopins()` method to automatically close other popins when opening a new one
  - Ensures only one popin menu is open at a time for better UX
  - Prevents menu stacking and visual clutter
- **Popin Item Overflow**: Fixed danger button overflowing outside popin container
  - Added `max-width: 100%` and `box-sizing: border-box` to `.popin-item`
  - Added `overflow: hidden` and `text-overflow: ellipsis` for proper text handling
  - Added `max-width: 300px` to `.popin-menu` container
  - Ensures all menu items stay within container boundaries

### Technical Details
- Updated `src/js/popin-component.js` with automatic popin closing logic
- Enhanced `src/scss/components/_popin.scss` with overflow prevention styles
- Improved popin component behavior and visual consistency
- Better responsive design for popin menus

## [1.25.1] - 2025-01-27

### Fixed
- **Input Borders**: Fixed input border color that was too light
  - Changed input border color from `var(--gray-400)` to `var(--gray-500)` for better visibility
  - Applied fix to all form controls (input, select, textarea)
  - Improved contrast and readability of form elements

### Enhanced
- **Popin Interactive Examples**: Added comprehensive interactive examples for popin component
  - Added 3 interactive popin examples with different use cases:
    - User actions popin (edit, copy, share, delete)
    - Settings popin (theme, language, notifications, help, about)
    - Navigation popin (home, profile, messages, files, logout)
  - Added real-time action logging system
  - Added toast notifications for user feedback
  - Added emoji icons for better visual appeal
  - Added code examples showing how to implement interactive popins
  - Enhanced user experience with immediate feedback on actions

### Technical Details
- Updated `src/scss/components/_forms.scss` with improved border colors
- Added `handlePopinAction()` JavaScript function for interactive examples
- Added action logging and toast notification system
- Enhanced popin documentation with practical use cases

## [1.25.0] - 2025-01-27

### Added
- **New Popin Component**: Added comprehensive dropdown menu component (`dt-popin`)
  - Multiple positioning options: left, center, right, up
  - Size variants: small, medium, large
  - Style variants: primary, success, warning, danger, info
  - Support for text triggers with custom icons
  - Menu items with different types: normal, success, warning, danger, disabled
  - Support for dividers and headers in menus
  - Full keyboard navigation support (Arrow keys, Enter, Escape)
  - Click outside to close functionality
  - ARIA accessibility attributes
  - Dark theme support
  - Responsive design for mobile devices
- **Popin Documentation**: Added comprehensive examples in index.html
  - Basic popin usage examples
  - Positioning variants demonstration
  - Size variants showcase
  - Style variants examples
  - Item types demonstration
  - Code examples for all variants
- **Popin Testing**: Added comprehensive test suite
  - Manual testing script with Playwright
  - Screenshot generation for both dark and light themes
  - Functional testing of all variants and features
  - Accessibility testing
  - Cross-theme compatibility verification

### Technical Details
- Created `src/scss/components/_popin.scss` with complete styling
- Created `src/js/popin-component.js` with full Web Component implementation
- Added popin import to main SCSS file (`src/index.scss`)
- Added popin script to index.html
- Added popin section to table of contents
- Generated test screenshots in `test/screenshots/` directory
- Component follows established design patterns and conventions

## [1.24.1] - 2025-01-27

### Added
- Added comprehensive audit report with detailed analysis
- Added audit folder in docs directory for better organization
- Added performance metrics and optimization recommendations
- Added security analysis and best practices review
- Added code quality assessment with specific improvement suggestions
- Added documentation completeness evaluation
- Added testing coverage analysis
- Added build system and deployment pipeline review
- Moved audit report to dedicated docs/audit/ directory for better organization

### Changed
- Improved project organization with dedicated audit documentation
- Enhanced project structure visibility through comprehensive audit
- Better organized documentation structure with audit folder

### Fixed
- Identified and documented potential areas for improvement
- Highlighted security considerations and best practices
- **GitHub Pages Deployment Permissions**: Fixed permission denied error for github-actions[bot]
  - Replaced deprecated `peaceiris/actions-gh-pages@v3` with official GitHub Pages actions
  - Added proper permissions configuration (`contents: read`, `pages: write`, `id-token: write`)
  - Created separate deploy workflow for better separation of concerns
  - Enhanced security with official GitHub authentication tokens

### Enhanced
- **Deployment Workflow**: Improved GitHub Pages deployment system
  - Created dedicated `.github/workflows/deploy.yml` workflow
  - Added environment configuration for better deployment tracking
  - Implemented concurrency control to prevent deployment conflicts
  - Added proper artifact upload and deployment steps

### Technical Details
- Updated build workflow to remove deployment logic (separation of concerns)
- Added `actions/configure-pages@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`
- Created comprehensive GitHub Pages setup documentation
- Fixed authentication issues with official GitHub Actions
- All workflows now use modern, maintained actions with proper permissions

## [1.24.0] - 2025-01-27

### Added
- **GitHub Actions CI/CD Pipeline**: Complete automated build and deployment system
  - **Build Workflow**: Automated testing, linting, and building on push/PR to main/develop branches
  - **Release Workflow**: Automatic release creation and asset upload when tags are pushed
  - **GitHub Pages Deployment**: Automatic deployment to GitHub Pages on main branch pushes
  - **Multi-Node Testing**: Build tested on Node.js 18.x and 20.x for compatibility
  - **Artifact Management**: Build artifacts uploaded and retained for 30 days
  - **Cross-Platform Support**: Windows-compatible build scripts with rimraf for cleanup

### Enhanced
- **Package.json Scripts**: Added comprehensive build and development scripts
  - `npm run ci`: Complete CI pipeline (lint + test + build)
  - `npm run test:run`: Run tests without watch mode
  - `npm run test:ui`: Run tests with UI interface
  - `npm run clean`: Cross-platform directory cleanup
  - `npm run prebuild`: Automatic cleanup before build

### Improved
- **Build Configuration**: Enhanced Vite configuration for production builds
  - Added Terser minification for optimized CSS output
  - Enabled sourcemap generation for debugging
  - Improved build performance and output optimization
  - Better error handling and build reporting

### Technical Details
- Created `.github/workflows/build.yml` for continuous integration
- Created `.github/workflows/release.yml` for automated releases
- Added `.stylelintrc.json` with comprehensive linting rules
- Added `rimraf` and `terser` dependencies for cross-platform builds
- Created `src/test/basic.test.js` for basic test coverage
- Enhanced `vite.config.js` with production optimizations
- All workflows tested and verified working on Windows environment
- Build produces optimized CSS (85.38 kB, 13.51 kB gzipped)

## [1.23.0] - 2025-01-27

### Added
- **Theme Toggle Component Documentation**: Added comprehensive section dedicated to the `dt-theme-toggle` component
  - Complete documentation of all available variants (link, primary, secondary, outline variants)
  - Size options demonstration (sm, md, lg)
  - Programmatic control examples with JavaScript functions
  - Interactive buttons for testing theme switching functionality
  - Complete HTML code examples with copy functionality
  - Added entry to Table of Contents for easy navigation

### Enhanced
- **Theme Toggle Section**: Comprehensive demonstration of theme toggle capabilities
  - All 9 button variants displayed with labels
  - All 3 size options shown with descriptions
  - Interactive programmatic control buttons
  - Real-time theme status display
  - Complete API documentation with practical examples

### Technical Details
- Added new section `#theme-toggle` to index.html with complete component showcase
- Created `test/theme-toggle-test.js` with comprehensive Playwright testing
- Added JavaScript functions for programmatic theme control (`setTheme`, `getCurrentTheme`, `showThemeStatus`)
- Updated Table of Contents with Theme Toggle entry
- All tests pass with proper theme switching verification
- Screenshots captured for both light and dark themes
- Component functionality verified across all variants and sizes

## [1.22.4] - 2025-01-27

### Enhanced
- **TOC Auto-Scroll**: Added automatic scrolling of TOC menu to keep active button visible
  - When scrolling through page sections, the TOC menu now automatically scrolls to show the active button
  - Active button is centered in the TOC viewport for optimal visibility
  - Smooth scroll behavior with `behavior: 'smooth'` for better user experience
  - Only works when TOC is expanded (not collapsed)

### Improved
- **TOC Navigation UX**: Enhanced user experience with intelligent menu scrolling
  - Prevents active buttons from being hidden outside the TOC viewport
  - Maintains visual context by keeping the active section visible in the menu
  - Works seamlessly with both manual navigation and page scrolling
  - Responsive behavior on both desktop and mobile devices

### Technical Details
- Added `scrollActiveButtonIntoView()` function for intelligent menu scrolling
- Uses `getBoundingClientRect()` to detect button visibility in TOC viewport
- Calculates optimal scroll position to center active button
- Respects TOC collapsed state (no scroll when collapsed)
- Smooth scroll animation with `scrollTo()` method
- All tests pass with proper scroll behavior verification

## [1.22.3] - 2025-01-27

### Enhanced
- **TOC Menu Button Styling**: Improved styling for menu buttons in TOC navigation
  - Added proper CSS overrides for `dt-button` components in menu context
  - Implemented compact menu styling with smaller padding (0.25rem 0.5rem)
  - Added proper font sizing (0.875rem) and weight (400) for menu items
  - Enhanced hover and active states with primary color background
  - Maintained left-aligned text and full-width layout for menu consistency

### Fixed
- **Menu Button Appearance**: Fixed styling issues with `dt-button` components in TOC
  - Resolved Shadow DOM styling conflicts with `!important` declarations
  - Ensured proper visual hierarchy with compact menu design
  - Fixed hover and active state transitions for better user feedback
  - Maintained dark theme compatibility with proper color overrides

### Technical Details
- Added comprehensive CSS overrides for `.toc-link` class
- Used `!important` declarations to override Shadow DOM styles
- Implemented proper menu-specific styling: padding, font-size, alignment
- Enhanced visual feedback with hover and active states
- All tests pass with correct styling metrics (4px 8px padding, 14px font-size)
- Screenshots captured for visual verification

## [1.22.2] - 2025-01-27

### Changed
- **TOC Navigation Components**: Replaced `<a>` links with `<dt-button>` components for consistency
  - All 12 TOC navigation items now use `<dt-button variant="link">` components
  - Maintains same visual appearance and functionality
  - Better integration with the design system architecture
  - Consistent styling and behavior across all components

### Enhanced
- **TOC Button Styling**: Optimized CSS for button components in TOC
  - Added `width: 100%` and `text-align: left` for proper button layout
  - Used `justify-content: flex-start` for left-aligned text
  - Added `!important` declarations to override button component styles
  - Maintained hover and active states with proper color transitions
  - Preserved dark theme support with theme-aware styling

### Technical Details
- Updated HTML structure: `<a href="#section">` → `<dt-button variant="link" data-target="#section">`
- Modified JavaScript to use `data-target` attribute instead of `href`
- Updated CSS selectors and styling for button components
- Maintained all existing functionality: smooth scroll, active states, mobile behavior
- All tests pass with 12 dt-button components verified
- Screenshots captured for both desktop and mobile views

## [1.22.1] - 2025-01-27

### Fixed
- **TOC Horizontal Scrollbar**: Removed unwanted horizontal scrollbar in TOC menu
  - Added `overflow-x: hidden` to prevent horizontal scrolling
  - TOC list now only shows vertical scrollbar when needed

### Improved
- **TOC Animation Performance**: Reduced animation durations for more responsive behavior
  - Container transitions: `0.3s` → `0.2s` (33% faster)
  - Link hover transitions: `0.2s` → `0.15s` (25% faster)
  - Toggle button transitions: `0.2s` → `0.15s` (25% faster)
  - Mobile auto-collapse delay: `500ms` → `200ms` (60% faster)
  - Removed scale transform on hover for cleaner interaction
  - Improved opacity values for better visual feedback

### Technical Details
- Modified CSS transitions to be more specific and faster
- Removed unnecessary transform animations on hover
- Optimized mobile interaction timing
- All tests pass with improved performance metrics
- Screenshots captured to verify visual improvements

## [1.22.0] - 2025-01-27

### Added
- **Table of Contents (TOC) Navigation**: Complete sticky navigation system for the demo page
  - **Sticky Positioning**: Fixed TOC container positioned on the right side of the screen
  - **Collapsible Design**: Toggle button to collapse/expand the TOC for space optimization
  - **Active Section Highlighting**: Automatic highlighting of the current section based on scroll position
  - **Smooth Scrolling**: Smooth scroll behavior when clicking on TOC links
  - **Intersection Observer**: Real-time detection of visible sections for accurate active state
  - **Responsive Design**: Mobile-optimized TOC that adapts to smaller screens
  - **Dark Theme Support**: Full dark theme integration with proper colors and contrast
  - **Auto-collapse on Mobile**: TOC automatically collapses after navigation on mobile devices

### Enhanced
- **Navigation Experience**: Improved user experience with intuitive navigation
  - All 12 main sections now have anchor links for direct navigation
  - Visual feedback with hover effects and active states
  - Custom scrollbar styling for the TOC list
  - Smooth animations and transitions throughout the interface

### Technical Details
- Added comprehensive CSS styling for TOC with theme-aware colors
- Implemented JavaScript functionality for:
  - TOC toggle (collapse/expand) with icon switching
  - Smooth scroll navigation to sections
  - Active section detection using Intersection Observer API
  - Mobile responsive behavior with auto-collapse
  - Window resize handling for responsive adjustments
- Added unique IDs to all demo sections for anchor navigation
- Created automated test suite with Playwright for TOC functionality
- All tests pass including navigation, theme switching, and mobile responsiveness
- Screenshots captured for both light and dark themes, desktop and mobile views

## [1.21.2] - 2025-09-27

### Fixed
- **Light Mode Background Issue**: Fixed transparent backgrounds in light mode
  - Card and modal bodies now properly display white backgrounds (#ffffff) in light mode
  - Applied bidirectional background enforcement for both light and dark modes
  - All 11 cards and 7 modals now display correctly in both themes

### Enhanced
- **Background Verification System**: Now detects issues in both modes
  - Removed "dark mode only" condition from background checking
  - System now validates backgrounds in light mode, dark mode, and theme transitions
  - Generic error messages for transparent backgrounds in any mode
  - Complete bidirectional theme support

### Technical Details
- Modified `ensureDarkModeBackground()` methods in both card and modal components
- Added light mode background enforcement (`#ffffff`) alongside dark mode (`#161b22`)
- Updated background checker to validate all modes, not just dark mode
- All tests pass with 0 background issues in both light and dark modes
- Screenshots taken for both modes to verify visual correctness

## [1.21.1] - 2025-09-27

### Fixed
- **Modal Background Issue in Dark Mode**: Fixed transparent backgrounds in modal bodies
  - Modal bodies now properly inherit dark background color (#161b22) in dark mode
  - Applied same JavaScript-based background enforcement as cards
  - Implemented theme change observer for modals
  - All 7 modal components now display with correct dark backgrounds

### Enhanced
- **Background Verification System**: Extended to include modals
  - `CardBackgroundChecker` → `CardAndModalBackgroundChecker` (v2.0.0)
  - Now monitors both cards and modals simultaneously
  - Separate reporting for card issues vs modal issues
  - Unified verification system for all Shadow DOM components

### Technical Details
- Enhanced `src/js/modal-component.js` with same background enforcement as cards
- Extended `src/js/card-background-checker.js` to monitor modals
- Added modal-specific CSS rules with `!important` declarations
- Eliminated code duplication between card and modal components
- All tests pass with 0 background issues for both components

## [1.21.0] - 2025-09-27

### Fixed
- **Card Background Issue in Dark Mode**: Fixed transparent backgrounds in card bodies
  - Card bodies now properly inherit dark background color (#161b22) in dark mode
  - Added JavaScript-based background enforcement for Shadow DOM components
  - Implemented theme change observer to update backgrounds dynamically
  - All 11 card components now display with correct dark backgrounds

### Added
- **Card Background Verification System**: Comprehensive background checking system
  - `CardBackgroundChecker` class for automatic background validation
  - Real-time monitoring of card background colors in both themes
  - Automatic detection of theme changes and background updates
  - Detailed reporting of background issues with card indices
  - Export functionality for testing and debugging
  - Console logging with success/warning indicators

### Enhanced
- **Card Component Dark Mode Support**: Improved dark theme integration
  - Added `ensureDarkModeBackground()` method for forced background application
  - Added `observeThemeChanges()` method for dynamic theme detection
  - Enhanced CSS rules with `!important` declarations for Shadow DOM
  - Improved theme transition handling with proper timing

### Technical Details
- Created `src/js/card-background-checker.js` with comprehensive monitoring system
- Enhanced `src/js/card-component.js` with JavaScript-based background enforcement
- Added automated testing with Playwright for background verification
- Screenshots taken before and after fix for visual confirmation
- All tests pass with 0 background issues detected

## [1.20.0] - 2024-12-19

### Added
- **New `dt-modal` Web Component**: Complete modal system based on dt-card architecture
  - **Backdrop with Blur Effect**: Modal appears over a blurred background
  - **Configurable Elements**: All elements can be enabled/disabled independently
    - Close button (configurable with `show-close-button` attribute)
    - Title (configurable with `title` attribute)
    - Header section (configurable with `show-header` attribute)
    - Footer section (configurable with `show-footer` attribute)
  - **Multiple Size Variants**: sm, md, lg, xl, full
  - **Multiple Style Variants**: primary, success, warning, danger, info
  - **Interactive Features**:
    - Click outside to close (configurable with `backdrop-closable` attribute)
    - Escape key to close
    - Smooth animations with slide-in effect
    - Body scroll prevention when modal is open
  - **Responsive Design**: Adapts to mobile screens with proper sizing
  - **Dark Theme Support**: Full dark theme integration with proper colors
  - **Shadow DOM Implementation**: Encapsulated styling and behavior
  - **Public API Methods**: open(), close(), toggle(), setTitle(), setSize(), etc.
  - **Event System**: Custom events for modal-open and modal-close
  - **Slot Support**: Footer content via `slot="footer"`

### Enhanced
- **Modal Demo Section**: Added comprehensive modal examples in index.html
  - Basic modal with title and close button
  - Modal with footer containing action buttons
  - Large modal for complex content
  - Modal without header for simple confirmations
  - Interactive buttons to test all modal variants
  - Complete HTML code examples with copy functionality

### Technical Details
- Created `src/js/modal-component.js` with full Web Component implementation
- Created `src/scss/components/_modals.scss` with comprehensive styling
- Added modal component to main SCSS import chain
- Implemented proper event handling for all interactions
- Added automated testing with Playwright for modal functionality
- Component supports attributes: `open`, `title`, `show-close-button`, `show-header`, `show-footer`, `size`, `variant`, `backdrop-closable`
- Static factory method `DtModal.create()` for programmatic creation

## [1.19.0] - 2024-12-19

### Added
- **Comprehensive HTML Code Examples**: Added interactive `dt-code-example` components to all component sections
  - **Grid System**: Responsive grid layout examples with detailed comments
  - **Buttons**: Complete button variants, sizes, and grouping examples
  - **Forms**: Full form component with all input types and validation
  - **Cards**: Card components with headers, subtitles, and links
  - **Box Components**: Box, Alert, and Toast component examples with JavaScript
  - **Icons**: Icon system with sizes, colors, animations, and button integration
  - **Tooltips**: Tooltip positioning, themes, delays, and programmatic creation
  - **Alerts**: Alert variants with custom icons and dismissible functionality

### Enhanced
- **Interactive Code Display**: All examples now feature:
  - Copy-to-clipboard functionality with visual feedback
  - Syntax highlighting with language specification
  - Customizable titles and styling
  - Dark theme support
  - Responsive design with proper overflow handling

### Technical Details
- Replaced all static HTML code blocks with interactive `dt-code-example` components
- Added comprehensive examples covering all component features and variations
- Improved user experience with copyable code snippets
- Enhanced documentation with practical, copy-paste ready examples
- Added automated testing for all 8 code example components

## [1.18.1] - 2024-12-19

### Fixed
- **dt-code-example component**: Fixed double HTML entity encoding issue
  - Content is now properly encoded only once instead of twice
  - Copy functionality now preserves correct HTML formatting
  - Improved `escapeHtml()` method to detect already-encoded content

### Technical Details
- Modified `escapeHtml()` method to check for existing HTML entities before encoding
- Updated HTML content in `index.html` to use proper HTML tags instead of entities
- Added encoding verification test to prevent regression

## [1.18.0] - 2024-12-19

### Added
- **New `dt-code-example` Web Component**: Interactive code display component with copy functionality
  - Supports syntax highlighting with language specification
  - Copy-to-clipboard functionality with visual feedback
  - Customizable title and styling
  - Dark theme support
  - Responsive design with proper overflow handling

### Changed
- **index.html**: Replaced static HTML code blocks with interactive `dt-code-example` component
  - Alert examples now use the new component for better user experience
  - Added copy functionality for code snippets
  - Improved code presentation with syntax highlighting

### Technical Details
- Created `src/js/code-example-component.js` with full Web Component implementation
- Added proper event handling for copy functionality
- Implemented fallback clipboard API for older browsers
- Added comprehensive styling with CSS custom properties for theming
- Component supports attributes: `language`, `title`, `copyable`

## [1.17.0] - 2024-12-19

### Changed
- Project cleanup and reorganization
- Moved all screenshot files (PNG) to `test/screenshots/` directory
- Moved documentation files to `docs/` directory:
  - `DARK_THEME.md` → `docs/DARK_THEME.md`
  - `DOCUMENTATION.md` → `docs/DOCUMENTATION.md`
  - `ICONS.md` → `docs/ICONS.md`
  - `TOOLTIPS.md` → `docs/TOOLTIPS.md`
- Cleaned up root directory structure for better organization
- Improved project maintainability and file organization

## [1.16.0] - 2024-12-19

### Fixed
- Fixed dt-button outline variant colors in Shadow DOM
- Replaced CSS variables with hardcoded hex values for outline buttons
- Added complete outline variant support: outline-primary, outline-secondary, outline-success, outline-danger, outline-warning, outline-info, outline-light, outline-dark
- Outline buttons now display with proper colors and transparent backgrounds
- Fixed hover effects for all outline button variants

### Added
- Complete outline variant support for dt-button component
- Proper color mapping for all outline button variants in Shadow DOM
- Enhanced CSS organization for better style inheritance

## [1.15.0] - 2024-12-19

### Fixed
- Fixed outline variant colors in dt-theme-toggle component
- Added support for all outline variants: outline-primary, outline-secondary, outline-success, outline-danger, outline-warning, outline-info
- Corrected CSS specificity issues with outline button styles
- Outline buttons now display with proper colors and transparent backgrounds
- Fixed hover effects for all outline variants

### Added
- Complete outline variant support for dt-theme-toggle component
- Proper color mapping for all outline button variants
- Enhanced CSS organization for better style inheritance

## [1.14.0] - 2024-12-19

### Added
- Created dt-theme-toggle web component for self-contained theme switching
- Complete Shadow DOM implementation with encapsulated styling
- Support for multiple variants (link, primary, secondary, outline)
- Support for different sizes (sm, md, lg)
- Automatic icon switching (moon/sun) based on current theme
- localStorage persistence for theme preference
- System theme detection and automatic adaptation
- Custom event dispatching for theme changes
- Public API methods (getCurrentTheme, setTheme, getThemeKey, setThemeKey)

### Changed
- Replaced dt-button + theme-toggle.js with dt-theme-toggle component
- Theme toggle now uses Shadow DOM for better encapsulation
- Improved accessibility with proper ARIA attributes
- Enhanced visual feedback with hover animations and icon rotation

### Fixed
- Better theme persistence across page reloads
- Improved system theme detection
- More reliable theme switching mechanism

## [1.13.0] - 2024-12-19

### Changed
- Renamed demo.html to index.html for better web server compatibility
- Main demo page is now accessible at the root URL

## [1.12.0] - 2024-12-19

### Fixed
- Fixed Shadow DOM issue preventing dark theme styles from applying to dt-card components
- Replaced CSS variables with hardcoded colors in Shadow DOM for dark theme support
- Cards now properly display with dark background (#161b22) instead of black (#000000) in dark mode
- Used `:host-context([data-theme="dark"])` selector for proper Shadow DOM theme detection
- Card headers and footers now use correct dark colors (#21262d)
- Card text colors now properly adapt to dark theme

## [1.11.0] - 2024-12-19

### Fixed
- Fixed dark theme background colors for cards
- Added missing `--bg-primary`, `--bg-secondary`, `--bg-tertiary` variables to dark theme
- Added missing `--text-primary`, `--text-secondary`, `--text-tertiary` variables to dark theme
- Cards now properly use dark background colors in dark mode
- Both `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` now have consistent background variables

## [1.10.0] - 2024-12-19

### Added
- Added `bordered` and `background` attributes to dt-box for flexible styling
- Enhanced dt-button to support inheritance from dt-box architecture
- Added `setBordered()` and `setBackground()` methods to dt-button
- Support for buttons without borders or backgrounds (perfect for link buttons)

### Changed
- dt-box now supports `bordered="false"` to remove borders
- dt-box now supports `background="false"` to remove backgrounds
- dt-button inherits dt-box styling architecture
- All box content elements now have transparent backgrounds by default

### Fixed
- Fixed black backgrounds in dt-box content (.box-content, .box-title, .box-body)
- Fixed black backgrounds in dt-button text and icons
- Proper transparent backgrounds throughout all components
- Link buttons now work perfectly with transparent backgrounds

## [1.9.0] - 2024-12-19

### Added
- Created dt-form web component for consistent form styling
- Complete transformation of demo.html to use only web components
- Replaced all HTML buttons with dt-button components
- Replaced all HTML forms with dt-form components
- Fixed card background issues (transparent backgrounds)

### Changed
- Demo now uses 42 dt-button components (including theme toggle)
- Demo now uses 2 dt-form components
- All HTML custom elements eliminated from demo
- Card components now have proper transparent backgrounds
- Theme toggle button now uses dt-button component

### Fixed
- Card text and body backgrounds are now transparent
- No more black backgrounds in card components
- Complete component-based architecture throughout demo
- Consistent styling across all components

## [1.8.0] - 2024-12-19

### Added
- Created dt-card web component for consistent card layouts
- Created dt-button web component with icon support
- Transformed demo.html to use web components throughout
- Replaced all HTML alerts with dt-alert components
- Replaced all HTML cards with dt-card components
- Replaced icon buttons with dt-button components

### Changed
- Demo now uses 17 dt-alert components (all dismissible by default)
- Demo now uses 6 dt-card components with consistent styling
- Demo now uses 9 dt-button components with icon support
- All components maintain consistent margins and spacing
- Improved code examples to reflect new component usage

### Fixed
- Consistent icon sizes across all components
- Regular margins and padding throughout the demo
- All alerts are now dismissible by default
- Better accessibility with proper ARIA attributes

## [1.7.0] - 2024-12-19

### Added
- Initial project setup
- Package.json configuration
- Build system setup with Vite
- Basic project structure
- CSS architecture with variables and mixins
- Responsive grid system (12 columns)
- Core UI components:
  - Buttons (primary, secondary, success, danger, warning, info, light, dark)
  - Forms (inputs, selects, checkboxes, radios, validation)
  - Cards (basic, header, footer, variants)
  - Navigation (navbar, nav, breadcrumb, pagination)
  - Alerts (all variants with dismissible option)
  - Badges (all variants with pill option)
  - Modals (responsive with backdrop)
- Utility classes:
  - Spacing (margin, padding)
  - Colors (background, text)
  - Display (flexbox, visibility)
  - Typography (alignment, weight, size)
- Demo HTML page with examples
- Working build system producing optimized CSS
- Dark theme support with automatic system detection
- Theme toggle functionality with localStorage persistence
- Theme-aware components and utilities
- Smooth transitions between light and dark modes
- SVG icon system with 100+ basic icons
- Icon utility classes (sizes, colors, animations)
- Icon buttons and icon-text components
- Less flashy button colors in dark theme
- Modern web component `<dt-icon>` for simplified icon management
- Icon registry with programmatic access
- JavaScript API for dynamic icon creation
- Theme toggle button now uses `<dt-icon>` component (moon/sun icons)
- Added comprehensive `.gitignore` file for proper version control
- Added complete Alerts demo section with web component integration
- Improved alert layout with proper icon alignment and spacing
- Fixed alert icon margins and padding integration for consistent spacing
- Perfect vertical and horizontal alignment achieved using Playwright testing
- Applied specific margin approach for alert icons (1rem 0.5rem 1rem 1rem)
- Added animated tooltip web component with multiple themes and positions
- Fixed tooltip arrows to display as proper triangles instead of rectangles
- Corrected tooltip arrow CSS technique for true triangular shapes
- Added btn-link button variant with underline hover effect and same padding
- Modified alert alignment and content padding for better spacing control
- Created dt-box base web component for alerts, toasts and notifications
- Added dt-alert component derived from dt-box with automatic icons
- Added dt-toast component with auto-dismiss and positioning features

### Changed

### Deprecated

### Removed

### Fixed

### Security
