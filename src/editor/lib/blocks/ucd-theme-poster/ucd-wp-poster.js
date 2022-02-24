import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-poster.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpPoster extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      href: {type: String},
      imgSrc: {type: String, attribute: "img-src"},
      color: {type: String},
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
    this.color = "";
    this.title = "";
    this.excerpt = "";
    this._prefix = "vm-poster"; 
  }

  updated(props){
    this.updateSlotContent(props, 'title', 'title-slot');
    this.updateSlotContent(props, 'excerpt', 'excerpt-slot');
  }


  _getBaseClasses(){
    let classes = {};
    classes[this._prefix] = true;
    classes[`category-brand--${this.color}`] = this.color ? true : false;

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

customElements.define('ucd-wp-poster', UcdWpPoster);