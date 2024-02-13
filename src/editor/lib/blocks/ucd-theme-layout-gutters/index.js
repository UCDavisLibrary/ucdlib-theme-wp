import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/layout-gutters';
const settings = {
  api_version: 2,
	title: "Gutters",
	description: "Adds spacing to the left and right of the content.",
	icon: UCDIcons.renderPublic('fa-arrows-left-right-to-line'),
	category: 'ucd-layout',
	keywords: [ 'gutter', 'margin', 'left', 'right' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    narrow: {
      type: 'boolean',
      default: false
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };
