import { LitElement } from 'lit';
import {render, styles} from "./ucd-theme-marketing-highlight-horizontal.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdThemeMarketingHighlightHorizontal extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      href: {type: String},
      imgSrc: {type: String, attribute: "img-src"},
      title: {type: String},
      hideTitle: {type: Boolean, attribute: "hide-title"},
      brandColor: {type: String, attribute: "brand-color"},
      overlay: {type: Boolean},
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.href = "";
    this.title = "";
    this.hideTitle = false;
    this.brandColor = "";
    this.imgSrc = "";
    this.overlay = false;
  }

  updated(props){
    this.updateSlotContent(props, 'title', 'title-slot');
  }

  mainClasses(){
    const classes = ['marketing-highlight-horizontal'];
    if (this.brandColor) classes.push(`category-brand--${this.brandColor}`);
    if (this.overlay) classes.push('marketing-highlight-horizontal--overlay');

    return classes.join(' ');
  }

  _onTitleInput(e){
    this.title = e.target.textContent || "";
    this.dispatchUpdate('title');
  }
}

customElements.define('ucd-theme-marketing-highlight-horizontal', UcdThemeMarketingHighlightHorizontal);
