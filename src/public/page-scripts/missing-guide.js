const striptags = require('striptags');

function main() {
  let params = new URLSearchParams(window.location.search);
  let ele = document.querySelector('main > section > h1.page-title');
  ele.innerHTML = striptags(params.get('guide_name'))

  // let domain = window.location.host.replace(/:.*/, '').split('.').shift();
  // if( domain === 'localhost' ) domain = 'stage';

  ele = document.querySelector('ucdlib-author-profile');
  let contactId = striptags(params.get('contact_id'));
  if ( contactId ) {
    contactId = contactId.trim();
    // ele.setAttribute('domain', domain);
    ele.setAttribute('email', contactId+'@ucdavis.edu');
  } else {
    console.warn('contact_id url param not set');
  }

  // author link
  // const authorInterval = setInterval(() => {
  //   if ( customElements.get('ucdlib-author-profile') ) {
  //     clearInterval(authorInterval);
  //     ele = document.querySelector('ucdlib-author-profile');
       
  //   }

  // }, 500);


  
}

module.exports = main;