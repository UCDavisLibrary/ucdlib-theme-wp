import { html } from "../utils";
import { Button, Modal } from '@wordpress/components';
import { useState, Fragment, forwardRef, useImperativeHandle } from '@wordpress/element';

const IconPicker = forwardRef((props, ref) => {
  const [ isOpen, setOpen ] = useState( false );
  const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal
  }));


  return html`
    <${Fragment}>
      ${isOpen && html`
      <${Modal} title="Choose an Icon" onRequestClose=${ closeModal }>
					<${Button} variant="secondary" onClick=${ closeModal }>
						Select Icon
					</${Button}>
				</${Modal}>
      `}
    </${Fragment}>
  `;

})

export default IconPicker