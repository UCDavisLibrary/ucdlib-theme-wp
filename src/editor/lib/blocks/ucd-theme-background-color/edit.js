import classnames from 'classnames';

import { html, BlockSettings, showBlockDeprecationWarning } from "../../utils";
import { ToolbarColorPicker, ToolbarFloat } from "../../block-components";
import { blueTints, goldTints } from "@ucd-lib/theme-sass/colors";
import { useBlockProps,
  InspectorControls,
  BlockControls,
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import { ToolbarButton, ToggleControl, PanelBody, SelectControl } from '@wordpress/components';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    'colored-section': true,
    [`colored-section--${attributes.color}`]: true,
    'water-color': attributes.hasWaterColor
  });

  const styles = attributes.hasWaterColor ? {
    "backgroundImage": `url("${BlockSettings.getWatercolor(attributes.waterColorColor, attributes.waterColorPattern)}")`,
    "backgroundSize": 'cover'
  } : {}

  const blockProps = useBlockProps( {
    className: classes,
    style: styles
  } );

  const showDeprecationWarning = showBlockDeprecationWarning();

  const innerBlocksProps = useInnerBlocksProps( blockProps, {
    templateLock: false,
  } );

  // set up background color picker
  const onColorChange = (value) => {
    setAttributes( {color: value ? value.slug : "light-blue" } );
  }
  const backgroundColors = [
    {
      name: "Light Blue",
      slug: "light-blue",
      color: blueTints['30'].hex
    },
    {
      name: "Light Yellow",
      slug: "light-yellow",
      color: goldTints['30'].hex
    },
    {
      name: "White",
      slug: "white",
      color: "#fff"
    }
  ];
  const waterColorColors = [
    {label: 'Blue', value: 'blue'},
    {label: 'Gold', value: 'gold'}
  ];

  return html`
    <${Fragment}>
      <${BlockControls} group="block">
        <${ToolbarColorPicker}
          onChange=${onColorChange}
          value=${attributes.color}
          colors=${backgroundColors}
          buttonLabel="Change Background Color"
          popoverTitle="Background Color Options"
        />
        <${ToolbarButton}
          icon=${html`<span>100%</span>`}
          onClick=${ () => {setAttributes({'fullWidth': !attributes.fullWidth, 'float': ''})}}
          isPressed=${attributes.fullWidth}
          label="Make width of screen"
        />
        <${ToolbarFloat}
          value=${attributes.float}
          onChange=${(v) => setAttributes({'float': v.slug, 'fullWidth': false})}
        />
      </${BlockControls}>
      <${InspectorControls}>
        <${PanelBody} title="Watercolor Effect">
          <${ToggleControl}
            label="Add Watercolor"
            checked=${attributes.hasWaterColor}
            onChange=${() => setAttributes({hasWaterColor: !attributes.hasWaterColor})}
          />
          ${attributes.hasWaterColor && html`
            <${SelectControl}
              label="Color"
              value=${attributes.waterColorColor}
              options=${waterColorColors}
              onChange=${waterColorColor => setAttributes({waterColorColor})}
            />
          `}
        </${PanelBody}>
      </${InspectorControls}>
      ${showDeprecationWarning && html`
        <div className='brand-textbox category-brand--double-decker category-brand__background'>
          This block has been deprecated, and will be removed in a future release. Please use the "Section" block instead.
        </div>
      `}
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
