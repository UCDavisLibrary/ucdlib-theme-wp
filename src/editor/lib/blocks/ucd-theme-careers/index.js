import { html } from "../../utils";
import { people } from '@wordpress/icons';
import Edit from './edit';
import Save from "./save";

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
    noPostText: {
      type: "string",
      default: "There are no open positions at this time."
    },
    lock: {
      type: "object",
      default: {
        move: true,
        remove: true
      }
    }
  },

  providesContext: {
    'ucd-theme/noPostText': 'noPostText',
  },

  edit: Edit,
  save: Save,
};

export default { name, settings };