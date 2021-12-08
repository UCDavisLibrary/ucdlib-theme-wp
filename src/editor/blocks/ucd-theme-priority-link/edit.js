import { html } from "../../utils";
import { ToolbarColorPicker, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { Fragment } from '@wordpress/element';


export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();

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
  <${Fragment} ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
      <${ToolbarColorPicker} 
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="priority-link"
      />
    </${BlockControls}>
  </${Fragment}>
  `
}