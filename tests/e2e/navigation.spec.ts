// E2E tests for Navigation and User Interactions
import { test, expect } from '@playwright/test';

test.describe('Navigation and User Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Navigation Menu', () => {
    test('should navigate between sections', async ({ page }) => {
      // Look for navigation links
      const navLinks = page.locator('nav a, .nav-link, .navbar-nav a');
      
      if (await navLinks.count() > 0) {
        const firstLink = navLinks.first();
        const href = await firstLink.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          // Test anchor navigation
          await firstLink.click();
          
          // Wait for scroll to complete
          await page.waitForTimeout(1000);
          
          // Verify URL changed
          const currentUrl = page.url();
          expect(currentUrl).toContain(href);
        }
      }
    });

    test('should highlight active navigation item', async ({ page }) => {
      const navLinks = page.locator('nav a, .nav-link, .navbar-nav a');
      
      if (await navLinks.count() > 0) {
        const firstLink = navLinks.first();
        await firstLink.click();
        
        // Check if link has active class
        const hasActiveClass = await firstLink.evaluate(el => 
          el.classList.contains('active') || 
          el.classList.contains('current') ||
          el.getAttribute('aria-current') === 'page'
        );
        
        // At least one navigation item should be marked as active
        expect(hasActiveClass).toBe(true);
      }
    });
  });

  test.describe('Table of Contents', () => {
    test('should auto-scroll to sections', async ({ page }) => {
      const tocLinks = page.locator('.toc a, .table-of-contents a, [data-toc-target]');
      
      if (await tocLinks.count() > 0) {
        const firstTocLink = tocLinks.first();
        const targetId = await firstTocLink.getAttribute('href') || 
                        await firstTocLink.getAttribute('data-toc-target');
        
        if (targetId && targetId.startsWith('#')) {
          await firstTocLink.click();
          
          // Wait for scroll animation
          await page.waitForTimeout(1500);
          
          // Check if target element is in viewport
          const targetElement = page.locator(targetId);
          if (await targetElement.count() > 0) {
            const isInViewport = await targetElement.isVisible();
            expect(isInViewport).toBe(true);
          }
        }
      }
    });

    test('should update active TOC item on scroll', async ({ page }) => {
      const tocLinks = page.locator('.toc a, .table-of-contents a');
      
      if (await tocLinks.count() > 1) {
        // Scroll to different sections
        for (let i = 0; i < Math.min(await tocLinks.count(), 3); i++) {
          const link = tocLinks.nth(i);
          const href = await link.getAttribute('href');
          
          if (href && href.startsWith('#')) {
            await link.click();
            await page.waitForTimeout(1000);
            
            // Check if this link is now active
            const isActive = await link.evaluate(el => 
              el.classList.contains('active') || 
              el.classList.contains('current')
            );
            
            expect(isActive).toBe(true);
          }
        }
      }
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support keyboard navigation', async ({ page }) => {
      // Test tab navigation
      await page.keyboard.press('Tab');
      
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      // Test arrow key navigation
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      
      // Test Enter key activation
      await page.keyboard.press('Enter');
    });

    test('should support Escape key for closing modals', async ({ page }) => {
      // Try to open a modal first
      const modalTrigger = page.locator('[data-modal-target], [data-bs-toggle="modal"]').first();
      
      if (await modalTrigger.count() > 0) {
        await modalTrigger.click();
        
        const modal = page.locator('.modal, [role="dialog"]').first();
        
        if (await modal.count() > 0) {
          await expect(modal).toBeVisible();
          
          // Press Escape to close
          await page.keyboard.press('Escape');
          
          // Wait for modal to close
          await page.waitForTimeout(500);
          
          await expect(modal).not.toBeVisible();
        }
      }
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      
      if (headingCount > 0) {
        // Check that h1 exists
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThan(0);
        
        // Check heading hierarchy (simplified check)
        for (let i = 0; i < Math.min(headingCount, 10); i++) {
          const heading = headings.nth(i);
          const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
          
          // Verify heading has text content
          const textContent = await heading.textContent();
          expect(textContent?.trim()).toBeTruthy();
        }
      }
    });

    test('should have proper alt text for images', async ({ page }) => {
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        
        // Images should have alt text (empty alt is acceptable for decorative images)
        expect(alt).not.toBeNull();
      }
    });

    test('should have proper form labels', async ({ page }) => {
      const inputs = page.locator('input, textarea, select');
      const inputCount = await inputs.count();
      
      for (let i = 0; i < Math.min(inputCount, 5); i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        
        // Input should have some form of label
        const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
        const hasAriaLabel = ariaLabel || ariaLabelledBy;
        
        expect(hasLabel || hasAriaLabel).toBe(true);
      }
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    test('should work consistently across browsers', async ({ page, browserName }) => {
      // Test basic functionality that should work in all browsers
      await expect(page.locator('body')).toBeVisible();
      
      // Test theme toggle if available
      const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle').first();
      
      if (await themeToggle.count() > 0) {
        await themeToggle.click();
        await page.waitForTimeout(500);
        
        // Verify theme change worked
        const htmlElement = page.locator('html');
        const hasThemeClass = await htmlElement.evaluate(el => 
          el.className.includes('theme-dark') || el.className.includes('theme-light')
        );
        
        expect(hasThemeClass).toBe(true);
      }
    });
  });
});
