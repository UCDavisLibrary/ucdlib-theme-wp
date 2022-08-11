import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-hero-banner.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpHeroBanner extends Mixin(LitElement)
.with(MainComponentElement) {

  static get properties() {
    return {
      href: {type: String},
      imgSrc: {type: String, attribute: "img-src"},
      imgAlt: {type: String, attribute: "img-alt"},
      color: {type: String},
      alignment: {type: String},
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


    this._prefix = "hero-banner";

    this.href = "";
    this.imgSrc = "";
    this.imgAlt = "";
    this.alignment = "";
    this.color = "";
    this.title = "";
    this.excerpt = "";
    this.buttonText = "More info";
  }

  updated(props){
    this.updateSlotContent(props, 'buttonText', 'button-slot');
    this.updateSlotContent(props, 'title', 'title-slot');
    this.updateSlotContent(props, 'excerpt', 'excerpt-slot');
  }

  _getBaseClasses(){
    let classes = {};
    classes[this._prefix] = true;
    classes[`${this._prefix}--align-${this.alignment}`] = this.alignment ? true : false;
    classes[`category-brand--${this.color}`] = this.color ? true : false;
    classes['no-image'] = !this.imgSrc;

    return classes;
  }

  _onButtonTextInput(e){
    this.buttonText = e.target.textContent || "";
    this.dispatchUpdate('buttonText');
  }

  _onTitleInput(e){
    this.title = e.target.textContent || "";
    this.dispatchUpdate('title');
  }

  _onExcerptInput(e){
    this.excerpt = e.target.textContent || "";
    this.dispatchUpdate('excerpt');
  }

}

customElements.define('ucd-wp-hero-banner', UcdWpHeroBanner);