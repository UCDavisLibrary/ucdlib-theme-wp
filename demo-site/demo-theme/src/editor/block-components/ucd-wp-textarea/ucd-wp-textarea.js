import { LitElement } from 'lit';
import {render } from "./ucd-wp-textarea.tpl.js";
import { createRef } from 'lit/directives/ref.js';

export default class UcdWpTextarea extends LitElement {

  static get properties() {
    return {
      value: {type: String},
      placeholder: {type: String},
      textAreaClass: {type: String, attribute: "text-area-class"},
      _height: {type: Number, state: true}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.value = "";
    this.placeholder = "Write text..."

    this._height = 0;
    this._divRef = createRef();
    this._onResize = this._onResize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._onResize);
  }
  
  disconnectedCallback() {
    window.removeEventListener('resize', this._onResize);
    super.disconnectedCallback();
  }

  updated(props){
    if ( props.has("value") ) this._setHeight();
  }

  createRenderRoot() {
    return this;
  }

  _onResize(){
    if ( this._resizeTimeout ) clearTimeout( this._resizeTimeout );
    this._resizeTimeout = setTimeout(() => {this._setHeight()}, 250);
  }

  _getStyles(){
    let styles = {
      width: "100%", 
      height: this._height + "px",
      resize: "none",
      border: "none",
      textAlign: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      fontFamily: "inherit",
      color: "inherit",
      backgroundColor: "inherit",
      padding: 0,
      margin: 0
    };
    return styles;
  }

  _onInput(e){
    this.value = e.target.value || "";
  }

  async _setHeight(){
    const div = this._divRef.value;
    if ( !div ) return;
    div.style.display = "block";
    this.requestUpdate();
    await this.updateComplete;
    this._height = div.scrollHeight;
    div.style.display = "none";
    this.requestUpdate();
  }

}

customElements.define('ucd-wp-textarea', UcdWpTextarea);