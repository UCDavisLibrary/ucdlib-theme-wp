const name = 'core/list';
const higherComponentName = "listCustomStyles";
const styles = [
  {value: 'list--arrow', label: 'Gold Arrow', default: true},
  {value: 'list--white-arrow', label: 'White Arrow'},
  {value: 'list--default', label: 'Black Dot'},
  {value: 'list--bordered', label: 'Border Between Items'},
  {value: 'list--pipe', label: 'Horizontal List With Pipes'},
  {value: 'list--simple', label: 'No Item Markers'},
  {value: 'list--multilevel', label: 'Multilevel'},
  {value: 'list--outline', label: 'Outline'}
];


export default { name, higherComponentName, styles };
