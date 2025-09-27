# Design Toolkit Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
