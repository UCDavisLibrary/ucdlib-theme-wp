import { html } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset } from "../../block-components";
import "./ucd-wp-marketing-highlight";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { decodeEntities } from "@wordpress/html-entities";
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
  const {image, post, postTitle, postExcerpt} = useSelect((select) => {
    const image = attributes.imageId ? select('core').getMedia(attributes.imageId) : undefined;
    const post = attributes.post.id ? select('core').getEntityRecord('postType', attributes.post.type, attributes.post.id) : undefined;
    const postTitle = post && post.title && post.title.rendered ? post.title.rendered : undefined;
    let postExcerpt = undefined;
    if ( post && post.excerpt && post.excerpt.rendered ) {
      postExcerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
      postExcerpt = decodeEntities(postExcerpt).replace(/(?:\r\n|\r|\n)/g, '');
    }
    return { image, post, postTitle, postExcerpt };
  });

  // Listen to changes in component body
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    let reset = false;
    console.log(e);
    if ( propName === 'title'){
      if ( propValue === postTitle ) reset = true;
    } else if (propName === 'excerpt') {
      if ( propValue === postExcerpt ) reset = true;
    }
    
    const newAttrs = {};
    newAttrs[propName] = reset ? "" : propValue;
    setAttributes(newAttrs);

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

  // set up post reset
  const onPostReset = (part) => {
    if ( part.slug === 'title') {
      setAttributes({title: ""});
    } else if (part.slug === 'excerpt') {
      setAttributes({excerpt: ""});
    }
  }
  const postParts = (() => {
    return [
      {slug: 'title', isDisabled: !attributes.title}, 
      {slug: 'excerpt', isDisabled: !attributes.excerpt}]
  })();

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

    if ( attributes.title ){
      p.title = attributes.title;
    } else if ( postTitle ){
      p.title = postTitle;
    } else {p.title = ""}

    if ( attributes.excerpt ){
      p.excerpt = attributes.excerpt;
    } else if ( postExcerpt ){
      p.excerpt = postExcerpt;
    } else {p.excerpt = ""}

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
        ${post && html`
          <${ToolbarPostReset}
            postProps=${postParts}
            onChange=${onPostReset}
           />
        `}
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
      <ucd-wp-marketing-highlight ...${ mainEleProps() }></ucd-wp-marketing-highlight>
    </div>

  `;
};