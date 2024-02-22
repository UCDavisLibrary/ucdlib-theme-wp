import { html, BlockSettings, SelectUtils, UCDIcons } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarSectionDisplay, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';
import { ToolbarButton } from "@wordpress/components";

import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
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
  let customPostImage = post && post.meta ? post.meta.ucd_thumbnail_4x3 : 0;
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

  // set up section hider
  const onSectionToggle = (section) => {
    let attrs = {};
    let attr = `hide${section.slug.charAt(0).toUpperCase() + section.slug.slice(1)}`;
    attrs[attr] = !attributes[attr];
    setAttributes(attrs);
  }
  const cardSections = (() => {
    return [
      {slug: 'badge', title: "Badge", icon: "picture-in-picture-alt", isHidden: attributes.hideBadge},
      {slug: "title", isHidden: attributes.hideTitle},
      {slug: 'excerpt', isHidden: attributes.hideExcerpt},
      {slug: 'button', isHidden: attributes.hideButton}
    ]
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

  const classes = classnames({
    "marketing-highlight": true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor,
    [`marketing-highlight--featured`]: attributes.featured
  });

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
  let imgSrc = BlockSettings.getImage('marketing-highlight');
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        <${ToolbarButton}
          icon=${UCDIcons.render("color.fill")}
          onClick=${ () => {setAttributes({'featured': !attributes.featured})}}
          isPressed=${attributes.featured}
          label="Toggle 'Featured' Display Setting"/>
        <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="marketing-highlight"
        />
        <${ToolbarSectionDisplay}
          sections=${cardSections}
          onChange=${onSectionToggle}
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
      <div className=${classes}>
        <div className="marketing-highlight__image aspect--4x3 u-background-image" role="img" style=${{backgroundImage: `url(${imgSrc})`}}>
          ${!attributes.hideBadge && html`
            <h3 className="marketing-highlight__type">
              <${RichText}
                tagName="span"
                value=${attributes.badge}
                onChange=${(badge) => setAttributes({badge})}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Write text..."
              />
            </h3>
          `}
        </div>
        <div className="marketing-highlight__body">
          ${!attributes.hideTitle && html`
            <h3 className="marketing-highlight__title">
              <${RichText}
                tagName="span"
                value=${title}
                onChange=${(value) => onTextUpdate('title', value)}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Write a title..."
              />
            </h3>
          `}
          ${!attributes.hideExcerpt && html`
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
          `}
          ${!attributes.hideButton && html`
            <span className="marketing-highlight__cta">
              <${RichText}
                tagName="span"
                value=${attributes.buttonText}
                onChange=${(value) => setAttributes({buttonText: value})}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Write text..."
              />
            </span>
          `}
        </div>
      </div>
    </div>

  `;
};
