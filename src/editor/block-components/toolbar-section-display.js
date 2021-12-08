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
    
    // default values
    if (s.slug === 'title') {
      control.icon = UCDIcons.render("post.title", {style:iconStyle});
      control.title = "Title";
    } else if (s.slug === 'excerpt') {
      control.icon = UCDIcons.render("post.excerpt", {style:iconStyle});
      control.title = "Excerpt";
    } else if (s.slug === 'button') {
      control.icon = UCDIcons.render("button", {style:iconStyle});
      control.title = "Button";
    } else if (s.slug === 'image') {
      control.icon = UCDIcons.render("post.thumbnail", {style:iconStyle});
      control.title = "Image";
    } else if (s.slug === 'byline') {
      control.icon = UCDIcons.render("author", {style:iconStyle});
      control.title = "Byline";
    } else if (s.slug === 'categories') {
      control.icon = UCDIcons.render("taxonomy.category", {style:iconStyle});
      control.title = "Categories";
    }

    // override default values if applicable
    if ( s.icon ) control.icon = UCDIcons.render(s.icon, {style:iconStyle});
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