import { html } from "../../utils";
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { 
  TextControl,
  ToolbarButton, 
  Dropdown,
  Modal,
  DropdownMenu,
  ToggleControl } from "@wordpress/components";
import { useRef, useEffect, useState, Fragment } from "@wordpress/element";
import {
	arrowUp,
	arrowDown,
  link,
  edit
} from '@wordpress/icons';

const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const mainEleRef = useRef();
  const blockProps = useBlockProps();

  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ focusedDataLocation, setFocusedDataLocation ] = useState( [] );

  const hasFocusedData = (() => {
    return focusedDataLocation.length > 0;
  })();

  const focusedData = (() => {
    if ( !focusedDataLocation.length ) return {};
    let accessor = "attributes.links";
    const location = focusedDataLocation;
    if ( location && location.length > 0) {
      accessor += "[" + location.join("].subItems[") + "]";
    }
    return eval(accessor);
  })()

  const onMainEleClick = (e) => {
    setFocusedDataLocation(e.detail.location);
    if ( mainEleRef.current ) {
      mainEleRef.current.renderRoot.querySelectorAll('li').forEach((e) => {
        e.style.border = '';
      })
      const selected = mainEleRef.current.renderRoot.getElementById(`nav--${e.detail.location.join("-")}`);
      selected.style.border = "2px solid rgb(6, 147, 227)";
    }

    //setModalMode('Edit');
    //setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    let mainEle = null;
    if ( mainEleRef.current ) {
      mainEleRef.current.addEventListener('item-click', onMainEleClick);
      mainEle = mainEleRef.current;
    }
    return () => {
      if ( mainEle ) {
        mainEle.removeEventListener('item-click', onMainEleClick);
      }
    };
  });

  const mainEleProps = () => {
    let p = {ref: mainEleRef};
    if ( attributes.showTitle ) p['nav-title'] = attributes.titleLabel;
    return p;
  }

  const itemControls = [
    {
      title: 'Edit Item',
      icon: 'edit',
      onClick: () => console.log( 'edit' ),
    },
    {
      title: 'Move Item Up',
      icon: arrowUp,
      onClick: () => console.log( 'up' ),
    },
    {
      title: 'Move Item Down',
      icon: arrowDown,
      onClick: () => console.log( 'up' ),
    },
    {
      title: 'Insert Above',
      icon: 'insert-before',
      onClick: () => console.log( 'insert above' ),
    },
    {
      title: 'Insert Below',
      icon: 'insert-after',
      onClick: () => console.log( 'insert below' ),
    },
    {
      title: 'Delete Item',
      icon: 'trash',
      onClick: () => console.log( 'delete' ),
    },
  ];

  const onUrlChange = (titleLink) => {
    const attrs = {titleLink};
    if ( !attributes.titleLabel && titleLink.title ) attrs['titleLabel'] = titleLink.title;
    setAttributes(attrs);
  }
  const onUrlRemove = () => {
    setAttributes({titleLink: {url: ''}});
  }
  const onTitleLabelChange = (titleLabel) => {
    setAttributes({titleLabel});
  }
  const titleButton = ({ isOpen, onToggle }) => {
    return html`
      <${ToolbarButton} onClick=${ onToggle } aria-expanded=${ isOpen } icon=${html`<span>H</span>`} label="Set menu header"/>
    `;
  }

  const titleContent = () => {
    return html`
      <div style=${{minWidth: '380px', padding: '10px'}}>
        <${ToggleControl}
          label="Show menu title"
          checked=${attributes.showTitle}
          onChange=${() => setAttributes({showTitle: !attributes.showTitle})}>
        </${ToggleControl}>
        ${ attributes.showTitle && html`
          <div>
            <${TextControl} 
              label="Text"
              value=${attributes.titleLabel}
              onChange=${onTitleLabelChange}
            />
            <div>Url</div>
            <${LinkControl} 
              onRemove=${onUrlRemove}
              value=${attributes.titleLink} 
              onChange=${onUrlChange}/>
          </div>
        `}
      </div>
    `
  }

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
      <${Dropdown} position="bottom right" renderToggle=${titleButton} renderContent=${titleContent}/>
      ${hasFocusedData && html`
        <${DropdownMenu} 
          icon=${link}
          label="Edit Selected Nav Item"
          controls=${itemControls}
        />
      `}

    </${BlockControls}>
    <ucd-theme-subnav ...${mainEleProps()}>
      <li>hello world</li>
      <li>hello world 2</li>
    </ucd-theme-subnav>

    ${modalIsOpen && html`
      <${Modal} title=${modalMode + " Nav Item"} onRequestClose=${closeModal}>
        <div>
          <div>${JSON.stringify(focusedData)}</div>
        </div>
      </${Modal}>
    `}
  </div>
  `
}