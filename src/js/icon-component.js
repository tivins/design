// Icon Web Component
class IconComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['name', 'size', 'color', 'class'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get name() {
    return this.getAttribute('name') || 'help';
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  get color() {
    return this.getAttribute('color') || '';
  }

  get customClass() {
    return this.getAttribute('class') || '';
  }

  get sizeValue() {
    const sizes = {
      'xs': '0.75rem',
      'sm': '0.875rem', 
      'md': '1rem',
      'lg': '1.25rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem'
    };
    return sizes[this.size] || sizes['md'];
  }

  get colorClass() {
    if (!this.color) return '';
    return `icon-${this.color}`;
  }

  render() {
    const iconPath = window.iconRegistry.getIcon(this.name);
    
    if (!iconPath) {
      console.warn(`Icon "${this.name}" not found in registry`);
      return;
    }

    const size = this.sizeValue;
    const colorClass = this.colorClass;
    const customClass = this.customClass;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: ${size};
          height: ${size};
          vertical-align: middle;
        }
        
        svg {
          width: 100%;
          height: 100%;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          display: block;
        }
        
        /* Color classes */
        .icon-primary { color: var(--primary-color); }
        .icon-secondary { color: var(--secondary-color); }
        .icon-success { color: var(--success-color); }
        .icon-danger { color: var(--danger-color); }
        .icon-warning { color: var(--warning-color); }
        .icon-info { color: var(--info-color); }
        .icon-light { color: var(--light-color); }
        .icon-dark { color: var(--dark-color); }
        .icon-muted { color: var(--gray-600); }
        .icon-white { color: var(--white); }
        
        /* Animation classes */
        .icon-spin {
          animation: icon-spin 1s linear infinite;
        }
        
        .icon-pulse {
          animation: icon-pulse 2s ease-in-out infinite;
        }
        
        .icon-bounce {
          animation: icon-bounce 1s ease-in-out infinite;
        }
        
        @keyframes icon-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes icon-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes icon-bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
          40%, 43% { transform: translate3d(0, -8px, 0); }
          70% { transform: translate3d(0, -4px, 0); }
          90% { transform: translate3d(0, -2px, 0); }
        }
      </style>
      
      <svg viewBox="0 0 24 24" class="${colorClass} ${customClass}">
        ${iconPath}
      </svg>
    `;
  }

  // Public methods
  setIcon(name) {
    this.setAttribute('name', name);
  }

  setSize(size) {
    this.setAttribute('size', size);
  }

  setColor(color) {
    this.setAttribute('color', color);
  }

  setAnimation(animation) {
    this.setAttribute('class', animation);
  }

  // Static method to create icon programmatically
  static create(name, options = {}) {
    const icon = document.createElement('dt-icon');
    icon.setAttribute('name', name);
    
    if (options.size) icon.setAttribute('size', options.size);
    if (options.color) icon.setAttribute('color', options.color);
    if (options.class) icon.setAttribute('class', options.class);
    
    return icon;
  }
}

// Register the custom element
customElements.define('dt-icon', IconComponent);

// Export for global access
window.DtIcon = IconComponent;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IconComponent;
}
