import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/priority-links';
const settings = {
  api_version: 2,
	title: "Priority Links",
	description: "Arrange a set of priorty links in a row",
	icon: UCDIcons.renderBlockIcon('priority-link-set'),
	category: 'ucd-layout',
	keywords: [ 'link', 'icon', 'color', 'row' ],
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