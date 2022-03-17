import { html, SelectUtils, BlockSettings } from "../../utils";
import { ToggleControl, TextControl, ColorPalette, BaseControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useDispatch } from "@wordpress/data";

/**
 * This plugin controls metadata values for pages/posts 
 * by adding an interface to the 'Page' editor sideebar.
 * To add a new metadata field, you have to register it first in /includes/classes/meta-data.php
 */
export default () => {

  const meta = SelectUtils.meta();
  const editPost = useDispatch( 'core/editor' ).editPost;
  const isPost = SelectUtils.isPost();
  const isPage = SelectUtils.isPage();
  const colors = BlockSettings.getBlockColors('teaser').map(c => Object({name: c.title, slug: c.id, color: c.hex}));

  const getColorObject = (val, key) => {
    for (const color of colors) {
      if ( color[key] === val ) return color;
    }
    return undefined;
  }
  const getSelectedColor = () => {
    const c = getColorObject(meta.ucd_brand_color, 'slug');
    if ( !c ) return undefined;
    return c.color;
  }
  const onColorChange = (v) => {
    let c;
    if ( !v ) {
      c = ""
    } else {
      c = getColorObject(v,'color').slug;
    }
    editPost({meta: {'ucd_brand_color': c}});
  }

  return html`
    <${PluginDocumentSettingPanel}
      className="ucd-post-settings"
      title="UCD Theme Settings">
      ${isPage && html`
        <${ToggleControl} 
          label="Hide Page Title"
          checked=${meta.ucd_hide_title}
          onChange="${ucd_hide_title => {editPost({meta: {ucd_hide_title}})}}" />
      `}
      ${isPage && html`
        <${ToggleControl} 
          label="Hide Sitewide Sidebar"
          checked=${meta.ucd_hide_sidebar}
          onChange="${ucd_hide_sidebar => {editPost({meta: {ucd_hide_sidebar}})}}" />
      `}
      ${(isPage && meta.ucd_hide_sidebar) && html`
        <${ToggleControl} 
          label="Make Page Full Width"
          checked=${meta.ucd_full_width}
          onChange="${ucd_full_width => {editPost({meta: {ucd_full_width}})}}" />
      `}
      ${isPage && html`
        <${ToggleControl} 
          label="Hide Breadcrumbs"
          checked=${meta.ucd_hide_breadcrumbs}
          onChange="${ucd_hide_breadcrumbs => {editPost({meta: {ucd_hide_breadcrumbs}})}}" />
      `}
      ${isPage && html`
        <${ToggleControl} 
          label="Show Hero Image"
          checked=${meta.ucd_show_hero}
          onChange="${ucd_show_hero => {editPost({meta: {ucd_show_hero}})}}" />
      `}
      ${isPost && html`
        <${ToggleControl} 
          label="Featured Post"
          checked=${meta.ucd_featured}
          help="Post teaser will have brand color background on news lists."
          onChange="${ucd_featured => {editPost({meta: {ucd_featured}})}}" />
      `}
      <${ToggleControl} 
        label="Hide Author"
        checked=${meta.ucd_hide_author}
        help="Byline for this post will be hidden site wide."
        onChange="${ucd_hide_author => {editPost({meta: {ucd_hide_author}})}}"
      />
      ${isPost && html`
        <${TextControl} 
          label="Subtitle Text"
          value=${meta.ucd_subtitle}
          onChange="${ucd_subtitle => {editPost({meta: {ucd_subtitle}})}}"
          help="Will be displayed under the post title."
        />
      `}
      <${BaseControl} 
        id="brand-color" 
        label="Brand Color"
        help="Give this post a custom decorative color."
        >
        <${ColorPalette} 
          id="brand-color"
          colors=${colors}
          value=${ getSelectedColor() }
          disableCustomColors
          clearable
          onChange=${onColorChange}
        />
      </${BaseControl}>
    </${PluginDocumentSettingPanel}>
  `;
}