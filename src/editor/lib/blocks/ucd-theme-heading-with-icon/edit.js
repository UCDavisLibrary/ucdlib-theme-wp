import { html } from "../../utils";
import { ToolbarColorPicker, IconPicker, ToolbarHeaderLevel } from "../../block-components";
import { useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';
import { createRef } from "@wordpress/element";


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const iconPickerRef = createRef();

  const onIconChangeRequest = () => {
    if ( iconPickerRef.current ){
      iconPickerRef.current.openModal();
    }
  }

  // set up icon picker
  const onIconSelect = (icon) => {
    setAttributes({icon: `${icon.iconSet}:${icon.icon}`})
  }

  // set up color picker
  const onColorChange = (value) => {
    setAttributes( {brandColor: value ? value.slug : "" } );
  }

  // set up header level picker
  const onHeaderLevelChange = (level) => {
    setAttributes({headingLevel: level});
  }

  const titleClass = `panel__custom-icon ${attributes.brandColor ? attributes.brandColor : ''}`;

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${ToolbarColorPicker}
        onChange=${onColorChange}
        value=${attributes.brandColor}
        ucdBlock="heading-with-icon"/>
      <${ToolbarHeaderLevel}
        value=${attributes.headingLevel}
        onChange=${onHeaderLevelChange}
        defaultValue=${2}
      />
    </${BlockControls}>
    <${IconPicker}
      ref=${iconPickerRef}
      onChange=${onIconSelect}
      selectedIcon=${attributes.icon}
      ></${IconPicker}>
    <div className="panel--icon panel--icon-custom">
      <h2 className="panel__title">
        <ucdlib-icon style=${{cursor: 'pointer'}} icon=${attributes.icon} class=${titleClass} onClick=${ onIconChangeRequest }></ucdlib-icon>
        <${RichText}
          tagName='span'
          value=${attributes.text}
          disableLineBreaks
          allowedFormats=${ [] }
          onChange=${ (text) => setAttributes({text}) }
          placeholder='Write heading...'
        />
      </h2>
    </div>

  </div>
  `
}
