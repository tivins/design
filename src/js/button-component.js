// src/js/button-component.js
// Button component with icon support - inherits from dt-box

// Import DtBox (we'll need to modify the export in box-component.js)
// For now, we'll create a proper inheritance structure

class DtButton extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'icon', 'disabled', 'type', 'href', 'bordered', 'background', 'menu-item'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.closeButton = null;
    this.isVisible = true;
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
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const icon = this.getAttribute('icon') || '';
    const disabled = this.hasAttribute('disabled');
    const type = this.getAttribute('type') || 'button';
    const href = this.getAttribute('href') || '';
    const bordered = this.getAttribute('bordered') !== 'false'; // Default true
    const background = this.getAttribute('background') !== 'false'; // Default true
    const content = this.innerHTML || this.textContent || '';

    const tagName = href ? 'a' : 'button';
    const buttonContent = `
      ${icon ? `<dt-icon name="${icon}" size="${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}"></dt-icon>` : ''}
      ${content ? `<span class="button-text">${content}</span>` : ''}
    `;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
          margin-bottom: 0; /* Override dt-box margin */
          border: 1px solid transparent;
          border-radius: var(--border-radius-md, 0.375rem);
          transition: all var(--transition-normal, 0.2s ease-in-out);
          opacity: 1;
          transform: scale(1);
        }

        /* Border control */
        :host([bordered="false"]) {
          border: none;
        }

        /* Background control */
        :host([background="false"]) {
          background-color: transparent !important;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm, 0.5rem);
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          font-size: var(--font-size-base, 1rem);
          font-weight: var(--font-weight-medium, 500);
          line-height: 1.5;
          text-align: center;
          text-decoration: none;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          border: 1px solid transparent;
          border-radius: var(--border-radius-md, 0.375rem);
          transition: all var(--transition-normal, 0.2s ease-in-out);
          white-space: nowrap;
          background-color: transparent;
          width: 100%;
          height: 100%;
        }

        .btn:focus {
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .btn:disabled,
        .btn.disabled {
          opacity: 0.65;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Sizes */
        .btn-xs {
          padding: var(--spacing-xs, 0.25rem) var(--spacing-sm, 0.5rem);
          font-size: var(--font-size-xs, 0.75rem);
          line-height: 1.2;
        }

        .btn-sm {
          padding: var(--spacing-xs, 0.25rem) var(--spacing-sm, 0.75rem);
          font-size: var(--font-size-sm, 0.875rem);
        }

        .btn-lg {
          padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1.5rem);
          font-size: var(--font-size-lg, 1.25rem);
        }

        /* Variants */
        .btn-primary {
          color: var(--white);
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .btn-primary:hover {
          color: var(--white);
          background-color: var(--primary-hover);
          border-color: var(--primary-hover);
        }

        .btn-secondary {
          color: var(--white);
          background-color: var(--secondary-color);
          border-color: var(--secondary-color);
        }

        .btn-secondary:hover {
          color: var(--white);
          background-color: var(--secondary-hover);
          border-color: var(--secondary-hover);
        }

        .btn-success {
          color: var(--white);
          background-color: var(--success-color);
          border-color: var(--success-color);
        }

        .btn-success:hover {
          color: var(--white);
          background-color: var(--success-hover);
          border-color: var(--success-hover);
        }

        .btn-danger {
          color: var(--white);
          background-color: var(--danger-color);
          border-color: var(--danger-color);
        }

        .btn-danger:hover {
          color: var(--white);
          background-color: var(--danger-hover);
          border-color: var(--danger-hover);
        }

        .btn-warning {
          color: var(--dark);
          background-color: var(--warning-color);
          border-color: var(--warning-color);
        }

        .btn-warning:hover {
          color: var(--dark);
          background-color: var(--warning-hover);
          border-color: var(--warning-hover);
        }

        .btn-info {
          color: var(--white);
          background-color: var(--info-color);
          border-color: var(--info-color);
        }

        .btn-info:hover {
          color: var(--white);
          background-color: var(--info-hover);
          border-color: var(--info-hover);
        }

        .btn-light {
          color: var(--dark);
          background-color: var(--light-color);
          border-color: var(--light-color);
        }

        .btn-light:hover {
          color: var(--dark);
          background-color: var(--light-hover);
          border-color: var(--light-hover);
        }

        .btn-dark {
          color: var(--white);
          background-color: var(--dark-color);
          border-color: var(--dark-color);
        }

        .btn-dark:hover {
          color: var(--white);
          background-color: var(--dark-hover);
          border-color: var(--dark-hover);
        }

        .btn-outline-primary {
          color: #007bff;
          background-color: transparent;
          border-color: #007bff;
        }

        .btn-outline-primary:hover {
          color: #ffffff;
          background-color: #007bff;
          border-color: #007bff;
        }

        .btn-outline-secondary {
          color: #6c757d;
          background-color: transparent;
          border-color: #6c757d;
        }

        .btn-outline-secondary:hover {
          color: #ffffff;
          background-color: #6c757d;
          border-color: #6c757d;
        }

        .btn-outline-success {
          color: #28a745;
          background-color: transparent;
          border-color: #28a745;
        }

        .btn-outline-success:hover {
          color: #ffffff;
          background-color: #28a745;
          border-color: #28a745;
        }

        .btn-outline-danger {
          color: #dc3545;
          background-color: transparent;
          border-color: #dc3545;
        }

        .btn-outline-danger:hover {
          color: #ffffff;
          background-color: #dc3545;
          border-color: #dc3545;
        }

        .btn-outline-warning {
          color: #ffc107;
          background-color: transparent;
          border-color: #ffc107;
        }

        .btn-outline-warning:hover {
          color: #212529;
          background-color: #ffc107;
          border-color: #ffc107;
        }

        .btn-outline-info {
          color: #17a2b8;
          background-color: transparent;
          border-color: #17a2b8;
        }

        .btn-outline-info:hover {
          color: #ffffff;
          background-color: #17a2b8;
          border-color: #17a2b8;
        }

        .btn-outline-light {
          color: #f8f9fa;
          background-color: transparent;
          border-color: #f8f9fa;
        }

        .btn-outline-light:hover {
          color: #212529;
          background-color: #f8f9fa;
          border-color: #f8f9fa;
        }

        .btn-outline-dark {
          color: #343a40;
          background-color: transparent;
          border-color: #343a40;
        }

        .btn-outline-dark:hover {
          color: #ffffff;
          background-color: #343a40;
          border-color: #343a40;
        }

        /* Ghost buttons (inspired by popin trigger style) */
        .btn-ghost {
          color: var(--gray-600);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost:hover {
          color: var(--gray-800);
          background-color: var(--gray-100);
          border-color: transparent;
        }

        .btn-ghost-primary {
          color: var(--primary-color);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost-primary:hover {
          color: var(--white);
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .btn-ghost-secondary {
          color: var(--secondary-color);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost-secondary:hover {
          color: var(--white);
          background-color: var(--secondary-color);
          border-color: var(--secondary-color);
        }

        .btn-ghost-success {
          color: var(--success-color);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost-success:hover {
          color: var(--white);
          background-color: var(--success-color);
          border-color: var(--success-color);
        }

        .btn-ghost-danger {
          color: var(--danger-color);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost-danger:hover {
          color: var(--white);
          background-color: var(--danger-color);
          border-color: var(--danger-color);
        }

        .btn-ghost-warning {
          color: var(--warning-color);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost-warning:hover {
          color: var(--white);
          background-color: var(--warning-color);
          border-color: var(--warning-color);
        }

        .btn-ghost-info {
          color: var(--info-color);
          background-color: transparent;
          border-color: transparent;
        }

        .btn-ghost-info:hover {
          color: var(--white);
          background-color: var(--info-color);
          border-color: var(--info-color);
        }

        /* Dark theme support for ghost buttons */
        :host-context([data-theme="dark"]) .btn-ghost {
          color: var(--gray-400);
        }

        :host-context([data-theme="dark"]) .btn-ghost:hover {
          color: var(--gray-200);
          background-color: var(--gray-800);
        }

        .btn-link {
          color: var(--primary-color);
          background-color: transparent;
          border-color: transparent;
          text-decoration: none;
        }

        .btn-link:hover {
          color: var(--primary-hover);
          background-color: transparent;
          border-color: transparent;
          text-decoration: underline;
        }

        /* Menu variant */
        .btn-menu {
          color: var(--gray-700);
          background-color: transparent;
          border-color: transparent;
          text-decoration: none;
          text-align: left;
          justify-content: flex-start;
          padding: var(--spacing-xs, 0.25rem) var(--spacing-sm, 0.5rem);
          font-size: var(--font-size-sm, 0.875rem);
          font-weight: var(--font-weight-normal, 400);
          border-radius: var(--border-radius-sm, 0.25rem);
          width: 100%;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .btn-menu:hover {
          color: var(--white);
          background-color: var(--primary-color);
          border-color: transparent;
          text-decoration: none;
        }

        .btn-menu.active {
          color: var(--white);
          background-color: var(--primary-color);
          border-color: transparent;
          font-weight: var(--font-weight-medium, 500);
        }

        /* Dark theme support for menu */
        :host-context([data-theme="dark"]) .btn-menu {
          color: var(--text-secondary);
        }

        :host-context([data-theme="dark"]) .btn-menu:hover,
        :host-context([data-theme="dark"]) .btn-menu.active {
          color: var(--white);
          background-color: var(--primary-color);
        }

        /* Icon-only buttons */
        .btn-icon {
          padding: var(--spacing-sm, 0.5rem);
          width: auto;
          height: auto;
        }

        .btn-icon .button-text {
          display: none;
        }

        /* Icon and text layout */
        .button-text {
          flex: 1;
          background-color: transparent;
        }

        dt-icon {
          flex-shrink: 0;
          background-color: transparent;
        }
      </style>
      
      <${tagName} 
        class="btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${icon && !content ? 'btn-icon' : ''}"
        ${disabled ? 'disabled' : ''}
        ${type !== 'button' ? `type="${type}"` : ''}
        ${href ? `href="${href}"` : ''}
      >
        ${buttonContent}
      </${tagName}>
    `;
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('.btn');
    if (button) {
      button.addEventListener('click', (e) => {
        if (this.hasAttribute('disabled')) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }
  }

  cleanup() {
    // Cleanup if needed
  }

  // Public methods (inherited from dt-box concept)
  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setIcon(icon) {
    this.setAttribute('icon', icon);
  }

  setDisabled(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  setBordered(bordered) {
    if (bordered) {
      this.removeAttribute('bordered');
    } else {
      this.setAttribute('bordered', 'false');
    }
  }

  setBackground(background) {
    if (background) {
      this.removeAttribute('background');
    } else {
      this.setAttribute('background', 'false');
    }
  }

  setActive(active) {
    if (active) {
      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }
  }

  static create(options = {}) {
    const button = document.createElement('dt-button');
    
    if (options.variant) button.setAttribute('variant', options.variant);
    if (options.size) button.setAttribute('size', options.size);
    if (options.icon) button.setAttribute('icon', options.icon);
    if (options.disabled) button.setAttribute('disabled', '');
    if (options.type) button.setAttribute('type', options.type);
    if (options.href) button.setAttribute('href', options.href);
    if (options.bordered === false) button.setAttribute('bordered', 'false');
    if (options.background === false) button.setAttribute('background', 'false');
    if (options.content) button.innerHTML = options.content;
    
    return button;
  }
}

customElements.define('dt-button', DtButton);
