import { html, css } from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
import buttonStyles from "@ucd-lib/theme-sass/2_base_class/_buttons.css.js";

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
  `;

  return [
    buttonStyles,
    elementStyles];
}

export function render() { 
return html`
<p>
  <a class=${classMap(this._getClasses())}>
    <input 
      style=${styleMap(this._getInputStyles())}
      type="text" 
      @input=${this._onInput}
      .value=${this.text}
      placeholder="Write text...">
  </a>
</p>
`;}