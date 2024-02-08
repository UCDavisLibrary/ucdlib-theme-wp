import { html, UCDIcons } from "../../utils";
import {
  useBlockProps,
  BlockControls,
  useInnerBlocksProps
} from '@wordpress/block-editor';
import { Fragment } from "@wordpress/element";
import { ToolbarButton } from '@wordpress/components';

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = attributes.narrow ? 'l-gutter--narrow' : 'l-gutter';

  const blockProps = useBlockProps( {
    className: classes
  } );

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
      <${ToolbarButton}
        icon=${UCDIcons.renderPublic('fa-minimize')}
        onClick=${ () => {setAttributes({'narrow': !attributes.narrow})}}
        isPressed=${attributes.narrow}
        label="Toggle 'narrow' setting"/>
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
