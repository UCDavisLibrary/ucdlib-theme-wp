import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-button-link.tpl.js";
import "../../block-components/ucd-wp-inline-input/ucd-wp-inline-input";

export default class UcdWpButtonLink extends LitElement {

  static get properties() {
    return {
      text: {type: String},
      size: {type: String},
      shape: {type: String},
      display: {type: String},
      altStyle: {type: String, attribute: 'alt-style'}
    };
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.text = "";
    this.size = "";
    this.shape = "";
    this.display = "";
    this.altStyle = "";
  }

  _getClasses(){
    let base = "btn";
    let classes = {};
    classes[base] = true;

    const modifiers = [ this.size, this.shape, this.display, this.altStyle];
    modifiers.forEach((m) => {
      if ( m ) classes[`${base}--${m}`] = true;
    })

    return classes;
  }


  _onInput(e){
    let text = e.target.value || "";
    this.text = text;

    this.dispatchEvent(new CustomEvent('text-change', {
      detail : {value: e.target.value}
    }));


  }

}

customElements.define('ucd-wp-button-link', UcdWpButtonLink);