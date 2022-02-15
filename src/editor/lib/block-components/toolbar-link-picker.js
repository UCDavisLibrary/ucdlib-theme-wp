import { html, UCDIcons } from "../utils";
import { ToolbarButton, Dropdown } from "@wordpress/components";

// Still experimental component. Looks to be close to release though.
const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

function ToolbarLinkPicker({
  onChange,
  value,
  label
  }){

  if ( !label ) label = "Link to a Webpage";

  const Button = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${UCDIcons.render('link')} label=${label}/>
    `;
  }
  const Content = () => {
    return html`<${LinkControl} value=${value} onChange=${onChange}/>`
  };
  
  return html`
    <${Dropdown} position="bottom right" renderToggle=${Button} renderContent=${Content}/>
  `;
}

export default ToolbarLinkPicker;