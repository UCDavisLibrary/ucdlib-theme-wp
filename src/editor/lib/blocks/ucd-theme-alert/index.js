import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/alert-textbox';
const settings = {
  api_version: 2,
	title: "Alert textbox",
	description: "Alert Box that has customizable text",
	icon: UCDIcons.render('color.fill2'),
	category: 'text',
	keywords: [ "color", "section", "alert"],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    brandColor: {
      type: "string",
      default: ""
    },

  },
  edit: Edit,
  save: Save
};

export default { name, settings };