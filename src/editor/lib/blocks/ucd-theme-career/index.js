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
    description: {
      type: "string",
      default: ""
    },
    link: {
      type: "string",
      default: ""
    },
    datePosted: {
      type: "string",
      default: ''
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
    startFilingDateChecked: {
      type: "boolean",
      default: false
    },
    employmentType: {
      type: "string",
      default: "FULL_TIME"
    },
    isEmpty: {
      type: "boolean",
      default: false
    },
    relatedMaterials: {
      type: 'array',
      default: []
    }
  },
  edit: Edit,
};

export default { name, settings };