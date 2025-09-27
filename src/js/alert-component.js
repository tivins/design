// src/js/alert-component.js
// Alert component based on dt-box

class DtAlert extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'dismissible', 'icon'];

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
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const dismissible = this.hasAttribute('dismissible') !== false; // Default to true unless explicitly set to false
    const icon = this.getAttribute('icon') || this.getDefaultIcon(variant);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      
      <dt-box 
        variant="${variant}" 
        size="${size}" 
        ${dismissible ? 'dismissible' : ''}
        icon="${icon}"
        role="alert"
        aria-live="polite"
      >
        <slot></slot>
      </dt-box>
    `;
  }

  getDefaultIcon(variant) {
    const iconMap = {
      'primary': 'info',
      'secondary': 'info',
      'success': 'check',
      'danger': 'alert-circle',
      'warning': 'alert-triangle',
      'info': 'help',
      'light': 'info',
      'dark': 'info'
    };
    return iconMap[variant] || 'info';
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

  setDismissible(dismissible) {
    if (dismissible) {
      this.setAttribute('dismissible', '');
    } else {
      this.removeAttribute('dismissible');
    }
  }

  dismiss() {
    const box = this.shadowRoot.querySelector('dt-box');
    if (box) {
      box.dismiss();
    }
  }

  static create(options = {}) {
    const alert = document.createElement('dt-alert');
    
    if (options.variant) alert.setAttribute('variant', options.variant);
    if (options.size) alert.setAttribute('size', options.size);
    if (options.icon) alert.setAttribute('icon', options.icon);
    if (options.dismissible) alert.setAttribute('dismissible', '');
    if (options.content) alert.textContent = options.content;
    
    return alert;
  }
}

customElements.define('dt-alert', DtAlert);
