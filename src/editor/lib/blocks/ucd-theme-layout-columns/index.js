import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/layout-columns';
const settings = {
  api_version: 2,
	title: "Columns",
	description: "Arrange content into 2-4 columns",
	icon: UCDIcons.renderBlockIcon('columns'),
	category: 'ucd-layout',
	keywords: [ "grid", "column", "content", "columns" ],
  supports: {
    "html": false,
    "anchor": true,
    "customClassName": false
  },
  attributes: {
    columnCt: {
      type: "number",
      default: 2
    },
    modifier: {
      type: "string",
      default: ""
    },
    anchor: {
      type: "string",
      default: ""
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };