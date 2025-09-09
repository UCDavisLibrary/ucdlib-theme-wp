import "./lib/iconsets/wp-editor/wp-editor";
import "./lib/iconsets/blocks/blocks";

// import "@ucd-lib/theme-elements/ucdlib/ucdlib-sils-search-redirect/ucdlib-sils-search-redirect";
// import '@ucd-lib/theme-elements/brand/ucd-theme-brand-textbox/ucd-theme-brand-textbox';
// import '@ucd-lib/theme-elements/brand/ucd-theme-subnav/ucd-theme-subnav';

// editor custom elements
import './lib/blocks/ucd-theme-prefixed-icon-link/ucd-wp-prefixed-icon-link.js';
import './lib/blocks/ucd-theme-priority-link/ucd-wp-priority-link.js';
import './lib/blocks/ucd-theme-teaser/ucd-wp-teaser.js';

import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { registerPlugin } from '@wordpress/plugins';
import { select } from "@wordpress/data";

import UcdThemeBlocks from "./lib/blocks";
import UcdThemeRichTextFormats from "./lib/formats";
import UcdThemePlugins from "./lib/plugins";
import { modifyCoreBlocks } from "./lib/core-block-mods";
import unRegisterCore from "./lib/exclude";

UcdThemeRichTextFormats.forEach(fmt => {
  registerFormatType(fmt.name, fmt.settings);
  })

UcdThemeBlocks.forEach(block => {
  registerBlockType( block.name, block.settings );
  if ( block.hooks ){
    block.hooks();
  }
});

UcdThemePlugins.forEach(plugin => {
  if ( select('core/edit-post') ){
    registerPlugin( plugin.name, plugin.settings );
  }
});

modifyCoreBlocks();
unRegisterCore();
