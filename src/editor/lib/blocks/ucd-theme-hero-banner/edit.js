import { html, SelectUtils} from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, AlignmentControl, RichText } from '@wordpress/block-editor';

import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);

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
  let imgSrc = '';
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
  }

  const classes = classnames({
    'hero-banner': true,
    [`hero-banner--align-${attributes.alignment}`]: attributes.alignment,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor,
    'no-image': !imgSrc
  });

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="hero-banner"
        />
        <${AlignmentControl}
			    value=${ attributes.alignment }
			    onChange=${ ( alignment ) => setAttributes( { alignment } ) }
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
          helpText=""
          panelAttributes=${{title: 'Custom Card Image'}}
        />
      </${InspectorControls}>
      <style>
        .hero-banner.no-image {
          background-color: #73abdd;
        }
      </style>
      <section className=${classes}>
        <div className="hero-banner__image u-background-image" style=${{backgroundImage: `url(${imgSrc})`}}></div>
        ${attributes.color ? true : false && html`
          <div className="hero-banner__film"></div>
        `}
        <div className="hero-banner__body">
          <div className="hero-banner__title">
            <${RichText}
              tagName="span"
              value=${title}
              onChange=${(value) => onTextUpdate('title', value)}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              placeholder="Write a title..."
            />
          </div>
          <div className="hero-banner__summary">
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
          <div className="hero-banner__button-group">
            <a class="hero-banner__button">
              <${RichText}
                tagName="span"
                value=${attributes.buttonText}
                onChange=${(value) => setAttributes({buttonText: value})}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Write text..."
              />
            </a>
          </div>
        </div>

      </section>
    </div>

  `;
};
