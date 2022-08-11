import { LitElement } from 'lit';
import {render, styles} from "./ucd-wp-icon-picker.tpl.js";

export default class UcdWpIconPicker extends LitElement {

  static get properties() {
    return {
      iconSets: {type: String, attribute: "icon-sets"},
      selected: {type: String},
      searchTerm: {type: String, attribute: 'search-term'},
      _iconSets: {state: true},
      _displayedIcons: {state: true}
    }
  }

  static get styles() {
    return styles();
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.iconSets = ['ucd-public'];
    this.selected = "";
    this.searchTerm = "";
    this._displayedIcons = [];
  }

  willUpdate(props){
    if ( props.has('iconSets') ){
      this._iconSets = this.queryIconSets(this.iconSets);
      this._filterDisplay();
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
      title: iconSet.getLabel(),
      icons: iconSet.getIconNames()
    }
  }

  _onSearch(e){
    this.searchTerm = e.target.value;
    if ( this._searchTimeout ) {
      clearTimeout(this._searchTimeout);
    }
    this._searchTimeout = setTimeout(() => this._filterDisplay(), 250);
  }

  _filterDisplay(){
    if ( !this.searchTerm ) {
      this._displayedIcons = this._iconSets ? this._iconSets : [];
      return;
    }
    const terms = this.searchTerm.trim().split(" ").map(x => x.toLowerCase());
    const _displayedIcons = [];
    this._iconSets.forEach(s => {
      let icons = [];
      
      s.icons.forEach(i => {
        const match = terms.filter(x => i.includes(x));
        if ( match.length == terms.length ) {
          icons.push(i);
        }
      })

      _displayedIcons.push( {title: s.title, name: s.name, icons: icons});

    })
    this._displayedIcons = _displayedIcons;
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