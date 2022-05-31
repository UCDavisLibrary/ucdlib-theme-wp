import { html, UCDIcons } from "../../utils";
import { ToolbarColorPicker, ToolbarSeparatorStyle } from "../../block-components";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { lineDotted, lineSolid } from '@wordpress/icons';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  return html`
  <div ...${ blockProps }>

    <${BlockControls} group="block">
        <${ToolbarColorPicker} 
            onChange=${(v) => setAttributes({ brandColor: v ? v.slug : '' })}
            value=${attributes.brandColor}
            ucdBlock="priority-link"
        />
        <${ToolbarSeparatorStyle} 
            value=${attributes.style}
            icon="${attributes.style === 'dotted' ? 'lineDotted' : 'lineSolid' }"
            label="Border Style"
            onChange=${(v) => setAttributes({ style: v ? v.slug : '' })}
        />
    </${BlockControls}>
    
    <hr 
      className="${attributes.brandColor} ${attributes.style}" 
      style=${{
        borderTop: `4px solid ${attributes.brandColor}`, 
        borderStyle: `${attributes.style}`, 
        borderTopWidth: `${attributes.style === 'dotted' ? '4px' : '1px'}`
      }}
    />

  </div>
  `
}
/* style=${{
  borderTop: `4px solid ${attributes.brandColor}`, 
  borderStyle: `${attributes.style}`, 
  borderTopWidth: `${attributes.style === 'dotted' ? '4px' : '1px'}`
}} */