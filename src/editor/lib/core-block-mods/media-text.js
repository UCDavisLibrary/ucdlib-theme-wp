const name = 'core/media-text';
const higherComponentName = "mediaTextCustomStyles";
const styles = [
  {value: 'margin', label: 'Standard'},
  {value: 'margin--small', label: 'Small'},
  {value: 'margin--large', label: 'Large'},
  {value: 'margin--xlarge', label: 'Extra Large'},
];
const stylesLabels = {
  panel: "Spacing",
  select: "Space between Image and Text",
  default: "Flush"
}

export default { name, higherComponentName, styles, stylesLabels };