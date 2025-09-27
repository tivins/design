// src/js/box-component.js
// Web Component for boxes - base component for alerts, toasts, etc.

class DtBox extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'dismissible', 'icon', 'title', 'bordered', 'background'];

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
    const dismissible = this.hasAttribute('dismissible');
    const icon = this.getAttribute('icon') || '';
    const title = this.getAttribute('title') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          margin-bottom: var(--spacing-md, 1rem);
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

        :host(.fade-out) {
          opacity: 0;
          transform: scale(0.95);
          margin-bottom: 0;
          max-height: 0;
          overflow: hidden;
        }

        .box {
          position: relative;
          display: flex;
          gap: var(--spacing-sm, 0.5rem);
          padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
          border-radius: inherit;
        }

        /* Sizes */
        :host([size="sm"]) .box {
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          font-size: var(--font-size-sm, 0.875rem);
        }

        :host([size="md"]) .box {
          padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
          font-size: var(--font-size-base, 1rem);
        }

        :host([size="lg"]) .box {
          padding: var(--spacing-lg, 1.5rem) var(--spacing-xl, 2rem);
          font-size: var(--font-size-lg, 1.125rem);
        }

        /* Icon */
        .box-icon {
          flex-shrink: 0;
          margin: 0.75rem 0.5rem 0.75rem 1rem;
          padding: 0;
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Content */
        .box-content {
          flex: 1;
          min-width: 0;
          padding: 0.75rem 1rem 0.75rem 0;
          background-color: transparent;
        }

        .box-title {
          font-weight: var(--font-weight-semibold, 600);
          margin-bottom: var(--spacing-xs, 0.25rem);
          color: inherit;
          background-color: transparent;
        }

        .box-body {
          color: inherit;
          line-height: var(--line-height-base, 1.5);
          background-color: transparent;
        }

        /* Close button */
        .box-close {
          position: absolute;
          top: var(--spacing-sm, 0.5rem);
          right: var(--spacing-sm, 0.5rem);
          z-index: 2;
          padding: var(--spacing-xs, 0.25rem);
          color: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: var(--border-radius-sm, 0.25rem);
          transition: background-color var(--transition-normal, 0.2s ease-in-out);
          background: transparent;
          border: none;
          cursor: pointer;
          opacity: 0.7;
        }

        .box-close:hover {
          background-color: rgba(0, 0, 0, 0.1);
          opacity: 1;
        }

        .box-close dt-icon {
          margin: 0;
          padding: 0;
        }

        /* Variants */
        :host([variant="primary"]) {
          color: var(--primary-dark, #1e40af);
          background-color: var(--primary-light, #dbeafe);
          border-color: var(--primary-light, #dbeafe);
        }

        :host([variant="secondary"]) {
          color: var(--secondary-dark, #374151);
          background-color: var(--secondary-light, #f3f4f6);
          border-color: var(--secondary-light, #f3f4f6);
        }

        :host([variant="success"]) {
          color: var(--success-dark, #166534);
          background-color: var(--success-light, #dcfce7);
          border-color: var(--success-light, #dcfce7);
        }

        :host([variant="danger"]) {
          color: var(--danger-dark, #dc2626);
          background-color: var(--danger-light, #fef2f2);
          border-color: var(--danger-light, #fef2f2);
        }

        :host([variant="warning"]) {
          color: var(--warning-dark, #d97706);
          background-color: var(--warning-light, #fef3c7);
          border-color: var(--warning-light, #fef3c7);
        }

        :host([variant="info"]) {
          color: var(--info-dark, #0284c7);
          background-color: var(--info-light, #e0f2fe);
          border-color: var(--info-light, #e0f2fe);
        }

        :host([variant="light"]) {
          color: var(--gray-800, #1f2937);
          background-color: var(--light-color, #f8f9fa);
          border-color: var(--light-color, #f8f9fa);
        }

        :host([variant="dark"]) {
          color: var(--white, #ffffff);
          background-color: var(--dark-color, #1f2937);
          border-color: var(--dark-color, #1f2937);
        }

        /* Dark theme adjustments */
        [data-theme="dark"] :host([variant="primary"]) {
          color: var(--primary-color, #60a5fa);
          background-color: var(--primary-light, #1e3a8a);
          border-color: var(--primary-light, #1e3a8a);
        }

        [data-theme="dark"] :host([variant="success"]) {
          color: var(--success-color, #4ade80);
          background-color: var(--success-light, #14532d);
          border-color: var(--success-light, #14532d);
        }

        [data-theme="dark"] :host([variant="danger"]) {
          color: var(--danger-color, #f87171);
          background-color: var(--danger-light, #7f1d1d);
          border-color: var(--danger-light, #7f1d1d);
        }

        [data-theme="dark"] :host([variant="warning"]) {
          color: var(--warning-color, #fbbf24);
          background-color: var(--warning-light, #78350f);
          border-color: var(--warning-light, #78350f);
        }

        [data-theme="dark"] :host([variant="info"]) {
          color: var(--info-color, #38bdf8);
          background-color: var(--info-light, #0c4a6e);
          border-color: var(--info-light, #0c4a6e);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .box {
            padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 1rem);
          }
          
          :host([size="lg"]) .box {
            padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
          }
        }
      </style>
      
      <div class="box">
        ${icon ? `<dt-icon name="${icon}" class="box-icon"></dt-icon>` : ''}
        
        <div class="box-content">
          ${title ? `<div class="box-title">${title}</div>` : ''}
          <div class="box-body">
            <slot></slot>
          </div>
        </div>
        
        ${dismissible ? `
          <button class="box-close" aria-label="Fermer">
            <dt-icon name="x" size="sm"></dt-icon>
          </button>
        ` : ''}
      </div>
    `;

    this.closeButton = this.shadowRoot.querySelector('.box-close');
  }

  setupEventListeners() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.dismiss());
    }
  }

  cleanup() {
    if (this.closeButton) {
      this.closeButton.removeEventListener('click', () => this.dismiss());
    }
  }

  dismiss() {
    if (!this.isVisible) return;
    
    this.isVisible = false;
    this.classList.add('fade-out');
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('dt-box-dismiss', {
      detail: { box: this },
      bubbles: true
    }));
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }, 200);
  }

  // Public methods
  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setIcon(icon) {
    this.setAttribute('icon', icon);
  }

  setTitle(title) {
    this.setAttribute('title', title);
  }

  setDismissible(dismissible) {
    if (dismissible) {
      this.setAttribute('dismissible', '');
    } else {
      this.removeAttribute('dismissible');
    }
  }

  show() {
    this.isVisible = true;
    this.classList.remove('fade-out');
  }

  hide() {
    this.dismiss();
  }

  static create(options = {}) {
    const box = document.createElement('dt-box');
    
    if (options.variant) box.setAttribute('variant', options.variant);
    if (options.size) box.setAttribute('size', options.size);
    if (options.icon) box.setAttribute('icon', options.icon);
    if (options.title) box.setAttribute('title', options.title);
    if (options.dismissible) box.setAttribute('dismissible', '');
    if (options.content) box.textContent = options.content;
    
    return box;
  }
}

customElements.define('dt-box', DtBox);
