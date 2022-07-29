import { html } from "../../utils";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const mainEleProps = () => {
    const p = {};
    p['brand-color'] = 'red';
    return p;
  }

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  return html`
  <div ...${ blockProps }>
    <div className="alertdiv">
      <div className="divAlertIcon"><ucdlib-icon class="alertIcon" icon="ucd-public:fa-circle-exclamation"></ucdlib-icon></div>
      <div className="divAlertContent"><b><${InnerBlocks} /></b></div>
    </div>

  </div>
  `
}