import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/layout-quad';
const settings = {
  api_version: 2,
	title: "Quad Layout",
	description: "Place content in 4 columns that are responsive to screen width",
	icon: UCDIcons.renderBlockIcon('quad-layout'),
	category: 'ucd-layout',
	keywords: [ "column", "content", "quad" ],
  supports: {
    "html": false,
    "anchor": true,
    "customClassName": false
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
