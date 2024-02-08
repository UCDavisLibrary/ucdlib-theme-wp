import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js";
import linkStyles from "@ucd-lib/theme-sass/4_component/_vertical-link.css.js";

export function styles() {
  const elementStyles = css`
    :host {
      display: block;
      text-align: center;
    }
    .vertical-link__figure {
      cursor: pointer;
    }
    ucdlib-icon {
      height: 50%;
      width: 50%;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
      left: 0;
      right: 0;
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
    <div class="vertical-link__figure" @click="${this.dispatchIconChangeRequest}">
      ${this.icon ? html`
        <ucdlib-icon class="vertical-link__image" icon=${this.icon}></ucdlib-icon>
      ` : html`
        <span class="vertical-link__image">Add Icon</span>
      `}
    </div>
    ${!this.hideText ? html`
      <div class="vertical-link__title">
        <slot
          id="text-slot"
          class=${this.text ? '' : 'show-placeholder'}
          name="text"
          placeholder="Write text..."
          @input=${this._onTextInput}>${this.text}</slot>
      </div>
    ` : html``}
    </div>
  </a>
`;}
