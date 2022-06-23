import { html } from "../../utils";
import { mapMarker } from '@wordpress/icons';
import Edit from './edit';

const name = 'ucd-theme/google-maps';
const settings = {
  api_version: 2,
	title: "Google Maps",
	description: "Add a map for a given location",
	icon: html`${mapMarker}`,
	category: 'design',
	keywords: [ 'map', 'maps' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    width: {
      type: "string",
      default: "100%"
    },
    height: {
      type: "string",
      default: "300px"
    },
    markerLocation: {
      type: "string",
      default: "UC+Davis+Library, Davis+CA"
    }
  },
	edit: Edit
};

export default { name, settings };