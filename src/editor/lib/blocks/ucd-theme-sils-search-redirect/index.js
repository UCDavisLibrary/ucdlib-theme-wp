import { html } from "../../utils";
import { search } from "@wordpress/icons";
import Edit from './edit';

const name = 'ucd-theme/sils-search-redirect';
const settings = {
  api_version: 2,
	title: "SILS Search Widget",
	description: "A form that redirects a user's search to Primo",
	icon: html`${search}`,
	category: 'ucd-sils',
	keywords: [ 'primo', 'catalog', 'search' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    darkBackground: {
      type: "boolean",
      default: false
    },
  },
  edit: Edit,
};

export default { name, settings };