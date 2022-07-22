const striptags =  require('striptags');

function main() {
  let params = new URLSearchParams(window.location.search);
  let ele = document.querySelector('main > section > h1.page-title');
  ele.innerHTML = striptags(params.get('guide_name'))

  // author link
  ele = document.querySelector('.vm-teaser__title a');
  let contactName = params.get('contact_name').toLowerCase().split(' ');
  if( contactName.length > 3 ) {
    contactName = [contactName[0], contactName.pop()];
  }
  ele.setAttribute('href', '/person/'+striptags(contactName.join('-')));
}

module.exports = main;