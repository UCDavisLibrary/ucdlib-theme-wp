import { html } from "../../utils";
import "./ucd-wp-panel-with-icon";
import { ToolbarColorPicker, ToolbarLinkPicker, IconPicker, ToolbarPaddingPicker, ToolbarSectionDisplay } from "../../block-components";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { useRef, useEffect, createRef } from "@wordpress/element";


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();
  const iconPickerRef = createRef();


  // Wire up the main component
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    const newAttrs = {};
    newAttrs[propName] = propValue;
    setAttributes(newAttrs);
  }
  const onIconChangeRequest = () => {
    if ( iconPickerRef.current ){
      iconPickerRef.current.openModal();
    }
  }

  useEffect(() => {
    let mainEle = null;
    if ( mainEleRef.current ) {
      mainEleRef.current.addEventListener('updated', onMainEleUpdated);
      mainEleRef.current.addEventListener('icon-change', onIconChangeRequest);
      mainEle = mainEleRef.current;
    }
    return () => {
      if ( mainEle ) {
        mainEle.removeEventListener('updated', onMainEleUpdated);
        mainEle.removeEventListener('icon-change', onIconChangeRequest);
      }
    };
  });

  const mainEleProps = () => {
    let p = {ref: mainEleRef};
    if ( attributes.brandColor ) p.color = attributes.brandColor;
    if ( attributes.icon ) p.icon = attributes.icon;
    if ( attributes.moreText ) p['more-text'] = attributes.moreText;
    if ( attributes.hideMoreLink ) p['hide-more-link'] = true;
    if ( attributes.title ) p.title = attributes.title;
    p.padding = attributes.padding;

    return p;
  }

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

  // set up link picker
  const onHrefChange = (value) => {
    let attrs = {
      href: value.url,
      newTab: value.opensInNewTab ? true : false
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
        ucdBlock="priority-link"/>
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
      ></${IconPicker}>
    <ucd-wp-panel-with-icon ...${ mainEleProps() }>
      <div>
          <${InnerBlocks} />
      </div>
    </ucd-wp-panel-with-icon>

  </div>
  `
}