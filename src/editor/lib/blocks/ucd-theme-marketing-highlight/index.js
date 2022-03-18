import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/marketing-highlight';
const settings = {
  api_version: 2,
	title: "Marketing Highlight",
	description: "Preview content on another webpage with an attention-grabbing card.",
	icon: UCDIcons.renderBlockIcon('marketing-highlight'),
	category: 'ucd-cards',
	keywords: [ 'marketing', 'highlight', 'post', 'page', "link" ],
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
    featured: {
      type: "boolean",
      default: false
    },
    brandColor: {
      type: "string",
      default: ""
    },
    title: {
      type: "string",
      default: ""
    },
    excerpt: {
      type: "string",
      default: ""
    },
    badge: {
      type: "string",
      default: ""
    },
    buttonText: {
      type: "string",
      default: "More Info"
    },
    hideTitle: {
      type: "boolean",
      default: false
    },
    hideBadge: {
      type: "boolean",
      default: false
    },
    hideExcerpt: {
      type: "boolean",
      default: false
    },
    hideButton: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };