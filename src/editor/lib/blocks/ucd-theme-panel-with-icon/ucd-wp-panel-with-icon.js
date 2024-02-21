import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-panel-with-icon.tpl.js";
import { MainComponentElement, Mixin } from '../../utils';

export default class UcdWpPanelWithIcon extends Mixin(LitElement)
  .with(MainComponentElement) {

  static get properties() {
    return {
      title: {type: String},
      icon: {type: String},
      color: {type: String},
      moreText: {type: String, attribute: "more-text"},
      hideMoreLink: {type: Boolean, attribute: "hide-more-link"},
      forcedContrast: {type: Boolean, attribute: "forced-contrast"},
      padding: {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.title = "";
    this.icon = "";
    this.color = "";
    this.moreText = "";
    this.hideMoreLink = false;
    this.padding = "";
    this.forcedContrast = false;
  }

  updated(props){
    this.updateSlotContent(props, 'moreText', 'more-slot');
    this.updateSlotContent(props, 'title', 'title-slot');
  }

  _getBaseClasses(){
    let classes = {
      "panel": true,
      "panel--icon": true,
      "panel--icon-custom": true,
      "o-box": true
    };
    if ( this.padding ){
      classes[`o-box--${this.padding}`] = true;
    }
    if ( this.forcedContrast ){
      classes['forced-contrast'] = true;
    }

    return classes;
  }

  dispatchIconChangeRequest(){
    this.dispatchEvent(new CustomEvent('icon-change'));
  }

  _onTitleInput(e){
    this.title = e.target.textContent || "";
    this.dispatchUpdate('title');
  }

  _onMoreTextInput(e){
    this.moreText = e.target.textContent || "";
    this.dispatchUpdate('moreText');
  }

}

customElements.define('ucd-wp-panel-with-icon', UcdWpPanelWithIcon);
