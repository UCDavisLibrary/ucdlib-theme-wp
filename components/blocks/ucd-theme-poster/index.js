import { html } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/poster';
const settings = {
  api_version: 2,
	title: "Poster",
	description: "Preview content on another webpage with a basic card.",
	icon: html`<iron-icon icon='editor:border-outer'></iron-icon>`,
	category: 'ucd-cards',
	keywords: [ 'poster', 'link', 'image', 'post', 'page' ],
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
    }
  },
  edit: Edit,
};

export default { name, settings };