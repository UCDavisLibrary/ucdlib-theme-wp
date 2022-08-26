import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/trumba-upcoming';
const settings = {
  api_version: 2,
	title: "Trumba Upcoming Events",
	description: "Basic list of upcoing events",
	icon: UCDIcons.renderPublic('fa-rectangle-list'),
	category: 'widgets',
	keywords: [ 'trumba', 'events' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    events: {
      type: 'number',
      default: 3
    }
  },
  edit: Edit
};

export default { name, settings };