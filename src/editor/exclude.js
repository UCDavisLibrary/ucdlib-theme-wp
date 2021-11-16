import { unregisterBlockType, getBlockTypes } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import { BlockSettings } from './utils';


export default () => {
  domReady( function () {
    const registeredBlocks = getBlockTypes().map(b => b.name);
    const blocks = BlockSettings.get('excludedCoreBlocks');
    if ( !blocks || !Array.isArray(blocks)) return;
    blocks.forEach(b => {
        if ( registeredBlocks.includes(b)){
          unregisterBlockType(b)
        }
    });
  });
}

