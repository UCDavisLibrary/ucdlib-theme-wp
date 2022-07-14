import { html, UCDIcons } from "../../utils";
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { MenuPicker } from "../../block-components";
import { ToolbarButton } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { decodeEntities } from "@wordpress/html-entities";


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const [ cachedMenus, cacheMenu ] = useState( {} );

  useEffect(() => {
    const v = attributes.menuId;
    if ( !v || cachedMenus[v]) return;

    const path = `/ucd/menu/${v}`;
    apiFetch( {path} ).then( 
      ( r ) => {
        const m = {...cachedMenus};
        m[v] = r;
        cacheMenu(m);
      }, 
      (error) => {
        console.warn('Unable to retrieve menu');
      })

  }, [attributes.menuId]);

  const selectedMenu = (() => {
    const m = cachedMenus[attributes.menuId];
    if ( !m ) return [];
    return m;
  })();

  return html`
  <div ...${ blockProps }>
    <${BlockControls}>
      ${selectedMenu.length > 0 && html`
        <${ToolbarButton} 
          label='Clear Menu'
          icon=${UCDIcons.renderPublic('fa-circle-minus')}
          onClick=${() => setAttributes({menuId: 0})}
        />
      `}
    </${BlockControls}>
    ${selectedMenu.length ? html`
      <div className="footer-nav">
        <ul className="menu">
          ${selectedMenu.map(m => html`
            <li key=${m.id}><a>${decodeEntities(m.title)}</a></li>
          `)}
        </ul>
      </div>
    ` : html`
      <${MenuPicker} 
        value=${attributes.menuId}
        onChange=${menuId => setAttributes({menuId})}
      />
    `}

  </div>
  `
}