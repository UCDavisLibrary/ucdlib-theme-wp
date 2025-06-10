import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/link-list-item';
const settings = {
  api_version: 2,
  title: "Link List Item",
  parent: ['ucd-theme/link-list'],
  description: "List item that links to another page.",
  icon: UCDIcons.renderBlockIcon('prefixed-icon-link'),
  category: 'ucd-fancy-lists',
  keywords: [ 'teaser', 'news', 'post', 'page', "link", "list", 'link', 'icon', 'color', 'text', 'inline', 'before' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    post: {
      type: "object",
      default: {}
    },
    href: {
      type: "string",
      default: ""
    },
    newTab: {
      type: "boolean",
      default: false
    },
    title: {
      type: "string",
      default: ""
    },
    excerpt: {
      type: "string",
      default: ""
    }
  },
  edit: Edit,
};

export default { name, settings };
