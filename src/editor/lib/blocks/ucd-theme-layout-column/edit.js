import classnames from 'classnames';

import { html } from "../../utils";
import { useBlockProps,
  BlockControls,
  InspectorControls, 
  InnerBlocks,
  BlockVerticalAlignmentControl,
  useInnerBlocksProps
} from '@wordpress/block-editor';
import { 
  PanelBody, 
  SelectControl
} from '@wordpress/components';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    [`${attributes.layoutClass}`]: attributes.layoutClass,
    [`${attributes.widthClass}`]: attributes.widthClass,
    'u-space-my--auto': attributes.verticalAlign === 'center',
    'u-space-mt--auto': attributes.verticalAlign === 'bottom'
  });

  const widthOptions = [
    {label: "Normal", value: ""},
    {label: "100% Screen Width", value: "l-full-width"},
    {label: "Overflow", value: "l-overflow"},
    {label: "Shrink", value: "l-shrink"}
  ]

  const blockProps = useBlockProps( {
    className: classes,
    style: {width: '100%'}
  } );

  const innerProps = {
    orientation: "vertical",
    templateLock: false,
    //renderAppender: InnerBlocks.DefaultBlockAppender
    renderAppender: InnerBlocks.ButtonBlockAppender
  }

  if ( attributes.allowedBlocks.length ) {
    innerProps['allowedBlocks'] = attributes.allowedBlocks;
  }

  const innerBlocksProps = useInnerBlocksProps( blockProps,  innerProps);
  

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${BlockVerticalAlignmentControl} 
              value=${attributes.verticalAlign}
              onChange=${verticalAlign => setAttributes({verticalAlign})}
              />
      </${BlockControls}>
      <${InspectorControls}>
        <${PanelBody}>
          ${(!attributes.forbidWidthEdit) && html`
            <${SelectControl} 
                label="Container Width"
                value=${attributes.widthClass}
                options=${widthOptions}
                onChange=${(widthClass) => setAttributes({widthClass})}
                help="Change the width of the container"
              />          
          `}
        </${PanelBody}>
      </${InspectorControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}