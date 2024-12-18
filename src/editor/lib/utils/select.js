import { useSelect } from "@wordpress/data";
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from "@wordpress/html-entities";

import BlockSettings from "./settings";

export default class SelectUtils {

  static post(postId, postType='post') {
    return useSelect( (select) => {
      if ( !postId || !postType ) return undefined;
      return select('core').getEntityRecord('postType', postType, postId);
    } , [postId, postType]);
  }

  static card(attributes) {
    return useSelect((select) => {
      if (!attributes) return {};
      const customImage = attributes.imageId ? select('core').getMedia(attributes.imageId, {context: 'view'}) : undefined;
      const post = attributes.post.id ? select('core').getEntityRecord('postType', attributes.post.type, attributes.post.id) : undefined;

      let postTitle = undefined;
      if ( post && post.title && post.title.rendered ) {
        postTitle = decodeEntities(post.title.rendered);
      }

      let postImage = undefined;
      if ( post && post.featured_media ) postImage = select('core').getMedia(post.featured_media, {context: 'view'});

      let postExcerpt = undefined;
      if ( post && post.excerpt && post.excerpt.rendered ) {
        postExcerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
        postExcerpt = decodeEntities(postExcerpt).replace(/(?:\r\n|\r|\n)/g, '');
      }
      return { customImage, post, postTitle, postExcerpt, postImage };
    }, [attributes.imageId, attributes.post.id]);
  }

  static image(imageId, force=0) {
    return useSelect( ( select ) => {
      const Image = imageId && imageId != 0 ? select('core').getMedia(imageId, {context: 'view'}) : undefined;
      return Image;
    }, [imageId, force] );
  }

  static previewImage(post, aspectRatio='1x1') {
    // would be nice if this just took postId, but doesn't appear to be possible
    //https://wordpress.stackexchange.com/questions/388796/getentityrecord-without-knowing-the-post-type
    const postId = post && post.id ? post.id : 0;
    return useSelect( ( select ) => {
      let url = BlockSettings.getImageByAspectRatio(aspectRatio);
      if ( post ) {
        let imageId;
        if ( post.meta[`ucd_thumbnail_${aspectRatio}`]) {
          imageId = post.meta[`ucd_thumbnail_${aspectRatio}`];
        } else if ( post.featured_media ) {
          imageId = post.featured_media;
        }
        const image = select('core').getMedia(imageId, {context: 'view'}) || undefined;
        if ( image ) url = image.source_url;
      }
      return url;

    }, [postId, aspectRatio] );
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

  static currentPost() {
    return useSelect( ( select ) => {
      return select( 'core/editor' ).getCurrentPost();
    }, [] );
  }

  static currentUser() {
    return useSelect( ( select ) => {
      return select( 'core' ).getCurrentUser();
    }, [] );
  }

  static isCurrentUserAdmin() {
    return useSelect( ( select ) => {
      return select( 'core' ).canUser('create', 'users');
    }, [] );
  }

  static editedPostAttribute(attr) {
    return useSelect( ( select ) => {
      const s = select?.( 'core/editor' )?.getEditedPostAttribute(attr);
      return s;
    }, [attr] );
  }

  static meta() {
    return useSelect( (select) => {
      const meta = select?.('core/editor')?.getEditedPostAttribute('meta');
      return meta ? meta : {};
    }, [])
  }

  static category(termId) {
    return useSelect( (select) => {
      const Term = termId ? select('core').getEntityRecord('taxonomy', 'category', termId) : undefined;
      return Term;
    } , [termId]);
  }

  static posts(query = {}, postType='post', extra_fields=[]) {
    return useSelect( (select) => {
      let posts = select('core').getEntityRecords('postType', postType, query);
      if (!posts) posts = [];
      if ( extra_fields.length ){
        posts = posts.map(p => {
          if ( extra_fields.includes('image') ){
            if ( p.featured_media ) p.image = select('core').getMedia(p.featured_media, {context: 'view'});
          }

          if ( extra_fields.includes('thumbnail_1x1')){
            if ( p.meta.ucd_thumbnail_1x1 ) p.customImage = select('core').getMedia(p.meta.ucd_thumbnail_1x1, {context: 'view'});
          }

          if ( extra_fields.includes('thumbnail_4x3')){
            if ( p.meta.ucd_thumbnail_4x3 ) p.customImage = select('core').getMedia(p.meta.ucd_thumbnail_4x3, {context: 'view'});
          }

          if ( extra_fields.includes('author') ){
            if ( p.author ) p.authorData = select('core').getEntityRecord('root', 'user', p.author);
          }

          if ( extra_fields.includes('categories') ){
            if ( p.categories && p.categories.length ) {
              p.categoriesData = select('core').getEntityRecords('taxonomy', 'category', {context: 'view', per_page: 100, include: p.categories});
            }
          }
          return p;
        })
      }

      return posts;
    }, [JSON.stringify(query), postType, JSON.stringify(extra_fields)] )
  }

  static taxonomies() {
    return useSelect( (select) => {
      const { getTaxonomies } = select( coreStore );
			const filteredTaxonomies = getTaxonomies( {
				per_page: -1,
				context: 'view',
			} );
			return filteredTaxonomies ? filteredTaxonomies : [];
    } , []);
  }

  static categoriesById(termIds) {
    return useSelect( (select) => {
      const Terms = termIds && termIds.length ? select('core').getEntityRecords('taxonomy', 'category', {per_page: -1, include: termIds, context: 'view'}) : [];
      return Terms;
    } , [termIds]);
  }

  static categories(includeUncategorized=false) {
    return useSelect( (select) => {
      let query = {per_page: -1, context: 'view'};
      if ( !includeUncategorized ) query['exclude'] = 1;
      const Terms = select('core').getEntityRecords('taxonomy', 'category', query);
      return Terms;
    } , [includeUncategorized]);
  }

  static terms(taxonomy, query, watch=[]){
    if ( !taxonomy ) return null;
    return useSelect( (select) => {
      if ( !query ) {
        query = {per_page: -1, orderby: 'count', order: 'desc'};
      }
      if ( query.context != 'view' ) query.context = 'view';
      const Terms = select('core').getEntityRecords('taxonomy', taxonomy, query);
      return Terms ? Terms : [];
    } , [taxonomy, JSON.stringify(query), ...watch]);
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
