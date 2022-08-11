import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/media-link';
const settings = {
  api_version: 2,
	title: "Media Link",
  parent: ['ucd-theme/media-links'],
	description: "Preview content on another webpage with a simple listing.",
	icon: UCDIcons.renderBlockIcon('media-link'),
	category: 'ucd-fancy-lists',
	keywords: [ 'teaser', 'news', 'post', 'page', "link", "list" ],
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
    href: {
      type: "string",
      default: ""
    },
    newTab: {
      type: "boolean",
      default: false
    },
    title: {
      type: "string",
      default: ""
    },
    excerpt: {
      type: "string",
      default: ""
    },
    hideImage: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };