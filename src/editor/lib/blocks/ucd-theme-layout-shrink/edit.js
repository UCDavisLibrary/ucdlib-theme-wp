import classnames from 'classnames';

import { html } from "../../utils";
import { ToolbarButton, ToolbarDropdownMenu } from '@wordpress/components';
import { useBlockProps,
  BlockControls,
  useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";
import { fullscreen } from '@wordpress/icons';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const width = attributes.width ? attributes.width : 75;

  const classes = classnames({
    "l-shrink": true,
    [`l-shrink--${attributes.width}`]: attributes.width,
    'u-width--100-in-tablet': attributes.fullWidthOnMobile
  });

  const blockProps = useBlockProps( {
    className: classes,
  } );

  const shrinkControls = [
    {title: '75%', onClick: () => setAttributes({width: 0}), isDisabled: width==75},
    {title: '60%', onClick: () => setAttributes({width: 60}), isDisabled: width==60}
  ];

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
      <${ToolbarDropdownMenu} 
        icon=${html`<span>${width}%</span>`}
        label="Set Shrink Percentage"
        controls=${shrinkControls}
      />
      <${ToolbarButton} 
        icon=${fullscreen} 
        onClick=${ () => {setAttributes({'fullWidthOnMobile': !attributes.fullWidthOnMobile})}} 
        isPressed=${attributes.fullWidthOnMobile}
        label="Make full width on mobile"/>
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
