import { html } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/marketing-highlight';
const settings = {
  api_version: 2,
	title: "Marketing Highlight",
	description: "Preview content on another webpage with an attention-grabbing card.",
	icon: html`<iron-icon icon='star'></iron-icon>`,
	category: 'ucd-cards',
	keywords: [ 'marketing', 'highlight', 'post', 'page' ],
  supports: {
    "html": false
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
    buttonText: {
      type: "string",
      default: "More Info"
    }
  },
  edit: Edit,
};

export default { name, settings };