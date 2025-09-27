// Design Toolkit - Theme Toggle Web Component
// A self-contained web component for theme switching

class ThemeToggleComponent extends HTMLElement {
  constructor() {
    super();
    this.themeKey = 'design-toolkit-theme';
    this.currentTheme = 'light';
    this.init();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'title'];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    this.initializeTheme();
    this.setupSystemThemeListener();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateButtonAttributes();
    }
  }

  init() {
    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  render() {
    const variant = this.getAttribute('variant') || 'link';
    const size = this.getAttribute('size') || 'md';
    const title = this.getAttribute('title') || 'Toggle theme';
    
    // Handle variant class properly
    let variantClass = variant;
    if (variant.startsWith('outline-')) {
      variantClass = `variant-${variant}`;
    } else {
      variantClass = `variant-${variant}`;
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        .theme-toggle-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border: none;
          background: transparent;
          color: var(--text-primary, #333);
          cursor: pointer;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
          font-size: 1rem;
          line-height: 1;
          text-decoration: none;
        }
        
        .theme-toggle-button:focus {
          outline: 2px solid var(--primary-color, #007bff);
          outline-offset: 2px;
        }
        
        .theme-toggle-button:active {
          transform: scale(0.95);
        }
        
        /* Size variants */
        .theme-toggle-button.size-sm {
          padding: 0.25rem;
          font-size: 0.875rem;
        }
        
        .theme-toggle-button.size-lg {
          padding: 0.75rem;
          font-size: 1.25rem;
        }
        
        /* Variant styles - Primary */
        .theme-toggle-button.variant-primary {
          background: var(--primary-color, #007bff);
          color: white;
        }
        
        .theme-toggle-button.variant-primary:hover {
          background: var(--primary-dark, #0056b3);
        }
        
        /* Variant styles - Secondary */
        .theme-toggle-button.variant-secondary {
          background: var(--secondary-color, #6c757d);
          color: white;
        }
        
        .theme-toggle-button.variant-secondary:hover {
          background: var(--secondary-dark, #545b62);
        }
        
        /* Variant styles - Link (default) */
        .theme-toggle-button.variant-link:hover {
          background: var(--gray-100, #f8f9fa);
          color: var(--primary-color, #007bff);
        }
        
        /* Dark theme styles for link variant */
        :host-context([data-theme="dark"]) .theme-toggle-button.variant-link:hover {
          background: var(--gray-800, #343a40);
          color: var(--primary-color, #007bff);
        }
        
        /* Outline variants - Primary */
        .theme-toggle-button.variant-outline-primary {
          border: 1px solid #007bff;
          color: #007bff;
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline-primary:hover {
          background: #007bff;
          color: white;
        }
        
        /* Outline variants - Secondary */
        .theme-toggle-button.variant-outline-secondary {
          border: 1px solid #6c757d;
          color: #6c757d;
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline-secondary:hover {
          background: #6c757d;
          color: white;
        }
        
        /* Outline variants - Success */
        .theme-toggle-button.variant-outline-success {
          border: 1px solid #28a745;
          color: #28a745;
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline-success:hover {
          background: #28a745;
          color: white;
        }
        
        /* Outline variants - Danger */
        .theme-toggle-button.variant-outline-danger {
          border: 1px solid #dc3545;
          color: #dc3545;
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline-danger:hover {
          background: #dc3545;
          color: white;
        }
        
        /* Outline variants - Warning */
        .theme-toggle-button.variant-outline-warning {
          border: 1px solid #ffc107;
          color: #ffc107;
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline-warning:hover {
          background: #ffc107;
          color: #212529;
        }
        
        /* Outline variants - Info */
        .theme-toggle-button.variant-outline-info {
          border: 1px solid #17a2b8;
          color: #17a2b8;
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline-info:hover {
          background: #17a2b8;
          color: white;
        }
        
        /* Generic outline variant */
        .theme-toggle-button.variant-outline {
          border: 1px solid var(--primary-color, #007bff);
          color: var(--primary-color, #007bff);
          background: transparent;
        }
        
        .theme-toggle-button.variant-outline:hover {
          background: var(--primary-color, #007bff);
          color: white;
        }
        
        /* Icon styles */
        .theme-icon {
          display: inline-block;
          width: 1em;
          height: 1em;
          transition: transform 0.3s ease;
        }
        
        .theme-toggle-button:hover .theme-icon {
          transform: rotate(15deg);
        }
      </style>
      
      <button class="theme-toggle-button ${variantClass} size-${size}" title="${title}" aria-label="${title}">
        <svg class="theme-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      </button>
    `;
  }

  attachEventListeners() {
    const button = this.shadowRoot.querySelector('.theme-toggle-button');
    if (button) {
      button.addEventListener('click', () => this.toggleTheme());
    }
  }

  removeEventListeners() {
    const button = this.shadowRoot.querySelector('.theme-toggle-button');
    if (button) {
      button.removeEventListener('click', () => this.toggleTheme());
    }
  }

  updateButtonAttributes() {
    const button = this.shadowRoot.querySelector('.theme-toggle-button');
    if (button) {
      const variant = this.getAttribute('variant') || 'link';
      const size = this.getAttribute('size') || 'md';
      const title = this.getAttribute('title') || 'Toggle theme';
      
      // Update classes - handle variant properly
      let variantClass = variant;
      if (variant.startsWith('outline-')) {
        variantClass = `variant-${variant}`;
      } else {
        variantClass = `variant-${variant}`;
      }
      
      button.className = `theme-toggle-button ${variantClass} size-${size}`;
      button.title = title;
      button.setAttribute('aria-label', title);
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    } else {
      this.currentTheme = systemPrefersDark ? 'dark' : 'light';
      this.applyTheme(this.currentTheme);
    }
  }

  setupSystemThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.themeKey)) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    localStorage.setItem(this.themeKey, this.currentTheme);
  }

  applyTheme(theme) {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update icon
    this.updateIcon(theme);
    
    // Update body class for additional styling
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  updateIcon(theme) {
    const icon = this.shadowRoot.querySelector('.theme-icon');
    if (icon) {
      if (theme === 'dark') {
        // Sun icon for dark theme (to switch to light)
        icon.innerHTML = `
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        `;
      } else {
        // Moon icon for light theme (to switch to dark)
        icon.innerHTML = `
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        `;
      }
    }
  }

  // Public API methods
  getCurrentTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    localStorage.setItem(this.themeKey, theme);
  }

  getThemeKey() {
    return this.themeKey;
  }

  setThemeKey(key) {
    this.themeKey = key;
  }
}

// Register the custom element
customElements.define('dt-theme-toggle', ThemeToggleComponent);

// Export for manual use if needed
window.ThemeToggleComponent = ThemeToggleComponent;
