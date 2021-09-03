import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { ref } from 'lit/directives/ref.js';

export function render() { 
return html`
  <textarea 
    placeholder=${this.placeholder}
    style=${styleMap(this._getStyles())}
    class=${this.textAreaClass}
    @input=${this._onInput}
    @blur=${this._setHeight}
    >${this.value}</textarea>

  <div ${ref(this._divRef)} style="display:none;">${this.value ? this.value : "placeholder" }</div>
`;}