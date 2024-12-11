import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/object-box';
const settings = {
  api_version: 2,
	title: "Object Box",
	description: "Box off Similar Content with Padding",
	icon: UCDIcons.renderBlockIcon('object-box'),
	category: 'ucd-layout',
	keywords: [ "box", "padding", "group", "border" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    padding: {
      type: "string",
      default: ""
    },
    marginBottom: {
      type: "string",
      default: 'default'
    },
    hasBorder: {
      type: "boolean",
      default: false
    },
    borderBrandColor: {
      type: "string",
      default: "secondary"
    },
    borderColorHex: {
      type: "string",
      default: "#ffbf00"
    },
    borderStyle: {
      type: "string",
      default: "solid"
    },
    borderWidth: {
      type: "string",
      default: "1px"
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };
