# Design Toolkit Testing System

A comprehensive, modern testing system for the Design Toolkit project, built for Windows 11 environment.

## 🏗️ Architecture

This testing system uses a multi-framework approach for complete coverage:

- **Jest** - Unit tests for JavaScript components
- **Playwright** - End-to-end tests (headless browser automation)
- **Cypress** - Visual regression and CSS/HTML structure tests
- **Allure** - Detailed test reporting and analytics

## 📁 Project Structure

```
tests/
├── unit/                    # Jest unit tests
│   ├── button-component.test.js
│   └── theme-toggle.test.js
├── e2e/                     # Playwright E2E tests
│   ├── components.spec.ts
│   └── navigation.spec.ts
├── visual/                  # Cypress visual tests
│   ├── visual-regression.cy.ts
│   └── css-html-structure.cy.ts
├── setup/                   # Test setup files
│   ├── jest.setup.js
│   ├── global-setup.ts
│   └── global-teardown.ts
├── support/                 # Cypress support files
│   ├── e2e.ts
│   ├── component.ts
│   └── commands.ts
├── config/                  # Test configuration
│   └── test-config.ts
├── fixtures/                # Test data and fixtures
├── screenshots/             # Test screenshots
└── videos/                  # Test recordings
```

## 🚀 Quick Start

### Prerequisites

- Windows 11
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install all dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install Cypress (if not already installed)
npx cypress install
```

### Running Tests

```bash
# Run all tests
npm run test:all

# Run specific test types
npm run test              # Unit tests (Jest)
npm run test:e2e          # E2E tests (Playwright)
npm run test:visual       # Visual tests (Cypress)

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run E2E tests with UI
npm run test:e2e:ui

# Run visual tests with Cypress UI
npm run test:visual:open
```

### Generating Reports

```bash
# Generate Allure reports
npm run test:report

# Reports will be available at:
# - allure-report/ (HTML report)
# - test-results/html-report/ (Playwright HTML)
# - test-results/junit-results.xml (JUnit XML)
```

## 🧪 Test Types

### Unit Tests (Jest)

- **Purpose**: Test individual components and functions
- **Location**: `tests/unit/`
- **Framework**: Jest with jsdom environment
- **Coverage**: 80% threshold

**Example:**
```javascript
describe('Button Component', () => {
  it('should create a button with default properties', () => {
    const button = document.createElement('button');
    expect(button).toBeTruthy();
  });
});
```

### E2E Tests (Playwright)

- **Purpose**: Test complete user workflows
- **Location**: `tests/e2e/`
- **Framework**: Playwright with headless browsers
- **Browsers**: Chromium, Firefox, WebKit
- **Features**: Screenshots, videos, traces on failure

**Example:**
```typescript
test('should toggle theme correctly', async ({ page }) => {
  await page.goto('/');
  const themeToggle = page.locator('.theme-toggle');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveClass(/theme-dark/);
});
```

### Visual Tests (Cypress)

- **Purpose**: Visual regression and CSS/HTML structure testing
- **Location**: `tests/visual/`
- **Framework**: Cypress
- **Features**: Screenshot comparison, responsive testing

**Example:**
```typescript
it('should display correctly in light theme', () => {
  cy.switchTheme('light');
  cy.takeScreenshot('light-theme-full-page');
});
```

## 📊 Reporting

### Allure Reports

- **Interactive HTML reports** with detailed test results
- **Test categorization** by type and status
- **Screenshots and videos** attached to failed tests
- **Environment information** and test metadata
- **Trend analysis** and historical data

### JUnit XML

- **CI/CD integration** compatible format
- **Standardized test results** for automated systems
- **Test duration and status** information

### HTML Reports

- **Playwright HTML reports** with test traces
- **Cypress HTML reports** with screenshots
- **Interactive test results** with debugging information

## 🔧 Configuration

### Jest Configuration (`jest.config.js`)

- Test environment: jsdom
- Coverage threshold: 80%
- Test timeout: 10 seconds
- Setup files: `tests/setup/jest.setup.js`

### Playwright Configuration (`playwright.config.ts`)

- Headless execution by default
- Multi-browser support
- Screenshot and video capture on failure
- Global setup/teardown hooks

### Cypress Configuration (`cypress.config.ts`)

- Base URL: `http://localhost:3000`
- Viewport: 1920x1080
- Screenshot on failure
- Custom commands for common operations

## 🎯 Best Practices

### Test Organization

1. **Group related tests** in describe blocks
2. **Use descriptive test names** that explain the expected behavior
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Keep tests independent** and isolated

### Test Data

1. **Use fixtures** for consistent test data
2. **Mock external dependencies** in unit tests
3. **Clean up test data** after each test
4. **Use realistic test scenarios**

### Performance

1. **Run tests in parallel** when possible
2. **Use appropriate timeouts** for different test types
3. **Optimize test execution** by grouping related tests
4. **Monitor test execution time** and optimize slow tests

## 🐛 Debugging

### Unit Tests

```bash
# Run specific test file
npm test -- button-component.test.js

# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### E2E Tests

```bash
# Run tests in headed mode
npm run test:e2e:headed

# Run specific test file
npx playwright test components.spec.ts

# Debug specific test
npx playwright test --debug components.spec.ts
```

### Visual Tests

```bash
# Open Cypress UI
npm run test:visual:open

# Run specific test file
npx cypress run --spec "tests/visual/visual-regression.cy.ts"
```

## 🔄 CI/CD Integration

### GitHub Actions

The system is configured to work with GitHub Actions:

```yaml
- name: Run Tests
  run: |
    npm run test:all
    npm run test:report
```

### Local Development

```bash
# Full CI pipeline locally
npm run ci
```

## 📈 Metrics and Monitoring

### Coverage Reports

- **Line coverage**: Percentage of code lines executed
- **Branch coverage**: Percentage of code branches executed
- **Function coverage**: Percentage of functions executed
- **Statement coverage**: Percentage of statements executed

### Performance Metrics

- **Test execution time**: Total time for test suite
- **Individual test duration**: Time for each test
- **Browser performance**: Page load times and interactions
- **Memory usage**: Resource consumption during tests

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure port 3000 is available
2. **Browser installation**: Run `npx playwright install`
3. **Permission issues**: Run as administrator if needed
4. **Timeout errors**: Increase timeout values in config

### Windows-Specific Considerations

1. **Path separators**: Use forward slashes in config files
2. **PowerShell execution**: May need to set execution policy
3. **Antivirus software**: May interfere with browser automation
4. **Windows Defender**: May block Playwright browser downloads

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress)
- [Allure Documentation](https://docs.qameta.io/allure/)

## 🤝 Contributing

1. **Follow test naming conventions**
2. **Add tests for new features**
3. **Update documentation** when adding new test types
4. **Ensure tests pass** before submitting PRs
5. **Use descriptive commit messages**

---

**Note**: This testing system is optimized for Windows 11 and includes Windows-specific configurations and considerations.
