import { html, SelectUtils, UCDIcons } from "../../utils";
import { BlockControls } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import { ToolbarButton } from '@wordpress/components';

export default (props) => {
  const selectedBlock = SelectUtils.selectedBlock();
  if ( selectedBlock && selectedBlock.name !== 'ucd-theme/heading' ) {
    return null;
  }
  const allowedClasses = ['is-style-weighted-underline', 'is-style-weighted']
  if ( selectedBlock.attributes && !allowedClasses.includes(selectedBlock.attributes.className) ){
    return null;
  }

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
