import { html } from "../../utils";
import { useBlockProps, 
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {

  const blockProps = useBlockProps( {
		className: "l-container"
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'ucd-theme/column' ],
    template: [['ucd-theme/column']]
	} );

  return html`
    <${Fragment}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}