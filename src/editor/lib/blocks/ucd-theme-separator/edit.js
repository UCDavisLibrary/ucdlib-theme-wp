import { html } from "../../utils";
import { ToolbarColorPicker, ToolbarSeparatorStyle, ToolbarSelectMenu } from "../../block-components";
import { HorizontalRule } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const marginYOptions = [
    {
      title: '1x',
      slug: '1x'
    },
    {
      title: '2x',
      slug: '2x'
    }
  ];

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
        <${ToolbarSelectMenu} 
          label='Set Y Margin'
          icon=${html`<span>${attributes.marginY || '2x'}</span>`}
          options=${marginYOptions}
          value=${attributes.marginY || '2x'}
          onChange=${v => setAttributes({marginY: v.slug})}
        /> 
    </${BlockControls}>

    <${HorizontalRule} className="${attributes.brandColor} ${attributes.style} ${attributes.marginY === '1x' ? 'y1' : 'y2'}" />

  </div>
  `
}