import { html } from "../../utils";
import { imagePicker } from "../../block-components";
import "./ucd-wp-marketing-highlight";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { withSelect } from "@wordpress/data";
import { ToolbarButton, Dropdown } from "@wordpress/components";
import { link } from '@wordpress/icons';

// Still experimental component. Looks to be close to release though.
const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

const MarketingHighlight = ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // set up image picker
  const onSelectImage = (image) => {
    setAttributes({imageId: image.id});
  }
  const onRemoveImage = () => {
    setAttributes({imageId: 0});
  }
  const imagePickerSettings = {
    imageId: attributes.imageId,
    image: props.image,
    onSelect: onSelectImage,
    onRemove: onRemoveImage,
    helpText: "Use a 4:3 image for best results",
    panelAttributes: {title: 'Custom Card Image'}
  }

  // set up link picker
  const onHrefChange = (value) => {
    setAttributes({
      href: value.url,
      newTab: value.opensInNewTab ? true : false,
      post: value.kind === 'post-type' ? {id: value.id, type: value.type} : {}
    });
  }
  const hrefButton = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${link} label="Link to a Webpage"/>
    `;
  }
  const hrefContent = () => {
    const value = {url: attributes.href, opensInNewTab: attributes.newTab}
    return html`<${LinkControl} value=${value} onChange=${onHrefChange}/>`;
  }

  const mainEleProps = () => {
    let p = {};

    if ( attributes.featured ) p.featured = "true";

    return p
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${Dropdown} position="bottom right" renderToggle=${hrefButton} renderContent=${hrefContent}/>
        <${ToolbarButton} 
          icon=${html`<iron-icon icon="invert-colors"></iron-icon>`} 
          onClick=${ () => {setAttributes({'featured': !attributes.featured})}} 
          isPressed=${attributes.featured}
          label="Toggle 'Featured' Display Setting"/>
      </${BlockControls}>
      <${InspectorControls}>
        ${ imagePicker(imagePickerSettings) }
      </${InspectorControls}>
      <ucd-wp-marketing-highlight ...${ mainEleProps() }
      ></ucd-wp-marketing-highlight>
    </div>

  `;
};

export default withSelect((select, props) => {
  const image = props.attributes.imageId ? select('core').getMedia(props.attributes.imageId) : undefined;
  const post = props.attributes.post.id ? select('core').getEntityRecord('postType', props.attributes.post.type, props.attributes.post.id) : undefined;
  return { image, post };
})(MarketingHighlight);