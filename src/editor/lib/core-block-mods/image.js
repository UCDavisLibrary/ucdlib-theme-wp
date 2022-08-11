const name = 'core/image';
const higherComponentName = "imageCustomStyles";
const styles = [1,2,3,4,5,6,8,9,10].map(x => {
  return {
    value: `pct-width--${x}0`, label: `${x}0%`
  }
});
const stylesLabels = {
  panel: "Percent Width of Container",
  select: "Percent",
  default: "Use Native Image Size"
}

export default { name, higherComponentName, styles, stylesLabels };