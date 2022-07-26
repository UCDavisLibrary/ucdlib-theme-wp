import { html } from "../../utils";
import { separator } from '@wordpress/icons';
import Edit from './edit';

const name = 'ucd-theme/separator';
const settings = {
  api_version: 2,
	title: "Separator",
	description: "Add a separator line with style and colors",
	icon: html`${separator}`,
	category: 'design',
	keywords: [ 'color' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    brandColor: {
      type: "string",
      default: ""
    },
    style: {
      type: "string",
      default: ""
    },  
    marginY: {
      type: "string",
      default: ""
    }
  },
	edit: Edit
};

export default { name, settings };