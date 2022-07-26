import { html } from "../../utils";
import { useBlockProps, BlockControls, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // innerblock settings
  const allowedBlocks = ['ucd-theme/footer-column']
  const template = [['ucd-theme/footer-column', {}]];

  const innerBlocksProps = useInnerBlocksProps( {className: 'footer flex-footer dark-background'}, {
		allowedBlocks: allowedBlocks,
		//orientation: 'horizontal',
    template: template,
	} );

  return html`

  <div ...${ blockProps }>
    <div ...${ innerBlocksProps } ></div>
  </div>
  `
}