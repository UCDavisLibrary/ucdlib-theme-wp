import { html, BlockSettings, SelectUtils } from "../../utils";
import { AuthorPicker, TermPicker, DebouncedText, OrderPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { RangeControl, PanelBody, SelectControl, Spinner } from '@wordpress/components';
import { decodeEntities } from "@wordpress/html-entities";

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
    ['image', 'thumbnail_1x1']
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

  const renderMediaLink = (post, i) => {

    let title = '';
    let excerpt = '';
    let imgSrc = BlockSettings.getImage('media-link');

    if ( post ){
      title = decodeEntities(post.title.rendered);
      if ( post.excerpt ){
        excerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
        excerpt = decodeEntities(excerpt).replace(/(?:\r\n|\r|\n)/g, '');
      }
      if ( post.customImage ) {
        imgSrc = post.customImage.source_url;
      }else if ( post.image ) {
        imgSrc = post.image.source_url;
      }
    }

    return html`
      <a className="media-link" key=${post.id || i}>
        <div className="media-link__figure" style=${{maxWidth: '135px', width: '25%'}}>
          <div className="u-background-image aspect--1x1" style=${{backgroundImage: `url(${imgSrc})`}}></div>
        </div>
        <div className="media-link__body">
          <h3 className="media-link__title">${title}</h3>
          <p>${excerpt}</p>
        </div>
      </a>`;
  };

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
      ${posts.map((p, i) => renderMediaLink(p, i))}
    </div>

  `;
};
