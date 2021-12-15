import "./utils/iconsets/wp-editor/wp-editor";

import "@ucd-lib/theme-elements/ucdlib/ucdlib-sils-search-redirect/ucdlib-sils-search-redirect";

import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { registerPlugin } from '@wordpress/plugins';
import { select } from "@wordpress/data";

import UcdThemeBlocks from "./blocks";
import UcdThemeRichTextFormats from "./formats";
import UcdThemePlugins from "./plugins";
import { modifyCoreBlocks } from "./core-block-mods";
import unRegisterCore from "./exclude";


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