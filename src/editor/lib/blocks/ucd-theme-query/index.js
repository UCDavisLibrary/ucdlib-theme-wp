import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/query';
const settings = {
  api_version: 2,
	title: "All Posts",
	description: "Display a list of posts on this site based on a query you construct.",
	//icon: UCDIcons.render("time"),
	category: 'ucd-query',
	keywords: [ 'teaser', 'post', 'page', 'preview', 'filter' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    postType: {
      type: 'array',
      default: ['post']
    },
    author: {
      type: 'string',
      default: ''
    },
    terms: {
      type: 'object',
      default: {}
    }
  },
  edit: Edit,
};

export default { name, settings };