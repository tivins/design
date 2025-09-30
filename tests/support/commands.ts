// Cypress commands file
/// <reference types="cypress" />

// Custom commands for common test operations
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Login with test credentials
       */
      login(): Chainable<void>;
      
      /**
       * Logout user
       */
      logout(): Chainable<void>;
      
      /**
       * Clear all test data
       */
      clearTestData(): Chainable<void>;
      
      /**
       * Wait for page to be fully loaded
       */
      waitForPageLoad(): Chainable<void>;
      
      /**
       * Test responsive design
       * @param viewport - Viewport size
       */
      testResponsive(viewport: 'mobile' | 'tablet' | 'desktop'): Chainable<void>;
    }
  }
}

// Command implementations
Cypress.Commands.add('login', () => {
  // Mock login for testing
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('user');
  });
});

Cypress.Commands.add('clearTestData', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.get('[data-testid="loading"]').should('not.exist');
});

Cypress.Commands.add('testResponsive', (viewport: 'mobile' | 'tablet' | 'desktop') => {
  const viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 }
  };
  
  cy.viewport(viewports[viewport].width, viewports[viewport].height);
});
