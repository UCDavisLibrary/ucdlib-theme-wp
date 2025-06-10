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

    if ( !window.location.pathname.includes('site-editor.php') ) return;
    let waitTime = 3000;

    do {
      let iframe = document.querySelector("iframe[name='editor-canvas']");
      if ( iframe?.contentWindow && !iframe.hasAttribute('data-ucd-script-loaded') ) {
        console.log("Found iframe, injecting script. This may trigger an error, but that's okay.");
        iframe.setAttribute('data-ucd-script-loaded', 'true');
        scriptUrl.searchParams.set('iframe-version', Date.now().toString());
        const script = iframe.contentWindow.document.createElement('script');
        script.src = scriptUrl.href;
        script.type = 'module';
        iframe.contentWindow.document.head.appendChild(script);
      }
      await new Promise(resolve => setTimeout(resolve, waitTime));

    } while (true);
  });
}
