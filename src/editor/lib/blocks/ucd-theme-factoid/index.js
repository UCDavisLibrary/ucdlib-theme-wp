import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/factoid';
const settings = {
  api_version: 2,
	title: "Factoid",
	description: "Highlight a fact or statistic with an icon and color.",
	icon: UCDIcons.renderPublic('fa-percent'),
	category: 'ucd-links',
	keywords: [ 'link', 'icon', 'color' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    bigText: {
      type: 'string',
      default: ''
    },
    smallText: {
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
      default: 'ucd-public:fa-percent'
    },
    brandColor: {
      type: "string",
      default: ""
    },
    brackets: {
      type: "boolean",
      default: false
    }
  },
	edit: Edit
};

export default { name, settings };
