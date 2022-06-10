import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/contact-list';
const settings = {
  api_version: 2,
	title: "Contact List",
	description: "Display phone numbers, email addresses, and websites in a stylized list.",
	icon: UCDIcons.renderPublic('fa-at'),
	category: 'ucd-links',
	keywords: [ 'phone', 'email', 'website', 'social', 'media', 'link' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    
  },
  edit: Edit
};

export default { name, settings };