import { html, StyleUtils, UCDIcons } from "../../utils";
import { useBlockProps, BlockControls, AlignmentControl, RichText } from '@wordpress/block-editor';
import { ToolbarButton, Dropdown, ToolbarDropdownMenu } from '@wordpress/components';
import { link } from '@wordpress/icons';
import classnames from 'classnames';
import { LinkControl } from '@wordpress/block-editor';


export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  const altStyle = StyleUtils.extractStyleModifiers( blockProps.className );
  const sizeControls = [
    {title: "Small", onClick: () => {setAttributes({size: 'sm'})}},
    {title: "Medium", onClick: () => {setAttributes({size: ''})}},
    {title: "Large", onClick: () => {setAttributes({size: 'lg'})}}
  ];
  const shapeControls = [
    {icon: UCDIcons.render("shapes.square"), title: "Rectangle", onClick: () => {setAttributes({shape: ''})}},
    {icon: UCDIcons.render("shapes.circle"), title: "Round", onClick: () => {setAttributes({shape: 'round'})}}
  ];

  // set up link picker
  const onHrefChange = (value) => {
    let attrs = {
      href: value.url,
      newTab: value.opensInNewTab ? true : false,
      postId: 0
    }
    if ( value.kind == 'post-type' ){
      attrs.postId = value.id;
    } else if ( value.kind == 'taxonomy' ) {
      attrs.taxId = value.id
    }
    setAttributes(attrs);
  }

  const hrefButton = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${link} label="Add a Link"/>
    `;
  }

  const hrefContent = () => {
    const value = {url: attributes.href, opensInNewTab: attributes.newTab}
    return html`<${LinkControl} value=${value} onChange=${onHrefChange}/>`;
  }

  const buttonClasses = classnames({
    "btn": true,
    [`btn--${attributes.size}`]: attributes.size,
    [`btn--${attributes.shape}`]: attributes.shape,
    [`btn--${attributes.display}`]: attributes.display,
    'btn--primary' : !altStyle,
    [`btn--${altStyle}`]: altStyle
  });

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${Dropdown} position="bottom right" renderToggle=${hrefButton} renderContent=${hrefContent}/>
      <${ToolbarDropdownMenu} icon=${html`<span>${attributes.size ? attributes.size : 'md'}</span>`} label="Change button size" controls=${sizeControls}/>
      <${ToolbarDropdownMenu} icon=${UCDIcons.render(attributes.shape ? "shapes.circle" : "shapes.square")} label="Change button shape" controls=${shapeControls}/>
      <${ToolbarButton}
        icon=${html`<span>100%</span>`}
        onClick=${ () => {setAttributes({'display': attributes.display ? '' : 'block'})}}
        isPressed=${attributes.display ? true : false}
        label="Change width"/>
      <${AlignmentControl}
        value=${ attributes.textAlign }
        onChange=${ ( nextAlign ) => {setAttributes( { textAlign: nextAlign } );} }
      />
    </${BlockControls}>
    <p className='u-text-align--${attributes.textAlign}'>
      <a className=${buttonClasses}>
        <${RichText}
          tagName='span'
          value=${attributes.content}
          disableLineBreaks
          allowedFormats=${ [ ] }
          onChange=${ (content) => setAttributes({content}) }
          placeholder='Write text...'
          />
      </a>
    </p>
  </div>
  `;
}
