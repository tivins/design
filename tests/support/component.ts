// Cypress component support file
import './commands';

// Component testing specific configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Custom commands for component testing
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount a component with props
       * @param component - Component to mount
       * @param props - Component props
       */
      mountComponent(component: any, props?: any): Chainable<void>;
      
      /**
       * Test component accessibility
       * @param selector - CSS selector for the component
       */
      testAccessibility(selector: string): Chainable<void>;
    }
  }
}

// Component testing commands
Cypress.Commands.add('mountComponent', (component: any, props: any = {}) => {
  // This would be implemented based on your component framework
  // For now, we'll use a placeholder
  cy.get('body').then(() => {
    // Component mounting logic would go here
  });
});

Cypress.Commands.add('testAccessibility', (selector: string) => {
  cy.get(selector).should('be.visible');
  cy.get(selector).should('have.attr', 'role');
  cy.get(selector).should('have.attr', 'aria-label');
});
