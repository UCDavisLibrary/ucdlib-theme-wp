import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-poster.tpl.js";

export default class UcdWpPoster extends LitElement {

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

customElements.define('ucd-wp-poster', UcdWpPoster);