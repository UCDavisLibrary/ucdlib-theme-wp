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

    <div style=${{backgroundColor: "#FFFFFF", padding:"5px",color:"red"}}>
      <div style=${{display:"inline-block", marginRight:"7px"}}><ucdlib-icon style=${{color:"red", minWidth: '15px'}} icon="ucd-public:fa-circle-exclamation"></ucdlib-icon></div>
      <div style=${{display:"inline-block", verticalAlign: 'top'}}><b><${InnerBlocks} /></b></div>
    </div>

  </div>
  `
}