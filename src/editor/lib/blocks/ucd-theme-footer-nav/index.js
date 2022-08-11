import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/footer-nav';
const settings = {
  api_version: 2,
	title: "Footer Nav",
	description: "Display an existing nav menu styled like a footer menu.",
	icon: UCDIcons.renderPublic('fa-bars'),
	category: 'ucd-links',
	keywords: [ 'link', 'menu' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    menuId: {
      type: 'number',
      default: 0
    }
  },
  edit: Edit
};

export default { name, settings };