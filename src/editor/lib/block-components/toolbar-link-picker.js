import { html, UCDIcons } from "../utils";
import { ToolbarButton, Dropdown, Button, ToggleControl } from "@wordpress/components";
import { useState } from '@wordpress/element';

// Still experimental component. Looks to be close to release though.
const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

function ToolbarLinkPicker({
  onChange,
  value,
  label,
  allowPhone,
  allowEmail
  }){

  if ( !label ) label = "Link to a Webpage";
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
  const _onChange = (v) => {
    if ( ( isEmail || isPhone ) && v && v.url ) {
      v.url = stripProtocol(v.url);
    }
    if ( isEmail && v && v.url && !v.url.startsWith('mailto:') ) {
      v.url = 'mailto:' + v.url;
    } else if ( isPhone && v && v.url && !v.url.startsWith('tel:')) {
      v.url = 'tel:' + v.url;
    }
    onChange(v)
  }

  const toggleEmail = () => {
    //remove
    if ( isEmail && hasValue && hasMailTo ) {
      value.url = value.url.slice(7);
      onChange(value);
    }
    //add
    if ( !isEmail && hasValue && !hasMailTo ) {
      setIsPhone(false);
      if ( hasTel ) value.url = value.url.slice(4);
      value.url = stripProtocol('mailto:' + value.url);
      onChange(value);
    }
    setIsEmail(!isEmail);
  }

  const togglePhone = () => {
    //remove
    if ( isPhone && hasValue && hasTel ) {
      value.url = value.url.slice(4);
      onChange(value);
    }
    //add
    if ( !isPhone && hasValue && !hasTel ) {
      setIsEmail(false);
      if ( hasMailTo ) value.url = value.url.slice(7);
      value.url = stripProtocol('tel:' + value.url);
      onChange(value);
    }
    setIsPhone(!isPhone);
  }


  const TbButton = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} isPressed=${hasValue} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${UCDIcons.render('link')} label=${label}/>
    `;
  }
  const Content = () => {
    return html`
      <div>
        <${LinkControl} value=${value} onChange=${_onChange}/>
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