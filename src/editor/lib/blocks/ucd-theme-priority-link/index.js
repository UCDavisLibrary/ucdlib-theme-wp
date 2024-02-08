import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/priority-link';
const settings = {
  api_version: 2,
	title: "Priority Link",
	description: "Add a link with an icon in a colored circle",
	icon: UCDIcons.renderBlockIcon('priority-link'),
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
    },
    hideText: {
      type: "boolean",
      default: false
    },
    tiltCircle: {
      type: "boolean",
      default: false
    }
  },
	edit: Edit
};

export default { name, settings };
