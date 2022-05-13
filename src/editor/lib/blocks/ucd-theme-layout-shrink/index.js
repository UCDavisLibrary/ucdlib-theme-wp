import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/layout-shrink';
const settings = {
  api_version: 2,
	title: "Shrink and Center",
	description: "Place content in a centered, decreased-width container",
	icon: UCDIcons.renderBlockIcon('shrink'),
	category: 'ucd-layout',
	keywords: [ "small", 'narrow', 'center', 'middle' ],
  supports: {
    "html": false,
    "anchor": true,
    "customClassName": false
  },
  attributes: {
    width: {
      type: 'number',
      value: 0
    },
    anchor: {
      type: "string",
      default: ""
    },
    fullWidthOnMobile: {
      type: 'boolean',
      default: true
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };