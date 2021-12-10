import { html } from "../../utils";
import { useBlockProps, 
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const ALLOWED_BLOCKS = [ 'ucd-theme/priority-links-item' ];
  const blockProps = useBlockProps( {
	  className: "priority-links",
	} );
  const defaultTemplate = [
    ['ucd-theme/priority-links-item']
  ];
  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    //renderAppender: false,
    orientation: 'horizontal',
    template: defaultTemplate,
  });

  return html`
    <${Fragment}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}