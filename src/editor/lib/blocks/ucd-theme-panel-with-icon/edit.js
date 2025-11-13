import { html } from "../../utils";
import { ToolbarColorPicker, ToolbarLinkPicker, IconPicker, ToolbarPaddingPicker, ToolbarSectionDisplay, ToolbarHeaderLevel } from "../../block-components";
import { useBlockProps, BlockControls, InnerBlocks, RichText } from '@wordpress/block-editor';
import { createRef } from "@wordpress/element";

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

  const classes = classnames({
    "panel": true,
    "panel--icon": true,
    "panel--icon-custom": true,
    "o-box": true,
    [`o-box--${attributes.padding}`]: attributes.padding,
  });
  const iconClasses = classnames({
    "panel__custom-icon": true,
    "clickable": true,
    [attributes.brandColor]: attributes.brandColor
  });

  // set up section hider
  const onSectionToggle = (section) => {
    let attrs = {};
    let attr = `hide${section.slug.charAt(0).toUpperCase() + section.slug.slice(1)}`;
    attrs[attr] = !attributes[attr];
    setAttributes(attrs);
    }
  const cardSections = (() => {
  return [
      {slug: "moreLink", isHidden: attributes.hideMoreLink},
  ]
  })();

  // set up icon picker
  const onIconSelect = (icon) => {
    setAttributes({icon: `${icon.iconSet}:${icon.icon}`})
  }

  // set up padding picker
  const onPaddingChange = (v) => {
    let padding = v.slug === "default" ? "" : v.slug;
    setAttributes({padding});
  }

  // set up header level picker
  const onHeaderLevelChange = (level) => {
    setAttributes({headingLevel: level});
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
      <${ToolbarHeaderLevel}
        value=${attributes.headingLevel}
        onChange=${onHeaderLevelChange}
        defaultValue=${2}
      />
      <${ToolbarColorPicker}
        onChange=${onColorChange}
        value=${attributes.brandColor}
        ucdBlock="panel-with-icon"/>
      <${ToolbarPaddingPicker}
        value=${attributes.padding}
        onChange=${onPaddingChange}/>
      <${ToolbarSectionDisplay}
        sections=${cardSections}
        onChange=${onSectionToggle}/>
    </${BlockControls}>
    <${IconPicker}
      ref=${iconPickerRef}
      onChange=${onIconSelect}
      selectedIcon=${attributes.icon}
      >
    </${IconPicker}>
    <div className=${classes}>
      <${'h' + attributes.headingLevel} className="panel__title">
        <ucdlib-icon
          onClick=${onIconClick}
          icon=${attributes.icon}
          class=${iconClasses}>
        </ucdlib-icon>
        <${RichText}
          tagName="span"
          value=${attributes.title}
          onChange=${(title) => setAttributes({title})}
          withoutInteractiveFormatting
          allowedFormats=${[]}
          placeholder="Write a title..."
        />
      </${'h' + attributes.headingLevel}>
      <section>
        <${InnerBlocks} />
        ${!attributes.hideMoreLink && html`
          <a className="icon-ucdlib">
            <ucdlib-icon icon="ucd-public:fa-circle-chevron-right" class=${attributes.brandColor || ''}></ucdlib-icon>
            <span>
            <${RichText}
              tagName="span"
              value=${attributes.moreText}
              onChange=${(moreText) => setAttributes({moreText})}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Write a link text..."
            />
            </span>
          </a>
        `}
      </section>
    </div>

  </div>
  `
}
