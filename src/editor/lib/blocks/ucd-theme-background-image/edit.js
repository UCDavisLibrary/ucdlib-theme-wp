import classnames from 'classnames';

import { html, SelectUtils, showBlockDeprecationWarning } from "../../utils";
import { ImagePicker, ToolbarColorPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const Image = SelectUtils.image(attributes.imageId)

  // set up image picker
  const onSelectImage = (image) => {
    setAttributes({imageId: image.id});
  }
  const onRemoveImage = () => {
    setAttributes({imageId: 0});
  }

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  const showDeprecationWarning = showBlockDeprecationWarning();

  const classes = classnames({
    'hero-banner': true,
    [`category-brand--${attributes.brandColor}`]: attributes.brandColor,
    'category-brand__background': attributes.brandColor
  });

  const imgStyles = {};
  if ( Image ) {
    imgStyles.backgroundImage = `url(${Image.source_url})`;
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
      ${(Image !== undefined) && html`
        <${Fragment}>
          <${ToolbarColorPicker}
            onChange=${onColorChange}
            value=${attributes.brandColor}
            ucdBlock="hero-banner"
          />
          <${ToolbarButton}
            icon=${html`<span>P</span>`}
            onClick=${ () => {setAttributes({'noPadding': !attributes.noPadding})}}
            isPressed=${attributes.noPadding}
            label="Toggle padding"/>
        </${Fragment}>
        `}
      </${BlockControls}>
      <${InspectorControls}>
        <${ImagePicker}
          imageId=${attributes.imageId}
          image=${Image}
          onSelect=${onSelectImage}
          onRemove=${onRemoveImage}
          defaultImageId=${0}
          helpText=""
          panelAttributes=${{title: 'Background Image'}}
        />
      </${InspectorControls}>
      ${showDeprecationWarning && html`
        <div className='brand-textbox category-brand--double-decker category-brand__background'>
          This block has been deprecated, and will be removed in a future release. Please use the "Section" block instead.
        </div>
      `}
      ${(Image !== undefined ) && html`
        <div className=${classes}>
          <div className="hero-banner__image u-background-image" style=${imgStyles}></div>
          <div className="hero-banner__film"></div>
          <div className="hero-banner__body--innerblocks ${attributes.noPadding ? 'hero-banner__body--no-padding' : ''}">
            <${InnerBlocks} />
          </div>
        </div>`}
      ${(Image == undefined) && html`
        <div className='alert'>Upload an image using the right-hand toolbar</div>
      `}
    </div>

  `;
};
