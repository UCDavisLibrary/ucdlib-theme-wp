// trumba loading controller

let loadingPromise = null;

/**
 * @method ensureTrumba
 * @description ensures the trumba spuds script is loaded. Returns
 * promise the resolves on load.
 * 
 * @returns {Promise}
 */
function ensureTrumba() {
  if( loadingPromise ) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = '//www.trumba.com/scripts/spuds.js';
    script.addEventListener('load', () => resolve());
    document.head.appendChild(script);
  });

  return loadingPromise;
}

/**
 * @method loadTrumbaWidgets
 * @description given a custom element and config object,
 * loop keys in config and load trumba widgets.  Will ensure
 * global trumba js script is loaded and will only allow 
 * widgets to be loaded once
 * 
 * @param {Object} ele 
 * @param {Object} config 
 * @returns {Promise}
 */
async function loadTrumbaWidgets(ele, config) {
  if( ele._trumba_initialized ) return;
  ele._trumba_initialized = true;

  await ensureTrumba();

  for( let key in config ) {
    $Trumba.addSpud(config[key]);
  }
}

export {ensureTrumba, loadTrumbaWidgets}