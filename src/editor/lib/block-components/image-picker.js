import { html } from "../utils";
import { 
  PanelBody, 
  PanelRow, 
  Button, 
  ResponsiveWrapper, 
  ToggleControl, 
  TextareaControl } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState, Fragment } from '@wordpress/element';
import { useSelect, useDispatch, dispatch } from "@wordpress/data";
import apiFetch from '@wordpress/api-fetch';
import { store as noticesStore } from '@wordpress/notices';

function ImagePicker({
  imageId,
  image,
  onSelect,
  onRemove,
  onClose,
  onOpen,
  helpText,
  defaultImageId,
  panelAttributes,
  captionOptions,
  onCaptionChange,
  cloneText,
  notPanel
}){
  const { invalidateResolution } = useDispatch('core/data');

  const _panelAttributes = {
    title: "Image",
    initialOpen: true
  }
  if ( typeof panelAttributes === 'object' && !Array.isArray(panelAttributes) ) {
    Object.assign(_panelAttributes, panelAttributes);
  }

  let showCaptionOptions = true;
  if ( !captionOptions ) {
    showCaptionOptions = false;
  } else if ( !Object.keys(captionOptions).length ){
    captionOptions = {show: false, customText: ''};
  }

  if ( !cloneText ) cloneText = "Clone Default Image";

  const { createErrorNotice } = useDispatch( noticesStore );
  const [ cloneInProgress, setCloneInProgress ] = useState( false );


  const { defaultImage } = useSelect( (select) => {
    let defaultImage = undefined;
    if ( defaultImageId ) defaultImage = select('core').getMedia(defaultImageId);

    return { defaultImage }
  });

  const _onCaptionChange = (v) => {
    v = {...captionOptions, ...v}
    onCaptionChange(v);
  }

  const _onClose = () => {
    if ( imageId ) {
      invalidateResolution('core', 'getMedia', [imageId]);
      //dispatch('core').saveMedia(imageId);
    }
    if ( onClose ){
      onClose();
    }
  }

  const onClone = () => {
    setCloneInProgress(true);
    const attrs = {
      src: defaultImage.source_url,
      modifiers: [{type: 'rotate', args: {angle: 0}}]
    };
    apiFetch({			
      path: `/wp/v2/media/${ defaultImage.id }/edit`,
      method: 'POST',
      data: attrs,})
			.then( ( response ) => {
        onSelect(response);
			} )
			.catch( ( error ) => {
          createErrorNotice(
          `Could not clone image: ${error.message}`,
          {
						id: 'image-editing-error',
						type: 'snackbar',
					}
        )
			} )
			.finally( () => {
        setCloneInProgress(false);
			} );
  }

  const uploadButton = ({open}) => {
    if ( onOpen ) onOpen();
    return html`
    <${Button}
     className=${imageId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
     onClick=${open}
    >
      ${imageId == 0 && 'Choose an Image'}
      ${image != undefined && html`
        <${ResponsiveWrapper}
          naturalWidth=${image.media_details.width}
          naturalHeight=${image.media_details.height}
        >
          <img src=${image.source_url} />
        </${ResponsiveWrapper}>
      `}
    </${Button}>
  `};

  const replaceButton = ({open}) => {
    if ( onOpen ) onOpen();
    return html`
    <${Button} onClick=${open} isSecondary>Replace Image</${Button}>
  `;}

  const renderMediaUpload = () => html`
    <div className="editor-post-featured-image">
      <${MediaUploadCheck}>
        <${MediaUpload}
          onSelect=${onSelect}
          onClose=${_onClose}
          value=${imageId}
          allowedTypes=${['image']}
          render=${uploadButton}
        />
      </${MediaUploadCheck}>

      ${imageId != 0 && html`
        <${MediaUploadCheck}>
          <${MediaUpload}
            title="Replace Image"
            onSelect=${onSelect}
            onClose=${_onClose}
            value=${imageId}
            allowedTypes=${['image']}
            render=${replaceButton}
          />
        </${MediaUploadCheck}>
      `}

      ${imageId != 0 && html`
        <${MediaUploadCheck}>
          <${Button} 
            onClick=${onRemove}
            isLink 
            isDestructive
          >Remove Image
          </${Button}>
        </${MediaUploadCheck}>
      `}

      ${defaultImage && html`
        <${MediaUploadCheck}>
          <${Button} 
            isSecondary
            onClick=${onClone}
            disabled=${cloneInProgress}
          >${cloneText}
          </${Button}>
        </${MediaUploadCheck}>
      `}
    </div> 
  `;

  const renderHelpText = () => html`
    <${Fragment}>
      ${helpText && html`<${PanelRow}><small>${helpText}</small></${PanelRow}>`}
    </${Fragment}>
  `

  const renderCaptions = () => html`
    <${Fragment}>
      ${showCaptionOptions && html`
        <div style=${{marginTop:'15px'}}>
          <${PanelRow}>
            <${ToggleControl} 
              label="Show Caption"
              checked=${captionOptions.show}
              onChange=${() => _onCaptionChange({show: !captionOptions.show })}
            />
          </${PanelRow}>
          <${TextareaControl} 
            label="Custom Caption"
            help="Will be displayed instead of caption for image from media library"
            value=${ captionOptions.customText }
            onChange=${ ( customText ) => _onCaptionChange({customText}) }
          />
        </div>
      `}
    </${Fragment}>
  `

  return html`
  ${notPanel === true ? html`
    <div>
      ${renderMediaUpload()}
      ${renderHelpText()}
      ${renderCaptions()}
    </div>
  ` : html`
    <${PanelBody} title=${_panelAttributes.title} initialOpen=${_panelAttributes.initialOpen}>
      ${renderMediaUpload()}
      ${renderHelpText()}
      ${renderCaptions()}
    </${PanelBody}>
  `}

`;
}

export default ImagePicker