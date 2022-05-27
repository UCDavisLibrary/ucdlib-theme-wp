import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/fancy-text';
const settings = {
  api_version: 2,
	title: "Fancy Text",
	description: "What a librarian sees",
	icon: UCDIcons.renderBlockIcon('button'),
	category: 'ucd-links',
	keywords: [ 'text'],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    text: {
      type: 'string',
      default: ''
    }
  },
	edit: Edit,
};

export default { name, settings };