import classnames from 'classnames';

import { html } from "../../utils";
import { withDispatch } from '@wordpress/data';
import { useBlockProps,
  InspectorControls,
  useInnerBlocksProps,
  store as blockEditorStore,
} from '@wordpress/block-editor';
import { 
  PanelBody, 
  Button, 
  ButtonGroup, 
  BaseControl,
  SelectControl
} from '@wordpress/components';
import { Fragment } from "@wordpress/element";

import {
	createBlock,
} from '@wordpress/blocks';

const defaultTemplate = [
  ['ucd-theme/column', {layoutClass: "l-first", forbidWidthEdit: true}],
  ['ucd-theme/column', {layoutClass: "l-second", forbidWidthEdit: true}]
];

function Columns( {
  attributes, 
  setAttributes, 
  updateColumns,
} ) {
  const ALLOWED_BLOCKS = [ 'ucd-theme/column' ];

  const setLayout = ( attr, value ) => {
    let attrs = {};

    if ( attr === 'columnCt' ) {
      attrs['modifier'] = "";
      updateColumns(attributes.columnCt, value);
    }
    attrs[attr] = value;
    setAttributes(attrs);
  };

  const getBaseClass = (ct) => {
    if (ct === 3) return "l-3col";
    if (ct === 4) return "l-4col";
    return "l-2col";
  }

  const classes = classnames({
    [`${getBaseClass(attributes.columnCt)}`]: true,
    [`${getBaseClass(attributes.columnCt)}--${attributes.modifier}`]: attributes.modifier
    
  });

  const getModifierOptions = () => {
    if ( attributes.columnCt === 3 ) {
      return [
        {label: "33/33/33", value: ""},
        {label: "25/50/25", value: "25-50-25"},
        {label: "25/25/50", value: "25-25-50"},
        {label: "50/25/25", value: "50-25-25"}
      ]
    }
    if ( attributes.columnCt === 4 ) {
      return [
        {label: "25/25/25/25", value: ""}
      ]
    }
    return [
      {label: "50/50", value: ""},
      {label: "33/67", value: "33-67"},
      {label: "67/33", value: "67-33"},
      {label: "25/75", value: "25-75"},
      {label: "75/25", value: "75-25"}
    ]
  }

  const blockProps = useBlockProps( {
		className: classes,
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		//orientation: 'horizontal',
    renderAppender: false,
    template: defaultTemplate,
    templateLock: "insert"
	} );

  return html`
    <${Fragment}>
      <${InspectorControls}>
        <${PanelBody}>
          <${BaseControl}>
            <div style=${{paddingBottom: "4px"}}>
              <${BaseControl.VisualLabel} className="u-block">Number of Columns</${BaseControl.VisualLabel}>
            </div>
            <${ButtonGroup}>
              <${Button} 
                variant="primary"
                onClick=${() => setLayout("columnCt", 2)}
                isPressed=${attributes.columnCt === 2}>2
              </${Button}>
              <${Button} 
                variant="primary" 
                onClick=${() => setLayout("columnCt", 3)}
                isPressed=${attributes.columnCt === 3}>3
              </${Button}>
              <${Button} 
                variant="primary" 
                onClick=${() => setLayout("columnCt", 4)}
                isPressed=${attributes.columnCt === 4}>4
              </${Button}>
            </${ButtonGroup}>
          </${BaseControl}>
          <${SelectControl} 
            label="Column Widths"
            value=${attributes.modifier}
            options=${getModifierOptions()}
            onChange=${(v) => setLayout('modifier', v)}
            help="Change the relative width of each column"
          />
        </${PanelBody}>
      </${InspectorControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}

export default withDispatch(( dispatch, ownProps, registry ) =>  ({

  updateColumns(oldColumnCt, newColumnCt){
    const { clientId } = ownProps;
    const { replaceInnerBlocks } = dispatch( blockEditorStore );
    const { getBlocks } = registry.select( blockEditorStore );
    const classMap = [undefined, "first", 'second', 'third', 'fourth'];
  
    let innerBlocks = getBlocks( clientId );
  
    if ( !innerBlocks.length ) {
      replaceInnerBlocks(clientId, defaultTemplate.map(t => createBlock(...t)) );
      return;
    }

    if ( newColumnCt > oldColumnCt ) {
      let columnsToAdd = newColumnCt - oldColumnCt;
      for (let i = 1; i < columnsToAdd + 1; i++) {
        innerBlocks.push( 
          createBlock('ucd-theme/column', {layoutClass: `l-${classMap[oldColumnCt + i]}`, forbidWidthEdit: true}) );
      }
    } else if( oldColumnCt > newColumnCt ){
      let columnsToRemove = [...Array(oldColumnCt - newColumnCt).keys()].map(i => `l-${classMap[oldColumnCt - i]}`)
      innerBlocks = innerBlocks.filter(b => !columnsToRemove.includes(b.attributes.layoutClass))
    }

    replaceInnerBlocks(clientId, innerBlocks);
  }

}))(Columns);
