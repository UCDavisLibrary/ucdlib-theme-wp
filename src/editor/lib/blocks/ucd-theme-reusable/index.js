import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/reusable';
const settings = {
  api_version: 2,
	title: "Reusable Block Widget",
	description: "Display an existing reusable block in a wordpress widget area.",
	icon: UCDIcons.renderPublic('fa-recycle'),
	category: 'widgets',
	keywords: [ ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    blockId: {
      type: 'number',
      default: 0
    }
  },
  edit: Edit
};

export default { name, settings };