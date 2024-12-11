import { html, BlockSettings, SelectUtils } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';

import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps({className: "vm-poster"});

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
  let customPostImage = post && post.meta ? post.meta.ucd_thumbnail_4x3 : 0;
  customPostImage = SelectUtils.image(customPostImage);

  // set up link picker
  const onHrefChange = (value) => {
    setAttributes({
      href: value.kind === 'post-type' ? "" : value.url,
      newTab: value.opensInNewTab ? true : false,
      post: value.kind === 'post-type' ? {id: value.id, type: value.type} : {}
    });
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

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

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
  let imgSrc = BlockSettings.getImage('poster');
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
  }

  const classes = classnames({
    "vm-poster": true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor
  });

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
      <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="poster"
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
        image=${customImage}
        onSelect=${onSelectImage}

        onRemove=${onRemoveImage}
        defaultImageId=${postImage && !attributes.imageId ? postImage.id : 0}
        helpText="Use a 4:3 image for best results"
        panelAttributes=${{title: 'Custom Card Image'}}
      />
    </${InspectorControls}>

    <a className=${classes} style=${{width:'100%', margin: 0}}>
      <div className="aspect--16x9 u-background-image" style=${{backgroundImage: `url(${imgSrc})`}}></div>
      <div className="vm-poster__body">
        <div className="vm-poster__body-text">
          <h2 className="vm-poster__title">
            <${RichText}
              tagName="span"
              value=${title}
              onChange=${(v) => onTextUpdate('title', v)}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Write a title..."
            />
          </h2>
          <p>
            <${RichText}
              tagName="span"
              value=${excerpt}
              onChange=${(v) => onTextUpdate('excerpt', v)}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Write a summary..."
            />
          </p>
        </div>
      </div>
    </a>

  </div>
  `;
}
