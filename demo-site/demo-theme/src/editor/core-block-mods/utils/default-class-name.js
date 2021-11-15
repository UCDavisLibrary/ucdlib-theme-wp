import { addFilter } from "@wordpress/hooks";

export default (coreBlock) => {
  if ( !coreBlock.defaultClassName ) return;
  addFilter(
    'blocks.getBlockDefaultClassName',
    `ucd/default-class-name--${coreBlock.name}`,
    ( className, blockName ) => {
      return blockName === coreBlock.name ? coreBlock.defaultClassName : className;
    }
  )
}