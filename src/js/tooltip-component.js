// src/js/tooltip-component.js
// Web Component for animated tooltips

class DtTooltip extends HTMLElement {
  static observedAttributes = ['text', 'position', 'delay', 'theme'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tooltipElement = null;
    this.showTimeout = null;
    this.hideTimeout = null;
    this.isVisible = false;
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
    const tooltipText = this.getAttribute('text') || '';
    const position = this.getAttribute('position') || 'top';
    const delay = parseInt(this.getAttribute('delay')) || 500;
    const theme = this.getAttribute('theme') || 'dark';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        .tooltip-trigger {
          display: inline-block;
          cursor: pointer;
        }

        .tooltip {
          position: absolute;
          z-index: 1000;
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-sm, 0.25rem);
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25;
          white-space: nowrap;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          max-width: 200px;
          word-wrap: break-word;
          white-space: normal;
        }

        .tooltip.show {
          opacity: 1;
          transform: scale(1);
        }

        /* Position variants */
        .tooltip.top {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          margin-bottom: 0.5rem;
        }

        .tooltip.top.show {
          transform: translateX(-50%) scale(1);
        }

        .tooltip.bottom {
          top: 100%;
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          margin-top: 0.5rem;
        }

        .tooltip.bottom.show {
          transform: translateX(-50%) scale(1);
        }

        .tooltip.left {
          right: 100%;
          top: 50%;
          transform: translateY(-50%) scale(0.8);
          margin-right: 0.5rem;
        }

        .tooltip.left.show {
          transform: translateY(-50%) scale(1);
        }

        .tooltip.right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%) scale(0.8);
          margin-left: 0.5rem;
        }

        .tooltip.right.show {
          transform: translateY(-50%) scale(1);
        }

        /* Theme variants */
        .tooltip.dark {
          background-color: var(--dark-color, #1f2937);
          color: var(--white, #ffffff);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .tooltip.light {
          background-color: var(--white, #ffffff);
          color: var(--dark-color, #1f2937);
          border: 1px solid var(--gray-300, #d1d5db);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .tooltip.primary {
          background-color: var(--primary-color, #3b82f6);
          color: var(--white, #ffffff);
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2);
        }

        .tooltip.success {
          background-color: var(--success-color, #10b981);
          color: var(--white, #ffffff);
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3), 0 2px 4px -1px rgba(16, 185, 129, 0.2);
        }

        .tooltip.warning {
          background-color: var(--warning-color, #f59e0b);
          color: var(--white, #ffffff);
          box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3), 0 2px 4px -1px rgba(245, 158, 11, 0.2);
        }

        .tooltip.danger {
          background-color: var(--danger-color, #ef4444);
          color: var(--white, #ffffff);
          box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3), 0 2px 4px -1px rgba(239, 68, 68, 0.2);
        }

        /* Arrow */
        .tooltip::before {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
        }

        .tooltip.top::before {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid;
        }

        .tooltip.bottom::before {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid;
        }

        .tooltip.left::before {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid;
        }

        .tooltip.right::before {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid;
        }

        /* Dark theme arrow colors */
        .tooltip.dark.top::before {
          border-top-color: var(--dark-color, #1f2937);
        }
        .tooltip.dark.bottom::before {
          border-bottom-color: var(--dark-color, #1f2937);
        }
        .tooltip.dark.left::before {
          border-left-color: var(--dark-color, #1f2937);
        }
        .tooltip.dark.right::before {
          border-right-color: var(--dark-color, #1f2937);
        }

        .tooltip.light.top::before {
          border-top-color: var(--white, #ffffff);
        }
        .tooltip.light.bottom::before {
          border-bottom-color: var(--white, #ffffff);
        }
        .tooltip.light.left::before {
          border-left-color: var(--white, #ffffff);
        }
        .tooltip.light.right::before {
          border-right-color: var(--white, #ffffff);
        }

        .tooltip.primary.top::before {
          border-top-color: var(--primary-color, #3b82f6);
        }
        .tooltip.primary.bottom::before {
          border-bottom-color: var(--primary-color, #3b82f6);
        }
        .tooltip.primary.left::before {
          border-left-color: var(--primary-color, #3b82f6);
        }
        .tooltip.primary.right::before {
          border-right-color: var(--primary-color, #3b82f6);
        }

        .tooltip.success.top::before {
          border-top-color: var(--success-color, #10b981);
        }
        .tooltip.success.bottom::before {
          border-bottom-color: var(--success-color, #10b981);
        }
        .tooltip.success.left::before {
          border-left-color: var(--success-color, #10b981);
        }
        .tooltip.success.right::before {
          border-right-color: var(--success-color, #10b981);
        }

        .tooltip.warning.top::before {
          border-top-color: var(--warning-color, #f59e0b);
        }
        .tooltip.warning.bottom::before {
          border-bottom-color: var(--warning-color, #f59e0b);
        }
        .tooltip.warning.left::before {
          border-left-color: var(--warning-color, #f59e0b);
        }
        .tooltip.warning.right::before {
          border-right-color: var(--warning-color, #f59e0b);
        }

        .tooltip.danger.top::before {
          border-top-color: var(--danger-color, #ef4444);
        }
        .tooltip.danger.bottom::before {
          border-bottom-color: var(--danger-color, #ef4444);
        }
        .tooltip.danger.left::before {
          border-left-color: var(--danger-color, #ef4444);
        }
        .tooltip.danger.right::before {
          border-right-color: var(--danger-color, #ef4444);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .tooltip {
            max-width: 150px;
            font-size: 0.75rem;
          }
        }
      </style>
      
      <div class="tooltip-trigger">
        <slot></slot>
      </div>
      
      <div class="tooltip ${position} ${theme}" part="tooltip">
        ${tooltipText}
      </div>
    `;

    this.tooltipElement = this.shadowRoot.querySelector('.tooltip');
  }

  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.tooltip-trigger');
    
    trigger.addEventListener('mouseenter', () => this.show());
    trigger.addEventListener('mouseleave', () => this.hide());
    trigger.addEventListener('focus', () => this.show());
    trigger.addEventListener('blur', () => this.hide());
    
    // Touch events for mobile
    trigger.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }

  show() {
    if (this.isVisible) return;
    
    this.clearTimeouts();
    
    const delay = parseInt(this.getAttribute('delay')) || 500;
    this.showTimeout = setTimeout(() => {
      this.tooltipElement.classList.add('show');
      this.isVisible = true;
    }, delay);
  }

  hide() {
    this.clearTimeouts();
    
    this.hideTimeout = setTimeout(() => {
      this.tooltipElement.classList.remove('show');
      this.isVisible = false;
    }, 100);
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  clearTimeouts() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  cleanup() {
    this.clearTimeouts();
  }

  // Public methods
  setText(text) {
    this.setAttribute('text', text);
  }

  setPosition(position) {
    this.setAttribute('position', position);
  }

  setTheme(theme) {
    this.setAttribute('theme', theme);
  }

  setDelay(delay) {
    this.setAttribute('delay', delay);
  }

  static create(text, options = {}) {
    const tooltip = document.createElement('dt-tooltip');
    tooltip.setAttribute('text', text);
    if (options.position) tooltip.setAttribute('position', options.position);
    if (options.theme) tooltip.setAttribute('theme', options.theme);
    if (options.delay) tooltip.setAttribute('delay', options.delay);
    return tooltip;
  }
}

customElements.define('dt-tooltip', DtTooltip);

// Export for global access
window.DtTooltip = DtTooltip;