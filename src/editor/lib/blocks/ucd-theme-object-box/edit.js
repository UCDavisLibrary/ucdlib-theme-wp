import classnames from 'classnames';

import { html } from "../../utils";
import { ToolbarPaddingPicker, ToolbarSizePicker } from "../../block-components";
import { useBlockProps,
  BlockControls,
  useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    "o-box": true,
    [`o-box--${attributes.padding}`]: attributes.padding,
    [`u-space-mb--${attributes.marginBottom}`]: attributes.marginBottom && attributes.marginBottom != 'default',
    [`u-space-mb`]: attributes.marginBottom == 'default'
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
        <${ToolbarSizePicker} 
          value=${attributes.marginBottom}
          icon="vertical-align-bottom"
          label="Bottom Margin Size"
          onChange=${(v) => setAttributes({marginBottom: v.slug})}
        />
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
