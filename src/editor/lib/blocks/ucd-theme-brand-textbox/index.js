import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/brand-textbox';
const settings = {
  api_version: 2,
	title: "Brand textbox",
	description: "Section with a background color that can be made collapsible",
	icon: UCDIcons.render('color.fill2'),
	category: 'text',
	keywords: [ "color", "section", "background", 'collapse', 'expand', 'hide' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    brandColor: {
      type: "string",
      default: ""
    },
    collapsible: {
      type: "boolean",
      default: false
    },
    float: {
      type: "string",
      default: ""
    }

  },
  edit: Edit,
  save: Save
};

export default { name, settings };
