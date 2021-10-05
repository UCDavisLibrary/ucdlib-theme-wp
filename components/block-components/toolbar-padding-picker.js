import { html, UCDIcons } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

function ToolbarPaddingPicker({
  value,
  onChange,
  defaultValue
}){

  if ( !defaultValue ) defaultValue = "default";
  const selectedValue = value ? value : defaultValue;

  const onSelect = (slug) => {
    onChange(controls.filter(c => c.slug === slug)[0]);
  }

  const controls = [
    {slug: "small", label: "Small", class: ".o-box--small"},
    {slug: "default", label: "Medium", class: ""},
    {slug: "large", label: "Large", class: ".o-box--large"},
    {slug: "flush", label: "None", class: ".o-box--flush"}
  ].map(v => {
    let out = {
      slug: v.slug,
      title: v.label,
      onClick: () => onSelect(v.slug)
    };
    const iconStyle = {marginRight: "5px"};

    if ( v.slug === selectedValue ){
      out.icon = UCDIcons.render("selected", {style:iconStyle});
      out.isDisabled = true;
    } 

    return out;
  })
  return html`
    <${ToolbarDropdownMenu} 
      icon=${html`<iron-icon icon="select-all"></iron-icon>`}
      label="Set Padding"
      controls=${controls}
    />
  `;
}

export default ToolbarPaddingPicker;