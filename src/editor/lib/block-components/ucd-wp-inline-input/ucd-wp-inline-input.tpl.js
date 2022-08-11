import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export function render() { 
return html`
  <input 
    style=${styleMap(this._getStyles())}
    class=${this.inputClass}
    type="text" 
    .value=${this.value}
    placeholder=${this.placeholder}>

`;}