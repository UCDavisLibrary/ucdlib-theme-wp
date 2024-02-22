import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/layout-basic';
const settings = {
  api_version: 2,
	title: "Content with Sidebar",
	description: "Arrange content side-by-side with a sidebar",
	icon: UCDIcons.renderBlockIcon('content-with-sidebar'),
	category: 'ucd-layout',
	keywords: [ "grid", "column", "content", "sidebar" ],
  supports: {
    "html": false,
    "anchor": true,
    "customClassName": false
  },
  attributes: {
    hasSecondSidebar: {
      type: "boolean",
      default: false
    },
    sideBarLocation: {
      type: "string",
      default: "right"
    },
    modifier: {
      type: "string",
      default: "flipped"
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
