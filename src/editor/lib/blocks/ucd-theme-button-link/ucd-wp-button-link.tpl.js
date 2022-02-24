import { html, css } from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";
import linkStyles from "@ucd-lib/theme-sass/1_base_html/_links.css.js";
import alignmentUtils from "@ucd-lib/theme-sass/6_utility/_u-text-alignment.css.js";

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
      min-width: 5px;
    }
    input:focus {
      border: none;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    .show-placeholder:before {
      content: attr(placeholder);
      position: absolute;
      pointer-events: none;
      opacity: .6;
  }
  `;

  return [
    linkStyles,
    buttonStyles,
    alignmentUtils,
    elementStyles];
}

export function render() { 
return html`
<p class="u-text-align--${this.textAlign}">
  <a class=${classMap(this._getClasses())}>
    <slot 
      id="text-slot"
      class=${this._textShowPlaceholder ? 'show-placeholder' : ''}
      name="text" 
      placeholder="Write text..."
      @input=${this._onInput}>${this.text}</slot>
  </a>
</p>
`;}