import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/footer-columns';
const settings = {
  api_version: 2,
	title: "Footer Columns",
	description: "Column layout for the site footer",
	icon: UCDIcons.renderBlockIcon('columns'),
	category: 'ucd-layout',
	keywords: [ 'link' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
  },
  edit: Edit,
  save: Save
};

export default { name, settings };