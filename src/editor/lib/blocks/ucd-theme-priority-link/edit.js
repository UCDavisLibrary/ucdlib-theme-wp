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

  const onIconChangeRequest = () => {
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
    'vertical-link': true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor ? true : false,
    'vertical-link--circle': !attributes.tiltCircle,
    'vertical-link--tilt-circle': attributes.tiltCircle
  });

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
        icon=${UCDIcons.renderPublic("fa-rotate-right")}
        onClick=${ () => {setAttributes({'tiltCircle': !attributes.tiltCircle})}}
        isPressed=${attributes.tiltCircle}
        label="Toggle 'Tilt Circle' Modifier"
      />
    </${BlockControls}>
    <${IconPicker}
      ref=${iconPickerRef}
      onChange=${onIconSelect}
      selectedIcon=${attributes.icon}
      ></${IconPicker}>
      <div>
        <a className='${classes}'>
          <div className='vertical-link__figure' onClick=${onIconChangeRequest}>
            <ucdlib-icon class='vertical-link__image' icon='${attributes.icon}'></ucdlib-icon>
          </div>
          <div className='vertical-link__title'>
            <${RichText}
              tagName="span"
              value=${attributes.text}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Text..."
              onChange=${ ( text ) => setAttributes({text}) }
            />
          </div>
        </a>
      </div>
  </div>
  `
}
