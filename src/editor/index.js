import "./lib/iconsets/wp-editor/wp-editor";
import "./lib/iconsets/blocks/blocks";

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
