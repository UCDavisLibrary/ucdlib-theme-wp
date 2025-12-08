import { html, BlockSettings, SelectUtils } from "../../utils";
import { ImagePicker, ToolbarPostReset, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes, context } = props;
  const blockProps = useBlockProps();

  const onTextUpdate = (propName, propValue) => {
    let reset = false;
    if ( propName === 'title'){
      if (postTitle && !propValue ) return;
      if ( propValue === postTitle ) reset = true;
    } else if (propName === 'excerpt') {
      if (postExcerpt && !propValue ) return;
      if ( propValue === postExcerpt ) reset = true;
    }

    const newAttrs = {};
    newAttrs[propName] = reset ? "" : propValue;
    setAttributes(newAttrs);
  }

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);
  let customPostImage = post && post.meta ? post.meta.ucd_thumbnail_1x1 : 0;
  customPostImage = SelectUtils.image(customPostImage);

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

  const hideImage = attributes.hideImage || context['media-links/hideImage'] || false;

  let title = '';
  if ( attributes.title ){
    title = attributes.title;
  } else if ( postTitle ){
    title = postTitle;
  }
  let excerpt = '';
  if ( attributes.excerpt ){
    excerpt = attributes.excerpt;
  } else if ( postExcerpt ){
    excerpt = postExcerpt;
  }
  let imgSrc = BlockSettings.getImage('media-link');
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
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
      <a className="media-link">
        ${ !hideImage && html`
          <div className="media-link__figure" style=${{maxWidth: '135px', width: '25%'}}>
            <div className="u-background-image aspect--1x1" style=${{backgroundImage: `url(${imgSrc})`}}></div>
          </div>
        `}
        <div className="media-link__body">
          <div className="media-link__title">
            <${RichText}
              tagName="span"
              value=${title}
              onChange=${(value) => onTextUpdate('title', value)}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Write a title..."
            />
          </div>
          <p>
          <${RichText}
            tagName="span"
            value=${excerpt}
            onChange=${(value) => onTextUpdate('excerpt', value)}
            withoutInteractiveFormatting
            allowedFormats=${[]}
            placeholder="Write text..."
          />
          </p>
        </div>
      </a>
    </div>

  `;
};
