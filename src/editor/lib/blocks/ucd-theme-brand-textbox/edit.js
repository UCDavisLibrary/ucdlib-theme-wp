import { html } from "../../utils";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarColorPicker, ToolbarFloat } from "../../block-components";
import { ToolbarButton } from '@wordpress/components';

import classnames from 'classnames';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const mainEleProps = () => {
    const p = {};
    if ( attributes.collapsible ) p.collapsible = true;
    if ( attributes.brandColor ) p['brand-color'] = attributes.brandColor;
    return p;
  }

  const classes = classnames({
    "brand-textbox": true,
    "category-brand__background": true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor
  });

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarColorPicker}
        onChange=${onColorChange}
        value=${attributes.brandColor}
        ucdBlock="brand-textbox"
      />
      <${ToolbarButton}
          icon=${html`<span>X</span>`}
          onClick=${ () => {setAttributes({'collapsible': !attributes.collapsible})}}
          isPressed=${attributes.collapsible}
          label="Make textbox collapsible"/>
      <${ToolbarFloat}
        value=${attributes.float}
        onChange=${(v) => setAttributes({float: v.slug})}
      />
    </${BlockControls}>
    ${attributes.collapsible ? html`
      <ucd-theme-brand-textbox ...${ mainEleProps() }>
        <${InnerBlocks} />
      </ucd-theme-brand-textbox>` :
      html`
        <div className=${classes}>
          <${InnerBlocks} />
        </div>
      `}

  </div>
  `
}
