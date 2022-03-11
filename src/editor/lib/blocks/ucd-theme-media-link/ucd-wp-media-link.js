import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-media-link.tpl.js";

import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpMediaLink extends Mixin(LitElement)
.with(MainComponentElement) {

  static get properties() {
    return {
      href: {type: String},
      imgSrc: {type: String, attribute: "img-src"},
      hideImage: {type: Boolean, attribute: "hide-image"},
      title: {type: String},
      excerpt: {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.href = "";
    this.imgSrc = "";
    this.title = "";
    this.excerpt = "";
    this.hideImage = false;
  }

  updated(props){
    this.updateSlotContent(props, 'title', 'title-slot');
    this.updateSlotContent(props, 'excerpt', 'excerpt-slot');
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

customElements.define('ucd-wp-media-link', UcdWpMediaLink);