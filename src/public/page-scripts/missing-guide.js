const striptags =  require('striptags');

function main() {
  let params = new URLSearchParams(window.location.search);
  let ele = document.querySelector('main > section > h1.page-title');
  ele.innerHTML = striptags(params.get('guide_name'))

  let domain = window.location.host.replace(/:.*/, '').split('.').shift();
  if( domain === 'localhost' ) domain = 'stage';

  // author link
  ele = document.querySelector('ucdlib-theme-author-profile');
  if( ele ) {
    let contactId = params.get('contact_id').trim();
    ele.setAttribute('domain', domain);
    ele.setAttribute('email', contactId+'@ucdavis.edu');
  }  

  
}

module.exports = main;