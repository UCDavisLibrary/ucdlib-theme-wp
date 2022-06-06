import { html } from "../../utils";
import { people } from '@wordpress/icons';
import Edit from './edit';

const name = 'ucd-theme/career';
const settings = {
  api_version: 2,
	title: "Career",
  parent: [ "ucd-theme/careers" ],
	description: "Create a career section with basic job information",
	icon: html`${people}`,
	category: 'media',
	keywords: [ "job", "career" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    title: {
      type: "string",
      default: ""
    },
    link: {
      type: "string",
      default: ""
    },
    salaryMin: {
      type: "string",
      default: ""
    },
    salaryMax: {
      type: "string",
      default: ""
    },
    salaryFrequency: {
      type: "string",
      default: "HOUR"
    },
    finalFilingDate: {
      type: "string",
      default: ""
    },
  },
  edit: Edit,
};

export default { name, settings };