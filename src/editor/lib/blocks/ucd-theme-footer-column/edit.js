import { html } from "../../utils";
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps( {className: 'flex-footer__item'} );

  const template = [
    ['core/heading', { placeholder: 'Column header...' }],
    ['ucd-theme/footer-nav', {}]
  ];

  return html`
  <div ...${ blockProps }>
    <${InnerBlocks} template=${template} />
  </div>
  `
}