import classnames from 'classnames';

import { html } from "../../utils";
import { useBlockProps,
  InspectorControls, 
  InnerBlocks,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
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
    [`${attributes.widthClass}`]: attributes.widthClass
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

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    orientation: "vertical",
    templateLock: false,
    renderAppender: InnerBlocks.ButtonBlockAppender
  } );

  return html`
    <${Fragment}>
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