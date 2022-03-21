import { html } from "./html.js";

export default class UCDIcons{
  static defaultIconSetName = 'wp-editor';
  static blockIconSetName = 'blocks';

  static icons = {
    title : 'wp-editor:fa-heading',
    photo: 'wp-editor:fa-image',
    excerpt: "wp-editor:fa-quote-left",
    visibility: "wp-editor:fa-eye",
    button: "wp-editor:fa-square",
    link: "wp-editor:fa-link",
    outboundLink: "wp-editor:fa-external-link-alt",
    undo: "wp-editor:fa-undo",
    highlight: "wp-editor:fa-star",
    poster: "wp-editor:fa-passport",
    posters: "wp-editor:fa-bars",
    time: "wp-editor:fa-hourglass",
    listing: "wp-editor:fa-ellipsis-h",
    search: "wp-editor:fa-search",
    icons: "wp-editor:fa-icons",

    selected: "wp-editor:fa-check-circle",
    author: "wp-editor:fa-user",

    post: {
      title: "wp-editor:fa-heading",
      excerpt: "wp-editor:fa-quote-left",
      thumbnail: 'wp-editor:fa-image',
      link: "wp-editor:fa-link"
    },

    taxonomy: {
      category: "wp-editor:fa-tag",
      categories: "wp-editor:fa-tags"
    },

    shapes: {
      square: "wp-editor:fa-square",
      circle: "wp-editor:fa-circle"
    },

    layout: {
      sidebar: "wp-editor:fa-th-list",
      column: "wp-editor:fa-square",
      columns: "wp-editor:fa-columns",
      container: "wp-editor:fa-box",
      grid: "wp-editor:fa-th-large"
    },

    spacing: {
      padding: "wp-editor:fa-vector-square",
      alignmentVertical: "wp-editor:fa-arrows-alt-v",
      spacer: "wp-editor:fa-arrows-alt"
    },

    color: {
      palette: "wp-editor:fa-palette",
      fill: "wp-editor:fa-fill",
      fill2: "wp-editor:format-color-fill"
    },

    formatting: {
      bold: "wp-editor:fa-bold"
    }
  }

  static render(icon, attributes={}) {
    let i;
    try {
      icon = icon.split('.').map(i => `'${i}'`);
      i = eval(`this.icons[${icon.join('][')}]`);
    } catch (error) {
      console.warn(`${icon} not found: ${error}`);
      return html``;
    }
    attributes.icon = i;
    return html`<ucdlib-icon ...${attributes}></ucdlib-icon>`;
  }

  static renderBlockIcon(icon, attributes={}){
    attributes.icon = `${this.blockIconSetName}:${icon}`;
    return html`<ucdlib-icon ...${attributes}></ucdlib-icon>`;
  }

  static renderBySlug(icon, attributes={}){
    if ( !icon.includes(':') ) icon = `${this.defaultIconSetName}:${icon}`;
    attributes.icon = icon;
    return html`<ucdlib-icon ...${attributes}></ucdlib-icon>`;
  }

  static renderMissing(){
    return html`<span>?</span>`;
  }
}
