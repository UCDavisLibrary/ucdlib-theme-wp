import classnames from 'classnames';
import { categoryBrands } from "@ucd-lib/theme-sass/colors";

import { html, UCDIcons } from "../../utils";
import { ToolbarButton } from "@wordpress/components";
import {
  ToolbarPaddingPicker,
  ToolbarSizePicker,
  ToolbarColorPicker,
  ToolbarSeparatorStyle,
  ToolbarSelectMenu } from "../../block-components";
import { useBlockProps,
  BlockControls,
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    "o-box": true,
    [`o-box--${attributes.padding}`]: attributes.padding,
    [`u-space-mb--${attributes.marginBottom}`]: attributes.marginBottom && attributes.marginBottom != 'default',
    [`u-space-mb`]: attributes.marginBottom == 'default'
  });

  const hasBorder = attributes.hasBorder ? true : false;
  const style = {};
  if ( hasBorder ){
    style.borderStyle = attributes.borderStyle || "solid";
    style.borderWidth = attributes.borderWidth || "1px";
    style.borderColor = attributes.borderColorHex;
  }
  const borderWidthOptions = [1,2,3,4].map(v => {return {slug: v+'px', title: v+"px"}});

  // set up color picker
  const onColorChange = (value) => {
    const borderBrandColor = value ? value.slug : "secondary";
    const borderColorHex = Object.values(categoryBrands).find(c => c.id === borderBrandColor)?.hex || "#ffbf00";
    setAttributes( {borderBrandColor, borderColorHex } );
  }

  const blockProps = useBlockProps( {
    className: classes,
    style
  } );

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  const onPaddingChange = (v) => {
    let padding = v.slug === "default" ? "" : v.slug;
    setAttributes({padding});
  }

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarPaddingPicker}
          value=${attributes.padding}
          onChange=${onPaddingChange}/>
        <${ToolbarSizePicker}
          value=${attributes.marginBottom}
          icon="vertical-align-bottom"
          label="Bottom Margin Size"
          onChange=${(v) => setAttributes({marginBottom: v.slug})}
        />
        <${ToolbarButton} isPressed=${hasBorder} onClick=${ () => setAttributes({hasBorder: !hasBorder}) } icon=${UCDIcons.renderPublic('fa-border-all')} label='Toggle Border'/>
        ${hasBorder && html`
          <${ToolbarColorPicker}
            onChange=${onColorChange}
            value=${attributes.borderBrandColor}
            buttonLabel="Border Color"
            ucdBlock="object-box"
          />
        `}
        ${hasBorder && html`
          <${ToolbarSeparatorStyle}
            value=${attributes.borderStyle}
            icon="${attributes.borderStyle}"
            label="Border Style"
            onChange=${(v) => setAttributes({ borderStyle: v ? v.slug : '' })}
          />
        `}
        ${hasBorder && html`
          <${ToolbarSelectMenu}
            label='Border Width'
            icon=${html`<span>${attributes.borderWidth}</span>`}
            options=${borderWidthOptions}
            value=${attributes.borderWidth}
            onChange=${v => setAttributes({borderWidth: v.slug})}
          />
        `}
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
