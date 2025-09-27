// src/js/card-component.js
// Card component based on dt-box architecture

class DtCard extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'header', 'footer', 'image'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.ensureDarkModeBackground();
    this.observeThemeChanges();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.ensureDarkModeBackground();
    }
  }

  observeThemeChanges() {
    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTimeout(() => this.ensureDarkModeBackground(), 100);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  ensureDarkModeBackground() {
    // Force background color based on current theme
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const cardBody = this.shadowRoot?.querySelector('.card-body');
    
    if (cardBody) {
      if (isDarkMode) {
        cardBody.style.backgroundColor = '#161b22';
      } else {
        cardBody.style.backgroundColor = '#ffffff';
      }
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const size = this.getAttribute('size') || 'md';
    const header = this.getAttribute('header') || '';
    const footer = this.getAttribute('footer') || '';
    const image = this.getAttribute('image') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: var(--spacing-md, 1rem);
        }

        .card {
          background-color: var(--white);
          border: 1px solid var(--gray-300);
          border-radius: var(--border-radius-md, 0.5rem);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal, 0.2s ease-in-out);
          overflow: hidden;
        }

        /* Dark theme support - using CSS custom properties that work in Shadow DOM */
        :host-context([data-theme="dark"]) .card {
          background-color: #161b22;
          border-color: #495057;
        }

        :host-context([data-theme="dark"]) .card-header,
        :host-context([data-theme="dark"]) .card-footer {
          background-color: #21262d;
          border-color: #495057;
        }

        :host-context([data-theme="dark"]) .card-title {
          color: #f0f6fc;
        }

        :host-context([data-theme="dark"]) .card-text {
          color: #8b949e;
        }

        /* Ensure all card variants inherit background in dark mode */
        :host-context([data-theme="dark"]) .card {
          background-color: #161b22 !important;
        }

        :host-context([data-theme="dark"]) .card-body {
          background-color: #161b22 !important;
        }

        /* Force background for all card elements in dark mode */
        :host-context([data-theme="dark"]) .card-title,
        :host-context([data-theme="dark"]) .card-text,
        :host-context([data-theme="dark"]) .card-subtitle {
          background-color: #161b22 !important;
        }

        :host([variant="primary"]) .card {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
        }

        :host([variant="success"]) .card {
          border-color: var(--success-color);
          box-shadow: 0 0 0 1px var(--success-color);
        }

        :host([variant="warning"]) .card {
          border-color: var(--warning-color);
          box-shadow: 0 0 0 1px var(--warning-color);
        }

        :host([variant="danger"]) .card {
          border-color: var(--danger-color);
          box-shadow: 0 0 0 1px var(--danger-color);
        }

        :host([variant="info"]) .card {
          border-color: var(--info-color);
          box-shadow: 0 0 0 1px var(--info-color);
        }

        .card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .card-header {
          padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
          background-color: var(--gray-100);
          border-bottom: 1px solid var(--gray-300);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--gray-800);
        }

        .card-body {
          padding: var(--spacing-lg, 1.5rem);
          background-color: var(--white);
        }

        .card-title {
          margin-bottom: var(--spacing-sm, 0.5rem);
          font-size: var(--font-size-lg, 1.25rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--gray-900);
          background-color: transparent;
        }

        .card-subtitle {
          margin-bottom: var(--spacing-md, 1rem);
          font-size: var(--font-size-sm, 0.875rem);
          color: var(--gray-600);
          background-color: transparent;
        }

        .card-text {
          margin-bottom: var(--spacing-md, 1rem);
          color: var(--gray-700);
          line-height: var(--line-height-relaxed, 1.6);
          background-color: transparent;
        }

        .card-footer {
          padding: var(--spacing-md, 1rem) var(--spacing-lg, 1.5rem);
          background-color: var(--gray-100);
          border-top: 1px solid var(--gray-300);
          color: var(--gray-600);
          font-size: var(--font-size-sm, 0.875rem);
        }

        .card-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: var(--font-weight-medium, 500);
        }

        .card-link:hover {
          color: var(--primary-hover);
          text-decoration: underline;
        }
      </style>
      
      <div class="card">
        ${image ? `<img src="${image}" alt="Card image" class="card-image">` : ''}
        ${header ? `<div class="card-header">${header}</div>` : ''}
        <div class="card-body">
          <slot></slot>
        </div>
        ${footer ? `<div class="card-footer">${footer}</div>` : ''}
      </div>
    `;
  }

  // Public methods
  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setHeader(header) {
    this.setAttribute('header', header);
  }

  setFooter(footer) {
    this.setAttribute('footer', footer);
  }

  setImage(image) {
    this.setAttribute('image', image);
  }

  static create(options = {}) {
    const card = document.createElement('dt-card');
    
    if (options.variant) card.setAttribute('variant', options.variant);
    if (options.size) card.setAttribute('size', options.size);
    if (options.header) card.setAttribute('header', options.header);
    if (options.footer) card.setAttribute('footer', options.footer);
    if (options.image) card.setAttribute('image', options.image);
    if (options.content) card.innerHTML = options.content;
    
    return card;
  }
}

customElements.define('dt-card', DtCard);
