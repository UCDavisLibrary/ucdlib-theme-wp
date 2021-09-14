import { html } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/column';
const settings = {
  api_version: 2,
	title: "Column",
  parent: ["ucd-theme/layout-basic"],
	description: "A column used by layout blocks",
	icon: html`<iron-icon icon='view-carousel'></iron-icon>`,
	category: 'ucd-layout',
	keywords: [ "grid", "column", "content", "sidebar", "column" ],
  supports: {
    "html": false,
    "anchor": true,
    "reusable": false
  },
  attributes: {
    layoutClass: {
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