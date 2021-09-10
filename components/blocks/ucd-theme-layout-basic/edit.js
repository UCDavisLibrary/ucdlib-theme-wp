import classnames from 'classnames';

import { html } from "../../utils";
import { useDispatch, useSelect } from '@wordpress/data';
import { useBlockProps,
  InspectorControls, 
  __experimentalUseInnerBlocksProps as useInnerBlocksProps,
  store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, Button, ButtonGroup, BaseControl } from '@wordpress/components';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes, clientId } = props;
  const ALLOWED_BLOCKS = [ 'ucd-theme/column' ];

  const setLayout = ( attr, value ) => {
    let attrs = {};
    const modMap = {left: "", right: "flipped", "both-sides": "3col"};
    if ( attr === 'hasSecondSidebar' ) {
      if ( !value && attributes.sideBarLocation == "both-sides") {
        attrs.sideBarLocation = "left";
      }
      attrs.hasSecondSidebar = value;
    } else if( attr === 'sideBarLocation' ){
      if ( !attributes.hasSecondSidebar && value == "both-sides") {
        attrs.hasSecondSidebar = true;
      }
      attrs.sideBarLocation = value;
    } else if ( attr.startsWith("mobileOrder") && attributes[attr] != value){
      const section = attr.split("mobileOrder")[1];
      for (const s of ["Content", "Sidebar1", "Sidebar2"]) {
        if (section === s) continue;
        let key = "mobileOrder"+s;
        if ( value === 1) {
          attrs[key] = attributes[key] + 1 > 3 ? 3 : attributes[key] + 1;
        } else if(value === 3) {
          attrs[key] = attributes[key] - 1 < 1 ? 1 : attributes[key] - 1;
        } else if( attributes[attr] == 1 && attributes[key] == 2){
          attrs[key] = 1;
        } else if( attributes[attr] == 3 && attributes[key] == 2 ) {
          attrs[key] = 3;
        }
      }
      
      attrs[attr] = value;
    }
    if ( Object.keys(attrs).length ) {
      if ( attrs.sideBarLocation ) attrs.modifier = modMap[attrs.sideBarLocation];
      setAttributes(attrs);
    }
  };

  const classes = classnames({
    [`l-basic`]: !attributes.modifier,
    [`l-basic--${attributes.modifier}`]: attributes.modifier
    
  });

  /** 
  const { replaceInnerBlocks } = useDispatch( blockEditorStore );
  let columns = [
    ['ucdlib/column', {layoutClass: "l-content"}],
    ['ucdlib/column', {layoutClass: "l-sidebar-first"}]
  ];
  replaceInnerBlocks(clientId, columns);
  */
  let columns = [
    ['ucd-theme/column', {layoutClass: "l-content"}, [
      [ 'core/paragraph', { placeholder: 'Enter side content...' } ]]],
    ['ucd-theme/column', {layoutClass: "l-sidebar-first"}]
  ];

  const blockProps = useBlockProps( {
		className: classes,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
    template: columns,
    renderAppender: false,
	} );



  return html`
    <${Fragment}>
      <${InspectorControls}>
        <${PanelBody}>
          <${ToggleControl} 
            label="Use 2 Sidebars"
            checked=${attributes.hasSecondSidebar}
            onChange=${() => setLayout("hasSecondSidebar", !attributes.hasSecondSidebar)}
          />
          <${BaseControl} id="sidebar-location" label="Sidebar Location" help="Position relative to main content">
            <${ButtonGroup} id="sidebar-location">
              <${Button} 
                variant="primary"
                onClick=${() => setLayout("sideBarLocation", 'left')}
                isPressed=${attributes.sideBarLocation === 'left'}>Left</${Button}>
              <${Button} 
                variant="primary" 
                onClick=${() => setLayout("sideBarLocation", 'right')}
                isPressed=${attributes.sideBarLocation === 'right'}>Right</${Button}>
              <${Button} 
              variant="primary"
              isPressed=${attributes.sideBarLocation === 'both-sides'}
              onClick=${() => setLayout("sideBarLocation", 'both-sides')}
              disabled=${!attributes.hasSecondSidebar}>Left & Right</${Button}>
            </${ButtonGroup}>
          </${BaseControl}>
          <${BaseControl} id="mobile-order" label="Mobile Order">
            <div id="mobile-order">
              <${RangeControl}
                label="Content"
                value=${attributes.mobileOrderContent}
                min=1
                max=3
                step=1
                onChange=${(value) => setLayout("mobileOrderContent", value)}
              />
              <${RangeControl}
                label="Sidebar 1"
                value=${attributes.mobileOrderSidebar1}
                min=1
                max=3
                step=1
                onChange=${(value) => setLayout("mobileOrderSidebar1", value)}
              />
              <${RangeControl}
                label="Sidebar 2"
                value=${attributes.mobileOrderSidebar2}
                min=1
                max=3
                step=1
                disabled=${!attributes.hasSecondSidebar}
                onChange=${(value) => setLayout("mobileOrderSidebar2", value)}
              />              
            </div>
          </${BaseControl}>
        </${PanelBody}>
      </${InspectorControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}