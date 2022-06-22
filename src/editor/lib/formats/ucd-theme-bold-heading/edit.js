import { html, SelectUtils, UCDIcons } from "../../utils";
import { BlockControls } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import { ToolbarButton } from '@wordpress/components';

export default (props) => {
  const selectedBlock = SelectUtils.selectedBlock();
  if ( selectedBlock && selectedBlock.name !== 'ucd-theme/heading' ) {
    return null;
  }
  const attributes = selectedBlock.attributes;
  const allowedClasses = [
    'is-style-underline',
    'is-style-weighted-underline', 
    'is-style-weighted'];
  const allowedAltStyles = [
    'underline', 'weighted-underline', 'weighted', ''
  ];
  if ( !(allowedClasses.includes(attributes.className) || allowedAltStyles.includes(attributes.classSuffix))) return null;

  return html`
    <${BlockControls} group="block">
        <${ToolbarButton}
          icon=${UCDIcons.render("formatting.bold")}
          label="Apply Bold"
          isActive=${ props.isActive }
          onClick=${() => {
            props.onChange(toggleFormat( props.value, {type: 'ucd-theme/bold-heading'} ));
          }}
        />
    </${BlockControls}>
  `;
}
