import { html } from "../../utils";
import { lock, paragraph } from '@wordpress/icons';
import { useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, Modal, Button, TextControl } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

export default ( props ) => {
  const { clientId, attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const allowedBlocks = ['ucd-theme/career']
  const template = [['ucd-theme/career', {}]];
  const { innerBlocksCount} = useSelect(select => ({
    innerBlocksCount: select("core/block-editor").getBlockCount(clientId)
  }));

  // modal state
  const startingModalData = {
    noPostText: attributes.noPostText || ''
  };

  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( startingModalData );

  // modal validation
  const modalCanSave = (() => {
    if ( 
      !modalData || 
      !modalData.noPostText 
      ) {
        return false
      }
    return true;
  })();

  const onNoPostClicked = (e) => {
    setModalMode('Edit');
    setModalOpen(true);
  }

  const onNoPostTextChange = (noPostText) => {
    const data = {...modalData, noPostText};
    setModalData(data);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const onModalSave = () => {
    setModalOpen(false);
    setAttributes(modalData);
  }

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarButton} 
          icon=${html`${lock}`} 
          onClick=${ () => {setAttributes({'lock': { 'move': !attributes.lock.move, 'remove': !attributes.lock.remove}})}} 
          isPressed=${attributes.lock.move ? true : false} && ${attributes.lock.remove ? true : false}
          label="Lock"
        />
        <${ToolbarButton} 
          icon=${html`${paragraph}`} 
          onClick=${onNoPostClicked}
          label="Change No Job Postings Message"/>  
      </${BlockControls}>

      ${modalIsOpen && html`
      <${Modal} title=${modalMode + " Default Text"} onRequestClose=${closeModal}>
        <div>
          <${TextControl} 
            label=""
            value=${modalData.noPostText}
            onChange=${onNoPostTextChange}
          />
          <${Button} 
              onClick=${onModalSave}
              variant='primary' 
              disabled=${!modalCanSave}>${modalMode == 'Add' ? 'Add Default Text' : 'Save Changes'}
            </${Button}>
        </div>
      </${Modal}>
    `}

      <div ...${ blockProps }>
        <ul className="list--arrow">
          ${innerBlocksCount > 0 && html`
            <${InnerBlocks} 
              allowedBlocks=${allowedBlocks}
              template=${template}
            />
          `}
          ${innerBlocksCount === 0 && html`
            <${InnerBlocks}
              allowedBlocks=${allowedBlocks}
              template=${template}
            />
          `}
        </ul>
      </div>
    </${Fragment}>
  `
}
