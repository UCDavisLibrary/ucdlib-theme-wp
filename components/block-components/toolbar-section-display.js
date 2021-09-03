import { html, UCDIcons } from "../utils";
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
      control.icon = UCDIcons.render("post.title", {style:iconStyle});
      control.title = "Title";
    } else if (s.slug === 'excerpt') {
      control.icon = UCDIcons.render("post.excerpt", {style:iconStyle});
      control.title = "Excerpt";
    } else if (s.slug === 'button') {
      control.icon = UCDIcons.render("button", {style:iconStyle});
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
      icon=${UCDIcons.render("visibility")}
      label="Hide/Show Select Sections"
      controls=${controls}
    />
  `;
}

export default ToolbarSectionDisplay;