const striptags =  require('striptags');

function main() {
  let params = new URLSearchParams(window.location.search);
  let ele = document.querySelector('main > section > h1.page-title');
  ele.innerHTML = striptags(params.get('guide_name'))

  let domain = window.location.host.replace(/:.*/, '').split('.').shift();
  if( domain === 'localhost' ) domain = 'stage';

  // author link
  const authorInterval = setInterval(() => {
    if ( customElements.get('ucdlib-author-profile') ) {
      clearInterval(authorInterval);
      ele = document.querySelector('ucdlib-author-profile');
      if( ele ) {
        let contactId = params.get('contact_id');
        if ( contactId ) {
          contactId = contactId.trim();
          ele.setAttribute('domain', domain);
          ele.setAttribute('email', contactId+'@ucdavis.edu');
        } else {
          console.warn('contact_id url param not set');
        }

      }  
    }

  }, 500);


  
}

module.exports = main;