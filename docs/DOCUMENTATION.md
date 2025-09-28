# Design Toolkit - Documentation

## Overview

The Design Toolkit is a modern and lightweight CSS framework, inspired by Bootstrap, built with the latest web technologies. It offers a mobile-first approach with reusable components and a consistent design system.

## Main Features

### 🎨 **Modern Architecture**
- Customizable CSS variables
- Modular SCSS architecture
- Optimized build system with Vite
- Automatic vendor prefix support

### 📱 **Responsive Design**
- Mobile-first approach
- Flexible grid system (12 columns)
- Configurable breakpoints
- Adaptive components

### 🧩 **Complete Components**
- **Buttons**: 8 variants + outline + sizes
- **Forms**: Inputs, selects, checkboxes, radios, validation
- **Cards**: Header, body, footer, colored variants
- **Navigation**: Navbar, nav, breadcrumb, pagination
- **Alerts**: All variants with dismissible option
- **Badges**: Colored variants + pill
- **Modals**: Responsive with backdrop

### 🛠️ **Utilities**
- **Spacing**: Responsive margin/padding
- **Colors**: Background/text with complete palette
- **Display**: Flexbox, visibility, positioning
- **Typography**: Alignment, weight, size, decoration

## Project Structure

```
design-toolkit/
├── src/
│   ├── index.scss              # Main entry point
│   └── scss/
│       ├── _variables.scss     # CSS variables and tokens
│       ├── base/               # Base styles
│       │   ├── _reset.scss
│       │   ├── _typography.scss
│       │   └── _utilities.scss
│       ├── layout/             # Layout system
│       │   ├── _grid.scss
│       │   └── _container.scss
│       ├── components/         # UI components
│       │   ├── _buttons.scss
│       │   ├── _forms.scss
│       │   ├── _cards.scss
│       │   ├── _navigation.scss
│       │   ├── _alerts.scss
│       │   ├── _badges.scss
│       │   └── _modals.scss
│       └── utilities/          # Utility classes
│           ├── _spacing.scss
│           ├── _colors.scss
│           ├── _display.scss
│           ├── _flexbox.scss
│           └── _text.scss
├── dist/                       # Compiled files
├── demo.html                   # Demo page
├── package.json
├── vite.config.js
└── .stylelintrc.json
```

## Installation and Usage

### Installation
```bash
npm install
```

### Development
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Build preview
npm run lint         # CSS linting
```

### Usage in a Project
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/css/style.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Title</h5>
                        <p class="card-text">Content</p>
                        <button class="btn btn-primary">Action</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

## Customization

### CSS Variables
The toolkit uses CSS variables for easy customization:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-size-base: 1rem;
  --spacing-md: 1rem;
  --border-radius-md: 0.375rem;
}
```

### Breakpoints
```css
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-2xl: 1400px;
```

## Usage Examples

### Grid System
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
            <!-- Content -->
        </div>
    </div>
</div>
```

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>
<button class="btn btn-success btn-lg">Large Success</button>
```

### Forms
```html
<form>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Cards
```html
<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">
        <h5 class="card-title">Title</h5>
        <p class="card-text">Content</p>
    </div>
    <div class="card-footer">Footer</div>
</div>
```

## Performance

- **Size**: ~67KB (uncompressed), ~10KB (gzip)
- **Compatibility**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Accessibility**: WCAG standards compliance
- **Performance**: Optimized and modular CSS

## Development

### Available Scripts
- `npm run dev`: Vite development server
- `npm run build`: Optimized production build
- `npm run preview`: Production build preview
- `npm run lint`: CSS code verification
- `npm run lint:fix`: Automatic linting fixes

### Code Standards
- Stylelint configured with adapted rules
- Comments in English
- Modular SCSS structure
- CSS variables for consistency

## License

MIT License - See LICENSE file for details.

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request
