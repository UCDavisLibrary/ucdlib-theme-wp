import { html, UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/category-filter';
const settings = {
  apiVersion: 3,
	title: "Category Filter",
	description: "Display list of links to categories on this site",
	icon: UCDIcons.renderBlockIcon('category'),
	category: 'widgets',
	keywords: [ 'link', 'categories', 'category' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    title: {
      type: 'string',
      default: ''
    },
    showUncategorized: {
      type: "boolean",
      default: false
    }
  },
	edit: Edit
};

export default { name, settings };