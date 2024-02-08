import { html, UCDIcons } from "../../utils";
import {
  useBlockProps,
  BlockControls,
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import { ToolbarButton } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const ALLOWED_BLOCKS = [ 'ucd-theme/priority-links-item' ];
  const classes = [ "priority-links" ];
  if ( attributes.boxedOffset ){
    classes.push("priority-links--boxed-offset");
  }
  const blockProps = useBlockProps( {
	  className: classes.join(' ')
	} );
  const defaultTemplate = [
    ['ucd-theme/priority-links-item']
  ];
  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    //renderAppender: false,
    orientation: 'horizontal',
    template: defaultTemplate,
  });

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarButton}
          icon=${UCDIcons.renderPublic("fa-arrow-up-from-bracket")}
          onClick=${ () => {setAttributes({'boxedOffset': !attributes.boxedOffset})}}
          isPressed=${attributes.boxedOffset}
          label="Toggle 'Boxed Offset' Modifier"
        />
      </${BlockControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
