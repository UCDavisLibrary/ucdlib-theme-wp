import { html } from "../../utils";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ContactListEdit } from "../../block-components";
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
  }

  return html`
  <div ...${ blockProps }>
    <p onClick=${modalOpen}>click me!</p>
    <${ContactListEdit} 
      ref=${modalRef}
      modalTitle='Edit Contact Information'
      onClose=${onEdit}
    />
  </div>
  `
}