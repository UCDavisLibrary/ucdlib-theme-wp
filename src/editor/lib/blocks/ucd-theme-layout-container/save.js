import { html } from "../../utils";
import { InnerBlocks } from '@wordpress/block-editor';

export default ( props ) => {
  return html`
    <${InnerBlocks.Content} />
  `;
}