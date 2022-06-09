import { html } from "../../utils";
import { lock, paragraph } from '@wordpress/icons';
import {
  useBlockProps, 
  InnerBlocks,
  BlockControls
} from '@wordpress/block-editor';
import {
  ToolbarButton,
  Button,
  TextControl,
  Modal
} from '@wordpress/components';
import { useState, Fragment } from '@wordpress/element';
// import { useSelect, dispatch, select } from '@wordpress/data';

export default ( props ) => {
  const { attributes, setAttributes, clientId } = props;
  const blockProps = useBlockProps();
  const allowedBlocks = ['ucd-theme/career']
  const template = [['ucd-theme/career', {}]];
  
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
    setAttributes({noPostText});
  }

  // send updated noPostText to child
  // select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.forEach(function (block) {
  //   dispatch('core/editor').updateBlockAttributes(block.clientId, { noPostText: attributes.noPostText });
  // });

  const closeModal = () => {
    setModalOpen(false);
  }

  const onModalSave = () => {
    setModalOpen(false);
  }

  return html`
    <${Fragment}>
      <BlockTitle clientId={clientId}/>
      <${BlockControls} group="block">
        <${ToolbarButton} 
          icon=${html`${lock}`} 
          onClick=${ () => {setAttributes({'lock': { 'move': !attributes.lock.move, 'remove': !attributes.lock.remove}})}} 
          isPressed=${attributes.lock.move ? true : false} && ${attributes.lock.remove ? true : false}
          label="Lock"/>
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
          <${InnerBlocks} 
            allowedBlocks=${allowedBlocks}
            template=${template}
          />
        </ul>
      </div>
      </${Fragment}>
  `
}
/*
<${BlockControls} group="block">
    ${ToggleControl}
      label="Lock"
      checked=${attributes.lock}
      onChange=${() => setAttributes({lock: !attributes.lock})}
    />
  </${BlockControls}>

  <${InspectorControls}>
    <${PanelBody} title="Lock">
      <${ToggleControl}
        label="Lock"
        checked=${attributes.lock}
        onChange=${() => setAttributes({lock: !attributes.lock})}
      />
    </${PanelBody}>
  </${InspectorControls}>
  */