import { LitElement, html } from 'lit';
import {render, styles} from "./ucd-wp-prefixed-icon-link.tpl.js";

import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpPrefixedIconLink extends Mixin(LitElement)
.with(MainComponentElement) {

  static get properties() {
    return {
      color: {type: String},
      icon: {type: String},
      text: {type: String},
      href: {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.color = "";
    this.icon = "";
    this.text = "";
    this.href = "";
    this.render = render.bind(this);
  }

  updated(props){
    this.updateSlotContent(props, 'text', 'text-slot');
  }

  _getBaseClasses(){
    let classes = {
      "icon-ucdlib": true
    };
    classes[`category-brand--${this.color}`] = this.color ? true : false;

    return classes;
  }

  _renderContent(){
    return html`
      <ucdlib-icon icon=${this.icon} @click=${this.dispatchIconChangeRequest}></ucdlib-icon>
      <div class="text-container">
        <slot 
          id="text-slot"
          class=${this.text ? '' : 'show-placeholder'}
          name="text" 
          placeholder="Write text..."
          @input=${this._onTextInput}>${this.text}</slot>
      </div>
    `
  }

  dispatchIconChangeRequest(){
    this.dispatchEvent(new CustomEvent('icon-change'));
  }

  _onTextInput(e){
    this.text = e.target.textContent || "";
    this.dispatchUpdate('text');
  }

}

customElements.define('ucd-wp-prefixed-icon-link', UcdWpPrefixedIconLink);