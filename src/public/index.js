// brand components
// header brand components
import '@ucd-lib/theme-elements/brand/ucd-theme-primary-nav/ucd-theme-primary-nav.js';
import '@ucd-lib/theme-elements/ucdlib/ucdlib-branding-bar/ucdlib-branding-bar.js'
import '@ucd-lib/theme-elements/brand/ucd-theme-header/ucd-theme-header.js';
import '@ucd-lib/theme-elements/brand/ucd-theme-quick-links/ucd-theme-quick-links.js'
import '@ucd-lib/theme-elements/brand/ucd-theme-search-form/ucd-theme-search-form.js'
import '@ucd-lib/theme-elements/brand/ucd-theme-search-popup/ucd-theme-search-popup.js'

// other brand nav components
import '@ucd-lib/theme-elements/brand/ucd-theme-subnav/ucd-theme-subnav';
import '@ucd-lib/theme-elements/brand/ucd-theme-pagination/ucd-theme-pagination.js'

// other brand components
import '@ucd-lib/theme-elements/ucdlib/ucdlib-sils-search-redirect/ucdlib-sils-search-redirect'
import '@ucd-lib/theme-elements/brand/ucd-theme-list-accordion/ucd-theme-list-accordion';
import '@ucd-lib/theme-elements/brand/ucd-theme-brand-textbox/ucd-theme-brand-textbox';
import "@ucd-lib/theme-elements/ucdlib/ucdlib-iconset/ucdlib-iconset";
import "@ucd-lib/theme-elements/ucdlib/ucdlib-icon/ucdlib-icon";
import '@ucd-lib/theme-elements/ucdlib/ucdlib-author-profile/ucdlib-author-profile.js';

// import our theme custom elements
import "./elements/index.js";

// page scripts
import "./page-scripts/index.js"

// do deferred loading of scripts if they add a lot of overhead loading on every page
// based on document query
class DynamicScriptLoader {
  
  constructor() {
    this.loaded = {};
    this.registration = [
      {
        name: 'slideshow',
        cssQuery: '.block-slideshow'
      }
      // JM - emergency patch
      // {
      //   name: 'author-profile',
      //   cssQuery: 'ucdlib-author-profile'
      // }
    ];
  }
  
  
  async load() {
    for( let bundle of this.registration ) {
      if( bundle.cssQuery && document.querySelector(bundle.cssQuery) ) {
        this.loadWidgetBundle(bundle.name);
      }
    }
  }
  
  loadWidgetBundle(bundleName) {
    if( typeof bundleName !== 'string' ) return;
    if( this.loaded[bundleName] ) return this.loaded[bundleName];

    if ( bundleName == 'slideshow' ){
      this.loaded[bundleName] = import(/* webpackChunkName: "slideshow" */ './lib/slideshow');
    } 
    // JM - emergency patch
    // else if ( bundleName == 'author-profile' ) {
    //   this.loaded[bundleName] = import(/* webpackChunkName: "author-profile" */ );
    // }
    
    return this.loaded[bundleName]
  }
  
}
  
let loaderInstance = new DynamicScriptLoader();
if( document.readyState === 'complete' ) {
  loaderInstance.load();
} else {
  window.addEventListener('load', () => {
    loaderInstance.load();
  });
}