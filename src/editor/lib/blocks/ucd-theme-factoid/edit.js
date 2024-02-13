import { html, UCDIcons } from "../../utils";
import { ToolbarColorPicker, ToolbarLinkPicker, IconPicker } from "../../block-components";
import { useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';
import { createRef } from "@wordpress/element";
import { ToolbarButton } from "@wordpress/components";

import classnames from 'classnames';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const iconPickerRef = createRef();


  const onIconClick = () => {
    if ( iconPickerRef.current ) {
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
      postId: 0,
      taxId: 0
    }
    if ( value.kind == 'post-type' ){
      attrs.postId = value.id;
    }
    else if ( value.kind == 'taxonomy' ) {
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

  const classes = classnames({
    'factoid': true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor,
    'factoid--brackets': attributes.brackets
  })

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
      <${ToolbarColorPicker}
        onChange=${onColorChange}
        value=${attributes.brandColor}
        ucdBlock="priority-link"
      />
      <${ToolbarButton}
        icon=${UCDIcons.renderPublic("fa-right-to-bracket")}
        onClick=${ () => {setAttributes({'brackets': !attributes.brackets})}}
        isPressed=${attributes.brackets}
        label="Toggle 'Brackets' Modifier"
      />
    </${BlockControls}>
    <${IconPicker}
      ref=${iconPickerRef}
      onChange=${onIconSelect}
      selectedIcon=${attributes.icon}
      ></${IconPicker}>

    <div className="${classes}">
      <a className="factoid__link">
        <div className="factoid__bracket-one"></div>
        <div className="factoid__bracket-wrapper">
          <div className="factoid__figure factoid__icon" onClick=${onIconClick}>
            <ucdlib-icon icon=${attributes.icon}></ucdlib-icon>
          </div>
          <div className="factoid__body">
            <h2 className="factoid__big-text">
              <${RichText}
                tagName="span"
                value=${attributes.bigText}
                onChange=${(value) => setAttributes({bigText: value})}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Big Text..."
              />
            </h2>
            <h3 className="factoid__small-text">
              <${RichText}
                tagName="span"
                value=${attributes.smallText}
                onChange=${(value) => setAttributes({smallText: value})}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Small Text..."
              />
            </h3>
          </div>
        </div>
        <div className="factoid__bracket-two"></div>
      </a>
    </div>

  </div>
  `
}
