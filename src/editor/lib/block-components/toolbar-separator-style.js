import { html, UCDIcons } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';
import { lineDotted, lineSolid } from '@wordpress/icons';

function ToolbarSeparatorStyle({
  value,
  onChange,
  icon,
  label
}){

  const onSelect = (slug) => {
    onChange(controls.filter(c => c.slug === slug)[0]);
  }

  const controls = [
    {slug: "solid", label: "Normal"},
    {slug: "dotted", label: "Dotted"},

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
      icon=${icon && icon === 'dotted' ? html`${lineDotted}` : html`${lineSolid}` }
      label=${label ? label : 'Set Style'}
      controls=${controls}
    />
  `;
}

export default ToolbarSeparatorStyle;
