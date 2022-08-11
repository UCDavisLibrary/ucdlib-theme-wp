import { html } from "../../utils";
import { useBlockProps, 
  useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {

  const blockProps = useBlockProps( {
	  className: "l-quad"
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
	  allowedBlocks: [ 'ucd-theme/column' ],
    template: [1,2,3,4].map(x => ['ucd-theme/column', {layoutClass: "l-quad__region", forbidWidthEdit: true}]),
    templateLock: "all"
	} );

  return html`
    <${Fragment}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}