import { html } from "../../utils";
import { useBlockProps,
  InnerBlocks,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const blockProps = useBlockProps( {
    className: attributes.layoutClass,
    
  } );
  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    orientation: "vertical",
    templateLock: false,
    renderAppender: InnerBlocks.ButtonBlockAppender
  } );

  return html`
    <${Fragment}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}