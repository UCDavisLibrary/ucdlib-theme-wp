import { html, BlockSettings, SelectUtils } from "../../utils";
import { RangeControl } from '@wordpress/components';
import { AuthorPicker, TermPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton, ToggleControl, PanelBody, SelectControl } from '@wordpress/components';
import { decodeEntities } from "@wordpress/html-entities";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // attribute is an array, but im not sure how to retrieve entities from multiple post types in a single call
  // so, to allow for multiple post types, would have to do multiple selects and then merge them in js land
  // leave for future feature development, if requested.
  const postType = attributes.postType[0];

  // retrieve needed wp data
  /** 
  let posts = SelectUtils.posts(
    {per_page: attributes.postCt}, 
    ['image', 'author', 'categories']
  );
  if ( !posts ) posts = [];
  console.log(posts);
  **/

  const { postTypesTaxonomiesMap, postTypesSelectOptions } = SelectUtils.postTypes();
  
  // get all taxonomies registered to the selected post type(s)
  const taxonomies = [];
  if ( postTypesTaxonomiesMap && attributes.postType ) {
    attributes.postType.forEach(p => {
      if ( postTypesTaxonomiesMap[p] ){
        postTypesTaxonomiesMap[p].forEach(t => {
          if ( !taxonomies.includes(t) ){
            taxonomies.push(t);
          }
        })
      }

    });
  }
  
  const onPostTypeChange = ( postType ) => {
    const newAttrs = {postType: [postType]};

    //TODO: check if taxonomies need to be reset
    setAttributes(newAttrs);
  }


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
      </${BlockControls}>
      <${InspectorControls}>
        <${PanelBody} title="Query Filters">
          <${SelectControl}
            options=${ postTypesSelectOptions }
            value=${ postType }
            label='Post Type'
            onChange=${ onPostTypeChange }
          />
          <${AuthorPicker} 
            value=${attributes.author}
            onChange=${(author) => setAttributes({author})}
          />
          ${taxonomies.map(t => html`
            <${TermPicker} key=${t} taxonomy=${t}/>
          `)}
          

          </${PanelBody}>

      </${InspectorControls}>
      <div>${JSON.stringify(attributes)}</div>
    </div>

  `;
};