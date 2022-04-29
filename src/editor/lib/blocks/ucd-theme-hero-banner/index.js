import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/hero-banner';
const settings = {
  api_version: 2,
	title: "Hero Banner",
	description: "Preview content on another webpage with text overlayed on a background image",
	icon: UCDIcons.renderBlockIcon('hero-banner'),
	category: 'ucd-cards',
	keywords: [ 'post', 'page', "link", 'banner', 'image', 'hero' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    imageId: {
      type: "number",
      default: 0
    },
    post: {
      type: "object",
      default: {}
    },
    alignment: {
      type: "string",
      default: 'left'
    },
    href: {
      type: "string",
      default: ""
    },
    newTab: {
      type: "boolean",
      default: false
    },
    brandColor: {
      type: "string",
      default: ""
    },
    title: {
      type: "string",
      default: ""
    },
    excerpt: {
      type: "string",
      default: ""
    },
    buttonText: {
      type: "string",
      default: "More Info"
    }
  },
  edit: Edit,
};

export default { name, settings };