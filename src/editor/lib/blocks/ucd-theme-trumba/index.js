import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/trumba';
const settings = {
  api_version: 2,
	title: "Trumba Calendar",
	description: "Trumba events calendar with header and tabs",
	icon: UCDIcons.renderPublic('fa-calendar-days'),
	category: 'widgets',
	keywords: [ 'trumba', 'events' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
  },
  edit: Edit
};

export default { name, settings };