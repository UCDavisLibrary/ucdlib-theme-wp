import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js";
import linkStyles from "@ucd-lib/theme-sass/4_component/_focal-link.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
    }
    .focal-link__icon ucdlib-icon {
      width: 35px;
      min-width: 35px;
      height: 35px;
      min-height: 35px;
    }
  `;

  return [
    brandStyles,
    linkStyles,
    elementStyles
  ];
}

export function render() { 
return html`
  <a class=${classMap(this._getBaseClasses())}>
    <div class="focal-link__figure focal-link__icon" @click=${this.dispatchIconChangeRequest}>
      ${this.icon ? html`
          <ucdlib-icon icon=${this.icon}></ucdlib-icon>
        ` : html`
          <span>Add Icon</span>
        `}
    </div>
    <div class="focal-link__body">
      <strong>
        <slot 
          id="text-slot"
          class=${this.text ? '' : 'show-placeholder'}
          name="text" 
          placeholder="Write text..."
          @input=${this._onTextInput}>${this.text}</slot>
      </strong>
    </div>
  </a>

`;}