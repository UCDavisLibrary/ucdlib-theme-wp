import { html } from "../../utils";
import { ToolbarColorPicker, ToolbarSeparatorStyle } from "../../block-components";
import { HorizontalRule } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  return html`
  <div ...${ blockProps }>

    <${BlockControls} group="block">
        <${ToolbarColorPicker} 
            onChange=${(v) => setAttributes({ brandColor: v ? v.slug : '' })}
            value=${attributes.brandColor}
            ucdBlock="separator"
        />
        <${ToolbarSeparatorStyle} 
            value=${attributes.style}
            icon="${attributes.style}"
            label="Border Style"
            onChange=${(v) => setAttributes({ style: v ? v.slug : '' })}
        />
    </${BlockControls}>

    <${HorizontalRule} className="${attributes.brandColor} ${attributes.style}" />

  </div>
  `
}