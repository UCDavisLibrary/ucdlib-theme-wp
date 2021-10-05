import { html, UCDIcons } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

function ToolbarVerticalAlignPicker({
  value,
  onChange,
  defaultValue
}){

  if ( !defaultValue ) defaultValue = "top";

  const onSelect = (slug) => {
    onChange(controls.filter(c => c.slug === slug)[0]);
  }

  const controls = [
    {slug: "top", label: "Align Top"},
    {slug: "middle", label: "Align Middle"},
    {slug: "bottom", label: "Align Bottom"},
  ].map(c => {
    let out = {
      title: c.label,
      onClick: () => onSelect(c.slug)
    };
    const iconStyle = {marginRight: "5px"};

    if ( c.slug === value ){
      out.icon = UCDIcons.render("selected", {style:iconStyle});
      out.isDisabled = true;
    } else if( c.slug === defaultValue ){
      out.icon = UCDIcons.render("selected", {style:iconStyle});
      out.isDisabled = true;     
    }
    return out;
  })
  
  return html`
    <${ToolbarDropdownMenu} 
      icon=${html`<iron-icon icon="editor:vertical-align-center"></iron-icon>`}
      label="Set Vertical Alignment"
      controls=${controls}
    />
  `;
}

export default ToolbarVerticalAlignPicker;