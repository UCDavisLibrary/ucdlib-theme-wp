import { html } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/layout-basic';
const settings = {
  api_version: 2,
	title: "Content with Sidebar",
	description: "Arrange content side-by-side with a sidebar",
	icon: html`<iron-icon icon='view-column'></iron-icon>`,
	category: 'ucd-layout',
	keywords: [ "grid", "column", "content", "sidebar" ],
  supports: {
    "html": false
  },
  attributes: {
    hasSecondSidebar: {
      type: "boolean",
      default: false
    },
    sideBarLocation: {
      type: "string",
      default: "left"
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };