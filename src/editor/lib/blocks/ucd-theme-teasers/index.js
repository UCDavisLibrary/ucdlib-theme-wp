import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from './save';

const name = 'ucd-theme/teasers';
const settings = {
  api_version: 2,
	title: "Teasers",
	description: "Link to other pages on this site with a preview block",
	icon: UCDIcons.renderBlockIcon('teaser-list'),
	category: 'ucd-fancy-lists',
	keywords: [ 'teaser', 'news', 'post', 'page', "link", "list" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
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
  save: Save
};

export default { name, settings };