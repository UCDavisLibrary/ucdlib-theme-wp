import { html, BlockSettings, SelectUtils } from "../../utils";
import { RangeControl } from '@wordpress/components';
import { ToolbarSectionDisplay } from "../../block-components";
import "../ucd-theme-teaser/ucd-wp-teaser";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { decodeEntities } from "@wordpress/html-entities";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  let posts = SelectUtils.posts(
    {per_page: attributes.postCt}, 
    ['image', 'author', 'categories']
  );
  if ( !posts ) posts = [];
  console.log(posts);

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

      if ( post.image ) {
        p['img-src'] = post.image.source_url;
      } else {
        p['img-src'] = BlockSettings.getImage('teaser');
      }

      if ( post.authorData ){
        p.author = post.authorData.first_name && post.authorData.last_name ? `${post.authorData.first_name} ${post.authorData.last_name}` : post.authorData.name;
      }

      if ( post.categoriesData && post.categoriesData.length ){
        p.categories = JSON.stringify(post.categoriesData.map(c => Object({link: c.link, name: c.name, color: c.themeColor})));
      }
    }
    if ( i ) {
      p.style = {marginTop: "1.5rem"};
    }

    return p
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
      <${ToolbarSectionDisplay}
          sections=${cardSections}
          onChange=${onSectionToggle}
        />
      </${BlockControls}>
      <${InspectorControls}>
        <${RangeControl} 
          label="Number of posts"
          value=${attributes.postCt}
          onChange=${(postCt) => setAttributes({postCt})}
          min=${1}
          max=${20}
        />
      </${InspectorControls}>
      ${posts.map((p, i) => html`
        <ucd-wp-teaser ...${ teaserProps(p, i) }></ucd-wp-teaser>
      `)}
    </div>

  `;
};