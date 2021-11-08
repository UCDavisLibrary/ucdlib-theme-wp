import { useSelect } from "@wordpress/data";
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
}