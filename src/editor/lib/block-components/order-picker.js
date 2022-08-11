import { html } from "../utils";
import { SelectControl, Button, ButtonGroup, BaseControl } from '@wordpress/components';

function OrderPicker({
  value,
  onChange,
  postType
}){
  postType = postType != 'post' ? 'page' : 'post';
  value = value ? value : {};

  const orderByValues = [
    {value: 'date', 'label': 'Date Published'},
    {value: 'modified', 'label': 'Date Last Modified'},
    {value: 'title', 'label': 'Post Title'}
  ];
  const postOrderByValues = [
    ...orderByValues
  ];
  const pageOrderByValues = [
    ...orderByValues,
    {value: 'menu_order', 'label': 'Menu Order'}
  ];

  const helpTextOptions = {
    textAsc: 'Sorts A to Z',
    textDesc: "Sorts Z to A",
    dateAsc: 'Sorts oldest to newest',
    dateDesc: 'Sorts newest to oldest'
  }

  const helpText = (() => {
    if ( !value.order || !value.orderBy ) return "";
    const order = value.order.charAt(0).toUpperCase() + value.order.slice(1);
    if ( ['title'].includes(value.orderBy) ) {
      return helpTextOptions[`text${order}`];
    }
    if ( ['date', 'modified'].includes(value.orderBy) ) {
      return helpTextOptions[`date${order}`];
    }
    return "";
  })();


  return html`
    <div>
      <${SelectControl} 
        label="Order By"
        value=${value.orderBy}
        options=${postType == 'post' ? postOrderByValues : pageOrderByValues}
        onChange=${(orderBy) => onChange({orderBy, order: value.order})}
      />
      <${BaseControl} help=${helpText}>
        <div style=${{paddingBottom: "4px"}}>
          <${BaseControl.VisualLabel} className="u-block">Order Direction</${BaseControl.VisualLabel}>
        </div>
        <${ButtonGroup}>
          <${Button} 
            variant="secondary"
            onClick=${() => onChange({order: 'asc', orderBy: value.orderBy})}
            isPressed=${value.order == 'asc'}>Ascending
          </${Button}>
          <${Button} 
            variant="secondary" 
            onClick=${() => onChange({order: 'desc', orderBy: value.orderBy})}
            isPressed=${value.order == 'desc'}>Descending
          </${Button}>
        </${ButtonGroup}>
      </${BaseControl}>
    </div>
  `;
}

export default OrderPicker