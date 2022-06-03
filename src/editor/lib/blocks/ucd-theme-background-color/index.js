import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/background-color';
const settings = {
  api_version: 2,
	title: "Section with a Background Color",
	description: "Create a section with a splash of color w/ optional watercolor effect.",
	icon: UCDIcons.renderBlockIcon('background-watercolor'),
	category: 'media',
	keywords: [ "watercolor", "section", "background" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    color: {
      type: "string",
      default: "light-blue"
    },
    hasWaterColor: {
      type: "boolean",
      default: false
    },
    waterColorPattern: {
      type: "number",
      default: 1
    },
    waterColorColor: {
      type: "string",
      default: "blue"
    },
    fullWidth: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };