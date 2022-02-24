import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-priority-link.tpl.js";

//import "../../block-components/ucd-wp-textarea/ucd-wp-textarea";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpPriorityLink extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      color: {type: String},
      icon: {type: String},
      text: {type: String},
      hideText: {type: Boolean, attribute: 'hide-text'}
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
      "vertical-link": true,
      "vertical-link--circle": true
    };
    classes[`category-brand--${this.color}`] = this.color ? true : false;

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