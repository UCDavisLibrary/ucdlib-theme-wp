import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";
import transformToSection from "./transform-to-section.js";

const name = 'ucd-theme/background-color';
const settings = {
  api_version: 2,
	title: "Section with a Background Color (Deprecated)",
	description: "This block has been deprecated. Please use the 'Section' block instead.",
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
    },
    float: {
      type: "string",
      default: ""
    }
  },
  edit: Edit,
  save: Save,
  transforms: {to: [transformToSection]}
};

export default { name, settings };
