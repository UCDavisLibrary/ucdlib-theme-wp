import { html } from "../../utils";
import { useBlockProps,
  InspectorControls, 
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  //const ALLOWED_BLOCKS = [ 'ucd-theme/poster' ];

  const setLayout = ( hasSecondSidebar, sideBarLocation ) => {
    let attrs = {};
    if ( hasSecondSidebar != attributes.hasSecondSidebar ) {
      if ( !hasSecondSidebar && sideBarLocation == "both-sides") {
        attrs.sideBarLocation = "left";
      }
      attrs.hasSecondSidebar = !attributes.hasSecondSidebar;
    } else if( sideBarLocation != attributes.sideBarLocation ){
      if ( !hasSecondSidebar && sideBarLocation == "both-sides") {
        attrs.hasSecondSidebar = true;
      }
      attrs.sideBarLocation = sideBarLocation;
    }
    if ( Object.keys(attrs).length ) {
      setAttributes(attrs);
    }
  };

  const blockProps = useBlockProps( {
		className: "poster-list",
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
	} );

  return html`
    <${Fragment}>
      <${InspectorControls}>
        <${PanelBody}>
          <${ToggleControl} 
            label="Use 2 Sidebars"
            checked=${attributes.hasSecondSidebar}
            onChange=${() => setLayout(!attributes.hasSecondSidebar, attributes.sideBarLocation)}
          />
        </${PanelBody}>
      </${InspectorControls}>
      <div>Hello World</div>
    </${Fragment}>
  `;
}