import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/image-landscape';
const settings = {
  api_version: 2,
	title: "Landscape Image",
	description: "Display a basic landscape image",
	icon: UCDIcons.render("photo"),
	category: 'media',
	keywords: [ 'image', 'landscape', '4x3', '16x9' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    imageId: {
      type: "number",
      default: 0
    },
    aspectRatio: {
      type: "string",
      default: "4x3"
    },
    caption: {
      type: 'object',
      default: {}
    },
    postId: {
      type: 'number',
      default: 0
    },
    taxId: {
      type: 'number',
      default: 0
    },
    newTab: {
      type: 'boolean',
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };