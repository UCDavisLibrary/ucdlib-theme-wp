import { html, SelectUtils } from "../../utils";
import { ImagePicker } from "../../block-components";
import { BaseControl, ToggleControl, SelectControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { useDispatch } from "@wordpress/data";
import { decodeEntities } from "@wordpress/html-entities";
import { Fragment, useEffect, useState } from "@wordpress/element";
import apiFetch from '@wordpress/api-fetch';

/**
 * This plugin lets user select images used by preview blocks (teaser, marketing highlight, etc)
 */
export default () => {

  const meta = SelectUtils.meta();
  const editPost = useDispatch( 'core/editor' ).editPost;
  const featuredImage = SelectUtils.editedPostAttribute('featured_media');

  const teaserImage = SelectUtils.image(meta.ucd_thumbnail_1x1);
  const cardImage = SelectUtils.image(meta.ucd_thumbnail_4x3);
  const cardImageSquare = SelectUtils.image(meta.ucd_thumbnail_1x1_large);


  const onSelectImage = (image, aspectRatio) => {
    editPost({meta: {[`ucd_thumbnail_${aspectRatio}`]: image.id}})
  }
  const onRemoveImage = (aspectRatio) => {
    editPost({meta: {[`ucd_thumbnail_${aspectRatio}`]: 0}})
  }

  const panelHelp = `
  Upload custom images and aspect ratios for display by preview blocks used by other pages.
  If custom preview images are not used, the featured image will be automatically cropped to fit.
  For best results, try to upload images for all the image sizes listed below:
  `;

  return html`
    <${Fragment}>
      <${PluginDocumentSettingPanel}
        name="ucd-preview-images"
        className="ucd-preview-images"
        icon=${html`<ucdlib-icon style=${{marginLeft: '8px', width: '15px', minWidth: '15px'}} icon="ucd-public:fa-images"></ucdlib-icon>`}
        title="Preview Images">
        <${BaseControl} help=${panelHelp} />
        <${ImagePicker}
          imageId=${meta.ucd_thumbnail_1x1}
          image=${teaserImage}
          onSelect=${(image) => onSelectImage(image, '1x1')}
          onRemove=${() => onRemoveImage('1x1')}
          defaultImageId=${featuredImage}
          cloneText="Clone Featured Image"
          helpText=${decodeEntities('Teasers use a small (&lt;200px) 1x1 image.')}
          panelAttributes=${{title: 'Teaser Image'}}
        />
        <${ImagePicker}
          imageId=${meta.ucd_thumbnail_4x3}
          image=${cardImage}
          onSelect=${(image) => onSelectImage(image, '4x3')}
          onRemove=${() => onRemoveImage('4x3')}
          defaultImageId=${featuredImage}
          cloneText="Clone Featured Image"
          helpText=${decodeEntities('Cards use a medium (&lt;1000px) 4x3 image.')}
          panelAttributes=${{title: 'Card Image'}}
        />
        <${ImagePicker}
          imageId=${meta.ucd_thumbnail_1x1_large}
          image=${cardImageSquare}
          onSelect=${(image) => onSelectImage(image, '1x1_large')}
          onRemove=${() => onRemoveImage('1x1_large')}
          defaultImageId=${featuredImage}
          cloneText="Clone Featured Image"
          helpText=${decodeEntities('Some cards use a medium (&lt;1000px) 1x1 image.')}
          panelAttributes=${{title: 'Card Square Image'}}
        />
      </${PluginDocumentSettingPanel}>
    </${Fragment}>
  `;
}
