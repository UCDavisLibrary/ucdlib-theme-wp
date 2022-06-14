import { html } from "../../utils";
import { ToolbarColorPicker, ToolbarSeparatorStyle } from "../../block-components";
import { Dropdown, ToolbarDropdownMenu, Modal } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { useRef, useState, useEffect } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const sizeControls = [
    {title: "Small", onClick: () => {setAttributes({size: 'sm', width: '33%', height: '200px'})}},
    {title: "Medium", onClick: () => {setAttributes({size: '', width: '50%', height: '300px'})}},
    {title: "Large", onClick: () => {setAttributes({size: 'lg', width: '100%', height: '400px'})}}
  ];

  // set attributes on initial render so the default values are saved to db
  useEffect(() => {
    setAttributes({
      markerLocation: attributes.markerLocation,
      width: attributes.width,
      height: attributes.height,
    });
  }, []);

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

  const onModalMarkerLocationChange = (markerLocation) => {
    const d = {...modalData, markerLocation};
    setModalData(d);
  }

  const onModalSave = () => {
    setModalOpen(false);
  }

  return html`
  <div ...${ blockProps }>

    <${BlockControls} group="block">
      <${ToolbarDropdownMenu} icon=${html`<span>${attributes.size ? attributes.size : 'md'}</span>`} label="Change button size" controls=${sizeControls}/>
    </${BlockControls}>

    <iframe
      style=${{ width: attributes.width, height: attributes.height, border: '0' }}
      frameborder="0"
      referrerpolicy="no-referrer-when-downgrade"
      src="http://localhost:3000/wp-admin/post.php?post=6783&action=edit"
      allowfullscreen>
    </iframe>

    ${modalIsOpen && html`
      <${Modal} title=${modalMode + " Marker Location"} onRequestClose=${closeModal}>
        <div>
          <${TextControl} 
            label="Marker Location"
            value=${modalData.markerLocation}
            onChange=${onModalMarkerLocationChange}
          />
          <${Button} 
            onClick=${onModalSave}
            variant='primary' 
            disabled=${!modalCanSave}>'Save Changes'</${Button}>
        </div>
      </${Modal}>
    `}
  </div>
  `
}
// https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&q=${''}