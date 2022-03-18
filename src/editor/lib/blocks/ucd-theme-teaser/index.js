import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/teaser';
const settings = {
  api_version: 2,
	title: "Teaser",
  parent: ['ucd-theme/teasers'],
	description: "Preview content on another webpage with a simple block. Meant to be use alongside other teasers.",
	icon: UCDIcons.renderBlockIcon('teaser'),
	category: 'ucd-cards',
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
    featured: {
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
    hideImage: {
      type: "boolean",
      default: false
    },
    hideByline: {
      type: "boolean",
      default: false
    },
    hideExcerpt: {
      type: "boolean",
      default: false
    },
    hideCategories: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };