import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-panel-with-icon.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpPanelWithIcon extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

}

customElements.define('ucd-wp-panel-with-icon', UcdWpPanelWithIcon);