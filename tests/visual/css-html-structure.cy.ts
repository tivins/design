// CSS and HTML structure tests
describe('CSS and HTML Structure Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('CSS Framework Tests', () => {
    it('should load all required CSS files', () => {
      // Check if main CSS file is loaded
      cy.get('link[rel="stylesheet"]').should('exist');
      
      // Check for CSS custom properties
      cy.window().then((win) => {
        const rootStyles = win.getComputedStyle(win.document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--primary-color');
        expect(primaryColor).to.not.be.empty;
      });
    });

    it('should have proper CSS custom properties', () => {
      cy.window().then((win) => {
        const rootStyles = win.getComputedStyle(win.document.documentElement);
        
        // Check for essential CSS variables
        const cssVars = [
          '--primary-color',
          '--secondary-color',
          '--background-color',
          '--text-color',
          '--border-radius',
          '--spacing-unit'
        ];
        
        cssVars.forEach(cssVar => {
          const value = rootStyles.getPropertyValue(cssVar);
          expect(value).to.not.be.empty;
        });
      });
    });

    it('should apply CSS classes correctly', () => {
      // Test utility classes
      cy.get('.btn').should('exist');
      cy.get('.card').should('exist');
      cy.get('.container').should('exist');
      
      // Test responsive classes
      cy.get('[class*="col-"]').should('exist');
      cy.get('[class*="d-"]').should('exist');
    });
  });

  describe('HTML Structure Tests', () => {
    it('should have proper HTML5 semantic structure', () => {
      // Check for semantic HTML elements
      cy.get('header').should('exist');
      cy.get('main').should('exist');
      cy.get('footer').should('exist');
      
      // Check for proper heading hierarchy
      cy.get('h1').should('exist');
    });

    it('should have proper meta tags', () => {
      // Check for essential meta tags
      cy.get('meta[charset]').should('exist');
      cy.get('meta[name="viewport"]').should('exist');
      cy.get('title').should('not.be.empty');
    });

    it('should have proper ARIA attributes', () => {
      // Check for ARIA landmarks
      cy.get('[role="banner"]').should('exist');
      cy.get('[role="main"]').should('exist');
      cy.get('[role="contentinfo"]').should('exist');
    });
  });

  describe('Component Structure Tests', () => {
    it('should render button components with correct structure', () => {
      cy.get('.btn').first().then($btn => {
        if ($btn.length > 0) {
          // Check button structure
          cy.wrap($btn).should('have.attr', 'type');
          cy.wrap($btn).should('be.visible');
          
          // Check for proper classes
          cy.wrap($btn).should('have.class', 'btn');
        }
      });
    });

    it('should render form components with correct structure', () => {
      cy.get('form').first().then($form => {
        if ($form.length > 0) {
          // Check form structure
          cy.wrap($form).should('exist');
          
          // Check for form inputs
          cy.wrap($form).find('input, textarea, select').should('exist');
        }
      });
    });

    it('should render card components with correct structure', () => {
      cy.get('.card').first().then($card => {
        if ($card.length > 0) {
          // Check card structure
          cy.wrap($card).should('have.class', 'card');
          cy.wrap($card).should('be.visible');
          
          // Check for card header/body/footer
          cy.wrap($card).find('.card-header, .card-body, .card-footer').should('exist');
        }
      });
    });
  });

  describe('Responsive Structure Tests', () => {
    it('should have responsive meta tag', () => {
      cy.get('meta[name="viewport"]').should('have.attr', 'content').and('include', 'width=device-width');
    });

    it('should adapt structure for mobile', () => {
      cy.testResponsive('mobile');
      
      // Check for mobile-specific elements
      cy.get('.mobile-menu, .navbar-toggler').should('exist');
      
      // Check for responsive classes
      cy.get('[class*="d-md-none"]').should('exist');
    });

    it('should adapt structure for tablet', () => {
      cy.testResponsive('tablet');
      
      // Check for tablet-specific layouts
      cy.get('.grid, .row').should('exist');
    });

    it('should adapt structure for desktop', () => {
      cy.testResponsive('desktop');
      
      // Check for desktop-specific elements
      cy.get('.sidebar, .desktop-menu').should('exist');
    });
  });

  describe('Accessibility Structure Tests', () => {
    it('should have proper heading hierarchy', () => {
      // Check that h1 exists and is unique
      cy.get('h1').should('have.length', 1);
      
      // Check heading order
      cy.get('h1, h2, h3, h4, h5, h6').each(($heading, index) => {
        if (index > 0) {
          const currentLevel = parseInt($heading.prop('tagName').substring(1));
          const prevLevel = parseInt(cy.get('h1, h2, h3, h4, h5, h6').eq(index - 1).prop('tagName').substring(1));
          expect(currentLevel).to.be.at.most(prevLevel + 1);
        }
      });
    });

    it('should have proper form labels', () => {
      cy.get('input, textarea, select').each($input => {
        const id = $input.attr('id');
        const ariaLabel = $input.attr('aria-label');
        const ariaLabelledBy = $input.attr('aria-labelledby');
        
        // At least one labeling method should be present
        expect(id || ariaLabel || ariaLabelledBy).to.not.be.undefined;
      });
    });

    it('should have proper alt text for images', () => {
      cy.get('img').each($img => {
        const alt = $img.attr('alt');
        expect(alt).to.not.be.undefined;
      });
    });
  });

  describe('Performance Structure Tests', () => {
    it('should load without critical errors', () => {
      // Check for console errors
      cy.window().then((win) => {
        const errors = [];
        win.addEventListener('error', (e) => {
          errors.push(e.message);
        });
        
        // Wait a bit for any errors to occur
        cy.wait(1000).then(() => {
          expect(errors).to.have.length(0);
        });
      });
    });

    it('should have optimized images', () => {
      cy.get('img').each($img => {
        const src = $img.attr('src');
        if (src) {
          // Check for modern image formats or proper sizing
          expect(src).to.match(/\.(jpg|jpeg|png|webp|svg)$/i);
        }
      });
    });
  });
});
