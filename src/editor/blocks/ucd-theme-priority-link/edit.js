import { html } from "../../utils";
import "./ucd-wp-priority-link";
import { ToolbarColorPicker, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { useRef, useEffect } from "@wordpress/element";


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();


  // Wire up the main component
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    const newAttrs = {};
    newAttrs[propName] = propValue;
    setAttributes(newAttrs);
  }
  const onIconChangeRequest = () => {
    console.log("Change!");
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

    return p;
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
    let value = {opensInNewTab: attributes.newTab};
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
    </${BlockControls}>
    <ucd-wp-priority-link ...${ mainEleProps() }></ucd-wp-priority-link>
  </div>
  `
}