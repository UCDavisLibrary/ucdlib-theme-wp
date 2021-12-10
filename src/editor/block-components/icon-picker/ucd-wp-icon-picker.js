import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-icon-picker.tpl.js";

export default class UcdWpIconPicker extends LitElement {

  static get properties() {
    return {
      iconSets: {type: String, attribute: "icon-sets"},
      _iconSets: {state: true},
      selected: {type: String}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.iconSets = "";
    this.selected = "";
  }

  willUpdate(props){
    if ( props.has('iconSets') ){
      this._iconSets = this.queryIconSets(props.iconSets);
    }
  }

  queryIconSets(iconSets){

    let queriedSets = document.head.querySelectorAll('ucdlib-iconset');
    if ( !queriedSets ) return [];
    queriedSets = Array.from(queriedSets);
    if ( !iconSets ) return queriedSets.map(this.getIconNames);
    if ( !Array.isArray(iconSets) ){
      try {
        iconSets = JSON.parse(iconSets);
        if ( !Array.isArray(iconSets) ) return [];
      } catch (error) {
        iconSets = iconSets.split(",").map(i => i.trim());
      }
    }
    queriedSets = queriedSets
      .filter(s => iconSets.includes(s.getAttribute('name')))
      .map(this.getIconNames);
    return queriedSets
  }

  getIconNames(iconSet){
    return {
      name: iconSet.getAttribute('name'),
      title: iconSet.getAttribute('title') ? iconSet.getAttribute('title') : iconSet.getAttribute('name'),
      icons: iconSet.getIconNames()
    }
  }

  _onIconClick(icon, iconSet){
    this.selected = `${iconSet}:${icon}`;
    const options = {
      detail: {
        iconSet, icon
      }
    }
    this.dispatchEvent(new CustomEvent('icon-select', options));
  }

  _iconIsSelected(icon, iconSet){
    return `${iconSet}:${icon}` == this.selected;
  }

}

customElements.define('ucd-wp-icon-picker', UcdWpIconPicker);