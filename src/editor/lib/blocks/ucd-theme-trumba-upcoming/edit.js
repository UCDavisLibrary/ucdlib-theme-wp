import { html } from "../../utils";
import { RangeControl, PanelBody } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  return html`
    <div ...${blockProps}>
      <${InspectorControls}>
        <${PanelBody} title="Widget Settings">
          <${RangeControl} 
            label='Number of Events'
            value=${attributes.events}
            onChange=${events => setAttributes({events})}
            min="1"
            max="25"
          />
        </${PanelBody}>
      </${InspectorControls}>
      <ucdlib-trumba-events-upcoming></ucdlib-trumba-events-upcoming>
    </div>
    
  `;
}
