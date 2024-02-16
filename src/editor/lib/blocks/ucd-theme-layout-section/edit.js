import classnames from 'classnames';

import { html, BlockSettings, UCDIcons, SelectUtils } from "../../utils";
import { ToolbarColorPicker, ImagePicker } from "../../block-components";
import backgroundColors from "./colors.js";
import { useBlockProps,
  InspectorControls,
  BlockControls,
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import { ToolbarButton, ToggleControl, PanelBody, SelectControl, RangeControl, ColorPalette } from '@wordpress/components';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  // retrieve image
  const Image = SelectUtils.image(attributes.imageId)
  const hasImage = Image ? true : false;

  const color = attributes.backgroundColor ? attributes.backgroundColor : {};

  const classes = classnames({
    'layout-section': true,
    'layout-section--force-contrast': !attributes.disableForceContrast,
    [`layout-section--${color.slug}`]: color.isBrandColor && !hasImage,
    'layout-section--light-on-dark': color?.isDark && !hasImage,
    'layout-section--light-on-dark': hasImage && attributes.imageTextColor === 'light',
    'layout-section--dark-on-light': (color.value && !color.isBrandColor && !color.isDark) && !hasImage,
    'layout-section--dark-on-light': hasImage && attributes.imageTextColor === 'dark',
    'layout-section__bg-image--colored-film': hasImage && attributes.imageBrandFilm,
    'l-gutter': attributes.useGutters && !attributes.gutterModifier,
    [`l-gutter--${attributes.gutterModifier}`]: attributes.useGutters && attributes.gutterModifier,
    'layout-section__bg-image': hasImage || attributes.hasWaterColor,
    'layout-section__bg-image--darken': hasImage && attributes.imageFilm,
    'l-full-width': attributes.width === 'full-width',
    'u-align--left': attributes.width === 'float-left',
    'u-align--right': attributes.width === 'float-right',
    'dark-background': attributes.darkBackground
  });

  const styles = {};
  if (color.color && !color.isBrandColor && !hasImage) {
    styles.backgroundColor = color.color;
  }
  if ( hasImage && attributes.hasWaterColor ){
    styles['--layout-section-bg-url'] = `url(${Image.source_url}), url(${BlockSettings.getWatercolor(attributes.waterColorColor, attributes.waterColorPattern)})`;
  }
  else if ( hasImage ){
    styles['--layout-section-bg-url'] = `url(${Image.source_url})`;
  } else if ( attributes.hasWaterColor ) {
    styles['--layout-section-bg-url'] = `url(${BlockSettings.getWatercolor(attributes.waterColorColor, attributes.waterColorPattern)})`;
  }
  if ( hasImage && attributes.imageFilm && attributes.imageFilmPercent ) {
    styles['--layout-section-bg-darken'] = attributes.imageFilmPercent;
  }
  if ( attributes.floatWidth ) {
    styles['--layout-section-float-max-width'] = `${attributes.floatWidth}%`;
  }
  if ( hasImage && attributes.imageBrandFilm && attributes.imageBrandFilmOpacity ) {
    styles['--layout-section-colored-film-opacity'] = `.${attributes.imageBrandFilmOpacity}`;
  }
  if ( hasImage && attributes.imageBrandFilm && attributes.imageBrandFilmColor ) {
    styles['--layout-section-colored-film'] = `var(--${attributes.imageBrandFilmColor})`;
  }

  const blockProps = useBlockProps( {
    className: classes,
    style: styles
  } );

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  // set up background color picker
  const onColorChange = (value) => {
    setAttributes( {backgroundColor: value ? value: {} } );
  }

  // set up image picker
  const onSelectImage = (image) => {
    setAttributes({imageId: image.id});
  }
  const onRemoveImage = () => {
    setAttributes({imageId: 0});
  }

  // set up gutter options
  const gutterOptions = [
    {label: 'None', value: 'none'},
    {label: 'Narrow', value: 'narrow'},
    {label: 'Normal', value: ''}
  ];
  let gutterValue = '';
  if (!attributes.useGutters) {
    gutterValue = 'none';
  } else if (attributes.gutterModifier) {
    gutterValue = attributes.gutterModifier;
  }
  const onGutterChange = (value) => {
    if (value === 'none') {
      setAttributes({useGutters: false, gutterModifier: ''});
    } else {
      setAttributes({useGutters: true, gutterModifier: value});
    }
  };

  const imageTextColorOptions = [
    {label: 'Standard', value: ''},
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'}
  ]

  const waterColorColors = [
    {label: 'Blue', value: 'blue'},
    {label: 'Gold', value: 'gold'}
  ];

  const widthOptions = [
    {label: 'Default', value: ''},
    {label: 'Full Screen', value: 'full-width'},
    {label: 'Float Left on Desktop', value: 'float-left'},
    {label: 'Float Right on Desktop', value: 'float-right'}
  ];

  // set up image film color picker
  const filmColors = BlockSettings.getBlockColors('layout-section').map(c => Object({name: c.title, slug: c.id, color: c.hex}));
  const filmColorValue = (filmColors.find(c => c.slug === attributes.imageBrandFilmColor) || {}).color || '';
  const onFilmColorChange = (value) => {
    const imageBrandFilmColor = (filmColors.find(c => c.color === value) || {}).slug || '';
    setAttributes( {imageBrandFilmColor } );
  }

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${color.slug}
          colors=${backgroundColors}
          buttonLabel="Change Background Color"
          popoverTitle="Background Color Options"
        />
        <${ToolbarButton}
          icon=${UCDIcons.renderPublic('fa-droplet-slash')}
          onClick=${ () => {setAttributes({'disableForceContrast': !attributes.disableForceContrast})}}
          isPressed=${attributes.disableForceContrast}
          label="Disables forced contrast"
        />
        <${ToolbarButton}
          icon=${UCDIcons.renderPublic('fa-moon')}
          onClick=${ () => {setAttributes({'darkBackground': !attributes.darkBackground})}}
          isPressed=${attributes.darkBackground}
          label="Apply dark-background class"
        />
      </${BlockControls}>
      <${InspectorControls}>
      <${PanelBody} title="Background Image">
        <${ImagePicker}
          notPanel
          imageId=${attributes.imageId}
          image=${Image}
          onSelect=${onSelectImage}
          onRemove=${onRemoveImage}
          defaultImageId=${0}
          helpText=""
          />
        ${hasImage && html`
        <div style=${{marginTop: '1rem'}}>
          <${SelectControl}
            label="Text Color"
            value=${attributes.imageTextColor}
            options=${imageTextColorOptions}
            onChange=${imageTextColor => setAttributes({imageTextColor})}
          />
        </div>
        `}
        ${hasImage && html`
          <div style=${{marginTop: '1rem'}}>
            <${ToggleControl}
              label="Darken Image"
              checked=${attributes.imageFilm}
              onChange=${() => setAttributes({imageFilm: !attributes.imageFilm, imageBrandFilm: false})}
            />
            ${attributes.imageFilm && html`
              <div style=${{marginTop: '1rem'}}>
                <${RangeControl}
                  label="Darken Amount"
                  value=${attributes.imageFilmPercent || 25}
                  min=${5}
                  max=${100}
                  step=${5}
                  onChange=${imageFilmPercent => setAttributes({imageFilmPercent})}
                />
              </div>
            `}
            <${ToggleControl}
              label="Apply Brand Color Film"
              checked=${attributes.imageBrandFilm}
              onChange=${() => setAttributes({imageBrandFilm: !attributes.imageBrandFilm, imageFilm: false})}
            />
            ${attributes.imageBrandFilm && html`
              <div style=${{marginTop: '1rem'}}>
                <${ColorPalette}
                    colors=${ filmColors }
                    value=${ filmColorValue }
                    disableCustomColors
                    clearable
                    onChange=${ onFilmColorChange }
                    />
                <${RangeControl}
                  label="Film Opacity"
                  value=${attributes.imageBrandFilmOpacity || 25}
                  min=${5}
                  max=${100}
                  step=${5}
                  onChange=${imageBrandFilmOpacity => setAttributes({imageBrandFilmOpacity})}
                />
              </div>
            `}
          </div>
        `}
        </${PanelBody}>
        <${PanelBody} title="Watercolor Effect">
          <${ToggleControl}
            label="Add Watercolor"
            checked=${attributes.hasWaterColor}
            onChange=${() => setAttributes({hasWaterColor: !attributes.hasWaterColor})}
          />
          ${attributes.hasWaterColor && html`
            <${SelectControl}
              label="Color"
              value=${attributes.waterColorColor}
              options=${waterColorColors}
              onChange=${waterColorColor => setAttributes({waterColorColor})}
            />
          `}
        </${PanelBody}>
        <${PanelBody} title="Section Layout">
          <${SelectControl}
            label="Gutters"
            value=${gutterValue}
            options=${gutterOptions}
            onChange=${onGutterChange}
          />
          <${SelectControl}
            label="Width"
            value=${attributes.width}
            options=${widthOptions}
            onChange=${(v) => setAttributes({'width': v})}
          />
          ${(attributes.width === 'float-left' || attributes.width === 'float-right') && html`
            <div style=${{marginTop: '1rem'}}>
              <${RangeControl}
                label="Max Width"
                value=${attributes.floatWidth}
                min=${5}
                max=${100}
                step=${1}
                onChange=${floatWidth => setAttributes({floatWidth})}
              />
            </div>
          `}
        </${PanelBody}>
      </${InspectorControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
