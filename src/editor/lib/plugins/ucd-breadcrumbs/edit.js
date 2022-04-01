import { html, SelectUtils } from "../../utils";
import { ToggleControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useDispatch } from "@wordpress/data";
import { Fragment } from "@wordpress/element";

/**
 * This plugin controls how breadcrumbs are constructed for a page
 */
export default () => {

  const meta = SelectUtils.meta();
  const editPost = useDispatch( 'core/editor' ).editPost;
  const isPost = SelectUtils.isPost();

  return html`
    <${Fragment}>
      ${!isPost && html`
        <${PluginDocumentSettingPanel}
          className="ucd-breadcrumbs"
          title="Breadcrumbs">
            <${ToggleControl} 
              label="Hide Breadcrumbs"
              checked=${meta.ucd_hide_breadcrumbs}
              onChange="${ucd_hide_breadcrumbs => {editPost({meta: {ucd_hide_breadcrumbs}})}}" />
        </${PluginDocumentSettingPanel}>
      `}
    </${Fragment}>
  `;
}