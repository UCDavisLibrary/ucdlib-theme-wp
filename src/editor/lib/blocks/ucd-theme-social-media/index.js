import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/social-media';
const settings = {
  api_version: 2,
	title: "Social Media",
	description: "Add social media links",
	icon: UCDIcons.renderBlockIcon('social-link'),
	category: 'ucd-links',
	keywords: [ 'link', 'social', 'media', 'facebook', 'twitter', 'instagram', 'youtube', 'linkedin' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    facebookUrl: {
      type: 'string',
      default: ''
    },
    twitterUrl: {
      type: 'string',
      default: ''
    },
    instagramUrl: {
      type: 'string',
      default: ''
    },
    youtubeUrl: {
      type: 'string',
      default: ''
    },
    linkedinUrl: {
      type: 'string',
      default: ''
    }
  },

	edit: Edit
};

export default { name, settings };