import {
  html,
  BlockSettings,
  SelectUtils } from "../../utils";
import {
  ImagePicker,
  ToolbarColorPicker,
  ToolbarPostReset,
  ToolbarSectionDisplay,
  ToolbarLinkPicker } from "../../block-components";
import {
  useBlockProps,
  BlockControls,
  RichText,
  InspectorControls } from '@wordpress/block-editor';

import {
  PanelBody,
  PanelRow,
  TextControl,
  TextareaControl } from "@wordpress/components";
import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);
  let customPostImage = 0;
  if ( post && post.meta ) {
    if ( post.meta.ucd_thumbnail_1x1_large ) {
      customPostImage = post.meta.ucd_thumbnail_1x1_large;
    } else if ( post.meta.ucd_thumbnail_4x3 ) {
      customPostImage = post.meta.ucd_thumbnail_4x3;
    }
  }
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
      {slug: "title", isHidden: attributes.hideTitle},
      {slug: 'excerpt', isHidden: attributes.hideExcerpt}
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

  let imgSrc = BlockSettings.getImage('tile-link');
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( customPostImage ){
    imgSrc = customPostImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
  }

  const classes = classnames({
    'tile-link': true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor
  })

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

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
      <${ToolbarColorPicker}
        onChange=${onColorChange}
        value=${attributes.brandColor}
        ucdBlock="tile-link"
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
        helpText="Use a 1:1 image and at least 382px for best results"
        panelAttributes=${{title: 'Custom Card Image'}}
      />

    </${InspectorControls}>

    <a className="${classes}">
      ${(!attributes.hideTitle) && html`
        <div className="tile-link__title">
          <div className="tile-link__title-heading">
            <${RichText}
              tagName="span"
              value=${title}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              onChange=${ ( title ) => setAttributes({title}) }
              placeholder="Add a title"
            />
          </div>
        </div>
      `}
      ${(!attributes.hideExcerpt) && html`
        <div className="tile-link__description">
          <p>
            <${RichText}
              tagName="span"
              value=${excerpt}
              withoutInteractiveFormatting
              allowedFormats=${[]}
              onChange=${ ( excerpt ) => setAttributes({excerpt}) }
              placeholder="Add a description"
            />
          </p>
        </div>
      `}
      <div className="tile-link__indicator">
        <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"></path>
        </svg>
      </div>
      <div className="o-filtered-image">
        <div className="aspect--1x1 u-background-image" role='img' style=${ {backgroundImage: 'url(' + imgSrc + ')'} }></div>
      </div>
      <div className="tile-link__overlay"></div>
    </a>
  </div>

`;
}
