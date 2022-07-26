import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/footer-column';
const settings = {
  api_version: 2,
	title: "Footer Column",
	description: "A single footer column",
  parent: ['ucd-theme/footer-columns'],
	icon: UCDIcons.renderBlockIcon('column'),
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