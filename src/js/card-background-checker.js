// Card and Modal Background Verification System
// Automatically checks if card and modal bodies have proper background colors in both themes

class CardBackgroundChecker {
  constructor() {
    this.checks = [];
    this.isInitialized = false;
  }

  // Initialize the checker
  init() {
    if (this.isInitialized) return;
    
    // Check on page load
    this.checkAllComponents();
    
    // Check when theme changes
    this.observeThemeChanges();
    
    // Check when new components are added
    this.observeComponentChanges();
    
    this.isInitialized = true;
    console.log('Card and Modal Background Checker initialized');
  }

  // Check all cards and modals on the page
  checkAllComponents() {
    const cards = document.querySelectorAll('dt-card');
    const modals = document.querySelectorAll('dt-modal');
    const results = {
      totalCards: cards.length,
      totalModals: modals.length,
      darkMode: this.getCurrentTheme() === 'dark',
      cardIssues: [],
      modalIssues: []
    };

    // Check cards
    cards.forEach((card, index) => {
      const check = this.checkSingleCard(card, index);
      if (!check.isValid) {
        results.cardIssues.push(check);
      }
    });

    // Check modals
    modals.forEach((modal, index) => {
      const check = this.checkSingleModal(modal, index);
      if (!check.isValid) {
        results.modalIssues.push(check);
      }
    });

    this.checks.push({
      timestamp: new Date().toISOString(),
      theme: results.darkMode ? 'dark' : 'light',
      results
    });

    this.logResults(results);
    return results;
  }

  // Check a single modal
  checkSingleModal(modal, index) {
    const modalBody = modal.shadowRoot?.querySelector('.modal-body');
    if (!modalBody) {
      return {
        componentType: 'modal',
        componentIndex: index,
        isValid: false,
        issue: 'Modal body not found in shadow DOM',
        backgroundColor: 'unknown'
      };
    }

    const computedStyle = window.getComputedStyle(modalBody);
    const backgroundColor = computedStyle.backgroundColor;
    const isDarkMode = this.getCurrentTheme() === 'dark';
    
    // Background should not be transparent in any mode
    const isValid = backgroundColor !== 'rgba(0, 0, 0, 0)';

    return {
      componentType: 'modal',
      componentIndex: index,
      isValid,
      issue: isValid ? null : 'Component body has transparent background',
      backgroundColor,
      theme: isDarkMode ? 'dark' : 'light'
    };
  }

  // Check a single card
  checkSingleCard(card, index) {
    const cardBody = card.shadowRoot?.querySelector('.card-body');
    if (!cardBody) {
      return {
        componentType: 'card',
        componentIndex: index,
        isValid: false,
        issue: 'Card body not found in shadow DOM',
        backgroundColor: 'unknown'
      };
    }

    const computedStyle = window.getComputedStyle(cardBody);
    const backgroundColor = computedStyle.backgroundColor;
    const isDarkMode = this.getCurrentTheme() === 'dark';
    
    // Background should not be transparent in any mode
    const isValid = backgroundColor !== 'rgba(0, 0, 0, 0)';

    return {
      componentType: 'card',
      componentIndex: index,
      isValid,
      issue: isValid ? null : 'Component body has transparent background',
      backgroundColor,
      theme: isDarkMode ? 'dark' : 'light'
    };
  }

  // Get current theme
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  // Observe theme changes
  observeThemeChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTimeout(() => this.checkAllComponents(), 100); // Small delay for theme transition
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Observe when new components are added
  observeComponentChanges() {
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'DT-CARD' || node.tagName === 'DT-MODAL' || 
                node.querySelector?.('dt-card') || node.querySelector?.('dt-modal')) {
              shouldCheck = true;
            }
          }
        });
      });

      if (shouldCheck) {
        setTimeout(() => this.checkAllComponents(), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Log results
  logResults(results) {
    const { totalCards, totalModals, cardIssues, modalIssues, darkMode } = results;
    const theme = darkMode ? 'dark' : 'light';
    const totalIssues = cardIssues.length + modalIssues.length;
    const totalComponents = totalCards + totalModals;
    
    if (totalIssues === 0) {
      console.log(`✅ Background Check (${theme} mode): All ${totalCards} cards and ${totalModals} modals have proper backgrounds`);
    } else {
      console.warn(`⚠️ Background Check (${theme} mode): ${totalIssues}/${totalComponents} components have issues:`);
      if (cardIssues.length > 0) {
        console.warn(`  Cards: ${cardIssues.length}/${totalCards}`, cardIssues);
      }
      if (modalIssues.length > 0) {
        console.warn(`  Modals: ${modalIssues.length}/${totalModals}`, modalIssues);
      }
    }
  }

  // Get all check results
  getCheckHistory() {
    return this.checks;
  }

  // Get latest check results
  getLatestCheck() {
    return this.checks[this.checks.length - 1];
  }

  // Manual check trigger
  manualCheck() {
    return this.checkAllComponents();
  }

  // Export results for testing
  exportResults() {
    return {
      checker: 'CardAndModalBackgroundChecker',
      version: '2.0.0',
      checks: this.checks,
      summary: {
        totalChecks: this.checks.length,
        totalCardsChecked: this.checks.reduce((sum, check) => sum + check.results.totalCards, 0),
        totalModalsChecked: this.checks.reduce((sum, check) => sum + check.results.totalModals, 0),
        totalCardIssues: this.checks.reduce((sum, check) => sum + check.results.cardIssues.length, 0),
        totalModalIssues: this.checks.reduce((sum, check) => sum + check.results.modalIssues.length, 0)
      }
    };
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cardBackgroundChecker = new CardBackgroundChecker();
    window.cardBackgroundChecker.init();
  });
} else {
  window.cardBackgroundChecker = new CardBackgroundChecker();
  window.cardBackgroundChecker.init();
}

// Export for manual use
window.CardBackgroundChecker = CardBackgroundChecker;
