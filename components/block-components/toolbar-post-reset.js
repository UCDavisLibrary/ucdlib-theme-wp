import { html } from "../utils";
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
      control.icon = html`<iron-icon icon="bookmark" style=${iconStyle}></iron-icon>`;
      control.title = "Post Title";
    } else if (p.slug === 'image') {
      control.icon = html`<iron-icon icon="editor:insert-photo" style=${iconStyle}></iron-icon>`;
      control.title = "Featured Image";
    } else if (p.slug === 'excerpt') {
      control.icon = html`<iron-icon icon="editor:text-fields" style=${iconStyle}></iron-icon>`;
      control.title = "Post Excerpt";
    }

    if ( p.icon ) control.icon = p.icon;
    if ( p.title ) control.title = p.title;
    if ( p.isDisabled ) control.isDisabled = true;

    return control;
  });

  return html`
    <${ToolbarDropdownMenu} 
      icon=${html`<iron-icon icon="undo"></iron-icon>`}
      label="Restore Linked Post Default Values"
      controls=${controls}
    />
  `;
}

export default ToolbarPostReset