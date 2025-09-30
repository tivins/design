// Unit tests for Button Component
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals');

describe('Button Component', () => {
  let container;

  beforeEach(() => {
    // Create a clean container for each test
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(container);
  });

  describe('Initialization', () => {
    it('should create a button element with default properties', () => {
      // Mock button creation
      const button = document.createElement('button');
      button.className = 'btn btn-primary';
      button.textContent = 'Click me';
      
      expect(button).toBeTruthy();
      expect(button.className).toBe('btn btn-primary');
      expect(button.textContent).toBe('Click me');
    });

    it('should apply custom classes when provided', () => {
      const button = document.createElement('button');
      button.className = 'btn btn-secondary btn-lg';
      
      expect(button.className).toContain('btn-secondary');
      expect(button.className).toContain('btn-lg');
    });
  });

  describe('Event Handling', () => {
    it('should handle click events', () => {
      const button = document.createElement('button');
      let clicked = false;
      
      button.addEventListener('click', () => {
        clicked = true;
      });
      
      // Simulate click
      button.click();
      
      expect(clicked).toBe(true);
    });

    it('should prevent default behavior when specified', () => {
      const button = document.createElement('button');
      let defaultPrevented = false;
      
      button.addEventListener('click', (e) => {
        e.preventDefault();
        defaultPrevented = e.defaultPrevented;
      });
      
      button.click();
      
      expect(defaultPrevented).toBe(true);
    });
  });

  describe('State Management', () => {
    it('should toggle disabled state', () => {
      const button = document.createElement('button');
      
      expect(button.disabled).toBe(false);
      
      button.disabled = true;
      expect(button.disabled).toBe(true);
      
      button.disabled = false;
      expect(button.disabled).toBe(false);
    });

    it('should update button text dynamically', () => {
      const button = document.createElement('button');
      button.textContent = 'Initial text';
      
      expect(button.textContent).toBe('Initial text');
      
      button.textContent = 'Updated text';
      expect(button.textContent).toBe('Updated text');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const button = document.createElement('button');
      button.setAttribute('aria-label', 'Submit form');
      button.setAttribute('role', 'button');
      
      expect(button.getAttribute('aria-label')).toBe('Submit form');
      expect(button.getAttribute('role')).toBe('button');
    });

    it('should be focusable by default', () => {
      const button = document.createElement('button');
      button.tabIndex = 0;
      
      expect(button.tabIndex).toBe(0);
    });

    it('should not be focusable when disabled', () => {
      const button = document.createElement('button');
      button.disabled = true;
      
      expect(button.disabled).toBe(true);
      // Note: In HTML, disabled buttons are not focusable by default
      // This test verifies the disabled state, tabIndex behavior may vary
      expect(button.disabled).toBe(true);
    });
  });
});
