import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/trumba-filters';
const settings = {
  api_version: 2,
	title: "Trumba Calendar Filters",
	description: "Free text and event filtering for trumba calendar widget",
	icon: UCDIcons.renderPublic('fa-filter'),
	category: 'widgets',
	keywords: [ 'trumba', 'events', 'filter' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
  },
  edit: Edit
};

export default { name, settings };