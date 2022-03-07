import { html, BlockSettings, SelectUtils } from "../../utils";
import { ImagePicker, ToolbarPostReset, ToolbarLinkPicker } from "../../block-components";
import "./ucd-wp-media-link";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { useRef, useEffect } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes, context } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);

  // Listen to changes in component body
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    let reset = false;
    if ( propName === 'title'){
      if (!propValue ) return;
      if ( propValue === postTitle ) reset = true;
    } else if (propName === 'excerpt') {
      if (!propValue ) return;
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
    } else if (part.slug === 'thumbnail') {
      setAttributes({imageId: 0});
    }
  }
  const postParts = (() => {
    return [
      {slug: "thumbnail", isDisabled: !attributes.imageId || !postImage},
      {slug: 'title', isDisabled: !attributes.title}, 
      {slug: 'excerpt', isDisabled: !attributes.excerpt}]
  })();

  // set up link picker
  const onHrefChange = (value) => {
    let attrs = {
      href: value.kind === 'post-type' ? "" : value.url,
      newTab: value.opensInNewTab ? true : false,
      post: value.kind === 'post-type' ? {id: value.id, type: value.type} : {}
    }
    if ( value.kind === 'post-type' && value.type == 'post' ) {
      attrs.hideByline = false;
      attrs.hideCategories = false;
    }
    setAttributes(attrs);
  }
  const hrefContent = (() => {
    let value = {opensInNewTab: attributes.newTab, url: ""};
    if ( attributes.href ) {
      value.url = attributes.href;
    } else if ( post && post.link ) {
      value.url = post.link;
      value.kind = 'post-type';
      value.type = post.type;
    }
    return value;
  })();

  const mainEleProps = () => {
    let p = {ref: mainEleRef};

    if ( attributes.href || post ) p.href = attributes.href ? attributes.href : post.link;
    if ( attributes.hideImage) p['hide-image'] = "true";

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

    if ( context['media-links/hideImage'] ){
      p['hide-image'] = true;
    }

    if ( customImage ) {
      p['img-src'] = customImage.source_url;
    } else if ( postImage ){
      p['img-src'] = postImage.source_url;
    } else {
      p['img-src'] = BlockSettings.getImage('media-link');
    }

    return p
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
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
          image=${customImage}
          onSelect=${onSelectImage}

          onRemove=${onRemoveImage}
          defaultImageId=${postImage && !attributes.imageId ? postImage.id : 0}
          helpText="Use a square image for best results"
          panelAttributes=${{title: 'Custom Image'}}
        />
      </${InspectorControls}>
      <ucd-wp-media-link ...${ mainEleProps() }>
        <div slot="title" contentEditable="true"></div>
        <div slot="excerpt" contentEditable="true"></div>
      </ucd-wp-media-link>
    </div>

  `;
};