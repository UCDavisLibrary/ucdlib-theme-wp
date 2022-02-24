import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-button-link.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';
import "../../block-components/ucd-wp-inline-input/ucd-wp-inline-input";

export default class UcdWpButtonLink extends Mixin(LitElement)
.with(MainComponentElement) {

  static get properties() {
    return {
      text: {type: String},
      size: {type: String},
      shape: {type: String},
      display: {type: String},
      textAlign: {type: String, attribute: 'text-align'},
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
    this.textAlign = "left";
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

  updated(props){
    this.updateSlotContent(props, 'text', 'text-slot', '_textShowPlaceholder');
  }

  willUpdate() {
    this._textShowPlaceholder = !this.text;
  }


  _onInput(e){
    let text = e.target.textContent || "";
    this.text = text;

    this.dispatchEvent(new CustomEvent('text-change', {
      detail : {value: text}
    }));


  }

}

customElements.define('ucd-wp-button-link', UcdWpButtonLink);