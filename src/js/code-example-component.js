// src/js/code-example-component.js
// Code example component for displaying interactive code snippets

class DtCodeExample extends HTMLElement {
  static observedAttributes = ['language', 'title', 'copyable'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEventListeners();
    }
  }

  render() {
    const language = this.getAttribute('language') || 'html';
    const title = this.getAttribute('title') || '';
    const copyable = this.hasAttribute('copyable');
    const codeContent = this.innerHTML.trim();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 1rem 0;
        }

        .code-example-container {
          border: 1px solid var(--border-color, #e1e5e9);
          border-radius: var(--border-radius, 0.375rem);
          overflow: hidden;
          background: var(--background-color, #ffffff);
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--surface-color, #f8f9fa);
          border-bottom: 1px solid var(--border-color, #e1e5e9);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .code-title {
          color: var(--text-color, #212529);
          margin: 0;
        }

        .code-actions {
          display: flex;
          gap: 0.5rem;
        }

        .copy-button {
          background: none;
          border: 1px solid var(--border-color, #e1e5e9);
          border-radius: var(--border-radius-sm, 0.25rem);
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          cursor: pointer;
          color: var(--text-color, #212529);
          transition: all 0.2s ease;
        }

        .copy-button:hover {
          background: var(--surface-hover-color, #e9ecef);
          border-color: var(--primary-color, #0d6efd);
        }

        .copy-button.copied {
          background: var(--success-color, #198754);
          color: white;
          border-color: var(--success-color, #198754);
        }

        .code-content {
          position: relative;
        }

        pre {
          margin: 0;
          padding: 1rem;
          background: var(--code-background, #f8f9fa);
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        code {
          color: var(--code-color, #212529);
          background: none;
          padding: 0;
          font-size: inherit;
        }

        .language-label {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: var(--surface-color, #f8f9fa);
          color: var(--text-muted-color, #6c757d);
          padding: 0.25rem 0.5rem;
          border-radius: var(--border-radius-sm, 0.25rem);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          .code-example-container {
            border-color: var(--border-color-dark, #495057);
            background: var(--background-color-dark, #212529);
          }

          .code-header {
            background: var(--surface-color-dark, #343a40);
            border-bottom-color: var(--border-color-dark, #495057);
          }

          .code-title {
            color: var(--text-color-dark, #f8f9fa);
          }

          .copy-button {
            border-color: var(--border-color-dark, #495057);
            color: var(--text-color-dark, #f8f9fa);
          }

          .copy-button:hover {
            background: var(--surface-hover-color-dark, #495057);
          }

          pre {
            background: var(--code-background-dark, #1a1d20);
          }

          code {
            color: var(--code-color-dark, #f8f9fa);
          }

          .language-label {
            background: var(--surface-color-dark, #343a40);
            color: var(--text-muted-color-dark, #adb5bd);
          }
        }
      </style>

      <div class="code-example-container">
        ${title || copyable ? `
          <div class="code-header">
            ${title ? `<h4 class="code-title">${title}</h4>` : '<div></div>'}
            ${copyable ? `
              <div class="code-actions">
                <button class="copy-button" type="button">
                  <dt-icon name="copy" size="sm"></dt-icon>
                  <span class="copy-text">Copy</span>
                </button>
              </div>
            ` : ''}
          </div>
        ` : ''}
        
        <div class="code-content">
          <pre><code class="language-${language}">${this.escapeHtml(codeContent)}</code></pre>
          <div class="language-label">${language}</div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const copyButton = this.shadowRoot.querySelector('.copy-button');
    if (copyButton) {
      copyButton.addEventListener('click', () => this.copyToClipboard());
    }
  }

  escapeHtml(text) {
    // Don't double-encode if already encoded
    if (text.includes('&lt;') || text.includes('&gt;') || text.includes('&amp;')) {
      return text;
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async copyToClipboard() {
    const codeContent = this.innerHTML.trim();
    const copyButton = this.shadowRoot.querySelector('.copy-button');
    const copyText = this.shadowRoot.querySelector('.copy-text');

    try {
      await navigator.clipboard.writeText(codeContent);
      
      // Visual feedback
      copyButton.classList.add('copied');
      copyText.textContent = 'Copied!';
      
      setTimeout(() => {
        copyButton.classList.remove('copied');
        copyText.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = codeContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      copyButton.classList.add('copied');
      copyText.textContent = 'Copied!';
      
      setTimeout(() => {
        copyButton.classList.remove('copied');
        copyText.textContent = 'Copy';
      }, 2000);
    }
  }

  // Public methods
  setLanguage(language) {
    this.setAttribute('language', language);
  }

  setTitle(title) {
    this.setAttribute('title', title);
  }

  setCopyable(copyable) {
    if (copyable) {
      this.setAttribute('copyable', '');
    } else {
      this.removeAttribute('copyable');
    }
  }

  static create(options = {}) {
    const codeExample = document.createElement('dt-code-example');
    
    if (options.language) codeExample.setAttribute('language', options.language);
    if (options.title) codeExample.setAttribute('title', options.title);
    if (options.copyable) codeExample.setAttribute('copyable', '');
    if (options.content) codeExample.innerHTML = options.content;
    
    return codeExample;
  }
}

customElements.define('dt-code-example', DtCodeExample);
