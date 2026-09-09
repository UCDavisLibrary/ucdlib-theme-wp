import { html, UCDIcons } from "../utils";
import { ToolbarButton, Dropdown, Button, ToggleControl, TextControl } from "@wordpress/components";
import { LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

function ToolbarLinkPicker({
  onChange,
  value,
  label,
  icon,
  allowPhone,
  allowEmail
  }){

  if ( !label ) label = "Link to a Webpage";
  if ( !icon ) icon = UCDIcons.render('link');
  const hasValue = value && value.url;
  const hasMailTo = value.url.startsWith('mailto:');
  const hasTel = value.url.startsWith('tel:')

  const [ isPhone, setIsPhone ] = useState( hasValue && hasTel );
  const [ isEmail, setIsEmail ] = useState( hasValue && hasMailTo );

  const reset = () => {
    onChange( {url: ''});
  }

  const stripProtocol = (v) => {
    v = v.replace('http://', '').replace('https://');
    return v;
  }

  /**
   * Returns the raw email/phone text to display in the plain text input,
   * stripped of its mailto:/tel: prefix.
   *
   * @return {string} the value to show in the text control.
   */
  const getTextInputValue = () => {
    if ( !hasValue ) return '';
    if ( isEmail && hasMailTo ) return value.url.slice(7);
    if ( isPhone && hasTel ) return value.url.slice(4);
    return value.url;
  }

  /**
   * Handles changes from the plain text input used for email/phone entry,
   * prefixing the value with mailto:/tel: as appropriate.
   *
   * @param {string} text the raw email or phone number entered.
   */
  const _onChangeText = (text) => {
    let url = text;
    if ( isEmail && text && !text.startsWith('mailto:') ) {
      url = 'mailto:' + text;
    } else if ( isPhone && text && !text.startsWith('tel:') ) {
      url = 'tel:' + text;
    }
    onChange({...value, url});
  }

  const toggleEmail = () => {
    //add
    if ( !isEmail ) {
      setIsPhone(false);
      if ( hasValue && !hasMailTo ) {
        if ( hasTel ) value.url = value.url.slice(4);
        value.url = stripProtocol('mailto:' + value.url);
        onChange(value);
      }
    }
    setIsEmail(!isEmail);
  }

  const togglePhone = () => {
    //add
    if ( !isPhone ) {
      setIsEmail(false);
      if ( hasValue && !hasTel ) {
        if ( hasMailTo ) value.url = value.url.slice(7);
        value.url = stripProtocol('tel:' + value.url);
        onChange(value);
      }
    }
    setIsPhone(!isPhone);
  }


  const TbButton = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} isPressed=${hasValue} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${icon} label=${label}/>
    `;
  }
  const Content = () => {
    return html`
      <div style=${{minWidth: '360px'}}>
        ${ ( isEmail || isPhone ) ? html`
          <div style=${{marginLeft: '16px', marginRight: '16px', marginTop: '16px'}}>
            <${TextControl}
              label=${isEmail ? 'Email Address' : 'Phone Number'}
              value=${getTextInputValue()}
              onChange=${_onChangeText}
            />
          </div>
        ` : html`
          <${LinkControl} value=${value} onChange=${onChange}/>
        `}
        <div style=${{marginLeft: '16px', marginRight: '16px'}}>
          ${allowEmail && html`
            <${ToggleControl} label="Is Email Address" checked=${isEmail} onChange=${toggleEmail}/>
          `}
          ${allowPhone && html`
            <${ToggleControl} label="Is Phone Number" checked=${isPhone} onChange=${togglePhone}/>
          `}
          <${Button} variant="link" isDestructive onClick=${reset}>Reset</${Button}>

        </div>

      </div>
    `
  };

  return html`
    <${Dropdown} position="bottom right" renderToggle=${TbButton} renderContent=${Content}/>
  `;
}

export default ToolbarLinkPicker;
