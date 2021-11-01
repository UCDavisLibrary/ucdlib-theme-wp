const MainComponentElement = (superClass) => class extends superClass {
  dispatchUpdate(prop){
    let detail = {}
    if ( prop ) {
      detail.propName = prop;
      detail.propValue = this[prop];
    }
    this.dispatchEvent(new CustomEvent('updated', {detail}));
  }


}
export {MainComponentElement};