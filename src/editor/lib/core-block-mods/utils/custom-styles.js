import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment, useEffect } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

import { html } from "../../utils";

// A little hack for getting around the wp-mandated 'is-style' class prefix on OOB custom block styles,
// which doesn't work with sitefarm class names.
// So we make our own little dropdown.
// Hopefully will not be needed in the future:
// https://github.com/WordPress/gutenberg/issues/11763
// However, the OOB custom block styles really slow things down if you have more than 2 or 3.
// So this might still be necessary
export default (coreBlock) => {
  if ( !coreBlock.higherComponentName ) return;

  addFilter(
    'editor.BlockEdit',
    `ucd/custom-style--${coreBlock.name}`,
    createHigherOrderComponent( (BlockEdit) => {
      return ( props ) => {
        const { attributes, setAttributes, isSelected } = props;
        if ( props.name != coreBlock.name ){
          return html`<${BlockEdit} ...${props} />`
        }
        const classValues = coreBlock.styles.map(c => c.value);

        let customDefault = coreBlock.styles.filter(s => s.default);
        customDefault = customDefault.length ? customDefault[0] : false;

        useEffect(() => {
          if ( customDefault && !attributes.className) {
            onChange(customDefault.value);
          }
        }, [])

        let currentValue = attributes.className ? attributes.className.split(" ") : [];
        currentValue = currentValue.filter(c => classValues.includes(c));
        currentValue = currentValue.length ? currentValue[0] : 'default';

        let panelLabel = "Styles";
        let selectLabel = "Alternative Styles";
        let defaultLabel = 'Default';
        if ( coreBlock.stylesLabels ) {
          const labels = coreBlock.stylesLabels;
          panelLabel = labels.panel ? labels.panel : panelLabel;
          selectLabel = labels.select ? labels.select : selectLabel;
          defaultLabel = labels.default ? labels.default : defaultLabel;
        }

        const onChange = (v) => {
          let classes = attributes.className ? attributes.className.split(" ") : [];
          classes = classes.filter(c => !classValues.includes(c));
          if ( v != 'default') {
            classes.push(v)
          }
          setAttributes( {className: classes.join(" ")} );
        }

        const selectOptions = (() => {
          return customDefault ? coreBlock.styles : [{value: 'default', label: defaultLabel}].concat(coreBlock.styles);
        })()

        return html`
          <${Fragment}>
            <${BlockEdit} ...${props} />
            ${isSelected && (props.name == coreBlock.name) && html`
              <${InspectorControls}>
                  <${PanelBody} title=${panelLabel}>
                    <${SelectControl}
                      label=${selectLabel}
                      value=${currentValue}
                      options=${selectOptions}
                      onChange=${onChange}
                    >
                    </${SelectControl}>
                  </${PanelBody}>
              </${InspectorControls}>
            `}
          </${Fragment}>
        `;

      }
    }, coreBlock.higherComponentName)
  );
}