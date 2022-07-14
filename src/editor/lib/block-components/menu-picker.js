import { html } from "../utils";
import { SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { decodeEntities } from "@wordpress/html-entities";

function MenuPicker({
  value,
  onChange
}){
  value = parseInt(value) || 0;

  const [ menuOptions, setMenuOptions ] = useState( [] );

  useEffect(() => {
    const path = '/ucd/menu';
    apiFetch( {path} ).then( 
      ( r ) => {
        setMenuOptions(r);
      }, 
      (error) => {
        console.warn('there are no menus to retrieve...');
      })
  }, []);

  const options = [
    { value: 0, label: 'Select a Menu', disabled: true },
    ...menuOptions.map(m => {return {value: m.term_id, label: decodeEntities(m.name)}})
  ]

  const _onChange = (v) => {
    onChange(parseInt(v));
  }


  return html`
    <${SelectControl} 
      label='Select a Menu'
      value=${value}
      options=${options}
      onChange=${_onChange}
    />
  `;
}

export default MenuPicker;