import { html, BlockSettings, SelectUtils } from "../../utils";
import { AuthorPicker, TermPicker, DebouncedText, ToolbarSectionDisplay } from "../../block-components";
import { RangeControl, PanelBody, Spinner, SelectControl } from '@wordpress/components';
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { decodeEntities } from "@wordpress/html-entities";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // using block attributes, construct and do api query for posts
  const queryParams = (() => {
    const q = {
      per_page: attributes.postCt,
    };
    if ( attributes.offset ) q.offset = attributes.offset;
    if ( attributes.author ) q.author = attributes.author;
    if ( attributes.search ) q.search = attributes.search;

    for (const tax in attributes.terms) {
      const v = attributes.terms[tax].join(",");
      if ( !v ) continue;
      if ( tax == 'category') {
        q.categories = v;
      } else if( tax == 'post_tag' ) {
        q.tags = v;
      } else {
        q[tax] = v;
      }
    }
    return q;
  })();

  // retrieve needed wp data
  let posts = SelectUtils.posts(
    queryParams,
    'post',
    ['image', 'author', 'categories', 'thumbnail_1x1']
  );
  if ( !posts ) posts = [];

  const { postTypesTaxonomiesMap } = SelectUtils.postTypes();
  let taxonomies = []
  if (  postTypesTaxonomiesMap ) {
    taxonomies = postTypesTaxonomiesMap['post'];
  }

  // set up template picker
  const templateOptions = [
    { value: 'teaser', label: 'Teaser' },
    { value: 'featured', label: 'Featured Article' }
  ];
  const isTeaser = attributes.template == 'teaser';
  const isFeatured = attributes.template == 'featured';

  // set up term picker
  const onTermChange = ( v ) => {
    const terms = {
      ...attributes.terms,
      [ v.taxonomy ]: v.terms
    };
    setAttributes({terms})
  }

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
      {slug: "byline", isHidden: attributes.hideByline},
      {slug: "categories", isHidden: attributes.hideCategories},
      {slug: 'excerpt', isHidden: attributes.hideExcerpt}
    ]
  })();


  const teaserProps = (post, i) => {
    let p = {key: i};

    if ( attributes.hideExcerpt ) p['hide-excerpt'] = "true";
    if ( attributes.hideByline) p['hide-byline'] = "true";
    if ( attributes.hideCategories) p['hide-categories'] = "true";
    if ( attributes.hideImage) p['hide-image'] = "true";

    if ( post ){
      p.href = post.link;
      p.title = decodeEntities(post.title.rendered);

      let postExcerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
      postExcerpt = decodeEntities(postExcerpt).replace(/(?:\r\n|\r|\n)/g, '');
      p.excerpt = postExcerpt;

      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      p.date = new Date(post.date_gmt + "Z").toLocaleDateString('en-US', dateOptions);

      if ( post.customImage ) {
        p['img-src'] = post.customImage.source_url;
      } else if ( post.image ) {
        p['img-src'] = post.image.source_url;
      } else {
        p['img-src'] = BlockSettings.getImage('teaser');
      }

      if ( post.authorData ){
        p.author = post.authorData.first_name && post.authorData.last_name ? `${post.authorData.first_name} ${post.authorData.last_name}` : post.authorData.name;
      }

      if ( post.meta && post.meta.ucd_subtitle ) p.subtitle = post.meta.ucd_subtitle;

      if ( post.categoriesData && post.categoriesData.length ){
        p.categories = JSON.stringify(post.categoriesData.map(c => Object({link: c.link, name: c.name, color: c.themeColor})));
      }
    }
    if ( i ) {
      p.style = {marginTop: "1.5rem"};
    }

    return p
  }

  const featuredArticle = (post) => {
    const p = teaserProps(post);
    return html`
    <div className='vm-featured-article u-space-mb--large'>
      <div className='aspect--16x9'>
        <img src=${p['img-src']} />
      </div>
      <h2 className="vm-featured-article__title">${p.title}</h2>
      ${p.subtitle != undefined && html`
        <h3 className="vm-featured-article__subtitle">${p.subtitle}</h3>
      `}
    </div>
    `;
  };

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        ${isTeaser && html`
          <${ToolbarSectionDisplay}
            sections=${cardSections}
            onChange=${onSectionToggle}
          />
        `}

      </${BlockControls}>
      <${InspectorControls}>
      <${PanelBody} title="Query Filters">
        <${AuthorPicker}
          value=${attributes.author}
          onChange=${(author) => setAttributes({author})}
        />
        ${taxonomies.map(t => html`
          <${TermPicker}
            key=${t}
            onChange=${onTermChange}
            value=${attributes.terms[t]}
            taxonomy=${t}/>
        `)}
        <${DebouncedText}
          label="Keyword"
          value=${attributes.search}
          onChange=${(search) => setAttributes({search})}
        />
        </${PanelBody}>

        <${PanelBody} title="Display">
          <${RangeControl}
            label="Number of posts"
            value=${attributes.postCt}
            onChange=${(postCt) => setAttributes({postCt})}
            min=${1}
            max=${20}
          />
          <${RangeControl}
            label="Post offset"
            value=${attributes.offset}
            onChange=${(offset) => setAttributes({offset})}
            min=${0}
            help="Number of posts to skip before displaying results"
          />
          <${SelectControl}
            label='Template'
            value=${attributes.template}
            options=${templateOptions}
            onChange=${(template) => setAttributes({template})}
          />
        </${PanelBody}>

      </${InspectorControls}>
      ${!posts.length && html`
        <${Spinner} />
      `}
      ${posts.map((p, i) => html`
        <div key=${i}>
          ${isTeaser && html`<ucd-wp-teaser ...${ teaserProps(p, i) }></ucd-wp-teaser>`}
          ${isFeatured && featuredArticle(p)}
        </div>
      `)}
    </div>

  `;
};
