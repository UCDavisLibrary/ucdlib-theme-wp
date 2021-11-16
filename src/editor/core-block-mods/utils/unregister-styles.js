import { unregisterBlockStyle } from "@wordpress/blocks";
import domReady from '@wordpress/dom-ready';
export default (coreBlock) => {
  if ( !coreBlock.unregisterStyles ) return;
  domReady( function(){
    unregisterBlockStyle(coreBlock.name, coreBlock.unregisterStyles)
  });
}