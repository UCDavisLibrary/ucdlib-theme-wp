import { html, UCDIcons } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { TextControl, ToolbarButton, Button, Modal, URLInput } from '@wordpress/components';
import { useRef, useState, useEffect } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  useEffect(() => {
    setAttributes({facebookUrl: 'https://www.facebook.com/UCDavisLibrary/'});
    setAttributes({twitterUrl: 'https://twitter.com/UCDavisLibrary'});
    setAttributes({instagramUrl: 'https://www.instagram.com/ucdavislibrary/'});
    setAttributes({youtubeUrl: 'https://www.youtube.com/channel/UCRjjo_jpHml_Z3_5ctYq1lA'});
  }, []);

  const startingModalData = {
    facebookUrl: !attributes.facebookUrl ? '' : 'https://www.facebook.com/UCDavisLibrary/',
    twitterUrl: !attributes.twitterUrl ? '' : 'https://twitter.com/UCDavisLibrary',
    instagramUrl: !attributes.instagramUrl ? '' : 'https://www.instagram.com/ucdavislibrary/',
    youtubeUrl: !attributes.youtubeUrl ? '' : 'https://www.youtube.com/channel/UCRjjo_jpHml_Z3_5ctYq1lA',
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
      ${!attributes.facebookUrl && !attributes.twitterUrl && !attributes.instagramUrl && !attributes.youtubeUrl && !attributes.linkedinUrl && html`
        <div>
          <div style=${{backgroundColor: '#1da1f2', width: '40px', height: '40px', display: 'inline-block'}}></div>
          <div style=${{backgroundColor: '#1778f2', width: '40px', height: '40px', display: 'inline-block'}}></div>
          <div style=${{backgroundColor: '#f00075', width: '40px', height: '40px', display: 'inline-block'}}></div>
        </div>
      `}
      ${attributes.facebookUrl ? html`
        <ucdlib-icon icon='ucd-public:facebook' style=${{display: 'inline-flex', marginRight: '.4em', width: '50px', height: '50px'}}></ucdlib-icon>
      ` : html``}
      ${attributes.twitterUrl ? html`
        <ucdlib-icon icon='ucd-public:twitter' style=${{display: 'inline-flex', marginRight: '.4em', width: '50px', height: '50px'}}></ucdlib-icon>
      ` : html``}
      ${attributes.instagramUrl ? html`
        <ucdlib-icon icon='ucd-public:instagram' style=${{display: 'inline-flex', marginRight: '.4em', width: '50px', height: '50px'}}></ucdlib-icon>
      ` : html``}
      ${attributes.youtubeUrl ? html`
        <ucdlib-icon icon='ucd-public:youtube' style=${{display: 'inline-flex', marginRight: '.4em', width: '50px', height: '50px'}}></ucdlib-icon>
      ` : html``}
      ${attributes.linkedinUrl ? html`
        <ucdlib-icon icon='ucd-public:linkedin' style=${{display: 'inline-flex', marginRight: '.4em', width: '50px', height: '50px'}}></ucdlib-icon>
      ` : html``}

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
/*
<svg viewBox="40 -5 50 50" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none;display: block;width: 100%;height: 100%;width: 50px;height: 50px;">
      <g width="50px" height="50px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;">
        <path style="fill:#29AAE1;" d="M86,21.5C86,33.3,76.4,43,64.5,43C52.6,43,43,33.3,43,21.5S52.6,0,64.5,0S86,9.6,86,21.5"></path>
        <path style="fill:#FFFFFF;" d="M61,29c7.1,0,11-5.9,11-11c0-0.2,0-0.3,0-0.5c0.8-0.5,1.4-1.2,1.9-2c-0.7,0.3-1.4,0.5-2.2,0.6
          c0.8-0.5,1.4-1.2,1.7-2.1c-0.7,0.4-1.6,0.8-2.5,0.9c-0.7-0.8-1.7-1.2-2.8-1.2c-2.1,0-3.9,1.7-3.9,3.9c0,0.3,0,0.6,0.1,0.9
          c-3.2-0.2-6.1-1.7-8-4c-0.3,0.6-0.5,1.2-0.5,1.9c0,1.3,0.7,2.5,1.7,3.2c-0.6,0-1.2-0.2-1.8-0.5c0,0,0,0,0,0
          c0,1.9,1.3,3.4,3.1,3.8c-0.3,0.1-0.7,0.1-1,0.1c-0.2,0-0.5,0-0.7-0.1c0.5,1.5,1.9,2.7,3.6,2.7c-1.3,1-3,1.7-4.8,1.7
          c-0.3,0-0.6,0-0.9-0.1C56.8,28.4,58.8,29,61,29"></path>
      </g></svg>
      */