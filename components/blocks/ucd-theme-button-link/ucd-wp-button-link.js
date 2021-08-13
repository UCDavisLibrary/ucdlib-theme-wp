import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-button-link.tpl.js";

export default class UcdWpButtonLink extends LitElement {

  static get properties() {
    return {
      text: {type: String}
    };
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.text = "";
  }

  _getClasses(){
    let base = "btn";
    let classes = {};
    classes[base] = true;

    return classes;
  }

  _getInputStyles(){
    let styles = {};
    let width = this.text.length > 0 ? this.text.length : 13;
    styles.width = width + "ch";
    return styles;
  }

  _onInput(e){
    let text = e.target.value || "";
    console.log(text.length);
    this.text = text;
  }

}

customElements.define('ucd-wp-button-link', UcdWpButtonLink);