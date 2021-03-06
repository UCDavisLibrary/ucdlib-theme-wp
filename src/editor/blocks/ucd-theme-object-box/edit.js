import classnames from 'classnames';

import { html } from "../../utils";
import { ToolbarPaddingPicker } from "../../block-components";
import { useBlockProps,
  BlockControls,
  InnerBlocks,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    "o-box": true,
    [`o-box--${attributes.padding}`]: attributes.padding
  });

  const blockProps = useBlockProps( {
    className: classes,
    //style: {width: '100%'}
  } );

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  const onPaddingChange = (v) => {
    let padding = v.slug === "default" ? "" : v.slug;
    setAttributes({padding});
  }

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarPaddingPicker}
          value=${attributes.padding}
          onChange=${onPaddingChange}/>
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
