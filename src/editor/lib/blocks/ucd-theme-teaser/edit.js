import { html, BlockSettings, SelectUtils, UCDIcons } from "../../utils";
import { ImagePicker, ToolbarColorPicker, ToolbarPostReset, ToolbarLinkPicker, Teaser } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton } from "@wordpress/components";

export default ( props ) => {
  const { attributes, setAttributes, context } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);
  const authorId = post ? post.author : 0;
  const author = SelectUtils.user(authorId);
  const categoryIds = post ? post.categories : [];
  const categories = SelectUtils.categoriesById(categoryIds);
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
      setAttributes({title: undefined});
    } else if (part.slug === 'excerpt') {
      setAttributes({excerpt: undefined});
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

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  const onTeaserChange = (attrs) => {
    const newAttrs = {};
    if ( Object.keys(attrs).includes('title')) {
      if ( postTitle ){
        if ( attrs.title === postTitle ) {
          newAttrs.title = undefined;
        } else {
          newAttrs.title = attrs.title;
        }
      } else {
        newAttrs.title = attrs.title;
      }
    }


    if ( Object.keys(attrs).includes('excerpt')) {
      if ( postExcerpt ){
        if ( attrs.excerpt === postExcerpt ) {
          newAttrs.excerpt = undefined;
        } else {
          newAttrs.excerpt = attrs.excerpt;
        }
      } else {
        newAttrs.excerpt = attrs.excerpt;
      }
    }
    setAttributes(newAttrs);
  }

  const teaserProps = () => {
    let p = {editable: true};

    if ( attributes.featured ) p.featured = true;
    if ( attributes.brandColor ) p.color = attributes.brandColor;
    if ( attributes.href || post ) p.href = attributes.href ? attributes.href : post.link;

    // inherit from parent
    if ( context['teasers/hideExcerpt'] ) p.hideExcerpt = true;
    if ( context['teasers/hideByline'] ) p.hideByline = true;
    if ( context['teasers/hideCategories'] ) p.hideCategories = true;
    if ( context['teasers/hideImage'] ) p.hideImage = true;

    if ( attributes.title !== undefined ){
      p.title = attributes.title;
    } else if ( postTitle ){
      p.title = postTitle;
    } else {p.title = ""}

    if ( attributes.excerpt !== undefined ){
      p.excerpt = attributes.excerpt;
    } else if ( postExcerpt ){
      p.excerpt = postExcerpt;
    } else {p.excerpt = ""}

    if ( author ) {
      p.author = author.first_name && author.last_name ? `${author.first_name} ${author.last_name}` : author.name;
    }

    if ( categories && categories.length ) {
      p.categories = categories.map(c => Object({link: c.link, name: c.name, color: c.brandColor}));
    }

    if ( post ) {
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      p.date = new Date(post.date_gmt + "Z").toLocaleDateString('en-US', dateOptions);
    }

    if ( customImage ) {
      p.imgSrc = customImage.source_url;
    } else if ( customPostImage ){
      p.imgSrc = customPostImage.source_url;
    } else if ( postImage ){
      p.imgSrc = postImage.source_url;
    } else {
      p.imgSrc = BlockSettings.getImage('teaser');
    }

    return p
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        <${ToolbarButton}
          icon=${UCDIcons.render("highlight")}
          onClick=${ () => {setAttributes({'featured': !attributes.featured})}}
          isPressed=${attributes.featured}
          label="Toggle 'Featured' Display Setting"/>
        ${attributes.featured && html`<${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.brandColor}
          ucdBlock="teaser"
        />`}
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
      <${Teaser} ...${ teaserProps() } onChange=${onTeaserChange}></${Teaser}>
    </div>
  `;
};
