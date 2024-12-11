import { createBlock } from '@wordpress/blocks';
import colors from "../ucd-theme-layout-section/colors.js";

export default {
  type: 'block',
  blocks: ['ucd-theme/layout-section'],
  transform: (attributes, InnerBlocks) => {
    const newAttributes = {useGutters: false};
    newAttributes['backgroundColor'] = colors.find(color => color.slug === attributes.color) || {};
    for (const sameAttribute of ['hasWaterColor', 'waterColorPattern', 'waterColorColor']) {
      newAttributes[sameAttribute] = attributes[sameAttribute];
    }
    if ( attributes.fullWidth ){
      newAttributes['width'] = 'full-width';
    } else if ( attributes.float === 'left' ){
      newAttributes['width'] = 'float-left';
    } else if ( attributes.float === 'right' ){
      newAttributes['width'] = 'float-right';
    }

    return createBlock('ucd-theme/layout-section', newAttributes, InnerBlocks);
  }
}
