import { html, UCDIcons } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

function ToolbarPostReset({
  postProps,
  onChange
}){

  const onSelect = (slug) => {
    onChange(postProps.filter(p => p.slug === slug)[0]);
  }

  const controls = postProps.filter(p => p.slug).map(p => {
    let control = {};

    control.onClick = () => onSelect(p.slug);

    const iconStyle = {marginRight: "5px"};
    if (p.slug === 'title') {
      control.icon = UCDIcons.render("post.title", {style:iconStyle});
      control.title = "Post Title";
    } else if (p.slug === 'thumbnail' || p.slug === 'image') {
      control.icon = UCDIcons.render("post.thumbnail", {style:iconStyle});
      control.title = "Featured Image";
    } else if (p.slug === 'excerpt') {
      control.icon = UCDIcons.render("post.excerpt", {style:iconStyle});
      control.title = "Post Excerpt";
    } else if (p.slug === 'subTitle') {
      control.icon = UCDIcons.render("post.title", {style:iconStyle});
      control.title = "Post SubTitle";
    }

    if ( p.icon ) control.icon = UCDIcons.render(p.icon, {style:iconStyle});
    if ( p.title ) control.title = p.title;
    if ( p.isDisabled ) control.isDisabled = true;

    return control;
  });

  return html`
    <${ToolbarDropdownMenu} 
      icon=${UCDIcons.render('undo')}
      label="Restore Linked Post Default Values"
      controls=${controls}
    />
  `;
}

export default ToolbarPostReset