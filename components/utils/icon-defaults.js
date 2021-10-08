import { html } from "./html.js";

export default class UCDIcons{
  static icons = {
    title : 'bookmark',
    photo: 'editor:insert-photo',
    excerpt: "editor:text-fields",
    visibility: "visibility",
    button: "check-box-outline-blank",
    link: "link",

    selected: "check-circle",
    author: "perm-identity",

    post: {
      title: "bookmark",
      excerpt: "editor:text-fields",
      thumbnail: 'editor:insert-photo',
      link: "link"
    },

    taxonomy: {
      category: "label"
    }
  }

  static render(icon, attributes={}) {
    let i;
    try {
      i = eval(`this.icons.${icon}`);
    } catch (error) {
      console.warn(`${icon} not found: ${error}`);
      return html``;
    }
    attributes.icon = i;
    return html`<iron-icon ...${attributes}></iron-icon>`;
  }
}
