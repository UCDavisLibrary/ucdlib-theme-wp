import { html } from "../../utils";
import { ImagePicker, ToolbarColorPicker } from "../../block-components";
import "./ucd-wp-marketing-highlight";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from "@wordpress/data";
import { ToolbarButton, Dropdown } from "@wordpress/components";
import { link } from '@wordpress/icons';
import { useRef, useEffect } from "@wordpress/element";

// Still experimental component. Looks to be close to release though.
const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // retrieve needed wp data
  const {image, post} = useSelect((select) => {
    const image = attributes.imageId ? select('core').getMedia(attributes.imageId) : undefined;
    const post = attributes.post.id ? select('core').getEntityRecord('postType', attributes.post.type, attributes.post.id) : undefined;
    return { image, post };
  });

  // Listen to changes in component body
  const onMainEleUpdated = (e) => {
    console.log(e);
  }
  useEffect(() => {
    let mainEle = null;
    if ( mainEleRef.current ) {
      mainEleRef.current.addEventListener('updated', onMainEleUpdated);
      mainEle = mainEleRef.current;
    }
    return () => {
      if ( mainEle ) {
        mainEle.removeEventListener('updated', onMainEleUpdated);
      }
    };
  });

  // set up image picker
  const onSelectImage = (image) => {
    setAttributes({imageId: image.id});
  }
  const onRemoveImage = () => {
    setAttributes({imageId: 0});
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

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  const mainEleProps = () => {
    let p = {ref: mainEleRef, "button-text": attributes.buttonText};

    if ( attributes.featured ) p.featured = "true";
    if ( attributes.brandColor ) p.color = attributes.brandColor;
    if ( attributes.href ) p.href = attributes.href;

    if ( post ) p['has-default-content'] = "true";
    if ( attributes.title ){
      p.title = attributes.title;
      p['can-edit-title'] = "true";
    } else if ( post && post.title && post.title.rendered ){
      p.title = post.title.rendered;
    }

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
        <${ToolbarColorPicker} 
          onChange=${onColorChange}
          value=${attributes.brandColor}
        />
      </${BlockControls}>
      <${InspectorControls}>
        <${ImagePicker} 
          imageId=${attributes.imageId}
          image=${image}
          onSelect=${onSelectImage}
          onRemove=${onRemoveImage}
          helpText="Use a 4:3 image for best results"
          panelAttributes=${{title: 'Custom Card Image'}}
        />
      </${InspectorControls}>
      <ucd-wp-marketing-highlight ...${ mainEleProps() }
      ></ucd-wp-marketing-highlight>
    </div>

  `;
};