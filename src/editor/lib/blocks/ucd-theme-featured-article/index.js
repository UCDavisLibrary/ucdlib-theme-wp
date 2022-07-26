import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/featured-article';
const settings = {
  api_version: 2,
	title: "Featured News Article",
	description: "Display a news article in a simple card",
	icon: UCDIcons.renderPublic('fa-newspaper'),
	category: 'ucd-cards',
	keywords: [ 'post', 'news', 'link' ],
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
    subTitle: {
      type: "string",
      default: ""
    }
  },
  edit: Edit,
};

export default { name, settings };