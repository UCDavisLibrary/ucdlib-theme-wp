import { html, BlockSettings } from "../utils";
import { ColorPalette, ToolbarButton, Popover, MenuGroup, ColorIndicator } from '@wordpress/components';
import { useState, Fragment } from '@wordpress/element';

function ToolbarColorPicker({
  buttonLabel,
  popoverTitle,
  onChange,
  colors,
  value,
  valueKey,
  ucdBlock
}){

  if ( !buttonLabel ) buttonLabel = "Apply Brand Color";
  if ( !popoverTitle ) popoverTitle = "UC Davis Colors";
  if ( !valueKey ) valueKey = 'slug';
  if ( !colors ) colors = BlockSettings.getBlockColors(ucdBlock).map(c => Object({name: c.title, slug: c.id, color: c.hex}));

  const [ isOpen, setIsOpen ] = useState( false );

	const onToggle = () => {
		setIsOpen( ( prev ) => ! prev );
	};

	const openOnArrowDown = ( event ) => {
		if ( ! isOpen && event.keyCode === DOWN ) {
			event.preventDefault();
			onToggle();
		}
	};

  const buttonIcon = () => {
    if ( value ) {
      //return html`<${ColorIndicator} colorValue=${ _value().color } />`;
      return html`<span className="component-color-indicator" style=${{background: _value().color, marginLeft: 0}}></span>`;
    }
    return html`<iron-icon icon="editor:format-color-fill"></iron-icon>`;
  }

  const getColorObject = (val, key) => {
    for (const color of colors) {
      if ( color[key] === val ) return color;
    }
    return undefined;
  }

  const _value = () => {
    if ( !value ) return undefined;
    return getColorObject(value, valueKey)
  }

  const _onChange = ( v ) => {
    onChange(getColorObject(v, 'color'));
    setIsOpen(false);
  }

  return html`
    <${Fragment}>
      <${ToolbarButton} 
        showTooltip
        onClick=${ onToggle }
        aria-haspopup="true"
        aria-expanded=${ isOpen }
        onKeyDown=${ openOnArrowDown }
        label=${ buttonLabel }
        icon=${ buttonIcon() }
      />
      ${ isOpen && html`
        <${Popover} 
          className="block-editor-duotone-control__popover" 
          headerTitle=${popoverTitle} 
          onFocusOutside=${ onToggle }>
          <${MenuGroup} label="${popoverTitle}">
          <${ColorPalette}
            colors=${ colors }
            value=${ _value() }
            disableCustomColors
            clearable
            onChange=${ _onChange }
            />
          </${MenuGroup}>
        </${Popover}>
      `}
    </${Fragment}>
  `;
}

export default ToolbarColorPicker