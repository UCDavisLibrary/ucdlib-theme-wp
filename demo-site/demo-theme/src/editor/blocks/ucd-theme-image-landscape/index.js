import { html } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/image-landscape';
const settings = {
  api_version: 2,
	title: "Landscape Image",
	description: "Display a basic landscape image",
	icon: html`<iron-icon icon='camera-enhance'></iron-icon>`,
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
    }
  },
  edit: Edit,
};

export default { name, settings };