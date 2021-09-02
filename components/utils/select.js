import { useSelect } from "@wordpress/data";
import { decodeEntities } from "@wordpress/html-entities";

export default class SelectUtils {
  
  static card(attributes) {
    return useSelect((select) => {
      if (!attributes) return {};
      const customImage = attributes.imageId ? select('core').getMedia(attributes.imageId) : undefined;
      const post = attributes.post.id ? select('core').getEntityRecord('postType', attributes.post.type, attributes.post.id) : undefined;
      const postTitle = post && post.title && post.title.rendered ? post.title.rendered : undefined;
      let postImage = undefined;
      if ( post && post.featured_media ) postImage = select('core').getMedia(post.featured_media);
      let postExcerpt = undefined;
      if ( post && post.excerpt && post.excerpt.rendered ) {
        postExcerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").replace(" [&hellip;]", "...");
        postExcerpt = decodeEntities(postExcerpt).replace(/(?:\r\n|\r|\n)/g, '');
      }
      return { customImage, post, postTitle, postExcerpt, postImage };      
    });

  }
}