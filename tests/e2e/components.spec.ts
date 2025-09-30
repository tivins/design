// E2E tests for Design Toolkit Components
import { test, expect } from '@playwright/test';

test.describe('Design Toolkit E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Ensure we start with light theme
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
    });
    await page.reload();
  });

  test.describe('Theme Toggle Functionality', () => {
    test('should toggle between light and dark themes', async ({ page }) => {
      // Find theme toggle button
      const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle, button[aria-label*="theme"]').first();
      
      // Verify initial state (light theme)
      await expect(page.locator('html')).toHaveClass(/theme-light/);
      
      // Click theme toggle
      await themeToggle.click();
      
      // Wait for theme change
      await page.waitForTimeout(500);
      
      // Verify dark theme is applied
      await expect(page.locator('html')).toHaveClass(/theme-dark/);
      
      // Click again to toggle back
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      // Verify light theme is restored
      await expect(page.locator('html')).toHaveClass(/theme-light/);
    });

    test('should persist theme selection in localStorage', async ({ page }) => {
      const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle, button[aria-label*="theme"]').first();
      
      // Toggle to dark theme
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      // Check localStorage
      const theme = await page.evaluate(() => localStorage.getItem('theme'));
      expect(theme).toBe('dark');
      
      // Reload page
      await page.reload();
      
      // Verify theme persists
      await expect(page.locator('html')).toHaveClass(/theme-dark/);
    });
  });

  test.describe('Button Components', () => {
    test('should render buttons with correct styles', async ({ page }) => {
      // Check for various button types
      const primaryButton = page.locator('.btn-primary').first();
      const secondaryButton = page.locator('.btn-secondary').first();
      
      if (await primaryButton.count() > 0) {
        await expect(primaryButton).toBeVisible();
        await expect(primaryButton).toHaveClass(/btn/);
      }
      
      if (await secondaryButton.count() > 0) {
        await expect(secondaryButton).toBeVisible();
        await expect(secondaryButton).toHaveClass(/btn/);
      }
    });

    test('should handle button clicks', async ({ page }) => {
      const button = page.locator('button').first();
      
      if (await button.count() > 0) {
        // Test click functionality
        await button.click();
        
        // Verify button is still visible after click
        await expect(button).toBeVisible();
      }
    });

    test('should have proper accessibility attributes', async ({ page }) => {
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        
        // Check for accessibility attributes
        const ariaLabel = await button.getAttribute('aria-label');
        const role = await button.getAttribute('role');
        
        // At least one accessibility attribute should be present
        expect(ariaLabel || role || await button.textContent()).toBeTruthy();
      }
    });
  });

  test.describe('Modal Components', () => {
    test('should open and close modal', async ({ page }) => {
      // Look for modal trigger buttons
      const modalTrigger = page.locator('[data-modal-target], [data-bs-toggle="modal"], .modal-trigger').first();
      
      if (await modalTrigger.count() > 0) {
        // Open modal
        await modalTrigger.click();
        
        // Wait for modal to appear
        const modal = page.locator('.modal, [role="dialog"]').first();
        await expect(modal).toBeVisible();
        
        // Look for close button
        const closeButton = page.locator('.modal-close, [data-dismiss="modal"], .close').first();
        
        if (await closeButton.count() > 0) {
          await closeButton.click();
          await expect(modal).not.toBeVisible();
        } else {
          // Try clicking outside modal
          await page.click('body', { position: { x: 10, y: 10 } });
          await expect(modal).not.toBeVisible();
        }
      }
    });

    test('should trap focus within modal', async ({ page }) => {
      const modalTrigger = page.locator('[data-modal-target], [data-bs-toggle="modal"], .modal-trigger').first();
      
      if (await modalTrigger.count() > 0) {
        await modalTrigger.click();
        
        const modal = page.locator('.modal, [role="dialog"]').first();
        await expect(modal).toBeVisible();
        
        // Test tab navigation within modal
        await page.keyboard.press('Tab');
        
        // Verify focus is within modal
        const focusedElement = page.locator(':focus');
        const isInModal = await focusedElement.evaluate((el, modalEl) => {
          return modalEl.contains(el);
        }, await modal.elementHandle());
        
        expect(isInModal).toBe(true);
      }
    });
  });

  test.describe('Form Components', () => {
    test('should handle form input interactions', async ({ page }) => {
      const inputs = page.locator('input[type="text"], input[type="email"], textarea');
      
      if (await inputs.count() > 0) {
        const firstInput = inputs.first();
        
        // Test input interaction
        await firstInput.click();
        await firstInput.fill('Test input');
        
        const value = await firstInput.inputValue();
        expect(value).toBe('Test input');
      }
    });

    test('should validate form inputs', async ({ page }) => {
      const form = page.locator('form').first();
      
      if (await form.count() > 0) {
        // Try to submit empty form
        const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();
        
        if (await submitButton.count() > 0) {
          await submitButton.click();
          
          // Check for validation messages
          const validationMessages = page.locator('.invalid-feedback, .error-message, [role="alert"]');
          
          if (await validationMessages.count() > 0) {
            await expect(validationMessages.first()).toBeVisible();
          }
        }
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Verify page loads correctly on mobile
      await expect(page.locator('body')).toBeVisible();
      
      // Check for mobile-specific elements or behaviors
      const mobileMenu = page.locator('.mobile-menu, .navbar-toggler').first();
      
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      await expect(page.locator('body')).toBeVisible();
      
      // Test tablet-specific layouts
      const grid = page.locator('.grid, .row').first();
      if (await grid.count() > 0) {
        await expect(grid).toBeVisible();
      }
    });
  });

  test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have no console errors', async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Filter out common non-critical errors
      const criticalErrors = errors.filter(error => 
        !error.includes('ResizeObserver') && 
        !error.includes('Non-passive event listener')
      );
      
      expect(criticalErrors).toHaveLength(0);
    });
  });
});
