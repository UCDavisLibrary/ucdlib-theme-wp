import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";
import transformToSection from "./transform-to-section.js";

const name = 'ucd-theme/background-image';
const settings = {
  api_version: 2,
	title: "Background Image",
	description: "Add any content on top of a background image.",
	icon: UCDIcons.renderBlockIcon('background-image'),
	category: 'media',
	keywords: [ 'post', 'page', 'banner', 'image', 'hero' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    imageId: {
      type: "number",
      default: 0
    },
    noPadding: {
      type: 'boolean',
      default: false
    },
    brandColor: {
      type: "string",
      default: ""
    },
  },
  edit: Edit,
  save: Save,
  transforms: {to: [transformToSection]}
};

export default { name, settings };
