import { html, BlockSettings, SelectUtils, UCDIcons } from "../../utils";
import { ImagePicker, ToolbarPostReset, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, RichText } from '@wordpress/block-editor';
import { useRef } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // retrieve needed wp data
  const {customImage, post, postTitle, postImage} = SelectUtils.card(attributes);
  const postSubTitle = post && post.meta ? post.meta.ucd_subtitle : '';

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
    } else if (part.slug === 'subTitle') {
      setAttributes({subTitle: ""});
    } else if (part.slug === 'thumbnail') {
      setAttributes({imageId: 0});
    }
  }
  const postParts = (() => {
    return [
      {slug: "thumbnail", isDisabled: !attributes.imageId || !postImage},
      {slug: 'title', isDisabled: !attributes.title}, 
      {slug: 'subTitle', isDisabled: !attributes.subTitle}]
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

  const displayedValues = (() => {
    let p = {};

    if ( attributes.href || post ) p.href = attributes.href ? attributes.href : post.link;

    if ( attributes.title ){
      p.title = attributes.title;
    } else if ( postTitle ){
      p.title = postTitle;
    } else {p.title = ""}

    if ( attributes.subTitle ){
      p.subTitle = attributes.subTitle;
    } else if ( postSubTitle ){
      p.subTitle = postSubTitle;
    } else {p.subTitle = ""}

    if ( customImage ) {
      p['imgSrc'] = customImage.source_url;
    } else if ( postImage ){
      p['imgSrc'] = postImage.source_url;
    } else {
      p['imgSrc'] = BlockSettings.getImageByAspectRatio('16x9');
    }

    return p
  })();

  const onTitleChange = (v) => {
    if ( postTitle && v == postTitle ) {
      v = '';
    } 
    setAttributes({title: v});
  }

  const onSubTitleChange = (v) => {
    if ( postSubTitle && v == postSubTitle ) {
      v = '';
    } 
    setAttributes({subTitle: v});
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
        helpText="Use a 16:9 image for best results"
        panelAttributes=${{title: 'Custom Card Image'}}
      />
    </${InspectorControls}>

      <div className='vm-featured-article'>
        <div className='aspect--16x9'>
          <img src=${displayedValues.imgSrc} />
        </div>
        <h2 className="vm-featured-article__title">
          <${RichText} 
            tagName='span'
            value=${displayedValues.title}
            disableLineBreaks
            allowedFormats=${ [] }
            onChange=${ onTitleChange }
            placeholder='Write a title...'
          />
        </h2>
        <h3 className="vm-featured-article__subtitle">
          <${RichText} 
            tagName='span'
            value=${displayedValues.subTitle}
            disableLineBreaks
            allowedFormats=${ [] }
            onChange=${ onSubTitleChange }
            placeholder='Write a subtitle...'
          />
        </h3>
      </div>
    </div>

  `;
};