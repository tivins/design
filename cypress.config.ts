import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Base URL for tests
    baseUrl: 'http://localhost:3000',
    
    // Test directory
    specPattern: 'tests/visual/**/*.cy.{js,ts}',
    
    // Support file
    supportFile: 'tests/support/e2e.ts',
    
    // Fixtures directory
    fixturesFolder: 'tests/fixtures',
    
    // Screenshots directory
    screenshotsFolder: 'tests/screenshots',
    
    // Videos directory
    videosFolder: 'tests/videos',
    
    // Viewport configuration
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Default command timeout
    defaultCommandTimeout: 10000,
    
    // Request timeout
    requestTimeout: 10000,
    
    // Response timeout
    responseTimeout: 10000,
    
    // Page load timeout
    pageLoadTimeout: 30000,
    
    // Video recording
    video: true,
    
    // Screenshot on failure
    screenshotOnRunFailure: true,
    
    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Setup node events
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
  },
  
  component: {
    devServer: {
      framework: 'vite',
      bundler: 'vite',
    },
    specPattern: 'tests/visual/**/*.cy.{js,ts}',
    supportFile: 'tests/support/component.ts',
  },
  
  // Environment variables
  env: {
    // Add custom environment variables here
    THEME_DARK: 'dark',
    THEME_LIGHT: 'light'
  }
});
