import { html, UCDIcons } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { TextControl, ToolbarButton, Button, Modal, URLInput } from '@wordpress/components';
import { useState } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const startingModalData = {
    facebookUrl: attributes.facebookUrl || '',
    twitterUrl: attributes.twitterUrl || '',
    instagramUrl: attributes.instagramUrl || '',
    youtubeUrl: attributes.youtubeUrl || '',
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
    setAttributes(modalData);
  }

  const onFacebookUrlChange = (facebookUrl) => {
    const data = {...modalData, facebookUrl};
    setModalData(data);
  }

  const onTwitterUrlChange = (twitterUrl) => {
    const data = {...modalData, twitterUrl};
    setModalData(data);
  }

  const onInstagramUrlChange = (instagramUrl) => {
    const data = {...modalData, instagramUrl};
    setModalData(data);
  }

  const onYoutubeUrlChange = (youtubeUrl) => {
    const data = {...modalData, youtubeUrl};
    setModalData(data);
  }

  const onLinkedinUrlChange = (linkedinUrl) => {
    const data = {...modalData, linkedinUrl};
    setModalData(data);
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
      ${!attributes.facebookUrl && !attributes.twitterUrl && !attributes.instagramUrl && !attributes.youtubeUrl && !attributes.linkedinUrl && html`
        <div>
          <div style=${{backgroundColor: '#1da1f2', width: '40px', height: '40px', display: 'inline-block'}}></div>
          <div style=${{backgroundColor: '#1778f2', width: '40px', height: '40px', display: 'inline-block'}}></div>
          <div style=${{backgroundColor: '#f00075', width: '40px', height: '40px', display: 'inline-block'}}></div>
        </div>
      `}
      <div class="social-follow">
        ${attributes.facebookUrl ? html`
          <a alt="Facebook icon link" class="social-follow__facebook media-icon" style=${{ marginRight: '.5em' }} target="_blank"></a>
        ` : html``}
        ${attributes.twitterUrl ? html`
          <a alt="Twitter icon link" class="social-follow__twitter media-icon" style=${{ marginRight: '.5em' }} target="_blank"></a>
        ` : html``}
        ${attributes.instagramUrl ? html`
          <a alt="Instagram icon link" class="social-follow__instagram media-icon" style=${{ marginRight: '.5em' }} target="_blank"></a>
        ` : html``}
        ${attributes.youtubeUrl ? html`
          <a alt="YouTube icon link" class="social-follow__youtube media-icon" style=${{ marginRight: '.5em' }} target="_blank"></a>
        ` : html``}
        ${attributes.linkedinUrl ? html`
          <a alt="LinkedIn icon link" class="social-follow__linkedin" style=${{ marginRight: '.5em' }} target="_blank"></a>
        ` : html``}
      </div>

      ${modalIsOpen && html`
        <${Modal} title=${modalMode + " Social Media Links"} onRequestClose=${closeModal}>
          <div>
            <${TextControl}
              label="Facebook Url"
              value=${modalData.facebookUrl}
              onChange=${onFacebookUrlChange}
            />
            <${TextControl}
              label="Blue Sky Url"
              value=${modalData.twitterUrl}
              onChange=${onTwitterUrlChange}
            />
            <${TextControl}
              label="Instagram Url"
              value=${modalData.instagramUrl}
              onChange=${onInstagramUrlChange}
            />
            <${TextControl}
              label="YouTube Url"
              value=${modalData.youtubeUrl}
              onChange=${onYoutubeUrlChange}
            />
            <${TextControl}
              label="LinkedIn Url"
              value=${modalData.linkedinUrl}
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
