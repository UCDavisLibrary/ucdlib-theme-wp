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
      text: {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

  dispatchIconChangeRequest(){
    this.dispatchEvent(new CustomEvent('icon-change'));
  }

}

customElements.define('ucd-wp-priority-link', UcdWpPriorityLink);