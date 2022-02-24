const MainComponentElement = (superClass) => class extends superClass {

  /**
   * @method dispatchUpdate
   * @description Fires an 'updated' custom event with a standardized payload
   * @param {String} prop - The property name
   */
  dispatchUpdate(prop){
    let detail = {}
    if ( prop ) {
      detail.propName = prop;
      detail.propValue = this[prop];
    }
    this.dispatchEvent(new CustomEvent('updated', {detail}));
  }


  /**
   * @method updateSlotContent
   * @description Sets slot content (a contenteditable div) if it differs from specified property
   * We do it this way so copy/paste functionality still works
   * @param {Map} props - Property of the 'willUpdate' hook
   * @param {String} prop - A property name
   * @param {String} slotId - The id of the slot element
   * @returns {Boolean} - true if slot content was updated
   */
  updateSlotContent(props, prop, slotId){
    if (!props || !prop || !props.has(prop) || !slotId ) return false;
    let slot = this.shadowRoot.getElementById(slotId);
    if ( !slot ) return false;
    let slotted = slot.assignedNodes()[0];
    //console.log(slotted.innerText, this[prop]);
    let propValue = this[prop] ? this[prop] : '';
    if ( !slotted || slotted.innerText.trim().toLowerCase() == propValue.trim().toLowerCase()) return false;
    //console.log('changing');
    slotted.innerText = propValue;
    return true;
  }

}
export {MainComponentElement};