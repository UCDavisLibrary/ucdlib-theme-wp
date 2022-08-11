import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-teaser.tpl.js";

import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpTeaser extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      href: {type: String},
      imgSrc: {type: String, attribute: "img-src"},
      hideImage: {type: Boolean, attribute: "hide-image"},
      hideExcerpt: {type: Boolean, attribute: "hide-excerpt"},
      hideByline: {type: Boolean, attribute: "hide-byline"},
      hideCategories: {type: Boolean, attribute: "hide-categories"},
      categories: {type: Array},
      author: {type: String},
      date: {type: String},
      featured: {type: Boolean},
      color: {type: String},
      title: {type: String},
      excerpt: {type: String},
      editable: {type: Boolean}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._prefix = "vm-teaser";

    this.href = "";
    this.imgSrc = "";
    this.featured = false;
    this.color = "";
    this.title = "";
    this.excerpt = "";
    this.author = "";
    this.date = "";
    this.hideExcerpt = false;
    this.hideImage = false;
    this.hideByline = false;
    this.hideCategories = false;
    this.editable = false;
    this.categories = [];
  }

  updated(props){
    this.updateSlotContent(props, 'title', 'title-slot');
    this.updateSlotContent(props, 'excerpt', 'excerpt-slot');
  }


  _getBaseClasses(){
    let classes = {};
    classes[this._prefix] = true;
    classes[`${this._prefix}--featured`] = this.featured
    classes[`category-brand--${this.color}`] = this.color && this.featured ? true : false;

    return classes;
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

customElements.define('ucd-wp-teaser', UcdWpTeaser);