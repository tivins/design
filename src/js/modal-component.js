// src/js/modal-component.js
// Modal component based on dt-card architecture

class DtModal extends HTMLElement {
  static observedAttributes = [
    'open', 
    'title', 
    'show-close-button', 
    'show-header', 
    'show-footer', 
    'size', 
    'variant',
    'backdrop-closable'
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.backdropElement = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      
      // Handle open/close state changes
      if (name === 'open') {
        if (newValue === 'true' || newValue === '') {
          this.open();
        } else {
          this.close();
        }
      }
    }
  }

  setupEventListeners() {
    // Close button event
    const closeButton = this.shadowRoot.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

    // Backdrop click event
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop && this.getAttribute('backdrop-closable') !== 'false') {
          this.close();
        }
      });
    }

    // Escape key event
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  render() {
    const title = this.getAttribute('title') || '';
    const showCloseButton = this.getAttribute('show-close-button') !== 'false';
    const showHeader = this.getAttribute('show-header') !== 'false';
    const showFooter = this.getAttribute('show-footer') !== 'false';
    const size = this.getAttribute('size') || 'md';
    const variant = this.getAttribute('variant') || 'default';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
        }

        :host([open]) {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: -1;
        }

        .modal-container {
          background-color: var(--white);
          border-radius: var(--border-radius-lg, 0.75rem);
          box-shadow: var(--shadow-xl);
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Dark theme support */
        :host-context([data-theme="dark"]) .modal-container {
          background-color: #161b22;
          border: 1px solid #495057;
        }

        :host-context([data-theme="dark"]) .modal-header {
          background-color: #21262d;
          border-bottom-color: #495057;
        }

        :host-context([data-theme="dark"]) .modal-footer {
          background-color: #21262d;
          border-top-color: #495057;
        }

        :host-context([data-theme="dark"]) .modal-title {
          color: #f0f6fc;
        }

        :host-context([data-theme="dark"]) .modal-close {
          color: #8b949e;
        }

        :host-context([data-theme="dark"]) .modal-close:hover {
          color: #f0f6fc;
        }

        /* Size variants */
        :host([size="sm"]) .modal-container {
          width: 400px;
        }

        :host([size="md"]) .modal-container {
          width: 600px;
        }

        :host([size="lg"]) .modal-container {
          width: 800px;
        }

        :host([size="xl"]) .modal-container {
          width: 1000px;
        }

        :host([size="full"]) .modal-container {
          width: 95vw;
          height: 95vh;
        }

        /* Variant styles */
        :host([variant="primary"]) .modal-container {
          border-top: 4px solid var(--primary-color);
        }

        :host([variant="success"]) .modal-container {
          border-top: 4px solid var(--success-color);
        }

        :host([variant="warning"]) .modal-container {
          border-top: 4px solid var(--warning-color);
        }

        :host([variant="danger"]) .modal-container {
          border-top: 4px solid var(--danger-color);
        }

        :host([variant="info"]) .modal-container {
          border-top: 4px solid var(--info-color);
        }

        .modal-header {
          padding: var(--spacing-lg, 1.5rem);
          background-color: var(--gray-100);
          border-bottom: 1px solid var(--gray-300);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .modal-title {
          margin: 0;
          font-size: var(--font-size-xl, 1.5rem);
          font-weight: var(--font-weight-semibold, 600);
          color: var(--gray-900);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: var(--font-size-xl, 1.5rem);
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-xs, 0.25rem);
          border-radius: var(--border-radius-sm, 0.25rem);
          transition: all var(--transition-normal, 0.2s ease-in-out);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .modal-close:hover {
          color: var(--gray-700);
          background-color: var(--gray-200);
        }

        .modal-close:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }

        .modal-body {
          padding: var(--spacing-lg, 1.5rem);
          flex: 1;
          overflow-y: auto;
        }

        .modal-footer {
          padding: var(--spacing-lg, 1.5rem);
          background-color: var(--gray-100);
          border-top: 1px solid var(--gray-300);
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md, 1rem);
          flex-shrink: 0;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .modal-container {
            width: 95vw !important;
            max-height: 95vh;
            margin: var(--spacing-md, 1rem);
          }

          .modal-header,
          .modal-body,
          .modal-footer {
            padding: var(--spacing-md, 1rem);
          }
        }
      </style>
      
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        ${showHeader ? `
          <div class="modal-header">
            <h2 class="modal-title">${title}</h2>
            ${showCloseButton ? '<button class="modal-close" aria-label="Close modal">&times;</button>' : ''}
          </div>
        ` : ''}
        
        <div class="modal-body">
          <slot></slot>
        </div>
        
        ${showFooter ? `
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        ` : ''}
      </div>
    `;

    // Re-setup event listeners after re-render
    this.setupEventListeners();
  }

  // Public methods
  open() {
    this.isOpen = true;
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    
    // Ensure the modal is visible
    this.style.display = 'flex';
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('modal-open', {
      bubbles: true,
      detail: { modal: this }
    }));
  }

  close() {
    this.isOpen = false;
    this.removeAttribute('open');
    document.body.style.overflow = ''; // Restore body scroll
    
    // Hide the modal
    this.style.display = 'none';
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('modal-close', {
      bubbles: true,
      detail: { modal: this }
    }));
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  setTitle(title) {
    this.setAttribute('title', title);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setShowCloseButton(show) {
    this.setAttribute('show-close-button', show.toString());
  }

  setShowHeader(show) {
    this.setAttribute('show-header', show.toString());
  }

  setShowFooter(show) {
    this.setAttribute('show-footer', show.toString());
  }

  setBackdropClosable(closable) {
    this.setAttribute('backdrop-closable', closable.toString());
  }

  static create(options = {}) {
    const modal = document.createElement('dt-modal');
    
    if (options.title) modal.setAttribute('title', options.title);
    if (options.size) modal.setAttribute('size', options.size);
    if (options.variant) modal.setAttribute('variant', options.variant);
    if (options.showCloseButton !== undefined) modal.setAttribute('show-close-button', options.showCloseButton.toString());
    if (options.showHeader !== undefined) modal.setAttribute('show-header', options.showHeader.toString());
    if (options.showFooter !== undefined) modal.setAttribute('show-footer', options.showFooter.toString());
    if (options.backdropClosable !== undefined) modal.setAttribute('backdrop-closable', options.backdropClosable.toString());
    if (options.content) modal.innerHTML = options.content;
    if (options.footerContent) {
      const footerSlot = document.createElement('div');
      footerSlot.setAttribute('slot', 'footer');
      footerSlot.innerHTML = options.footerContent;
      modal.appendChild(footerSlot);
    }
    
    return modal;
  }
}

customElements.define('dt-modal', DtModal);
