import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icons/editor-icons";
import { registerBlockType } from '@wordpress/blocks';
import { registerFormatType } from '@wordpress/rich-text';
import UcdThemeBlocks from "./blocks";
import UcdThemeRichTextFormats from "./formats";

UcdThemeRichTextFormats.forEach(fmt => {
    registerFormatType(fmt.name, fmt.settings);
  })

UcdThemeBlocks.forEach(block => {
    registerBlockType( block.name, block.settings );
});
