import { html } from "../../utils";
import { ToolbarSectionDisplay } from "../../block-components";
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
      {slug: "image", isHidden: attributes.hideImage},
    ]
  })();
  const allowedBlocks = ['ucd-theme/media-link']
  const template = [['ucd-theme/media-link', {}]];

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarSectionDisplay}
        sections=${blockSections}
        onChange=${onSectionToggle}
      />
    </${BlockControls}>
    <${InnerBlocks} 
      allowedBlocks=${allowedBlocks}
      template=${template}
    />
  </div>
  `
}