import Edit from './edit';
import { separator } from '@wordpress/icons';

const name = 'ucd-theme/separator';
const settings = {
  api_version: 2,
	title: "Separator Customized",
	description: "Add a separator line with style and colors",
	icon: separator,
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
  },
	edit: Edit
};

export default { name, settings };