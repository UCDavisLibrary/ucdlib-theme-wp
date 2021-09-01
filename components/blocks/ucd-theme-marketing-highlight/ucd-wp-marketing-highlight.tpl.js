import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import marketingHighlightStyles from "@ucd-lib/theme-sass/4_component/_marketing-highlight.css.js";
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js"
import imageAspectStyles from "@ucd-lib/theme-sass/6_utility/_u-aspect.css.js";

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
    .marketing-highlight__image img {
      z-index: 1;
    }
    #badge-input {
      text-align: right;
    }
  `;

  return [
    marketingHighlightStyles,
    brandStyles,
    imageAspectStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <a class=${classMap(this._getBaseClasses())}>
    ${this.imgSrc ? html`
      <div class="${this._prefix}__image aspect--4x3">
        <img src=${this.imgSrc} alt=${this.imgAlt}>
        ${this.hideBadge ? html`` : html`
        <h3 class="${this._prefix}__type">
          <ucd-wp-inline-input 
            id="badge-input"
            @input=${this._onBadgeInput} 
            .value=${this.badge}>
          </ucd-wp-inline-input>
        </h3>
        `}
      </div>
    ` : html``}
    <div class="${this._prefix}__body">
    ${this.hideTitle ? html`` : html`
      <h3 class="${this._prefix}__title">
        <input 
            type="text" 
            @input=${this._onTitleInput}
            .value=${this.title}
            placeholder="Write a title...">
      </h3>
    `}
      ${this.hideExcerpt ? html`` : html`
      <p><ucd-wp-textarea .value=${this.excerpt} @input=${this._onExcerptInput}></ucd-wp-textarea></p>
      `}
      
      ${this.hideButton ? html`` : html`
        <span class="${this._prefix}__cta">
          <ucd-wp-inline-input 
            @input=${this._onButtonTextInput} 
            .value=${this.buttonText}>
          </ucd-wp-inline-input>
        </span>      
      `}

    </div>
  </a>
`;}