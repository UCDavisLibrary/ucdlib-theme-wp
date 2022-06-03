import { html } from "../../utils";
import { people } from '@wordpress/icons';
import Edit from './edit';

const name = 'ucd-theme/career';
const settings = {
  api_version: 2,
	title: "Career",
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
      type: "number",
      default: 0
    },
    salaryMax: {
      type: "number",
      default: 0
    },
    salaryFrequency: {
      type: "string",
      default: ""
    },
    finalFilingDate: {
      type: "object",
      default: {}
    },
  },
  edit: Edit,
};

export default { name, settings };