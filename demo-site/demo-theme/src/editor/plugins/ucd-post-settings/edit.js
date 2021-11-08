import { html, SelectUtils } from "../../utils";
import { ToggleControl, TextControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useDispatch } from "@wordpress/data";

export default () => {

  const meta = SelectUtils.meta();
  const editPost = useDispatch( 'core/editor' ).editPost;
  const isPost = SelectUtils.isPost();
  const isPage = SelectUtils.isPage();

  return html`
    <${PluginDocumentSettingPanel}
      className="ucd-post-settings"
      title="UCD Theme Settings">
      ${isPage && html`
        <${ToggleControl} 
          label="Hide Page Title"
          checked=${meta.ucd_hide_title}
          onChange="${(ucd_hide_title) => {editPost({meta: {ucd_hide_title}})}}" />
      `}
      ${isPage && html`
        <${ToggleControl} 
          label="Hide Breadcrumbs"
          checked=${meta.ucd_hide_breadcrumbs}
          onChange="${(ucd_hide_breadcrumbs) => {editPost({meta: {ucd_hide_breadcrumbs}})}}" />
      `}
      ${isPost && html`
        <${TextControl} 
          label="Subtitle Text"
          value=${meta.ucd_subtitle}
          onChange="${(ucd_subtitle) => {editPost({meta: {ucd_subtitle}})}}"
          help="Will be displayed under the post title."
        />
      `}
    </${PluginDocumentSettingPanel}>
  `;
}