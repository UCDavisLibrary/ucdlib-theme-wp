import { html } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import "./ucd-wp-button-link";

export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();

  return html`
  <div ...${ blockProps }>
    <ucd-wp-button-link></ucd-wp-button-link>
  </div>
  `;
}