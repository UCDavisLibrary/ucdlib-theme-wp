import { html } from "../../utils";
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default ( props ) => {
  const blockProps = useBlockProps();
  const allowedBlocks = ['ucd-theme/career']
  const template = [['ucd-theme/career', {}]];

  return html`
  <div ...${ blockProps }>
    <ul class="list--arrow">
      <${InnerBlocks} 
        allowedBlocks=${allowedBlocks}
        template=${template}
      />
    </ul>
  </div>
  `
}