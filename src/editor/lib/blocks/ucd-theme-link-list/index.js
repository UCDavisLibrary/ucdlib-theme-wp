import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/link-list';
const settings = {
  api_version: 2,
  title: "Link List",
  description: "Link to other pages using a simple list format.",
  icon: UCDIcons.renderPublic('fa-list-ul'),
  category: 'ucd-fancy-lists',
  keywords: [ 'teaser', 'news', 'post', 'page', "link", "list", 'link', 'icon', 'color', 'text', 'inline', 'before' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    hideExcerpt: {
      type: "boolean",
      default: false
    },
    brandColor: {
      type: "string",
      default: ""
    },
    icon: {
      type: 'string',
      default: 'ucd-public:fa-circle-chevron-right'
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };
