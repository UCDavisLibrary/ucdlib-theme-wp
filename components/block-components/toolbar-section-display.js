import { html, iconDefaults } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

function ToolbarSectionDisplay({sections=[], onChange}){

  const onSelect = (slug) => {
    onChange(sections.filter(s => s.slug === slug)[0]);
  }

  const controls = sections.filter(s => s.slug).map(s => {
    let control = {};

    control.onClick = () => onSelect(s.slug);
    const iconStyle = {marginRight: "5px"};
    if (s.slug === 'title') {
      control.icon = html`<iron-icon icon="${iconDefaults.title}" style=${iconStyle}></iron-icon>`;
      control.title = "Title";
    } else if (s.slug === 'excerpt') {
      control.icon = html`<iron-icon icon="${iconDefaults.excerpt}" style=${iconStyle}></iron-icon>`;
      control.title = "Excerpt";
    } else if (s.slug === 'button') {
      control.icon = html`<iron-icon icon="${iconDefaults.button}" style=${iconStyle}></iron-icon>`;
      control.title = "Button";
    }

    if ( s.icon ) control.icon = html`<iron-icon icon="${s.icon}" style=${iconStyle}></iron-icon>`;
    if ( s.title ) control.title = s.title;
    if ( s.isHidden ) {
      control.title = `Show ${control.title}`;
    } else {
      control.title = `Hide ${control.title}`;
    }
    if ( s.isDisabled ) control.isDisabled = true;

    return control;
  })
  return html`
    <${ToolbarDropdownMenu} 
      icon=${html`<iron-icon icon="${iconDefaults.visibility}"></iron-icon>`}
      label="Hide/Show Select Sections"
      controls=${controls}
    />
  `;
}

export default ToolbarSectionDisplay;