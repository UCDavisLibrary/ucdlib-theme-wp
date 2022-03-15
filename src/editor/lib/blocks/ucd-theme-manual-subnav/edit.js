import { html } from "../../utils";
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { 
  Button,
  TextControl,
  ToolbarButton, 
  Dropdown,
  Modal,
  DropdownMenu,
  ToggleControl } from "@wordpress/components";
import { useRef, useEffect, useState, Fragment } from "@wordpress/element";
import {
  addSubmenu,
	arrowUp,
	arrowDown,
  insertAfter,
  insertBefore,
  link,
  edit
} from '@wordpress/icons';

const {__experimentalLinkControl } = wp.blockEditor;
const LinkControl = __experimentalLinkControl;

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const mainEleRef = useRef();
  const blockProps = useBlockProps();
  console.log(attributes.links);

  const emptyModalData = {label: '', link: {url: ''}, subItems: []};
  const [ modalIsOpen, setModalOpen ] = useState( false );
  const [ modalMode, setModalMode ] = useState( 'Add' );
  const [ modalData, setModalData ] = useState( emptyModalData );
  const [ insertLocation, setInsertLocation ] = useState([-1]);
  const [ focusedDataLocation, setFocusedDataLocation ] = useState( [] );

  const hasFocusedData = (() => {
    return focusedDataLocation.length > 0;
  })();

  const getItemByLocation = (location) => {
    if ( !location.length ) return {};
    let accessor = "attributes.links";
    if ( location && location.length > 0) {
      accessor += "[" + location.join("].subItems[") + "]";
    }
    return eval(accessor);
  }

  const focusedData = (() => {
    return getItemByLocation(focusedDataLocation);
  })()

  // selected nav item is first in its submenu
  const focusedIsFirst = (() => {
    const last = focusedDataLocation.slice(-1)[0];
    if ( last == 0 ) return true;
    return false;
  })();

  // selected nav item is last in its submenu
  const focusedIsLast = (() => {
    const last = focusedDataLocation.slice(-1)[0];
    if ( last == undefined ) return false;
    const parent = focusedDataLocation.slice(0, -1);
    let accessor = 'attributes.links';
    parent.forEach((i, index) => {
      if ( index > 0 ) {
        accessor += `[${i}].subItems`;
      } 
    })
    if ( (eval(accessor)).length == last + 1 ) return true;
    return false;
  })()

  const modalCanSave = (() => {
    if ( 
      !modalData || 
      !modalData.label || 
      !modalData.link || 
      !modalData.link.url ) {
        return false
      }
    return true;
  })();

  const closeModal = () => {
    setModalOpen(false);
  }

  const focusNavItem = (() => {
    if ( mainEleRef.current ) {
      mainEleRef.current.renderRoot.querySelectorAll('li').forEach((e) => {
        e.style.border = '';
      })
      if ( hasFocusedData ) {
        const selected = mainEleRef.current.renderRoot.getElementById(`nav--${focusedDataLocation.join("-")}`);
        selected.style.border = "2px solid rgb(6, 147, 227)";
      }
    }
  })();

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

  const onMainEleClick = (e) => {
    setFocusedDataLocation(e.detail.location);
    setModalMode('Edit');
  }

  const mainEleProps = () => {
    let p = {ref: mainEleRef};
    if ( attributes.showTitle ) p['nav-title'] = attributes.titleLabel;
    return p;
  }

  const itemControls = [
    {
      title: 'Edit Item',
      icon: edit,
      onClick: () => onEditNavItem(),
    },
    {
      title: 'Move Item Up',
      icon: arrowUp,
      onClick: () => moveItem( 'up' ),
      isDisabled: focusedIsFirst
    },
    {
      title: 'Move Item Down',
      icon: arrowDown,
      onClick: () => moveItem( 'down' ),
      isDisabled: focusedIsLast
    },
    {
      title: 'Insert Above',
      icon: insertBefore,
      onClick: () => console.log( 'insert above' ),
    },
    {
      title: 'Insert Below',
      icon: insertAfter,
      onClick: () => console.log( 'insert below' ),
    },
    {
      title: 'Add Child Link',
      icon: addSubmenu,
      onClick: () => console.log( 'insert child' ),
    },
    {
      title: 'Delete Item',
      icon: 'trash',
      onClick: () => deleteItem(),
    },
  ];

  // moves the selected nav item
  const moveItem = (direction) => {

    let swappedItems, swappedItemLocation, swapStart
    if ( direction == 'up') {
      swappedItemLocation = focusedDataLocation.map((i, index) => {
        if ( index == focusedDataLocation.length -1 ) return i-1
        return i;
      })
      swapStart = swappedItemLocation.slice(-1)[0];
      swappedItems = [focusedData, getItemByLocation(swappedItemLocation)];
    } else {
      swappedItemLocation = focusedDataLocation.map((i, index) => {
        if ( index == focusedDataLocation.length -1 ) return i+1
        return i;
      })
      swapStart = focusedDataLocation.slice(-1)[0];
      swappedItems = [ getItemByLocation(swappedItemLocation), focusedData];
    }

    const links = [...attributes.links];
    const parent = focusedDataLocation.slice(0, -1);
    let accessor = 'links';
    parent.forEach((i, index) => {
      if ( index > 0 ) {
        accessor += `[${i}].subItems`;
      } 
    })
    eval(accessor).splice(swapStart, 2, ...swappedItems);
    setAttributes({links});
    setFocusedDataLocation(swappedItemLocation);
  }

  // deletes selected nav item from attributes
  const deleteItem = () => {
    const links = [...attributes.links];
    const parent = focusedDataLocation.slice(0, -1);
    let accessor = 'links';
    parent.forEach((i, index) => {
      if ( index > 0 ) {
        accessor += `[${i}].subItems`;
      } 
    })
    eval(accessor).splice(focusedDataLocation.slice(-1)[0], 1);
    setAttributes({links});
    setFocusedDataLocation([]);
  }

  // set up nav title options
  const onTitleUrlChange = (titleLink) => {
    const attrs = {titleLink};
    if ( !attributes.titleLabel && titleLink.title ) attrs['titleLabel'] = titleLink.title;
    setAttributes(attrs);
  }
  const onTitleUrlRemove = () => {
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

  const onModalUrlChange = (link) => {
    if (link.type == 'URL' && link.title ) delete link.title;
    const d = {...modalData, link};
    if ( !modalData.label && link.title ) d['label'] = link.title;
    setModalData(d);
  }
  const onModalUrlRemove = () => {
    setModalData({...modalData, link: emptyModalData.link});
  }
  const onModalLabelChange = (label) => {
    const d = {...modalData, label};
    setModalData(d);
  }

  const onAddNavItem = () => {
    setFocusedDataLocation([]);
    setInsertLocation([-1]);
    setModalMode('Add');
    setModalData(emptyModalData);
    setModalOpen(true);
  }

  const onEditNavItem = () => {
    setModalMode('Edit');
    setModalData(focusedData);
    setModalOpen(true);
  }

  const onModalSave = () => {
    if ( modalMode == 'Add' ) {
      if ( !insertLocation || !insertLocation.length ) return;
      const links = [...attributes.links ];
      if ( insertLocation[0] == -1 ){
        links.push({
          label: modalData.label,
          link: modalData.link,
          subItems: []
        })
      }
      setAttributes({links});
    } else {
      const links = [...attributes.links];
      const parent = focusedDataLocation.slice(0, -1);
      let accessor = 'links';
      parent.forEach((i, index) => {
        if ( index > 0 ) {
          accessor += `[${i}].subItems`;
        } 
      })
      eval(accessor).splice(focusedDataLocation.slice(-1)[0], 1, modalData);
      setAttributes({links});

    }
    setModalOpen(false);
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
              onRemove=${onTitleUrlRemove}
              value=${attributes.titleLink} 
              onChange=${onTitleUrlChange}/>
          </div>
        `}
      </div>
    `
  }

  const renderLink = (link, i) => {
    const hasChildren = link.subItems.length ? true : false;
    return html`
      ${hasChildren ? html`
        <ul link-text=${link.label} key=${i}>
          ${link.subItems.map((child, ii) => renderLink(child, `${i}--${ii}`))}
        </ul>
      ` : html`
        <li key=${`${i}-${link.label.replace(" ", '-')}`}>${link.label}</li>
      `}
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
      ${attributes.links.map((link, i) => renderLink(link, i))}
    </ucd-theme-subnav>
    <${Button} icon='plus' onClick=${onAddNavItem}>Add Nav Item</${Button}>

    ${modalIsOpen && html`
      <${Modal} title=${modalMode + " Nav Item"} onRequestClose=${closeModal}>
        <div>
          <${TextControl} 
            label="Text"
            value=${modalData.label}
            onChange=${onModalLabelChange}
          />
          <div>Url</div>
          <${LinkControl} 
            onRemove=${onModalUrlRemove}
            value=${modalData.link} 
            onChange=${onModalUrlChange}/>
          <${Button} 
            onClick=${onModalSave}
            variant='primary' 
            disabled=${!modalCanSave}>${modalMode == 'Add' ? 'Add Nav Item' : 'Save Changes'}</${Button}>
        </div>
      </${Modal}>
    `}
  </div>
  `
}