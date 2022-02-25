import { html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import brandStyles from "@ucd-lib/theme-sass/4_component/_category-brand.css.js";
import linkStyles from "@ucd-lib/theme-sass/1_base_html/_links.css.js";

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
    ucdlib-icon {
      cursor: pointer;
      color: var(--category-brand, #73abdd);
      margin-right: .25rem;
      min-width: 1rem;
      min-height: 1rem;
      width: 1rem;
      height: 1rem;
    }
    a.icon-ucdlib {
      display: flex;
      align-items: center;
    }
    .text-container {
      flex-grow: 1;
    }
  `;

  return [
    brandStyles,
    linkStyles,
    elementStyles];
}

export function render() { 
return html`
  <a class=${classMap(this._getBaseClasses())}>
    <ucdlib-icon icon=${this.icon} @click=${this.dispatchIconChangeRequest}></ucdlib-icon>
    <div class="text-container">
      <slot 
        id="text-slot"
        class=${this.text ? '' : 'show-placeholder'}
        name="text" 
        placeholder="Write text..."
        @input=${this._onTextInput}>${this.text}</slot>
    </div>
  </a>


`;}