import { debounce } from 'lodash';

import { html } from "../utils";
import { useEffect, useState, useCallback } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

// A text input that delays its onChange event by the specified duration (defaults to 250ms)
function DebouncedText({
  value,
  label,
  onChange,
  duration
}){
  label = label ? label : '';
  duration = duration ? duration : 250;
  const [ textValue, setTextValue ] = useState( value );
	const onChangeDebounced = useCallback(
		debounce( () => {
			if ( value !== textValue ) {
				onChange( textValue );
			}
		}, duration ),
		[ textValue, value ]
	);
	useEffect( () => {
		onChangeDebounced();
		return onChangeDebounced.cancel;
	}, [ textValue, onChangeDebounced ] );

  return html`
    <${TextControl}
      label=${label}
      value=${textValue}
      onChange=${setTextValue}
    />
  `;
}

export default DebouncedText