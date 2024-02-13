import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/tile-link';
const settings = {
  api_version: 2,
	title: "Tile Link",
	description: "Preview content on another webpage with an image and hover description.",
	icon: UCDIcons.renderPublic('fa-circle-right'),
	category: 'ucd-cards',
	keywords: ['post', 'page', "link" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    imageId: {
      type: "number",
      default: 0
    },
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
    brandColor: {
      type: "string",
      default: "primary"
    },
    title: {
      type: "string",
      default: ""
    },
    excerpt: {
      type: "string",
      default: ""
    },
    hideTitle: {
      type: "boolean",
      default: false
    },
    hideExcerpt: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };
