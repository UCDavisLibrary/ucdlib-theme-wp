import { html } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/layout-quad';
const settings = {
  api_version: 2,
	title: "Quad Layout",
	description: "Place content in 4 columns that are responsive to screen width",
	icon: html`<iron-icon icon='view-module'></iron-icon>`,
	category: 'ucd-layout',
	keywords: [ "column", "content", "quad" ],
  supports: {
    "html": false,
    "anchor": true
  },
  attributes: {
    anchor: {
      type: "string",
      default: ""
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };