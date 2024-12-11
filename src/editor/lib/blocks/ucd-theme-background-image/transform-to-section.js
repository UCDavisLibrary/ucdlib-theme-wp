import { createBlock } from '@wordpress/blocks';
import colors from "../ucd-theme-layout-section/colors.js";

export default {
  type: 'block',
  blocks: ['ucd-theme/layout-section'],
  transform: (attributes, InnerBlocks) => {
    const newAttributes = {imageBrandFilm: true, imageBrandFilmOpacity: 60};
    for (const sameAttribute of ['imageId']) {
      newAttributes[sameAttribute] = attributes[sameAttribute];
    }
    if ( attributes.brandColor ){
      newAttributes['imageBrandFilmColor'] = attributes.brandColor;
      newAttributes['imageTextColor'] = 'light';
    }
    return createBlock('ucd-theme/layout-section', newAttributes, InnerBlocks);
  }
}
