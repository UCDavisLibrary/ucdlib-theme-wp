import { LitElement } from 'lit';
import {render} from "./ucd-wp-inline-input.tpl.js";

export default class UcdWpInlineInput extends LitElement {

  static get properties() {
    return {
      value: {type: String},
      placeholder: {type: String},
      inputClass: {type: String, attribute: "input-class"},
      minus: {type: Number},
      plus: {type: Number}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.value = "";
    this.placeholder = "Write text...";
    this.inputClass = "";
    this.minus = 0;
    this.plus = 0;
  }

  createRenderRoot() {
    return this;
  }

  _getStyles(){
    let styles = {};
    let value = this.value ? this.value : "";
    let width = value.length > 0 ? value.length : this.placeholder.length;
    if ( this.minus && width > this.minus ) width = width - this.minus;
    if ( this.plus ) width = width + this.plus;
    styles.width = width + "ch";
    return styles;
  }

  _onInput() {
    this.dispatchEvent(new Event('input', {
      value: e.target.value ? e.target.value : ""
    }));
  }

}

customElements.define('ucd-wp-inline-input', UcdWpInlineInput);