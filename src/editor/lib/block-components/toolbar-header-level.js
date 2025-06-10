import { html } from "../utils";
import { ToolbarDropdownMenu } from '@wordpress/components';

/**
 * @description Toolbar component for selecting header level
 */
function ToolbarHeaderLevel({
  value,
  onChange,
  defaultValue,
  label
}) {
  if (!defaultValue) defaultValue = 2;
  if ( !label ) label = "Change sematic header level";
  const selectedValue = value ? value : defaultValue;

  const controls = [1, 2, 3, 4, 5, 6].map(level => {
    return {
      title: `h${level}`,
      onClick: () => onChange(level),
      isDisabled: selectedValue == level
    };
  });

  return html`
    <${ToolbarDropdownMenu}
      icon=${html`<span>h${selectedValue}</span>`}
      label=${label}
      controls=${controls}
    />
  `;
}

export default ToolbarHeaderLevel;
