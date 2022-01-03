import classnames from 'classnames';

import { html, UCDIcons } from "../../utils";
import { useBlockProps,
  BlockControls,
} from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const selectedSpacing = attributes.x;

  const classes = classnames({
    "u-space-px": !selectedSpacing,
    "u-space-py": !selectedSpacing,
    [`u-space-px--${selectedSpacing}`]: selectedSpacing,
    [`u-space-py--${selectedSpacing}`]: selectedSpacing,
  });

  const blockProps = useBlockProps( {
    className: classes,
  } );


  const onSpaceChange = (v) => {
    setAttributes({x: v, y: v});
  }

  const spaceControls = [
    {slug: "small", label: ".5x"},
    {slug: "", label: "1x"},
    {slug: "medium", label: "1.5x"},
    {slug: "large", label: "2x"},
  ].map(v => {
    let out = {
      slug: v.slug,
      title: v.label,
      onClick: () => onSpaceChange(v.slug)
    };
    const iconStyle = {marginRight: "5px"};

    if ( v.slug === selectedSpacing ){
      out.icon = UCDIcons.render("selected", {style:iconStyle});
      out.isDisabled = true;
    } 

    return out;
  });

  const selectedIcon = spaceControls.find(({slug}) => slug == selectedSpacing).title;

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarDropdownMenu} 
          label="Set Space Amount"
          controls=${spaceControls}
          icon=${html`<span>${selectedIcon}</span>`}
        />
      </${BlockControls}>
    </div>
  `;
}
