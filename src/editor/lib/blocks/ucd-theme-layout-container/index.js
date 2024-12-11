import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/layout-container';
const settings = {
  api_version: 2,
	title: "Container",
	description: "Slightly shrinks the width of its innercontent",
	icon: UCDIcons.renderBlockIcon('container'),
	category: 'ucd-layout',
	keywords: [ "column", "content", "container" ],
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
