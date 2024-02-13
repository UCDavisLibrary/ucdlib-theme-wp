import { html } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';
import { alignLeft, alignRight, alignJustify } from '@wordpress/icons';

function ToolbarFloat({
  value,
  onChange,
}){

  const onSelect = (slug) => {
    if ( slug != value ){
      onChange(controls.filter(c => c.slug === slug)[0]);
    } else {
      onChange({slug: ''})
    }

  }

  const controls = [
    {slug: "left", label: "Float Left", icon: alignLeft},
    {slug: "right", label: "Float Right", icon: alignRight}
    //{slug: "left", label: "Float Left"},
    //{slug: "right", label: "Float Right"}

  ].map(v => {
    let out = {
      slug: v.slug,
      title: v.label,
      icon: v.icon,
      onClick: () => onSelect(v.slug)
    };

    return out;
  })

  const TBIcon = () => {
    if ( value === 'left') return html`${alignLeft}`;
    if ( value === 'right') return html`${alignRight}`;
    return html`${alignJustify}`;
  }
  return html`
  <${ToolbarDropdownMenu}
    icon=${TBIcon()}
    label="Wrap text around block"
    controls=${controls}
  />
  `;
}

export default ToolbarFloat
