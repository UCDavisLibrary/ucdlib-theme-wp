import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-marketing-highlight.tpl.js";

export default class UcdWpMarketingHighlight extends LitElement {

  static get properties() {
    return {
      href: {type: String},
      src: {type: String},
      hasDefaultContent: {type: Boolean, attribute: "has-default-content"},
      featured: {type: Boolean},
      color: {type: String},
      canEditTitle: {type: Boolean, attribute: "can-edit-title"},
      title: {type: String},
      canEditExcerpt: {type: Boolean, attribute: "cand-edit-excerpt"},
      excerpt: {type: String}
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
    this.hasDefaultContent = false;
    this.featured = false;
    this.color = "";
    this.canEditTitle = false;
    this.title = "";
    this.canEditExcerpt = false;
    this.excerpt = "";
  }

  updated( props ){
    if ( props.has('title') && !this.title ) this.canEditTitle = true;
    if ( props.has('excerpt') && !this.excerpt ) this.canEditExcerpt = true;
  }

  _getBaseClasses(){
    let classes = {};
    classes[this._prefix] = true;
    classes[`${this._prefix}--featured`] = this.featured
    classes[`category-brand--${this.color}`] = this.color ? true : false;

    return classes;
  }

}

customElements.define('ucd-wp-marketing-highlight', UcdWpMarketingHighlight);