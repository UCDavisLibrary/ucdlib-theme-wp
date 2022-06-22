import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/slideshow';
const settings = {
  api_version: 2,
	title: "Slideshow",
	description: "Display a photo gallery as a dynamic slideshow",
	icon: UCDIcons.renderPublic('fa-panorama'),
	category: 'media',
	keywords: [ 'carousel' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    hasImages: {
      type: 'boolean',
      default: false
    },
    images: {
      type: 'array',
      default: []
    }
  },
  edit: Edit
};

export default { name, settings };