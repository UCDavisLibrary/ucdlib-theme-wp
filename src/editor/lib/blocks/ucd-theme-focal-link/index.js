import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/focal-link';
const settings = {
  api_version: 2,
	title: "Focal Link",
	description: "Add a stylized block link with an icon",
	icon: UCDIcons.render('link'), // TODO: CHANGE ICON
	category: 'widgets',
	keywords: [ 'link', 'icon', 'color', 'text' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    text: {
      type: 'string',
      default: ''
    },
    href: {
      type: 'string',
      default: ''
    },
    postId: {
      type: 'number',
      default: 0
    },
    taxId: {
      type: 'number',
      default: 0
    },
    newTab: {
      type: "boolean",
      default: false
    },
    icon: {
      type: 'string',
      default: ''
    },
    brandColor: {
      type: "string",
      default: ""
    }
  },
	edit: Edit
};

export default { name, settings };