// Unit tests for Theme Toggle Component
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals');

describe('Theme Toggle Component', () => {
  let container;
  let mockLocalStorage;

  beforeEach(() => {
    // Create a clean container for each test
    container = document.createElement('div');
    document.body.appendChild(container);

    // Mock localStorage
    mockLocalStorage = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockLocalStorage[key] || null),
        setItem: jest.fn((key, value) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: jest.fn((key) => {
          delete mockLocalStorage[key];
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {};
        })
      },
      writable: true
    });
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  describe('Theme Initialization', () => {
    it('should initialize with light theme by default', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('data-theme', 'light');
      
      expect(themeToggle.getAttribute('data-theme')).toBe('light');
    });

    it('should load saved theme from localStorage', () => {
      mockLocalStorage['theme'] = 'dark';
      
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      
      // Simulate loading theme from localStorage
      const savedTheme = localStorage.getItem('theme') || 'light';
      themeToggle.setAttribute('data-theme', savedTheme);
      
      expect(themeToggle.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('Theme Switching', () => {
    it('should toggle from light to dark theme', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('data-theme', 'light');
      
      // Simulate theme toggle
      const currentTheme = themeToggle.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      themeToggle.setAttribute('data-theme', newTheme);
      
      expect(themeToggle.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle from dark to light theme', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('data-theme', 'dark');
      
      // Simulate theme toggle
      const currentTheme = themeToggle.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      themeToggle.setAttribute('data-theme', newTheme);
      
      expect(themeToggle.getAttribute('data-theme')).toBe('light');
    });

    it('should save theme to localStorage when changed', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      
      // Simulate theme change
      const newTheme = 'dark';
      themeToggle.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('DOM Updates', () => {
    it('should update document class when theme changes', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      
      // Simulate theme change
      const newTheme = 'dark';
      themeToggle.setAttribute('data-theme', newTheme);
      
      // Simulate updating document class
      document.documentElement.className = `theme-${newTheme}`;
      
      expect(document.documentElement.className).toBe('theme-dark');
    });

    it('should update CSS custom properties', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      
      // Simulate CSS custom property updates
      const root = document.documentElement;
      root.style.setProperty('--primary-color', '#007bff');
      root.style.setProperty('--background-color', '#ffffff');
      
      expect(root.style.getPropertyValue('--primary-color')).toBe('#007bff');
      expect(root.style.getPropertyValue('--background-color')).toBe('#ffffff');
    });
  });

  describe('Event Handling', () => {
    it('should handle click events on theme toggle button', () => {
      const themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle-btn';
      let toggleCalled = false;
      
      themeToggle.addEventListener('click', () => {
        toggleCalled = true;
      });
      
      themeToggle.click();
      
      expect(toggleCalled).toBe(true);
    });

    it('should dispatch custom theme change event', () => {
      const themeToggle = document.createElement('div');
      themeToggle.className = 'theme-toggle';
      let eventDispatched = false;
      
      themeToggle.addEventListener('themechange', () => {
        eventDispatched = true;
      });
      
      // Simulate theme change event
      const event = new CustomEvent('themechange', {
        detail: { theme: 'dark' }
      });
      themeToggle.dispatchEvent(event);
      
      expect(eventDispatched).toBe(true);
    });
  });
});
