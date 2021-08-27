import { html } from "../utils";
import { PanelBody, PanelRow, Button, ResponsiveWrapper } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch, dispatch } from "@wordpress/data";
import apiFetch from '@wordpress/api-fetch';
import { store as noticesStore } from '@wordpress/notices';

function ImagePicker({
  imageId,
  image,
  onSelect,
  onRemove,
  onClose,
  helpText,
  defaultImageId,
  panelAttributes
}){

  const _panelAttributes = {
    title: "Image",
    initialOpen: true
  }
  if ( typeof panelAttributes === 'object' && !Array.isArray(panelAttributes) ) {
    Object.assign(_panelAttributes, panelAttributes);
  }

  const { createErrorNotice } = useDispatch( noticesStore );
  const [ cloneInProgress, setCloneInProgress ] = useState( false );


  const { defaultImage } = useSelect( (select) => {
    let defaultImage = undefined;
    if ( defaultImageId ) defaultImage = select('core').getMedia(defaultImageId);

    return { defaultImage }
  });

  const onRefresh = () => {
    if ( imageId ) dispatch('core').saveMedia(imageId);
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

  const uploadButton = ({open}) => html`
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
  `;

  const replaceButton = ({open}) => html`
    <${Button} onClick=${open} isSecondary>Replace Image</${Button}>
  `;

  return html`
  <${PanelBody} title=${_panelAttributes.title} initialOpen=${_panelAttributes.initialOpen}>
    <div className="editor-post-featured-image">
      <${MediaUploadCheck}>
        <${MediaUpload}
          onSelect=${onSelect}
          onClose=${onClose}
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
            onClose=${onClose}
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

      ${imageId != 0 && html`
        <${Button} 
          isLink
          onClick=${onRefresh}
        >Resync Image
        </${Button}>
      `}

      ${defaultImage && html`
        <${MediaUploadCheck}>
          <${Button} 
            isSecondary
            onClick=${onClone}
            disabled=${cloneInProgress}
          >Clone Default Image
          </${Button}>
        </${MediaUploadCheck}>
      `}
    </div> 
    ${helpText && html`<${PanelRow}><small>${helpText}</small></${PanelRow}>`}
  </${PanelBody}>
`;
}

export default ImagePicker