import { html } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  // const selectedSpacing = attributes.x;


  const blockProps = useBlockProps( {

  } );

  return html`
    <ucdlib-trumba-events></ucdlib-trumba-events>
  `;
}
