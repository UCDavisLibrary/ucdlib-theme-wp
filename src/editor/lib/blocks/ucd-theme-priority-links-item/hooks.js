import { addFilter } from "@wordpress/hooks";

export default () => {
  addFilter(
    'blocks.getBlockDefaultClassName',
    `ucd/default-class-name--priority-links-item`,
    ( className, blockName ) => {
      return blockName === 'ucd-theme/priority-links-item' ? 'priority-links__item' : className;
    }
  )
}