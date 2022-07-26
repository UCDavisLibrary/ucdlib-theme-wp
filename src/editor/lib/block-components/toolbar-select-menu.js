import { html, UCDIcons } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

function ToolbarSelectMenu({
  value,
  onChange,
  options,
  icon,
  label
}){
  options = options || [];

  const onSelect = (i) => {
    onChange(options[i]);
  }

  const selectedControlIndex = (() => {
    let out = null
    options.forEach((option, i) => {
      if ( option.slug === value ){
        out = i;
        return i;
      } else if ( option.title === value ) {
        out = i;
      }
    });
    return out;
  })();

  const controls = options.map((v, i) => {
    let out = {...v};
    out.onClick = () => onSelect(i); 

    if (selectedControlIndex === i ){
      out.icon = UCDIcons.render("selected", {style: {'marginRight': "5px"}});
      out.isDisabled = true;
    } 

    return out;
  })

  const buttonIcon = selectedControlIndex != null && controls[selectedControlIndex].buttonIcon != undefined ? 
    controls[selectedControlIndex].buttonIcon : 
    icon;


  return html`
    <${ToolbarDropdownMenu} 
      icon=${buttonIcon}
      label=${label ? label : ''}
      controls=${controls}
    />
  `;
}

export default ToolbarSelectMenu;