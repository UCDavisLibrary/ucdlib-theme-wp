import { html, Save } from "../../utils";
import { people } from '@wordpress/icons';
import Edit from './edit';

const name = 'ucd-theme/careers';
const settings = {
  api_version: 2,
	title: "Careers",
	description: "Container to hold one or more Career sections",
	icon: html`${people}`,
	category: 'media',
	keywords: [ "job", "career" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    lock: {
      type: "object",
      default: {
        move: false,
        remove: false
      }
    },
    noPostText: {
      type: "string",
      default: "There are no open positions at this time."
    }
  },

  edit: Edit,
  save: Save,
};

export default { name, settings };
