import { html } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  return html`
    <div ...${blockProps}>
      <ucdlib-trumba-events-upcoming></ucdlib-trumba-events-upcoming>
    </div>
    
  `;
}
