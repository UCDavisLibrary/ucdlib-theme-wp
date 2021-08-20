import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import marketingHighlightStyles from "@ucd-lib/theme-sass/4_component/_marketing-highlight.css.js";
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    input {
      border: none;
      text-align: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      color: inherit;
      background-color: inherit;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    input:focus {
      border: none;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
  `;

  return [
    marketingHighlightStyles,
    brandStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <a href=${this.href} class=${classMap(this._getBaseClasses())} @click=${e => e.preventDefault()}>
    <div class="${this._prefix}__body">
      <h3 class="${this._prefix}__title">
        ${this.canEditTitle ? html`
        <input 
          type="text" 
          .value=${this.title}
          placeholder="Write a title...">
        ` : html`
          <span>${this.title}</span>
        `}
      </h3>

      <span class="${this._prefix}__cta">Call to Action</span>
    </div>
  </a>
`;}