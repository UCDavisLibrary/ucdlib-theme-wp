import { html } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/layout-container';
const settings = {
  api_version: 2,
	title: "Container",
	description: "Group similar content together into a partitioned section",
	icon: html`<iron-icon icon='work'></iron-icon>`,
	category: 'ucd-layout',
	keywords: [ "column", "content", "container" ],
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