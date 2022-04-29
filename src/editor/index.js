import "./lib/iconsets/wp-editor/wp-editor";
import "./lib/iconsets/blocks/blocks";

import "@ucd-lib/theme-elements/ucdlib/ucdlib-sils-search-redirect/ucdlib-sils-search-redirect";
import '@ucd-lib/theme-elements/brand/ucd-theme-brand-textbox/ucd-theme-brand-textbox';
import '@ucd-lib/theme-elements/brand/ucd-theme-subnav/ucd-theme-subnav';

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
  if ( select('core/editor') ){
    registerPlugin( plugin.name, plugin.settings );
  }
});

modifyCoreBlocks();
unRegisterCore();