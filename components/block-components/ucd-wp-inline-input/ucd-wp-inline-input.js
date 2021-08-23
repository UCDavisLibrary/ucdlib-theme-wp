import { LitElement } from 'lit';
import {render} from "./ucd-wp-inline-input.tpl.js";

export default class UcdWpInlineInput extends LitElement {

  static get properties() {
    return {
      value: {type: String},
      placeholder: {type: String},
      inputClass: {type: String, attribute: "input-class"}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.value = "";
    this.placeholder = "Write text...";
    this.inputClass = "";
  }

  createRenderRoot() {
    return this;
  }

  _getStyles(){
    let styles = {};
    let width = this.value.length > 0 ? this.value.length : this.placeholder.length;
    styles.width = width + "ch";
    return styles;
  }

  _onInput() {
    this.dispatchEvent(new Event('input', {
      value: e.target.value
    }));
  }

}

customElements.define('ucd-wp-inline-input', UcdWpInlineInput);