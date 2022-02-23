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
   * @description Sets slot content if it differs from specified property
   * @param {Map} props - Property of the 'willUpdate' hook
   * @param {String} prop - A property name
   * @param {String} slotId - The id of the slot element
   * @param {String} placeholder - The 'showplaceholder' property name
   * @returns {Boolean} - true if slot content was updated
   */
  updateSlotContent(props, prop, slotId, placeholder){
    if (!props || !prop || !props.has(prop) || !slotId ) return false;
    if ( placeholder ) this[placeholder] = !this[prop];
    let slot = this.shadowRoot.getElementById(slotId);
    if ( !slot ) return false;
    console.log(this[prop]);
    let slotted = slot.assignedNodes()[0];
    console.log(slotted.innerText, this[prop]);
    if ( !slotted || slotted.innerText.trim() == this[prop].trim()) return false;
    slotted.innerText = this[prop];
    return true;
  }

}
export {MainComponentElement};