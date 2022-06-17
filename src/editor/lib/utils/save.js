import { html } from "./html.js";
import { InnerBlocks } from '@wordpress/block-editor';

export default ( props ) => {
  return html`
    <${InnerBlocks.Content} />
  `;
  }