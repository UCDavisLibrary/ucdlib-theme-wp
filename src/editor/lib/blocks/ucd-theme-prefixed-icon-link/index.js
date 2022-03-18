import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/prefixed-icon-link';
const settings = {
  api_version: 2,
	title: "Prefixed Icon Link",
	description: "Add a stylized link preceded by a small inline icon.",
	icon: UCDIcons.renderBlockIcon('prefixed-icon-link'),
	category: 'ucd-links',
	keywords: [ 'link', 'icon', 'color', 'text', 'inline', 'before' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    text: {
      type: 'string',
      default: ''
    },
    postId: {
      type: 'number',
      default: 0
    },
    href: {
      type: 'string',
      default: ''
    },
    newTab: {
      type: "boolean",
      default: false
    },
    taxId: {
      type: 'number',
      default: 0
    },
    icon: {
      type: 'string',
      default: 'wp-editor:fa-link' // change to chevron when we got it, and in twig macro
    },
    brandColor: {
      type: "string",
      default: ""
    }
  },
	edit: Edit
};

export default { name, settings };