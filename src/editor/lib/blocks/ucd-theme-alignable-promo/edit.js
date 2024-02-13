import { html, BlockSettings, SelectUtils, UCDIcons } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarSectionDisplay, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, AlignmentControl, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);
  let customPostImage = post && post.meta ? post.meta.ucd_thumbnail_4x3 : 0;
  customPostImage = SelectUtils.image(customPostImage);
  const secondaryButtonPostData = SelectUtils.post(attributes?.secondaryButtonPost?.id, attributes?.secondaryButtonPost?.type);

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
      {slug: "subTitle", title: 'SubTitle', isHidden: attributes.hideSubTitle, icon: 'post.title'},
      {slug: 'excerpt', isHidden: attributes.hideExcerpt},
      {slug: 'primaryButton', title: 'Primary Button', isHidden: attributes.hidePrimaryButton, icon: 'button'},
      {slug: 'secondaryButton', title: 'Secondary Button', isHidden: attributes.hideSecondaryButton, icon: 'button'},
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

    // set up secondart button link picker
    const onSecondaryButtonHrefChange = (value) => {
      setAttributes({
        secondaryButtonHref: value.kind === 'post-type' ? "" : value.url,
        secondaryButtonNewTab: value.opensInNewTab ? true : false,
        secondaryButtonPost: value.kind === 'post-type' ? {id: value.id, type: value.type} : {}
      });
    }
    const secondaryButtonHrefContent = (() => {
      let value = {opensInNewTab: attributes.secondaryButtonNewTab, url: ""};
      if ( attributes.secondaryButtonHref ) {
        value.url = attributes.secondaryButtonHref;
      } else if ( secondaryButtonPostData && secondaryButtonPostData.link ) {
        value.url = secondaryButtonPostData.link;
        value.kind = 'post-type';
        value.type = secondaryButtonPostData.type;
      }
      return value;
    })();

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  let imgSrc = BlockSettings.getImage('alignable-promo');
  if ( customImage ) {
    imgSrc = customImage.source_url;
  } else if ( customPostImage ){
    imgSrc = customPostImage.source_url;
  } else if ( postImage ){
    imgSrc = postImage.source_url;
  }

  // set up alignment control
  // wordpress thinks in terms of text, ucd theme thinks in terms of the image
  let alignment = attributes.alignment || 'center';
  if ( alignment === 'left' ) {
    alignment = 'right';
  } else if ( alignment === 'right' ) {
    alignment = 'left';
  };
  const onAlignmentChange = (alignment) => {
    if ( alignment === 'left' ) {
      alignment = 'right';
    } else if ( alignment === 'right' ) {
      alignment = 'left';
    };
    setAttributes({alignment});
  }

  const classes = classnames({
    'alignable-promo': true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor,
    'alignable-promo--left': attributes.alignment === 'left',
    'alignable-promo--right': attributes.alignment === 'right'
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
        <${AlignmentControl}
          value=${ alignment }
          onChange=${ onAlignmentChange }
        />
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="alignable-promo"
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
        ${!attributes.hideSecondaryButton && html`
          <${ToolbarLinkPicker}
            onChange=${onSecondaryButtonHrefChange}
            value=${secondaryButtonHrefContent}
            icon=${html`<span>Secondary Button Link</span>`}
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

      <div className="${classes}">
        <div className="alignable-promo__wrapper">
          <div className="alignable-promo__figure">
            <div className="aspect--4x3 u-background-image" role='img' style=${ {backgroundImage: 'url(' + imgSrc + ')'} }></div>
          </div>
          <div className="alignable-promo__body">
            <h2 className="alignable-promo__title">
              ${!attributes.hideTitle && html`
                <span className="alignable-promo__line1">
                  <${RichText}
                    tagName="span"
                    value=${title}
                    withoutInteractiveFormatting
                    allowedFormats=${[]}
                    placeholder="Title"
                    onChange=${ ( title ) => setAttributes({title}) }
                  />
                </span>
              `}
              ${!attributes.hideSubTitle && html`
                <span className="alignable-promo__line2">
                  <${RichText}
                    tagName="span"
                    value=${attributes.subTitle}
                    withoutInteractiveFormatting
                    allowedFormats=${[]}
                    placeholder="Sub Title"
                    onChange=${ ( subTitle ) => setAttributes({subTitle}) }
                  />
                </span>
              `}
            </h2>
            ${!attributes.hideExcerpt && html`
              <div className="alignable-promo__text">
                <${RichText}
                  tagName="p"
                  value=${excerpt}
                  withoutInteractiveFormatting
                  allowedFormats=${[]}
                  placeholder="Excerpt"
                  onChange=${ ( excerpt ) => setAttributes({excerpt}) }
                />
              </div>
            `}
            <div className="alignable-promo__buttons">
              ${!attributes.hidePrimaryButton && html`
                <a className="btn btn--primary">
                  <${RichText}
                    tagName="span"
                    value=${attributes.primaryButtonText}
                    withoutInteractiveFormatting
                    allowedFormats=${[]}
                    placeholder="Primary Button"
                    onChange=${ ( primaryButtonText ) => setAttributes({primaryButtonText}) }
                  />
                </a>
              `}
              ${!attributes.hideSecondaryButton && html`
                <a className="btn btn--invert">
                  <${RichText}
                    tagName="span"
                    value=${attributes.secondaryButtonText}
                    withoutInteractiveFormatting
                    allowedFormats=${[]}
                    placeholder="Secondary Button"
                    onChange=${ ( secondaryButtonText ) => setAttributes({secondaryButtonText}) }
                  />
                </a>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
