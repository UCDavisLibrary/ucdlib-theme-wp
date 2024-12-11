export default () => {
  if ( !window?.location?.search ) return false;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('show-ucdlib-block-deprecation-warning');
}
