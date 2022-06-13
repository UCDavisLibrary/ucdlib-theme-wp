import { html } from "../../utils";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ContactListEdit, ContactListDisplay } from "../../block-components";
import { ToolbarButton } from '@wordpress/components';
import { createRef } from "@wordpress/element";


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const modalRef = createRef();

  const modalOpen = () => {
    if ( modalRef.current ) modalRef.current.openModal();
  }

  const onEdit = (d) => {
    console.log(d);
    setAttributes(d);
  }

  return html`
  <div ...${ blockProps }>
    <${ContactListDisplay} 
      placeholderText="Click to enter contact info..."
      phones=${attributes.phones}
      emails=${attributes.emails}
      websites=${attributes.websites}
      onClick=${modalOpen}
    />
    <${ContactListEdit} 
      ref=${modalRef}
      modalTitle='Edit Contact Information'
      onClose=${onEdit}
      phones=${attributes.phones}
      emails=${attributes.emails}
      websites=${attributes.websites}
      allowAppointment=${false}
    />
  </div>
  `
}