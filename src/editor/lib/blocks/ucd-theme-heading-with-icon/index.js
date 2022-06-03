import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/heading-with-icon';
const settings = {
  api_version: 2,
	title: "Heading with Icon",
	description: "Add a section heading with an Icon",
	icon: UCDIcons.renderBlockIcon('heading-fancy'),
	category: 'text',
	keywords: [ 'heading', 'header', 'icon' ],
  supports: {
    "html": false,
    "anchor": true,
    "customClassName": false
  },
  attributes: {
    text: {
      type: 'string',
      default: ''
    },
    icon: {
      type: 'string',
      default: "ucd-public:fa-star"
    },
    brandColor: {
      type: 'string',
      default: ''
    },
    anchor: {
      type: "string",
      default: ""
    },
  },
	edit: Edit,
};

export default { name, settings };