import { html } from "../../utils";
import { useBlockProps,
  useInnerBlocksProps
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {

  const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ['ucd-theme/faq-item'],
    template: [['ucd-theme/faq-item', {}]]
	} );

  return html`
    <${Fragment}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `
}