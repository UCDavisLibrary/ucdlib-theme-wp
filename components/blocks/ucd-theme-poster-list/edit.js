import { html } from "../../utils";
import { useBlockProps, 
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const ALLOWED_BLOCKS = [ 'ucd-theme/poster' ];

  const blockProps = useBlockProps( {
		className: "poster-list",
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
	} );

  return html`
    <${Fragment}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}