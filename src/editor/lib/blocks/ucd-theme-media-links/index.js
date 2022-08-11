import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/media-links';
const settings = {
  api_version: 2,
	title: "Media Links",
	description: "Simple listings that preview content on another webpage.",
	icon: UCDIcons.renderBlockIcon('media-link-list'),
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
    }
  },

  edit: Edit,
  save: Save,
};

export default { name, settings };