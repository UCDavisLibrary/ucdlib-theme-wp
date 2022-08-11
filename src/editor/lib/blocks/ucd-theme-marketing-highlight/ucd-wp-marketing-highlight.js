import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-marketing-highlight.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpMarketingHighlight extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      href: {type: String},
      imgSrc: {type: String, attribute: "img-src"},
      imgAlt: {type: String, attribute: "img-alt"},
      badge: {type: String},
      hideBadge: {type: Boolean, attribute: "hide-badge"},
      hideTitle: {type: Boolean, attribute: "hide-title"},
      hideExcerpt: {type: Boolean, attribute: "hide-excerpt"},
      hideButton: {type: Boolean, attribute: "hide-button"},
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
    this.imgSrc = "";
    this.imgAlt = "";
    this.featured = false;
    this.color = "";
    this.title = "";
    this.excerpt = "";
    this.buttonText = "More info";
    this.badge = "";
    this.hideBadge = false;
    this.hideExcerpt = false;
    this.hideTitle = false;
    this.hideButton = false;
  }

  updated(props){
    this.updateSlotContent(props, 'buttonText', 'button-slot');
    this.updateSlotContent(props, 'title', 'title-slot');
    this.updateSlotContent(props, 'badge', 'badge-slot');
    this.updateSlotContent(props, 'excerpt', 'excerpt-slot');
  }

  _getBaseClasses(){
    let classes = {};
    classes[this._prefix] = true;
    classes[`${this._prefix}--featured`] = this.featured
    classes[`category-brand--${this.color}`] = this.color ? true : false;

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
  _onBadgeInput(e){
    this.badge = e.target.textContent || "";
    this.dispatchUpdate('badge');
  }

  _onExcerptInput(e){
    this.excerpt = e.target.textContent || "";
    this.dispatchUpdate('excerpt');
  }

}

customElements.define('ucd-wp-marketing-highlight', UcdWpMarketingHighlight);