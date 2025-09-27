# Design Toolkit Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
