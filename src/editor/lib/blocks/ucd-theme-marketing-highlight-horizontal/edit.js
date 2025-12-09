import { html, BlockSettings, SelectUtils, UCDIcons } from "../../utils";
import { ImagePicker, ToolbarPostReset, ToolbarColorPicker, ToolbarSectionDisplay, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';
import { ToolbarButton } from "@wordpress/components";

import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const { customImage, post, postImage, postTitle } = SelectUtils.card(attributes);
  let customPostImage = post && post.meta ? post.meta.ucd_thumbnail_4x3 : 0;
  customPostImage = SelectUtils.image(customPostImage);

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

  // set up post reset
  const onPostReset = (part) => {
    if ( part.slug === 'title') {
      setAttributes({title: ""});
    } else if ( part.slug === 'thumbnail' ) {
      setAttributes({imageId: 0});
    }
  }
  const postParts = (() => {
    return [
      {slug: "thumbnail", isDisabled: !attributes.imageId || !postImage},
      {slug: 'title', isDisabled: !attributes.title}, ]
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
      {slug: 'title', isHidden: attributes.hideTitle}
    ]
  })();

  // set up image picker
  const onSelectImage = (image) => {
    setAttributes({imageId: image.id});
  }
  const onRemoveImage = () => {
    setAttributes({imageId: 0});
  }

  let title = '';
  if ( attributes.title ){
    title = attributes.title;
  } else if ( postTitle ){
    title = postTitle;
  }
  let imgSrc = BlockSettings.getImage('marketing-highlight-horizontal');
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
  }

  const classes = classnames({
    'marketing-highlight-horizontal': true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor,
    'marketing-highlight-horizontal--overlay': attributes.overlay
  });

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="marketing-highlight-horizontal"
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
        <${ToolbarButton}
          icon=${UCDIcons.renderPublic("fa-layer-group")}
          onClick=${ () => {setAttributes({'overlay': !attributes.overlay})}}
          isPressed=${attributes.overlay}
          label="Toggle 'Overlay' Modifier"
        />
      </${BlockControls}>
      <${InspectorControls}>
        <${ImagePicker}
          imageId=${attributes.imageId}
          image=${customImage}
          onSelect=${onSelectImage}
          onRemove=${onRemoveImage}
          defaultImageId=${postImage && !attributes.imageId ? postImage.id : 0}
          helpText="Use a 16:9 image for best results"
          panelAttributes=${{title: 'Custom Image'}}
        />
      </${InspectorControls}>
      <div className=${classes}>
        <div className="marketing-highlight-horizontal__image">
          <div className="u-background-image aspect--16x9" style=${{backgroundImage: `url(${imgSrc})`}}></div>
        </div>
        ${!attributes.hideTitle && html`
          <div className="marketing-highlight-horizontal__body">
            <div className="marketing-highlight-horizontal__title">
              <${RichText}
                tagName="span"
                value=${title}
                onChange=${ (value) => onTextUpdate('title', value)}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Write a title..."
              />
        </div>
          </div>
        `}
      </div>
    </div>
  `;
};
