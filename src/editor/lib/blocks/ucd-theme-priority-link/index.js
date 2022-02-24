import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/priority-link';
const settings = {
  api_version: 2,
	title: "Priority Link",
	description: "Add a link with an icon in a colored circle",
	icon: UCDIcons.render('link'), // TODO: CHANGE ICON
	category: 'ucd-links',
	keywords: [ 'link', 'icon', 'color' ],
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
    },
    hideText: {
      type: "boolean",
      default: false
    }
  },
	edit: Edit
};

export default { name, settings };