import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-priority-link.tpl.js";

import { MainComponentElement } from '../../utils/main-component-element.js';
import Mixin from '../../utils/mixin.js';

export default class UcdWpPriorityLink extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      color: {type: String},
      icon: {type: String},
      text: {type: String},
      hideText: {type: Boolean, attribute: 'hide-text'},
      tiltCircle: {type: Boolean, attribute: 'tilt-circle'}
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
    this.hideText = false;
    this.render = render.bind(this);
  }

  updated(props){
    this.updateSlotContent(props, 'text', 'text-slot');
  }

  _getBaseClasses(){
    let classes = {
      "vertical-link": true
    };
    classes[`category-brand--${this.color}`] = this.color ? true : false;
    if ( this.tiltCircle ) {
      classes['vertical-link--tilt-circle'] = true;
    } else {
      classes['vertical-link--circle'] = true;
    }

    return classes;
  }

  dispatchIconChangeRequest(){
    this.dispatchEvent(new CustomEvent('icon-change'));
  }

  _onTextInput(e){
    this.text = e.target.textContent || "";
    this.dispatchUpdate('text');
  }

}

customElements.define('ucd-wp-priority-link', UcdWpPriorityLink);
