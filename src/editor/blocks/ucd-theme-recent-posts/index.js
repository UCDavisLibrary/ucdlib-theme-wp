import { html } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/recent-posts';
const settings = {
  api_version: 2,
	title: "Recent News",
	description: "Display recent news items",
	icon: html`<iron-icon icon='view-list'></iron-icon>`,
	category: 'ucd-query',
	keywords: [ 'teaser', 'news', 'post' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    postCt: {
      type: "number",
      default: 5
    },
    hideImage: {
      type: "boolean",
      default: false
    },
    hideByline: {
      type: "boolean",
      default: false
    },
    hideExcerpt: {
      type: "boolean",
      default: false
    },
    hideCategories: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };