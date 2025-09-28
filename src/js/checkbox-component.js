// src/js/checkbox-component.js
// Modern Checkbox/Switch Component - 2025 Design Trends

class DtCheckbox extends HTMLElement {
  static observedAttributes = ['checked', 'disabled', 'size', 'variant', 'label'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.updateCheckedState();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      // Only update visual state for non-state attributes
      if (name === 'size' || name === 'variant' || name === 'label') {
        this.render();
        this.updateCheckedState();
      }
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  render() {
    const checked = this.checked;
    const disabled = this.disabled;
    const size = this.getAttribute('size') || 'md';
    const variant = this.getAttribute('variant') || 'primary';
    const label = this.getAttribute('label') || '';
    const content = this.innerHTML || this.textContent || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          cursor: pointer;
          user-select: none;
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        :host(:hover) {
          background-color: rgba(var(--primary-color-rgb), 0.05);
        }

        :host(:focus-within) {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
          border-radius: 8px;
        }

        :host([disabled]) {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          cursor: pointer;
        }

        /* Modern Switch Design - More Delicate & Faster */
        .checkbox-switch {
          position: relative;
          width: 2.5rem;
          height: 1.25rem;
          background: var(--gray-200);
          border-radius: 0.75rem;
          transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid var(--gray-300);
          overflow: hidden;
          flex-shrink: 0;
        }

        /* Switch thumb (bouton circulaire) - More Delicate & Faster */
        .checkbox-switch::before {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          width: 1rem;
          height: 1rem;
          background: white;
          border-radius: 50%;
          transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          z-index: 2;
        }

        /* Background gradient when checked */
        .checkbox-switch::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          opacity: 0;
          transition: opacity 0.15s ease;
          border-radius: 0.75rem;
        }

        /* Checked state */
        .checkbox-switch.checked {
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkbox-switch.checked::before {
          transform: translateX(1.25rem);
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .checkbox-switch.checked::after {
          opacity: 1;
        }

        /* Disabled state */
        .checkbox-switch.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: var(--gray-100);
        }

        :host([disabled]):hover {
          transform: none;
        }

        /* Size variants - More Delicate */
        .checkbox-switch.size-sm {
          width: 2rem;
          height: 1rem;
        }

        .checkbox-switch.size-sm::before {
          width: 0.75rem;
          height: 0.75rem;
        }

        .checkbox-switch.size-sm.checked::before {
          transform: translateX(1rem);
        }

        .checkbox-switch.size-lg {
          width: 3rem;
          height: 1.5rem;
        }

        .checkbox-switch.size-lg::before {
          width: 1.25rem;
          height: 1.25rem;
        }

        .checkbox-switch.size-lg.checked::before {
          transform: translateX(1.5rem);
        }

        /* Variant colors - Fixed with higher specificity */
        .checkbox-switch.secondary.checked {
          background: var(--secondary-color) !important;
          border-color: var(--secondary-color) !important;
        }

        .checkbox-switch.secondary.checked::after {
          background: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark)) !important;
        }

        .checkbox-switch.success.checked {
          background: var(--success-color) !important;
          border-color: var(--success-color) !important;
        }

        .checkbox-switch.success.checked::after {
          background: linear-gradient(135deg, var(--success-color), var(--success-dark)) !important;
        }

        .checkbox-switch.danger.checked {
          background: var(--danger-color) !important;
          border-color: var(--danger-color) !important;
        }

        .checkbox-switch.danger.checked::after {
          background: linear-gradient(135deg, var(--danger-color), var(--danger-dark)) !important;
        }

        .checkbox-switch.warning.checked {
          background: var(--warning-color) !important;
          border-color: var(--warning-color) !important;
        }

        .checkbox-switch.warning.checked::after {
          background: linear-gradient(135deg, var(--warning-color), var(--warning-dark)) !important;
        }

        .checkbox-switch.info.checked {
          background: var(--info-color) !important;
          border-color: var(--info-color) !important;
        }

        .checkbox-switch.info.checked::after {
          background: linear-gradient(135deg, var(--info-color), var(--info-dark)) !important;
        }

        /* Label styling - More Delicate */
        .checkbox-label {
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--gray-600);
          line-height: 1.5;
          cursor: pointer;
          transition: color 0.2s ease;
          flex: 1;
        }

        .checkbox-label:hover {
          color: var(--gray-800);
        }

        .checkbox-label.size-sm {
          font-size: 0.75rem;
        }

        .checkbox-label.size-lg {
          font-size: 1rem;
        }

        /* Hidden input for accessibility */
        .checkbox-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        /* Dark theme support */
        [data-theme="dark"] .checkbox-switch {
          background: var(--gray-700);
          border-color: var(--gray-600);
        }

        [data-theme="dark"] .checkbox-switch::before {
          background: var(--gray-200);
        }

        [data-theme="dark"] .checkbox-switch.checked {
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        [data-theme="dark"] .checkbox-switch.checked::before {
          background: white;
        }

        [data-theme="dark"] .checkbox-switch.disabled {
          background: var(--gray-800);
        }

        [data-theme="dark"] .checkbox-label {
          color: var(--text-primary);
        }

        [data-theme="dark"] .checkbox-label:hover {
          color: var(--primary-light);
        }

        /* Subtle micro-interactions */
        .checkbox-switch:active::before {
          transform: scale(0.98);
        }

        .checkbox-switch.checked:active::before {
          transform: translateX(1.25rem) scale(0.98);
        }

        .checkbox-switch:focus-within {
          box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.15);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .checkbox-switch {
            width: 2.75rem;
            height: 1.375rem;
          }

          .checkbox-switch::before {
            width: 1.125rem;
            height: 1.125rem;
          }

          .checkbox-switch.checked::before {
            transform: translateX(1.375rem);
          }
        }
      </style>
      <div class="checkbox-container">
        <div class="checkbox-switch ${size} ${variant} ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}">
        </div>
        ${label || content ? `
          <label class="checkbox-label ${size}">${label || content}</label>
        ` : ''}
        <input type="checkbox" class="checkbox-input" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
      </div>
    `;
  }

  setupEventListeners() {
    const container = this.shadowRoot.querySelector('.checkbox-container');

    if (container) {
      container.addEventListener('click', (e) => {
        if (!this.disabled) {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    // Handle keyboard events
    this.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (!this.disabled) {
          e.preventDefault();
          this.toggle();
        }
      }
    });
  }

  cleanup() {
    // Cleanup event listeners if needed
  }

  handleChange(e) {
    const isChecked = e.target.checked;
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('dt-checkbox-change', {
      detail: { 
        checked: isChecked,
        checkbox: this 
      },
      bubbles: true
    }));
  }

  toggle() {
    if (this.disabled) return;
    
    // Normal toggle behavior
    const isCurrentlyChecked = this.hasAttribute('checked');
    if (isCurrentlyChecked) {
      this.removeAttribute('checked');
    } else {
      this.setAttribute('checked', '');
    }
    
    // Update the visual state
    this.updateCheckedState();

    // Dispatch change event
    this.handleChange({ target: { checked: this.checked } });
  }

  updateCheckedState() {
    const checkboxSwitch = this.shadowRoot.querySelector('.checkbox-switch');
    const checkboxInput = this.shadowRoot.querySelector('.checkbox-input');
    
    if (checkboxSwitch && checkboxInput) {
      const isChecked = this.hasAttribute('checked');
      const isDisabled = this.hasAttribute('disabled');
      
      checkboxSwitch.classList.toggle('checked', isChecked);
      checkboxSwitch.classList.toggle('disabled', isDisabled);
      
      // Don't update checkboxInput.checked to avoid triggering change events
      checkboxInput.disabled = isDisabled;
    }
  }

  // Public methods
  setChecked(checked) {
    this.checked = checked;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setLabel(label) {
    this.setAttribute('label', label);
  }

  // Static method for programmatic creation
  static create(options = {}) {
    const checkbox = document.createElement('dt-checkbox');
    
    if (options.checked) checkbox.setAttribute('checked', '');
    if (options.disabled) checkbox.setAttribute('disabled', '');
    if (options.size) checkbox.setAttribute('size', options.size);
    if (options.variant) checkbox.setAttribute('variant', options.variant);
    if (options.label) checkbox.setAttribute('label', options.label);
    
    return checkbox;
  }
}

// Register the custom element
customElements.define('dt-checkbox', DtCheckbox);