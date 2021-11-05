import { html } from "../../utils";
import { ToggleControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

export default () => {
  return html`
    <${PluginDocumentSettingPanel}
      className="ucd-post-settings"
      title="UCD Theme Settings">
      <${ToggleControl} 
        label="Hide Page Title"
        onChange="${() => console.log('hello')}" />
    </${PluginDocumentSettingPanel}>
  `;
}