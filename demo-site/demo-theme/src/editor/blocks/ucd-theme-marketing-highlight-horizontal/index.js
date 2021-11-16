import { html } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/marketing-highlight-horizontal';
const settings = {
  api_version: 2,
	title: "Marketing Highlight Horizontal",
	description: "Link to another webpage with a landscape image and stylized short caption.",
	icon: html`<iron-icon icon='open-in-browser'></iron-icon>`,
	category: 'ucd-links',
	keywords: [ 'marketing', 'highlight', 'post', 'page', 'landscape', 'image' ],
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
    brandColor: {
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
    hideTitle: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };