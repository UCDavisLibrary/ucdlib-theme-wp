import { html, BlockSettings, SelectUtils } from "../../utils";
import { AuthorPicker, TermPicker, DebouncedText, OrderPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { RangeControl, PanelBody, SelectControl, Spinner } from '@wordpress/components';
import { decodeEntities } from "@wordpress/html-entities";
import "../ucd-theme-media-link/ucd-wp-media-link";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // only allow for a single post type for now
  // could add feature in future
  const postType = attributes.postType[0];

  // using block attributes, construct and do api query for posts
  const queryParams = (() => {
    const q = {
      per_page: attributes.postCt,
      order: attributes.order,
      orderby: attributes.orderBy
    };
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

  let posts = SelectUtils.posts(
    queryParams,
    postType,
    ['image']
  );
  if ( !posts ) posts = [];


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
    const terms = {};
    postTypesTaxonomiesMap[postType].forEach(taxonomy => {
      if ( attributes.terms[taxonomy] ) terms[taxonomy] = attributes.terms[taxonomy];
    });

    setAttributes({postType: [postType], terms});
  }

  const onTermChange = ( v ) => {
    const terms = {
      ...attributes.terms, 
      [ v.taxonomy ]: v.terms
    };
    setAttributes({terms})
  }


  const postProps = (post, i) => {
    let p = {key: i};

    if ( post ){
      p.href = post.link;
      p.title = decodeEntities(post.title.rendered);
      
      if ( post.excerpt ){
        p.excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
        p.excerpt = decodeEntities(p.excerpt).replace(/(?:\r\n|\r|\n)/g, '');
      }

      if ( post.image ) {
        p['img-src'] = post.image.source_url;
      } else {
        p['img-src'] = BlockSettings.getImage('media-link');
      }
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
            <${OrderPicker} 
              value=${{order: attributes.order, orderBy: attributes.orderBy}}
              onChange=${(v) => setAttributes(v)}
              postType=${postType}
            />
            <${RangeControl} 
              label="Number of posts"
              value=${attributes.postCt}
              onChange=${(postCt) => setAttributes({postCt})}
              min=${1}
              max=${20}
            />
          </${PanelBody}>

      </${InspectorControls}>
      ${!posts.length && html`
        <${Spinner} />
      `}
      ${posts.map((p, i) => html`
        <ucd-wp-media-link ...${ postProps(p, i) }></ucd-wp-media-link>
      `)}
    </div>

  `;
};