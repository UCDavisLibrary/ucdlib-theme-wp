import { html, UCDIcons } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

function ToolbarSizePicker({
  value,
  onChange,
  icon,
  label
}){

  const onSelect = (slug) => {
    onChange(controls.filter(c => c.slug === slug)[0]);
  }

  const controls = [
    {slug: "flush", label: "Flush"},
    {slug: "small", label: "Small"},
    {slug: "default", label: "Medium-Small"},
    {slug: "medium", label: "Medium"},
    {slug: "large", label: "Large"},
    
  ].map(v => {
    let out = {
      slug: v.slug,
      title: v.label,
      onClick: () => onSelect(v.slug)
    };
    const iconStyle = {marginRight: "5px"};

    if ( v.slug === value ){
      out.icon = UCDIcons.render("selected", {style:iconStyle});
      out.isDisabled = true;
    } 

    return out;
  })
  return html`
    <${ToolbarDropdownMenu} 
      icon=${UCDIcons.renderBySlug(icon ? icon : 'format-size')}
      label=${label ? label : 'Set Size'}
      controls=${controls}
    />
  `;
}

export default ToolbarSizePicker;