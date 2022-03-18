import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/object-box';
const settings = {
  api_version: 2,
	title: "Object Box",
	description: "Box off Similar Content with Padding",
	icon: UCDIcons.renderBlockIcon('object-box'),
	category: 'ucd-layout',
	keywords: [ "box", "padding", "group" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    padding: {
      type: "string",
      default: ""
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };