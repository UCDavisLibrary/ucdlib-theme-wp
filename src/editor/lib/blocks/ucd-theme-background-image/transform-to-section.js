import { createBlock } from '@wordpress/blocks';
import colors from "../ucd-theme-layout-section/colors.js";

export default {
  type: 'block',
  blocks: ['ucd-theme/layout-section'],
  transform: (attributes, InnerBlocks) => {
    const newAttributes = {};
    for (const sameAttribute of ['imageId']) {
      newAttributes[sameAttribute] = attributes[sameAttribute];
    }
    if ( attributes.color ){
      newAttributes['backgroundColor'] = colors.find(color => color.slug === attributes.color) || {};
    }
    return createBlock('ucd-theme/layout-section', newAttributes, InnerBlocks);
  }
}
