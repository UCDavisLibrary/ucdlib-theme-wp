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
      default: 'https://www.facebook.com/UCDavisLibrary/'
    },
    twitterUrl: {
      type: 'string',
      default: 'https://twitter.com/UCDavisLibrary'
    },
    instagramUrl: {
      type: 'string',
      default: 'https://www.instagram.com/ucdavislibrary/'
    },
    youtubeUrl: {
      type: 'string',
      default: 'https://www.youtube.com/channel/UCRjjo_jpHml_Z3_5ctYq1lA'
    },
    linkedinUrl: {
      type: 'string',
      default: ''
    }
  },

	edit: Edit
};

export default { name, settings };