/**
 * @description If in an iframe, move any ucdlib-iconset elements from the parent document into the iframe.
 * Required for ucdlib-icon to work in the editor canvas iframe
 */
wp.domReady(() => {
  // return early if not in an iframe
  if (window.top === window.self) return;
  const iconsets = window.top.document.querySelectorAll('ucdlib-iconset');
  if ( iconsets.length === 0 ) return;
  const head = document.head || document.getElementsByTagName('head')[0];
  iconsets.forEach( iconset => {
    if ( head.querySelector(`ucdlib-iconset[name="${iconset.getAttribute('name')}"]`) ) return;

    // recreate iconset. copying will break the custom element
    const newIconset = document.createElement('ucdlib-iconset');
    Array.from(iconset.attributes).forEach( attr => {
      newIconset.setAttribute(attr.name, attr.value);
    });
    newIconset.innerHTML = iconset.innerHTML;
    head.appendChild(newIconset);
  });
});



