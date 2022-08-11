import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/lander-nav';
const settings = {
  api_version: 2,
  title: "Lander Navigation",
  description: "Displays auto-generated navigation links for children of this post",
  icon: UCDIcons.renderBlockIcon('lander-nav'),
  category: 'ucd-query',
  keywords: [ 'navigation', 'menu' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    lookInWpMenu: {
      type: 'boolean',
      default: false
    },
    hideImage: {
      type: 'boolean',
      default: false
    },
    orderBy: {
      type: 'string',
      default: 'date'
    },
    order: {
      type: 'string',
      default: 'desc'
    }
  },
  edit: Edit
};

export default { name, settings };