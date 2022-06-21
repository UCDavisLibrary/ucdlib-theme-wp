import { html } from "../../utils";
import { ToolbarDropdownMenu, Modal, ToolbarButton, Button, TextControl } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { useState } from "@wordpress/element";
import { mapMarker } from '@wordpress/icons';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const sizeControls = [
    {title: "Small", onClick: () => {setAttributes({size: 'sm', width: '33%', height: '200px'})}},
    {title: "Medium", onClick: () => {setAttributes({size: 'md', width: '50%', height: '300px'})}},
    {title: "Large", onClick: () => {setAttributes({size: '', width: '100%', height: '300px'})}}
  ];

  const API_KEY = 'AIzaSyDTmEJ0zs8dn3hCE4Z6NkxidduSijcV_Ng';

  const startingModalData = {markerLocation: attributes.markerLocation || ''};
  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( startingModalData );

  const modalCanSave = (() => {
    if ( 
      !modalData || 
      !modalData.markerLocation
    ) {
        return false
      }
    return true;
  })();

  const closeModal = () => {
    setModalOpen(false);
  }

  const onOpenModal = (e) => {
    setModalMode('Edit');
    setModalOpen(true);
  }

  const onModalMarkerLocationChange = (markerLocation) => {
    const d = {...modalData, markerLocation: markerLocation.split(' ').join('+')};
    setModalData(d);
  }

  const onModalSave = () => {
    setModalOpen(false);
    setAttributes(modalData);
  }

  const mapsClasses = `google-maps-embed ${attributes.size ? attributes.size : 'lg'}`;

  return html`
  <div ...${ blockProps }>

    <${BlockControls} group="block">
      <${ToolbarDropdownMenu} icon=${html`<span>${attributes.size ? attributes.size : 'lg'}</span>`} label="Change button size" controls=${sizeControls}/>
      <${ToolbarButton} 
          icon=${html`${mapMarker}`} 
          onClick=${onOpenModal}
          label="Change marker location"
      />
    </${BlockControls}>

    <iframe
      class="${mapsClasses}"
      frameborder="0"
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${attributes.markerLocation}"
      allowfullscreen>
    </iframe>

    ${modalIsOpen && html`
      <${Modal} title=${modalMode + " Marker Location"} onRequestClose=${closeModal}>
        <div>
          <${TextControl} 
            label="Marker Location"
            value=${modalData.markerLocation.replaceAll('+', ' ')}
            onChange=${onModalMarkerLocationChange}
          />
          <${Button} 
            onClick=${onModalSave}
            variant='primary' 
            disabled=${!modalCanSave}>Save Changes</${Button}>
        </div>
      </${Modal}>
    `}
  </div>
  `
}