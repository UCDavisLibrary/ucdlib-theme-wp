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

  static category(termId) {
    return useSelect( (select) => {
      const Term = termId ? select('core').getEntityRecord('taxonomy', 'category', termId) : undefined;
      return Term;
    } , [termId]);  
  }

  static categoriesById(termIds) {
    return useSelect( (select) => {
      const Terms = termIds && termIds.length ? select('core').getEntityRecords('taxonomy', 'category', {per_page: -1, include: termIds}) : [];
      return Terms;
    } , [termIds]);  
  }
}