import domReady from '@wordpress/dom-ready';

/**
 * @description Register custom elements in full-site-editing iframe
 * The pattern-editing interface is an iframe, so our custom elements do not get registered
 * So we need to reload our bundle in the iframe
 * Note, this will trigger an error, but the custom elements are registered before the error
 * This is bad, but is our best option for now
 */
export default () => {
  domReady( async function () {
    let scriptPath = window?.ucdTheme?.editorScript;
    if ( !scriptPath ) return;
    let scriptUrl = new URL(scriptPath);
    scriptUrl.searchParams.set('reload', 'true');

    if ( !window.location.pathname.includes('site-editor.php') ) return;

    const maxAttempts = 10;
    let attempts = 0;
    let waitTime = 1000;
    let iframe = document.querySelector("iframe[name='editor-canvas']");
    while ( !iframe?.contentWindow && attempts < maxAttempts ) {
      attempts++;
      console.log(`Attempt ${attempts} to find iframe`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      iframe = document.querySelector("iframe[name='editor-canvas']");
      waitTime *= 2;
    }

    if ( !iframe?.contentWindow ) {
      console.error("Could not find iframe");
      return;
    }

    const script = iframe.contentWindow.document.createElement('script');
    script.src = scriptUrl.href;
    script.type = 'module';
    iframe.contentWindow.document.head.appendChild(script);
  });
}
