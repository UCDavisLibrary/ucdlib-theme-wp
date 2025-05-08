import { html, UCDIcons } from "../../utils";
//import "./ucd-wp-priority-link";
import { ToolbarColorPicker, ToolbarLinkPicker, IconPicker } from "../../block-components";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { useRef, useEffect, createRef } from "@wordpress/element";
import { ToolbarButton } from "@wordpress/components";


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
    if ( attributes.text ) p.text = attributes.text;
    if ( attributes.tiltCircle ) p['tilt-circle'] = true;

    return p;
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
    <ucd-wp-priority-link ...${ mainEleProps() }>
      <div slot="text" contentEditable="true"></div>
    </ucd-wp-priority-link>
  </div>
  `
}
