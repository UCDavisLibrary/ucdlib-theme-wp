import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-marketing-highlight.tpl.js";
import "../../block-components/ucd-wp-inline-input/ucd-wp-inline-input";
import "../../block-components/ucd-wp-textarea/ucd-wp-textarea";

export default class UcdWpMarketingHighlight extends LitElement {

  static get properties() {
    return {
      href: {type: String},
      src: {type: String},
      featured: {type: Boolean},
      color: {type: String},
      title: {type: String},
      excerpt: {type: String},
      buttonText: {type: String, attribute: "button-text"}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._prefix = "marketing-highlight";

    this.href = "";
    this.src = "";
    this.featured = false;
    this.color = "";
    this.title = "";
    this.excerpt = "";
    this.buttonText = "More info";
  }

  _getBaseClasses(){
    let classes = {};
    classes[this._prefix] = true;
    classes[`${this._prefix}--featured`] = this.featured
    classes[`category-brand--${this.color}`] = this.color ? true : false;

    return classes;
  }

  _onButtonTextInput(e){
    this.buttonText = e.target.value || "";
    this._dispatch('buttonText');
  }

  _onTitleInput(e){
    this.title = e.target.value || "";
    this._dispatch('title');
  }

  _onExcerptInput(e){
    this.excerpt = e.target.value || "";
    this._dispatch('excerpt');
  }

  _dispatch(prop){
    let detail = {}
    if ( prop ) {
      detail.propName = prop;
      detail.propValue = this[prop];
    }
    this.dispatchEvent(new CustomEvent('updated', {detail}));
  }

}

customElements.define('ucd-wp-marketing-highlight', UcdWpMarketingHighlight);