// src/js/popin-component.js
// Popin (Dropdown Menu) component with multiple variants and positioning options

class DtPopin extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'position', 'trigger-icon', 'disabled'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.clickOutsideHandler = null;
    this.keydownHandler = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'md';
    const position = this.getAttribute('position') || 'left';
    const triggerIcon = this.getAttribute('trigger-icon') || 'more-horizontal';
    const disabled = this.hasAttribute('disabled');
    const triggerText = this.getAttribute('trigger-text') || '';
    const menuContent = this.innerHTML || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        .popin {
          position: relative;
          display: inline-block;
        }

        .popin-trigger {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          background: none;
          padding: var(--spacing-sm, 0.5rem);
          border-radius: var(--border-radius-md, 0.375rem);
          transition: all var(--transition-fast, 0.15s ease-in-out);
          color: var(--gray-600);
          gap: var(--spacing-xs, 0.25rem);
        }

        .popin-trigger:hover {
          background-color: var(--gray-100);
          color: var(--gray-800);
        }

        .popin-trigger:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }

        .popin-trigger:active {
          background-color: var(--gray-200);
        }

        .popin-trigger:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        .popin-menu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          min-width: 200px;
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--border-radius-md, 0.375rem);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-xs, 0.25rem);
          margin-top: var(--spacing-xs, 0.25rem);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all var(--transition-normal, 0.2s ease-in-out);
        }

        .popin-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .popin-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs, 0.5rem);
          width: 100%;
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          font-size: var(--font-size-sm, 0.875rem);
          font-weight: var(--font-weight-normal, 400);
          color: var(--gray-700);
          text-align: left;
          text-decoration: none;
          background: none;
          border: none;
          border-radius: var(--border-radius-sm, 0.25rem);
          cursor: pointer;
          transition: all var(--transition-fast, 0.15s ease-in-out);
        }

        .popin-item dt-icon {
          flex-shrink: 0;
          display: inline-block;
        }

        .popin-item:hover {
          background-color: var(--gray-100);
          color: var(--gray-900);
        }

        .popin-item:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: -2px;
        }

        .popin-item:active {
          background-color: var(--gray-200);
        }

        .popin-item.disabled {
          color: var(--gray-400);
          cursor: not-allowed;
          pointer-events: none;
        }

        .popin-item.danger {
          color: var(--danger-color);
        }

        .popin-item.danger:hover {
          background-color: var(--danger-color);
          color: var(--white);
        }

        .popin-item.warning {
          color: var(--warning-color);
        }

        .popin-item.warning:hover {
          background-color: var(--warning-color);
          color: var(--white);
        }

        .popin-item.success {
          color: var(--success-color);
        }

        .popin-item.success:hover {
          background-color: var(--success-color);
          color: var(--white);
        }

        .popin-divider {
          height: 1px;
          background-color: var(--gray-200);
          margin: var(--spacing-xs, 0.25rem) 0;
        }

        .popin-header {
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          font-size: var(--font-size-xs, 0.75rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--gray-500);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--gray-200);
          margin-bottom: var(--spacing-xs, 0.25rem);
        }

        /* Positioning variants */
        .popin-menu-right {
          left: auto;
          right: 0;
        }

        .popin-menu-center {
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
        }

        .popin-menu-center.show {
          transform: translateX(-50%) translateY(0);
        }

        .popin-menu-up {
          top: auto;
          bottom: 100%;
          margin-top: 0;
          margin-bottom: var(--spacing-xs, 0.25rem);
          transform: translateY(10px);
        }

        .popin-menu-up.show {
          transform: translateY(0);
        }

        /* Size variants */
        .popin-menu-sm {
          min-width: 150px;
          padding: var(--spacing-xs, 0.25rem);
        }

        .popin-menu-sm .popin-item {
          padding: var(--spacing-xs, 0.25rem) var(--spacing-sm, 0.75rem);
          font-size: var(--font-size-xs, 0.75rem);
        }

        .popin-menu-lg {
          min-width: 300px;
          padding: var(--spacing-sm, 0.5rem);
        }

        .popin-menu-lg .popin-item {
          padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1.25rem);
          font-size: var(--font-size-base, 1rem);
        }

        /* Variant styles */
        .popin-menu-primary {
          border-color: var(--primary-color);
        }

        .popin-menu-primary .popin-header {
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }

        .popin-menu-success {
          border-color: var(--success-color);
        }

        .popin-menu-success .popin-header {
          color: var(--success-color);
          border-bottom-color: var(--success-color);
        }

        .popin-menu-warning {
          border-color: var(--warning-color);
        }

        .popin-menu-warning .popin-header {
          color: var(--warning-color);
          border-bottom-color: var(--warning-color);
        }

        .popin-menu-danger {
          border-color: var(--danger-color);
        }

        .popin-menu-danger .popin-header {
          color: var(--danger-color);
          border-bottom-color: var(--danger-color);
        }

        .popin-menu-info {
          border-color: var(--info-color);
        }

        .popin-menu-info .popin-header {
          color: var(--info-color);
          border-bottom-color: var(--info-color);
        }

        /* Dark theme support */
        :host-context([data-theme="dark"]) .popin-trigger {
          color: var(--gray-400);
        }

        :host-context([data-theme="dark"]) .popin-trigger:hover {
          background-color: var(--gray-800);
          color: var(--gray-200);
        }

        :host-context([data-theme="dark"]) .popin-trigger:active {
          background-color: var(--gray-700);
        }

        :host-context([data-theme="dark"]) .popin-menu {
          background-color: var(--gray-900);
          border-color: var(--gray-700);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        :host-context([data-theme="dark"]) .popin-item {
          color: var(--gray-300);
        }

        :host-context([data-theme="dark"]) .popin-item:hover {
          background-color: var(--gray-800);
          color: var(--white);
        }

        :host-context([data-theme="dark"]) .popin-item:active {
          background-color: var(--gray-700);
        }

        :host-context([data-theme="dark"]) .popin-item.disabled {
          color: var(--gray-600);
        }

        :host-context([data-theme="dark"]) .popin-divider {
          background-color: var(--gray-700);
        }

        :host-context([data-theme="dark"]) .popin-header {
          color: var(--gray-500);
          border-bottom-color: var(--gray-700);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .popin-menu {
            min-width: 180px;
            max-width: calc(100vw - 2rem);
          }

          .popin-menu-lg {
            min-width: 250px;
          }
        }
      </style>
      
      <div class="popin">
        <button 
          class="popin-trigger" 
          ${disabled ? 'disabled' : ''}
          aria-haspopup="true" 
          aria-expanded="${this.isOpen}"
        >
          ${triggerText ? `<span>${triggerText}</span>` : ''}
          <dt-icon name="${triggerIcon}" size="sm"></dt-icon>
        </button>
        
        <div class="popin-menu ${position !== 'left' ? `popin-menu-${position}` : ''} ${size !== 'md' ? `popin-menu-${size}` : ''} ${variant !== 'default' ? `popin-menu-${variant}` : ''}">
          ${menuContent}
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.popin-trigger');
    const menu = this.shadowRoot.querySelector('.popin-menu');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Handle clicks on menu items
    if (menu) {
      menu.addEventListener('click', (e) => {
        const item = e.target.closest('.popin-item');
        if (item && !item.classList.contains('disabled')) {
          this.handleItemClick(item, e);
        }
      });
    }

    // Close on outside click
    this.clickOutsideHandler = (e) => {
      if (!this.contains(e.target)) {
        this.close();
      }
    };

    // Handle keyboard navigation
    this.keydownHandler = (e) => {
      if (this.isOpen) {
        switch (e.key) {
          case 'Escape':
            this.close();
            trigger.focus();
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.focusNextItem();
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.focusPreviousItem();
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            const focusedItem = menu.querySelector('.popin-item:focus');
            if (focusedItem) {
              this.handleItemClick(focusedItem, e);
            }
            break;
        }
      }
    };

    document.addEventListener('click', this.clickOutsideHandler);
    document.addEventListener('keydown', this.keydownHandler);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.hasAttribute('disabled')) return;
    
    // Close all other popins first
    this.closeAllOtherPopins();
    
    this.isOpen = true;
    const menu = this.shadowRoot.querySelector('.popin-menu');
    const trigger = this.shadowRoot.querySelector('.popin-trigger');
    
    if (menu) {
      menu.classList.add('show');
      trigger.setAttribute('aria-expanded', 'true');
      
      // Focus first item
      const firstItem = menu.querySelector('.popin-item:not(.disabled)');
      if (firstItem) {
        firstItem.focus();
      }
    }
  }

  close() {
    this.isOpen = false;
    const menu = this.shadowRoot.querySelector('.popin-menu');
    const trigger = this.shadowRoot.querySelector('.popin-trigger');
    
    if (menu) {
      menu.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

  closeAllOtherPopins() {
    // Find all other popin components and close them
    const allPopins = document.querySelectorAll('dt-popin');
    allPopins.forEach(popin => {
      if (popin !== this && popin.isOpen) {
        popin.close();
      }
    });
  }

  handleItemClick(item, event) {
    const action = item.getAttribute('data-action');
    const href = item.getAttribute('href');
    
    // Dispatch custom event
    const customEvent = new CustomEvent('popin-item-click', {
      detail: {
        item: item,
        action: action,
        href: href,
        text: item.textContent.trim()
      },
      bubbles: true
    });
    
    this.dispatchEvent(customEvent);
    
    // Handle default actions
    if (href) {
      window.location.href = href;
    } else if (action === 'close') {
      this.close();
    } else if (!action || action === 'default') {
      this.close();
    }
  }

  focusNextItem() {
    const menu = this.shadowRoot.querySelector('.popin-menu');
    const items = Array.from(menu.querySelectorAll('.popin-item:not(.disabled)'));
    const currentIndex = items.indexOf(document.activeElement);
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex].focus();
  }

  focusPreviousItem() {
    const menu = this.shadowRoot.querySelector('.popin-menu');
    const items = Array.from(menu.querySelectorAll('.popin-item:not(.disabled)'));
    const currentIndex = items.indexOf(document.activeElement);
    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    items[prevIndex].focus();
  }

  cleanup() {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
  }

  // Public methods
  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setPosition(position) {
    this.setAttribute('position', position);
  }

  setTriggerIcon(icon) {
    this.setAttribute('trigger-icon', icon);
  }

  setTriggerText(text) {
    this.setAttribute('trigger-text', text);
  }

  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  static create(options = {}) {
    const popin = document.createElement('dt-popin');
    
    if (options.variant) popin.setAttribute('variant', options.variant);
    if (options.size) popin.setAttribute('size', options.size);
    if (options.position) popin.setAttribute('position', options.position);
    if (options.triggerIcon) popin.setAttribute('trigger-icon', options.triggerIcon);
    if (options.triggerText) popin.setAttribute('trigger-text', options.triggerText);
    if (options.disabled) popin.setAttribute('disabled', '');
    if (options.content) popin.innerHTML = options.content;
    
    return popin;
  }
}

customElements.define('dt-popin', DtPopin);
