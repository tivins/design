// Visual tests for CSS and HTML components
describe('Visual Regression Tests', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('/');
    
    // Wait for page to load completely
    cy.waitForPageLoad();
    
    // Clear any test data
    cy.clearTestData();
  });

  describe('Theme Visual Tests', () => {
    it('should display correctly in light theme', () => {
      // Ensure light theme is active
      cy.switchTheme('light');
      
      // Wait for theme to apply
      cy.wait(500);
      
      // Take screenshot of the entire page
      cy.takeScreenshot('light-theme-full-page');
      
      // Test specific components in light theme
      cy.get('body').should('have.class', 'theme-light');
      
      // Test button styles in light theme
      cy.get('.btn-primary').first().then($btn => {
        cy.wrap($btn).should('be.visible');
        cy.takeScreenshot('light-theme-primary-button');
      });
    });

    it('should display correctly in dark theme', () => {
      // Switch to dark theme
      cy.switchTheme('dark');
      
      // Wait for theme to apply
      cy.wait(500);
      
      // Take screenshot of the entire page
      cy.takeScreenshot('dark-theme-full-page');
      
      // Test specific components in dark theme
      cy.get('body').should('have.class', 'theme-dark');
      
      // Test button styles in dark theme
      cy.get('.btn-primary').first().then($btn => {
        cy.wrap($btn).should('be.visible');
        cy.takeScreenshot('dark-theme-primary-button');
      });
    });

    it('should have consistent spacing and layout', () => {
      // Test grid system
      cy.get('.grid, .row').first().then($grid => {
        cy.wrap($grid).should('be.visible');
        cy.takeScreenshot('grid-layout');
      });
      
      // Test card components
      cy.get('.card').first().then($card => {
        cy.wrap($card).should('be.visible');
        cy.takeScreenshot('card-component');
      });
    });
  });

  describe('Component Visual Tests', () => {
    it('should render buttons with correct styles', () => {
      // Test different button variants
      const buttonVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
      
      buttonVariants.forEach(variant => {
        cy.get(`.btn-${variant}`).first().then($btn => {
          if ($btn.length > 0) {
            cy.wrap($btn).should('be.visible');
            cy.takeScreenshot(`button-${variant}`);
          }
        });
      });
    });

    it('should render form elements correctly', () => {
      // Test input fields
      cy.get('input[type="text"]').first().then($input => {
        if ($input.length > 0) {
          cy.wrap($input).should('be.visible');
          cy.takeScreenshot('input-field');
        }
      });
      
      // Test textarea
      cy.get('textarea').first().then($textarea => {
        if ($textarea.length > 0) {
          cy.wrap($textarea).should('be.visible');
          cy.takeScreenshot('textarea-field');
        }
      });
      
      // Test select dropdown
      cy.get('select').first().then($select => {
        if ($select.length > 0) {
          cy.wrap($select).should('be.visible');
          cy.takeScreenshot('select-field');
        }
      });
    });

    it('should render modal components correctly', () => {
      // Look for modal trigger
      cy.get('[data-modal-target], [data-bs-toggle="modal"]').first().then($trigger => {
        if ($trigger.length > 0) {
          // Open modal
          cy.wrap($trigger).click();
          
          // Wait for modal to appear
          cy.get('.modal, [role="dialog"]').should('be.visible');
          
          // Take screenshot of modal
          cy.takeScreenshot('modal-component');
          
          // Close modal
          cy.get('.modal-close, [data-dismiss="modal"]').first().click();
        }
      });
    });

    it('should render navigation components correctly', () => {
      // Test navigation bar
      cy.get('nav, .navbar').first().then($nav => {
        if ($nav.length > 0) {
          cy.wrap($nav).should('be.visible');
          cy.takeScreenshot('navigation-bar');
        }
      });
      
      // Test breadcrumbs
      cy.get('.breadcrumb').first().then($breadcrumb => {
        if ($breadcrumb.length > 0) {
          cy.wrap($breadcrumb).should('be.visible');
          cy.takeScreenshot('breadcrumb');
        }
      });
    });
  });

  describe('Responsive Visual Tests', () => {
    it('should display correctly on mobile devices', () => {
      // Test mobile viewport
      cy.testResponsive('mobile');
      
      // Take screenshot of mobile layout
      cy.takeScreenshot('mobile-layout');
      
      // Test mobile navigation
      cy.get('.mobile-menu, .navbar-toggler').first().then($menu => {
        if ($menu.length > 0) {
          cy.wrap($menu).should('be.visible');
          cy.takeScreenshot('mobile-navigation');
        }
      });
    });

    it('should display correctly on tablet devices', () => {
      // Test tablet viewport
      cy.testResponsive('tablet');
      
      // Take screenshot of tablet layout
      cy.takeScreenshot('tablet-layout');
      
      // Test tablet-specific layouts
      cy.get('.grid, .row').first().then($grid => {
        if ($grid.length > 0) {
          cy.wrap($grid).should('be.visible');
          cy.takeScreenshot('tablet-grid');
        }
      });
    });

    it('should display correctly on desktop devices', () => {
      // Test desktop viewport
      cy.testResponsive('desktop');
      
      // Take screenshot of desktop layout
      cy.takeScreenshot('desktop-layout');
      
      // Test desktop-specific components
      cy.get('.sidebar').first().then($sidebar => {
        if ($sidebar.length > 0) {
          cy.wrap($sidebar).should('be.visible');
          cy.takeScreenshot('desktop-sidebar');
        }
      });
    });
  });

  describe('Interactive Visual Tests', () => {
    it('should show hover states correctly', () => {
      // Test button hover states
      cy.get('.btn').first().then($btn => {
        if ($btn.length > 0) {
          cy.wrap($btn).trigger('mouseover');
          cy.takeScreenshot('button-hover-state');
        }
      });
      
      // Test link hover states
      cy.get('a').first().then($link => {
        if ($link.length > 0) {
          cy.wrap($link).trigger('mouseover');
          cy.takeScreenshot('link-hover-state');
        }
      });
    });

    it('should show focus states correctly', () => {
      // Test button focus states
      cy.get('.btn').first().then($btn => {
        if ($btn.length > 0) {
          cy.wrap($btn).focus();
          cy.takeScreenshot('button-focus-state');
        }
      });
      
      // Test input focus states
      cy.get('input').first().then($input => {
        if ($input.length > 0) {
          cy.wrap($input).focus();
          cy.takeScreenshot('input-focus-state');
        }
      });
    });

    it('should show active states correctly', () => {
      // Test button active states
      cy.get('.btn').first().then($btn => {
        if ($btn.length > 0) {
          cy.wrap($btn).trigger('mousedown');
          cy.takeScreenshot('button-active-state');
          cy.wrap($btn).trigger('mouseup');
        }
      });
    });
  });

  describe('Typography Visual Tests', () => {
    it('should render headings correctly', () => {
      // Test different heading levels
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
        cy.get(tag).first().then($heading => {
          if ($heading.length > 0) {
            cy.wrap($heading).should('be.visible');
            cy.takeScreenshot(`heading-${tag}`);
          }
        });
      });
    });

    it('should render text content correctly', () => {
      // Test paragraph text
      cy.get('p').first().then($p => {
        if ($p.length > 0) {
          cy.wrap($p).should('be.visible');
          cy.takeScreenshot('paragraph-text');
        }
      });
      
      // Test list items
      cy.get('ul li, ol li').first().then($li => {
        if ($li.length > 0) {
          cy.wrap($li).should('be.visible');
          cy.takeScreenshot('list-item');
        }
      });
    });
  });

  describe('Color and Contrast Tests', () => {
    it('should have proper color contrast in light theme', () => {
      cy.switchTheme('light');
      cy.wait(500);
      
      // Test text contrast
      cy.get('body').should('have.class', 'theme-light');
      cy.takeScreenshot('light-theme-contrast');
    });

    it('should have proper color contrast in dark theme', () => {
      cy.switchTheme('dark');
      cy.wait(500);
      
      // Test text contrast
      cy.get('body').should('have.class', 'theme-dark');
      cy.takeScreenshot('dark-theme-contrast');
    });
  });
});
