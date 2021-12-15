import { html } from "../../utils";
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl
} from '@wordpress/components';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const mainEleProps = () => {
    let props = {};
    if ( attributes.darkBackground ) props['dark-background'] = true;
    return props;
  }

  return html`
    <div ...${ blockProps }>
      <${InspectorControls}>
        <${PanelBody} title="Widget Settings">
          <${ToggleControl}
            label=${"Background is dark"}
            checked=${attributes.darkBackground}
            onChange=${() => setAttributes({darkBackground: !attributes.darkBackground})}
          />
        </${PanelBody}>
      </${InspectorControls}>
      <ucdlib-sils-search-redirect ...${ mainEleProps() }></ucdlib-sils-search-redirect>
    </div>
  `;
}
