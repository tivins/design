// Cypress E2E support file
import './commands';

// Global configuration for Cypress tests
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions
  // that are not related to our application
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Custom commands for common test operations
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Switch theme between light and dark
       * @param theme - 'light' or 'dark'
       */
      switchTheme(theme: 'light' | 'dark'): Chainable<void>;
      
      /**
       * Wait for component to be ready
       * @param selector - CSS selector for the component
       */
      waitForComponent(selector: string): Chainable<void>;
      
      /**
       * Take screenshot with custom name
       * @param name - Screenshot name
       */
      takeScreenshot(name: string): Chainable<void>;
    }
  }
}

// Custom commands implementation
Cypress.Commands.add('switchTheme', (theme: 'light' | 'dark') => {
  cy.window().then((win) => {
    win.localStorage.setItem('theme', theme);
    cy.reload();
  });
});

Cypress.Commands.add('waitForComponent', (selector: string) => {
  cy.get(selector).should('be.visible');
  cy.get(selector).should('not.have.class', 'loading');
});

Cypress.Commands.add('takeScreenshot', (name: string) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${name}-${timestamp}`);
});
