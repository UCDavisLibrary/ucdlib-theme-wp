import { html, BlockSettings, SelectUtils } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarSectionDisplay, ToolbarLinkPicker } from "../../block-components";
import "./ucd-wp-teaser";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton } from "@wordpress/components";
import { useRef, useEffect } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);
  const authorId = post ? post.author : 0;
  const author = SelectUtils.user(authorId);
  const categoryIds = post ? post.categories : [];
  const categories = SelectUtils.categoriesById(categoryIds);

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

  // set up section hider
  const onSectionToggle = (section) => {
    let attrs = {};
    let attr = `hide${section.slug.charAt(0).toUpperCase() + section.slug.slice(1)}`;
    attrs[attr] = !attributes[attr];
    setAttributes(attrs);
  }
  const cardSections = (() => {
    return [
      {slug: "image", isHidden: attributes.hideImage},
      {slug: "byline", isHidden: attributes.hideByline, isDisabled: !post},
      {slug: "categories", isHidden: attributes.hideCategories, isDisabled: !post || post.type != 'post' || !post.categories.length},
      {slug: 'excerpt', isHidden: attributes.hideExcerpt}
    ]
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
    let value = {opensInNewTab: attributes.newTab};
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
    let p = {ref: mainEleRef, editable: "true"};

    if ( attributes.featured ) p.featured = "true";
    if ( attributes.brandColor ) p.color = attributes.brandColor;
    if ( attributes.href || post ) p.href = attributes.href ? attributes.href : post.link;
    if ( attributes.hideExcerpt ) p['hide-excerpt'] = "true";
    if ( attributes.hideByline) p['hide-byline'] = "true";
    if ( attributes.hideCategories) p['hide-categories'] = "true";
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

    if ( author ) {
      p.author = author.first_name && author.last_name ? `${author.first_name} ${author.last_name}` : author.name;
    }

    if ( categories && categories.length ) {
      p.categories = JSON.stringify(categories.map(c => Object({link: c.link, name: c.name, color: c.themeColor})));
    }

    if ( post ) {
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      p.date = new Date(post.date_gmt + "Z").toLocaleDateString('en-US', dateOptions);
    }

    if ( customImage ) {
      p['img-src'] = customImage.source_url;
    } else if ( postImage ){
      p['img-src'] = postImage.source_url;
    } else {
      p['img-src'] = BlockSettings.getImage('teaser');
    }

    return p
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        <${ToolbarButton} 
          icon=${html`<iron-icon icon="invert-colors"></iron-icon>`} 
          onClick=${ () => {setAttributes({'featured': !attributes.featured})}} 
          isPressed=${attributes.featured}
          label="Toggle 'Featured' Display Setting"/>
        ${attributes.featured && html`<${ToolbarColorPicker} 
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="teaser"
        />`}
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
          helpText="Use a square image for best results"
          panelAttributes=${{title: 'Custom Image'}}
        />
      </${InspectorControls}>
      <ucd-wp-teaser ...${ mainEleProps() }></ucd-wp-teaser>
    </div>

  `;
};