import { html } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/layout-columns';
const settings = {
  api_version: 2,
	title: "Columns",
	description: "Arrange content into 2-4 columns",
	icon: html`<iron-icon icon='view-array'></iron-icon>`,
	category: 'ucd-layout',
	keywords: [ "grid", "column", "content", "columns" ],
  supports: {
    "html": false,
    "anchor": true
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