import { useSelect } from "@wordpress/data";
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from "@wordpress/html-entities";

export default class SelectUtils {
  
  static card(attributes) {
    return useSelect((select) => {
      if (!attributes) return {};
      const customImage = attributes.imageId ? select('core').getMedia(attributes.imageId) : undefined;
      const post = attributes.post.id ? select('core').getEntityRecord('postType', attributes.post.type, attributes.post.id) : undefined;
      
      let postTitle = undefined;
      if ( post && post.title && post.title.rendered ) {
        postTitle = decodeEntities(post.title.rendered);
      }

      let postImage = undefined;
      if ( post && post.featured_media ) postImage = select('core').getMedia(post.featured_media);
      
      let postExcerpt = undefined;
      if ( post && post.excerpt && post.excerpt.rendered ) {
        postExcerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
        postExcerpt = decodeEntities(postExcerpt).replace(/(?:\r\n|\r|\n)/g, '');
      }
      return { customImage, post, postTitle, postExcerpt, postImage };      
    }, [attributes.imageId, attributes.post.id]);
  }

  static image(imageId) {
    return useSelect( ( select ) => {
      const Image = imageId ? select('core').getMedia(imageId) : undefined;
      return Image;
    }, [imageId] );
  }

  static selectedBlock() {
    return useSelect( ( select ) => {
      return select( 'core/block-editor' ).getSelectedBlock();
    }, [] );
  }

  static user(userId) {
    return useSelect( (select) => {
      const User = userId ? select('core').getEntityRecord('root', 'user', userId) : undefined;
      return User;
    } , [userId]);
  }

  static meta() {
    return useSelect( (select) => {
      const meta = select('core/editor').getEditedPostAttribute('meta');
      return meta ? meta : {};
    }, [])
  }

  static category(termId) {
    return useSelect( (select) => {
      const Term = termId ? select('core').getEntityRecord('taxonomy', 'category', termId) : undefined;
      return Term;
    } , [termId]);  
  }

  static posts(query = {}, extra_fields=[]) {
    return useSelect( (select) => {
      let posts = select('core').getEntityRecords('postType', 'post', query);
      if (!posts) posts = [];

      if ( extra_fields.length ){
        posts = posts.map(p => {
          if ( extra_fields.includes('image') ){
            if ( p.featured_media ) p.image = select('core').getMedia(p.featured_media);
          }

          if ( extra_fields.includes('author') ){
            if ( p.author ) p.authorData = select('core').getEntityRecord('root', 'user', p.author);
          }

          if ( extra_fields.includes('categories') ){
            if ( p.categories && p.categories.length ) {
              p.categoriesData = select('core').getEntityRecords('taxonomy', 'category', {per_page: 100, include: p.categories});
            }
          }
          return p;
        })
      }

      return posts;
    }, [query, extra_fields] )
  }

  static categoriesById(termIds) {
    return useSelect( (select) => {
      const Terms = termIds && termIds.length ? select('core').getEntityRecords('taxonomy', 'category', {per_page: -1, include: termIds}) : [];
      return Terms;
    } , [termIds]);  
  }

  static categories(includeUncategorized=false) {
    return useSelect( (select) => {
      let query = {per_page: -1}
      if ( !includeUncategorized ) query['exclude'] = 1;
      const Terms = select('core').getEntityRecords('taxonomy', 'category', query);
      return Terms;
    } , [includeUncategorized]);  
  }

  static terms(taxonomy){
    if ( !taxonomy ) return null;
    return useSelect( (select) => {
      let query = {per_page: 100, orderby: 'count', order: 'desc'};
      const Terms = select('core').getEntityRecords('taxonomy', taxonomy, query);
      return Terms ? Terms : [];
    } , [taxonomy]); 
  }

  static isPost(){
    return useSelect( (select) => {
      const postType = select('core/editor').getCurrentPost().type;
      return postType == 'post';
    })
  }

  static isPage(){
    return useSelect( (select) => {
      const postType = select('core/editor').getCurrentPost().type;
      return postType == 'page';
    })
  }

  /**
   * Returns a helper object that contains:
   * 1. An `options` object from the available post types, to be passed to a `SelectControl`.
   * 2. A helper map with available taxonomies per post type.
   *
   * @return {Object} The helper object related to post types.
   */
  static postTypes(){
    const postTypes = useSelect( ( select ) => {
      const { getPostTypes } = select( coreStore );
      const excludedPostTypes = [ 'attachment' ];
      const filteredPostTypes = getPostTypes( { per_page: -1 } )?.filter(
        ( { viewable, slug } ) =>
          viewable && ! excludedPostTypes.includes( slug )
      );
      return filteredPostTypes;
    }, [] );
    const postTypesTaxonomiesMap = useMemo( () => {
      if ( ! postTypes?.length ) return;
      return postTypes.reduce( ( accumulator, type ) => {
        accumulator[ type.slug ] = type.taxonomies;
        return accumulator;
      }, {} );
    }, [ postTypes ] );
    const postTypesSelectOptions = useMemo(
      () =>
        ( postTypes || [] ).map( ( { labels, slug } ) => ( {
          label: labels.singular_name,
          value: slug,
        } ) ),
      [ postTypes ]
    );
    return { postTypesTaxonomiesMap, postTypesSelectOptions };
  }

  /**
   * Hook that returns the taxonomies associated with a specific post type.
   *
   * @param {string} postType The post type from which to retrieve the associated taxonomies.
   * @return {Object[]} An array of the associated taxonomies.
   */
  static taxonomiesOfPostType( postType ) {
    const taxonomies = useSelect(
      ( select ) => {
        const { getTaxonomies } = select( coreStore );
        const filteredTaxonomies = getTaxonomies( {
          type: postType,
          per_page: -1,
          context: 'view',
        } );
        return filteredTaxonomies;
      },
      [ postType ]
    );
    return taxonomies;
  };

  /**
   * @description get all authors on the site
   * @param {Array} fields - defaults to 'id,name'
   * @returns Array
   */
  static authors(fields='id,name'){
    const QUERY = {
      who: 'authors',
      per_page: -1,
      _fields: fields,
      context: 'view',
    };
    return useSelect( ( select ) => {
      const { getUsers } = select( coreStore );
      let authors = getUsers( QUERY );
      if ( !authors ) authors = [];
      return authors;
    }, [] );
  }
}