import { html } from "../../utils";
import { ToolbarColorPicker, ToolbarLinkPicker, IconPicker } from "../../block-components";
import { useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';
import { useRef, useEffect, createRef } from "@wordpress/element";

import classnames from 'classnames';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const iconPickerRef = createRef();

  const classes = classnames({
    "focal-link": true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor
  });

  const onIconClick = () => {
    if ( iconPickerRef.current ){
      iconPickerRef.current.openModal();
    }
  }

  // set up icon picker
  const onIconSelect = (icon) => {
    setAttributes({icon: `${icon.iconSet}:${icon.icon}`})
  }

  // set up link picker
  const onHrefChange = (value) => {
    let attrs = {
      href: value.url,
      newTab: value.opensInNewTab ? true : false,
      postId: 0
    }
    if ( value.kind == 'post-type' ){
      attrs.postId = value.id;
    } else if ( value.kind == 'taxonomy' ) {
      attrs.taxId = value.id
    }
    setAttributes(attrs);
  }
  const hrefContent = (() => {
    let value = {opensInNewTab: attributes.newTab, url: ""};
    if ( attributes.href ) {
      value.url = attributes.href;
    }
    return value;
  })();

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
      <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="focal-link"
      />
    </${BlockControls}>
    <${IconPicker}
      ref=${iconPickerRef}
      onChange=${onIconSelect}
      selectedIcon=${attributes.icon}
      ></${IconPicker}>
    <a className=${classes}>
      <div className='focal-link__figure focal-link__icon clickable' onClick=${onIconClick}>
        <ucdlib-icon icon=${attributes.icon}></ucdlib-icon>
      </div>
      <div className="focal-link__body">
        <strong>
          <${RichText}
            tagName="span"
            value=${attributes.text}
            onChange=${(v) => setAttributes({text: v})}
            withoutInteractiveFormatting
            allowedFormats=${[]}
            placeholder="Enter link text..."
          />
        </strong>
      </div>
    </a>
  </div>
  `
}
