import { html, UCDIcons } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { TextControl, ToolbarButton, Button, Modal, URLInput } from '@wordpress/components';
import { useRef, useState } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  const startingModalData = {
    facebookUrl: 'https://www.facebook.com/UCDavisLibrary/',
    twitterUrl: 'https://twitter.com/UCDavisLibrary',
    instagramUrl: 'https://www.instagram.com/ucdavislibrary/',
    youtubeUrl: 'https://www.youtube.com/channel/UCRjjo_jpHml_Z3_5ctYq1lA',
    linkedinUrl: ''
  };
  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( startingModalData );

  const closeModal = () => {
    setModalOpen(false);
  }

  const onAddLinks = () => {
    setModalMode('Add');
    setModalData(startingModalData);
    setModalOpen(true);
  }

  const onModalSave = () => {
    setModalOpen(false);
  }

  const onFacebookUrlChange = (facebookUrl) => {
    const data = {...modalData, facebookUrl};
    setModalData(data);
    setAttributes({facebookUrl});
  }

  const onTwitterUrlChange = (twitterUrl) => {
    const data = {...modalData, twitterUrl};
    setModalData(data);
    setAttributes({twitterUrl});
  }

  const onInstagramUrlChange = (instagramUrl) => {
    const data = {...modalData, instagramUrl};
    setModalData(data);
    setAttributes({instagramUrl});
  }

  const onYoutubeUrlChange = (youtubeUrl) => {
    const data = {...modalData, youtubeUrl};
    setModalData(data);
    setAttributes({youtubeUrl});
  }

  const onLinkedinUrlChange = (linkedinUrl) => {
    const data = {...modalData, linkedinUrl};
    setModalData(data);
    setAttributes({linkedinUrl});
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarButton} 
            icon=${UCDIcons.render('link')} 
            onClick=${() => onAddLinks()} 
            isPressed=${modalIsOpen}
            label="Add Social Media Links"
        />
      </${BlockControls}>

      ${modalIsOpen && html`
        <${Modal} title=${modalMode + " Social Media Links"} onRequestClose=${closeModal}>
          <div>
            <${TextControl} 
              label="Facebook Url"
              value=${attributes.facebookUrl}
              onChange=${onFacebookUrlChange}
            />
            <${TextControl} 
              label="Twitter Url"
              value=${attributes.twitterUrl}
              onChange=${onTwitterUrlChange}
            />
            <${TextControl} 
              label="Instagram Url"
              value=${attributes.instagramUrl}
              onChange=${onInstagramUrlChange}
            />
            <${TextControl} 
              label="YouTube Url"
              value=${attributes.youtubeUrl}
              onChange=${onYoutubeUrlChange}
            />
            <${TextControl} 
              label="LinkedIn Url"
              value=${attributes.linkedinUrl}
              onChange=${onLinkedinUrlChange}
            />
            <${Button} 
              onClick=${onModalSave}
              variant='primary'>Save Links</${Button}>
          </div>
        </${Modal}>
      `}

    </div>
  `
}
