import { html, BlockSettings, SelectUtils, UCDIcons } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarSectionDisplay, ToolbarLinkPicker } from "../../block-components";
import "./ucd-wp-marketing-highlight";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton } from "@wordpress/components";
import { useRef, useEffect } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);
  let customPostImage = post && post.meta ? post.meta.ucd_thumbnail_4x3 : 0;
  customPostImage = SelectUtils.image(customPostImage);

  // Listen to changes in component body
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    let reset = false;
    if ( propName === 'title'){
      if (postTitle && !propValue ) return;
      if ( propValue === postTitle ) reset = true;
    } else if (postExcerpt && propName === 'excerpt') {
      if (postExcerpt && !propValue ) return;
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

  const mainEleProps = () => {
    let p = {ref: mainEleRef, "button-text": attributes.buttonText};

    if ( attributes.featured ) p.featured = "true";
    if ( attributes.brandColor ) p.color = attributes.brandColor;
    if ( attributes.href || post ) p.href = attributes.href ? attributes.href : post.link;
    if ( attributes.hideTitle ) p['hide-title'] = "true";
    if ( attributes.hideExcerpt ) p['hide-excerpt'] = "true";
    if ( attributes.hideBadge ) p['hide-badge'] = "true";
    if ( attributes.hideButton ) p['hide-button'] = "true";
    if ( attributes.badge ) p['badge'] = attributes.badge;

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

    if ( customImage ) {
      p['img-src'] = customImage.source_url;
    } else if ( customPostImage ){
      p['img-src'] = customPostImage.source_url;
    } else if ( postImage ){
      p['img-src'] = postImage.source_url;
    } else {
      p['img-src'] = BlockSettings.getImage('marketing-highlight');
    }

    return p
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
      <ucd-wp-marketing-highlight ...${ mainEleProps() }>
        <div slot="title" contentEditable="true"></div>
        <div slot="excerpt" contentEditable="true"></div>
        <div slot="badge" contentEditable="true"></div>
        <div slot="button" contentEditable="true"></div>
      </ucd-wp-marketing-highlight>
    </div>

  `;
};