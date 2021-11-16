import classnames from 'classnames';

import { html } from "../../utils";
import { withDispatch } from '@wordpress/data';
import { useBlockProps,
  InspectorControls, 
  __experimentalUseInnerBlocksProps as useInnerBlocksProps,
  store as blockEditorStore,
} from '@wordpress/block-editor';
import { 
  PanelBody, 
  ToggleControl, 
  Button, 
  ButtonGroup, 
  BaseControl 
} from '@wordpress/components';
import { Fragment } from "@wordpress/element";

import {
	createBlock,
} from '@wordpress/blocks';

const defaultTemplate = [
  ['ucd-theme/column', {layoutClass: "l-content", forbidWidthEdit: true}],
  ['ucd-theme/column', {layoutClass: "l-sidebar-first", forbidWidthEdit: true}]
];

function Columns( {
  attributes, 
  setAttributes, 
  toggleSecondSidebar,
} ) {
  const ALLOWED_BLOCKS = [ 'ucd-theme/column' ];

  const setLayout = ( attr, value ) => {
    let attrs = {};
    const modMap = {left: "", right: "flipped", "both-sides": "3col"};
    if ( attr === 'hasSecondSidebar' ) {
      if ( !value && attributes.sideBarLocation == "both-sides") {
        attrs.sideBarLocation = "left";
      }
      attrs.hasSecondSidebar = value;
      toggleSecondSidebar(value);
    } else if( attr === 'sideBarLocation' ){
      if ( !attributes.hasSecondSidebar && value == "both-sides") {
        attrs.hasSecondSidebar = true;
      }
      attrs.sideBarLocation = value;
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

  const blockProps = useBlockProps( {
		className: classes,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
    renderAppender: false,
    template: defaultTemplate,
    templateLock: "insert"
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
          <${BaseControl} help="Position relative to main content">
            <${BaseControl.VisualLabel}>Number of Columns</${BaseControl.VisualLabel}>
            <${ButtonGroup}>
              <${Button} 
                variant="primary"
                onClick=${() => setLayout("sideBarLocation", 'left')}
                isPressed=${attributes.sideBarLocation === 'left'}>Left
              </${Button}>
              <${Button} 
                variant="primary" 
                onClick=${() => setLayout("sideBarLocation", 'right')}
                isPressed=${attributes.sideBarLocation === 'right'}>Right
              </${Button}>
              <${Button} 
                variant="primary"
                isPressed=${attributes.sideBarLocation === 'both-sides'}
                onClick=${() => setLayout("sideBarLocation", 'both-sides')}
                disabled=${!attributes.hasSecondSidebar}>Left & Right
              </${Button}>
            </${ButtonGroup}>
          </${BaseControl}>
        </${PanelBody}>
      </${InspectorControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}

export default withDispatch(( dispatch, ownProps, registry ) =>  ({

  toggleSecondSidebar(sidebarExists){
    const { clientId } = ownProps;
    const { replaceInnerBlocks } = dispatch( blockEditorStore );
    const { getBlocks } = registry.select( blockEditorStore );
  
    let innerBlocks = getBlocks( clientId );
  
    if ( !innerBlocks.length ) {
      replaceInnerBlocks(clientId, defaultTemplate.map(t => createBlock(...t)) );
      return;
    }

    if ( innerBlocks.length == 2 && sidebarExists ) {
      innerBlocks.push( createBlock('ucd-theme/column', {layoutClass: "l-sidebar-second", forbidWidthEdit: true}) );
    } else if(innerBlocks.length == 3 && !sidebarExists) {
      innerBlocks = innerBlocks.filter(b => b.attributes.layoutClass != "l-sidebar-second");
    }

    replaceInnerBlocks(clientId, innerBlocks);
  }

}))(Columns);
