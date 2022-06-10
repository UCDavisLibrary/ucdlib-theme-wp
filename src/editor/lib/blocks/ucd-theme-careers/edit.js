import { html } from "../../utils";
import { lock } from '@wordpress/icons';
import { useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const allowedBlocks = ['ucd-theme/career']
  const template = [['ucd-theme/career', {}]];

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarButton} 
          icon=${html`${lock}`} 
          onClick=${ () => {setAttributes({'lock': { 'move': !attributes.lock.move, 'remove': !attributes.lock.remove}})}} 
          isPressed=${attributes.lock.move ? true : false} && ${attributes.lock.remove ? true : false}
          label="Lock"
        />
      </${BlockControls}>
      
      <div ...${ blockProps }>
        <ul className="list--arrow">
          <${InnerBlocks} 
            allowedBlocks=${allowedBlocks}
            template=${template}
          />
        </ul>
      </div>
      </${Fragment}>
  `
}
