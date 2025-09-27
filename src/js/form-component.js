// src/js/form-component.js
// Form component for consistent form styling

class DtForm extends HTMLElement {
  static observedAttributes = ['method', 'action', 'novalidate'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const method = this.getAttribute('method') || 'post';
    const action = this.getAttribute('action') || '';
    const novalidate = this.hasAttribute('novalidate');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .form {
          width: 100%;
        }

        .form-group {
          margin-bottom: var(--spacing-md, 1rem);
        }

        .form-label {
          display: inline-block;
          margin-bottom: var(--spacing-xs, 0.25rem);
          font-weight: var(--font-weight-medium, 500);
          color: var(--gray-700);
        }

        .form-control {
          display: block;
          width: 100%;
          padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 0.75rem);
          font-size: var(--font-size-base, 1rem);
          font-weight: var(--font-weight-normal, 400);
          line-height: 1.5;
          color: var(--gray-900);
          background-color: var(--white);
          background-clip: padding-box;
          border: 1px solid var(--gray-400);
          border-radius: var(--border-radius-md, 0.375rem);
          transition: border-color var(--transition-normal, 0.2s ease-in-out), box-shadow var(--transition-normal, 0.2s ease-in-out);
        }

        .form-control:focus {
          color: var(--gray-900);
          background-color: var(--white);
          border-color: var(--primary-color);
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .form-control::placeholder {
          color: var(--gray-500);
          opacity: 1;
        }

        .form-control:disabled,
        .form-control[readonly] {
          background-color: var(--gray-100);
          opacity: 1;
        }

        .form-check {
          position: relative;
          display: block;
          padding-left: 1.25rem;
        }

        .form-check-input {
          position: absolute;
          margin-top: 0.3rem;
          margin-left: -1.25rem;
        }

        .form-check-label {
          margin-bottom: 0;
          color: var(--gray-700);
        }

        .form-check-input:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .form-check-input:focus {
          border-color: var(--primary-color);
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        /* Dark theme support */
        [data-theme="dark"] .form-label {
          color: var(--text-secondary);
        }

        [data-theme="dark"] .form-control {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
          border-color: var(--gray-600);
        }

        [data-theme="dark"] .form-control:focus {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
          border-color: var(--primary-color);
        }

        [data-theme="dark"] .form-control:disabled,
        [data-theme="dark"] .form-control[readonly] {
          background-color: var(--bg-tertiary);
        }

        [data-theme="dark"] .form-check-label {
          color: var(--text-secondary);
        }
      </style>
      
      <form 
        class="form"
        method="${method}"
        ${action ? `action="${action}"` : ''}
        ${novalidate ? 'novalidate' : ''}
      >
        <slot></slot>
      </form>
    `;
  }

  // Public methods
  setMethod(method) {
    this.setAttribute('method', method);
  }

  setAction(action) {
    this.setAttribute('action', action);
  }

  setNovalidate(novalidate) {
    if (novalidate) {
      this.setAttribute('novalidate', '');
    } else {
      this.removeAttribute('novalidate');
    }
  }

  static create(options = {}) {
    const form = document.createElement('dt-form');
    
    if (options.method) form.setAttribute('method', options.method);
    if (options.action) form.setAttribute('action', options.action);
    if (options.novalidate) form.setAttribute('novalidate', '');
    if (options.content) form.innerHTML = options.content;
    
    return form;
  }
}

customElements.define('dt-form', DtForm);
