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
  <a class=${classMap(this._getBaseClasses())}>
    <div class="${this._prefix}__body">
      <h3 class="${this._prefix}__title">
        <input 
            type="text" 
            @input=${this._onTitleInput}
            .value=${this.title}
            placeholder="Write a title...">
      </h3>
      <p><ucd-wp-textarea .value=${this.excerpt} @input=${this._onExcerptInput}></ucd-wp-textarea></p>
      <span class="${this._prefix}__cta">
        <ucd-wp-inline-input 
          @input=${this._onButtonTextInput} 
          .value=${this.buttonText}>
        </ucd-wp-inline-input>
      </span>
    </div>
  </a>
`;}