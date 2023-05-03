import { html } from "../../utils";
import { postList } from "@wordpress/icons";
import Edit from './edit';

const name = 'ucd-theme/recent-posts';
const settings = {
  api_version: 2,
	title: "Recent News",
	description: "Display recent news items",
	icon: html`${postList}`,
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
    author: {
      type: 'string',
      default: ''
    },
    terms: {
      type: 'object',
      default: {}
    },
    search: {
      type: 'string',
      default: ''
    },
    template: {
      type: 'string',
      default: 'teaser'
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