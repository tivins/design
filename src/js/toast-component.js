// src/js/toast-component.js
// Toast component based on dt-box

class DtToast extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'duration', 'position', 'icon'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.timeout = null;
    this.isVisible = true;
  }

  connectedCallback() {
    this.render();
    this.setupAutoDismiss();
    this.setupPositioning();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      if (name === 'duration') {
        this.setupAutoDismiss();
      }
      if (name === 'position') {
        this.setupPositioning();
      }
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'info';
    const size = this.getAttribute('size') || 'md';
    const icon = this.getAttribute('icon') || this.getDefaultIcon(variant);
    const duration = parseInt(this.getAttribute('duration')) || 5000;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          z-index: 1050;
          max-width: 350px;
          margin: var(--spacing-sm, 0.5rem);
          transition: all var(--transition-normal, 0.3s ease-in-out);
          opacity: 1;
          transform: translateX(0);
        }

        :host(.fade-out) {
          opacity: 0;
          transform: translateX(100%);
          max-height: 0;
          margin: 0;
          overflow: hidden;
        }

        :host([position="top-left"]) {
          top: var(--spacing-md, 1rem);
          left: var(--spacing-md, 1rem);
        }

        :host([position="top-right"]) {
          top: var(--spacing-md, 1rem);
          right: var(--spacing-md, 1rem);
        }

        :host([position="top-center"]) {
          top: var(--spacing-md, 1rem);
          left: 50%;
          transform: translateX(-50%);
        }

        :host([position="bottom-left"]) {
          bottom: var(--spacing-md, 1rem);
          left: var(--spacing-md, 1rem);
        }

        :host([position="bottom-right"]) {
          bottom: var(--spacing-md, 1rem);
          right: var(--spacing-md, 1rem);
        }

        :host([position="bottom-center"]) {
          bottom: var(--spacing-md, 1rem);
          left: 50%;
          transform: translateX(-50%);
        }

        :host(.fade-out[position="top-center"]),
        :host(.fade-out[position="bottom-center"]) {
          transform: translateX(-50%) translateY(-20px);
        }

        :host(.fade-out[position="top-left"]),
        :host(.fade-out[position="top-right"]) {
          transform: translateY(-20px);
        }

        :host(.fade-out[position="bottom-left"]),
        :host(.fade-out[position="bottom-right"]) {
          transform: translateY(20px);
        }

        /* Toast specific styles */
        dt-box {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: var(--border-radius-lg, 0.5rem);
        }

        /* Progress bar */
        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 0 0 var(--border-radius-lg, 0.5rem) var(--border-radius-lg, 0.5rem);
          transition: width linear;
        }

        /* Responsive */
        @media (max-width: 768px) {
          :host {
            max-width: calc(100vw - 2rem);
            margin: var(--spacing-xs, 0.25rem);
          }
        }
      </style>
      
      <dt-box 
        variant="${variant}" 
        size="${size}" 
        dismissible
        icon="${icon}"
        role="alert"
        aria-live="assertive"
      >
        <slot></slot>
        <div class="toast-progress" style="width: 100%; transition-duration: ${duration}ms;"></div>
      </dt-box>
    `;

    // Setup progress bar animation
    this.setupProgressBar(duration);
  }

  getDefaultIcon(variant) {
    const iconMap = {
      'primary': 'info',
      'secondary': 'info',
      'success': 'check',
      'danger': 'x',
      'warning': 'alert-triangle',
      'info': 'help',
      'light': 'info',
      'dark': 'info'
    };
    return iconMap[variant] || 'info';
  }

  setupAutoDismiss() {
    const duration = parseInt(this.getAttribute('duration')) || 5000;
    
    if (duration > 0) {
      this.timeout = setTimeout(() => {
        this.dismiss();
      }, duration);
    }
  }

  setupPositioning() {
    const position = this.getAttribute('position') || 'top-right';
    this.setAttribute('position', position);
  }

  setupProgressBar(duration) {
    const progressBar = this.shadowRoot.querySelector('.toast-progress');
    if (progressBar && duration > 0) {
      // Start progress bar animation
      setTimeout(() => {
        progressBar.style.width = '0%';
      }, 100);
    }
  }

  cleanup() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  dismiss() {
    if (!this.isVisible) return;
    
    this.isVisible = false;
    this.classList.add('fade-out');
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('dt-toast-dismiss', {
      detail: { toast: this },
      bubbles: true
    }));
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }, 300);
  }

  // Public methods
  setVariant(variant) {
    this.setAttribute('variant', variant);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setDuration(duration) {
    this.setAttribute('duration', duration);
  }

  setPosition(position) {
    this.setAttribute('position', position);
  }

  setIcon(icon) {
    this.setAttribute('icon', icon);
  }

  show() {
    this.isVisible = true;
    this.classList.remove('fade-out');
    this.setupAutoDismiss();
  }

  hide() {
    this.dismiss();
  }

  static create(options = {}) {
    const toast = document.createElement('dt-toast');
    
    if (options.variant) toast.setAttribute('variant', options.variant);
    if (options.size) toast.setAttribute('size', options.size);
    if (options.duration) toast.setAttribute('duration', options.duration);
    if (options.position) toast.setAttribute('position', options.position);
    if (options.icon) toast.setAttribute('icon', options.icon);
    if (options.content) toast.textContent = options.content;
    
    return toast;
  }

  // Static method to show toast
  static show(content, options = {}) {
    const toast = DtToast.create({ content, ...options });
    document.body.appendChild(toast);
    return toast;
  }
}

customElements.define('dt-toast', DtToast);
