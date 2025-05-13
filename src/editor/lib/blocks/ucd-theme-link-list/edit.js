import { html, BlockSettings } from "../../utils";
import { ToolbarSectionDisplay, ToolbarColorPicker } from "../../block-components";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // set up section hider
  const onSectionToggle = (section) => {
    let attrs = {};
    let attr = `hide${section.slug.charAt(0).toUpperCase() + section.slug.slice(1)}`;
    attrs[attr] = !attributes[attr];
    setAttributes(attrs);
  }
  const blockSections = (() => {
    return [
      {slug: 'excerpt', isHidden: attributes.hideExcerpt}
    ]
  })();


  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  // innerblock settings
  const allowedBlocks = ['ucd-theme/link-list-item']
  const template = [['ucd-theme/link-list-item', {}]];

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarSectionDisplay}
        sections=${blockSections}
        onChange=${onSectionToggle}
      />
      <${ToolbarColorPicker}
        onChange=${onColorChange}
        value=${attributes.brandColor}
        ucdBlock="link-list"
      />
    </${BlockControls}>
    <${InnerBlocks}
      allowedBlocks=${allowedBlocks}
      template=${template}
    />
  </div>
  `
}
