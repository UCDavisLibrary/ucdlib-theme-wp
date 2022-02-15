import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/spacer';
const settings = {
  api_version: 2,
	title: "Spacer",
	description: "Add a blank, transparent block",
	icon: UCDIcons.render('spacing.spacer'),
	category: 'ucd-layout',
	keywords: [ "space", "padding", "margin" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    x: {
      type: "string",
      default: ""
    },
    y: {
      type: "string",
      default: ""
    },
  },
  edit: Edit
};

export default { name, settings };