import { html } from "../utils";
import { PanelBody, PanelRow, Button, ResponsiveWrapper } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

function ImagePicker({
  imageId,
  image,
  onSelect,
  onRemove,
  helpText,
  panelAttributes
}){

  const _panelAttributes = {
    title: "Image",
    initialOpen: true
  }
  if ( typeof panelAttributes === 'object' && !Array.isArray(panelAttributes) ) {
    Object.assign(_panelAttributes, panelAttributes);
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
    </div> 
    ${helpText && html`<${PanelRow}><small>${helpText}</small></${PanelRow}>`}
  </${PanelBody}>
`;
}

export default ImagePicker