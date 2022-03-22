import classnames from 'classnames';

import { html } from "../../utils";
import { ToolbarButton } from '@wordpress/components';
import { useBlockProps,
  BlockControls,
  useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    "l-shrink": true,
    [`l-shrink--${attributes.width}`]: attributes.width,
    'u-width--100-in-mobile': attributes.fullWidthOnMobile
  });

  const blockProps = useBlockProps( {
    className: classes,
    //style: {width: '100%'}
  } );

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
      <${ToolbarButton} 
        icon=${html`<span>100%</span>`} 
        onClick=${ () => {setAttributes({'fullWidthOnMobile': !attributes.fullWidthOnMobile})}} 
        isPressed=${attributes.fullWidthOnMobile}
        label="Make full width on mobile"/>
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
