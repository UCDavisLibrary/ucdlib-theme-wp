import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icons/editor-icons";
import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import { registerPlugin } from '@wordpress/plugins';

import UcdThemeBlocks from "./blocks";
import UcdThemeRichTextFormats from "./formats";
import UcdThemePlugins from "./plugins";


UcdThemeRichTextFormats.forEach(fmt => {
  registerFormatType(fmt.name, fmt.settings);
  })

UcdThemeBlocks.forEach(block => {
  registerBlockType( block.name, block.settings );
});

UcdThemePlugins.forEach(plugin => {
  registerPlugin( plugin.name, plugin.settings );
})