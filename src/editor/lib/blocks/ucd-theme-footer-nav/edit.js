import { html } from "../../utils";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarColorPicker, ToolbarFloat, MenuPicker } from "../../block-components";
import { ToolbarButton } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';


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
  console.log(selectedMenu);

  return html`
  <div ...${ blockProps }>
    <${MenuPicker} 
      value=${attributes.menuId}
      onChange=${menuId => setAttributes({menuId})}
    />
  </div>
  `
}