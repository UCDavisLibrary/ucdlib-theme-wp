import { html } from "../../utils";
import { RichTextToolbarButton, BlockControls } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import { Toolbar, ToolbarButton } from '@wordpress/components';

export default (props) => {
  return html`
    <${BlockControls}>
      <${Toolbar}> 
        <${ToolbarButton}
          icon=${() => html`<iron-icon icon="editor:format-bold"></iron-icon>`}
          label="Apply Bold If 'Weighted' Style is Selected"
          isActive=${ props.isActive }
          onClick=${() => {
            props.onChange(
              toggleFormat( 
                props.value, 
                {type: name} 
              )
            );
          }}
        />
      </${Toolbar}>
    </${BlockControls}>
  `;
}