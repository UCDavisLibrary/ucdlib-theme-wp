import { html, StyleUtils, UCDIcons } from "../../utils";
import { useBlockProps, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { ToolbarButton, Dropdown, ToolbarDropdownMenu } from '@wordpress/components';
import { link } from '@wordpress/icons';
import { useRef, useEffect } from "@wordpress/element";
import "./ucd-wp-button-link";

// Still experimental component. Looks to be close to release though.
const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  const buttonLinkRef = useRef();
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

  const onTextChange = (e) => {
    setAttributes({content: e.detail.value});
  }

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

  useEffect(() => {
    let buttonLink = null;
    if ( buttonLinkRef.current ) {
      buttonLinkRef.current.addEventListener('text-change', onTextChange);
      buttonLink = buttonLinkRef.current;
    }
    return () => {
      if ( buttonLink ) {
        buttonLink.removeEventListener('text-change', onTextChange);
      }
    };
  });

  const hrefButton = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${link} label="Add a Link"/>
    `;
  }

  const hrefContent = () => {
    const value = {url: attributes.href, opensInNewTab: attributes.newTab}
    return html`<${LinkControl} value=${value} onChange=${onHrefChange}/>`;
  }

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
    <ucd-wp-button-link 
      ref=${buttonLinkRef}
      size=${attributes.size}
      shape=${attributes.shape}
      display=${attributes.display}
      text-align=${attributes.textAlign}
      alt-style=${altStyle}
      text=${attributes.content}>
      <div slot="text" contentEditable="true"></div>
    </ucd-wp-button-link>
  </div>
  `;
}