import { html, UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/category-filter';
const settings = {
  api_version: 2,
	title: "Category Filter",
	description: "Display list of links to categories on this site",
	icon: UCDIcons.render("taxonomy.categories"),
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