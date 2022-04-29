import classnames from 'classnames';

import { html, BlockSettings } from "../../utils";
import { ToolbarColorPicker } from "../../block-components";
import { blueTints, goldTints } from "@ucd-lib/theme-sass/colors";
import { useBlockProps,
  InspectorControls,
  BlockControls,
  useInnerBlocksProps, 
} from '@wordpress/block-editor';
import { ToolbarButton, ToggleControl, PanelBody } from '@wordpress/components';
import { Fragment } from "@wordpress/element";

export default ( props ) => {
  const { attributes, setAttributes } = props;

  const classes = classnames({
    'colored-section': true,
    [`colored-section--${attributes.color}`]: true,
    'water-color': attributes.hasWaterColor
  });

  const styles = attributes.hasWaterColor ? {
    "backgroundImage": `url("${BlockSettings.getWatercolor(attributes.waterColorColor, attributes.waterColorPattern)}")`
  } : {}

  const blockProps = useBlockProps( {
    className: classes,
    style: styles
  } );

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
          onClick=${ () => {setAttributes({'fullWidth': !attributes.fullWidth})}} 
          isPressed=${attributes.fullWidth}
          label="Make width of screen"/>
      </${BlockControls}>
      <${InspectorControls}>
        <${PanelBody} title="Watercolor Effect">
          <${ToggleControl}
            label="Add Watercolor"
            checked=${attributes.hasWaterColor}
            onChange=${() => setAttributes({hasWaterColor: !attributes.hasWaterColor})}
          />
        </${PanelBody}>
      </${InspectorControls}>
      <div ...${ innerBlocksProps } >
      </div>
    </${Fragment}>
  `;
}
