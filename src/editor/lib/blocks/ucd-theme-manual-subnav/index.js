import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/manual-subnav';
const settings = {
  api_version: 2,
  title: "Build Your Own Subnav",
  description: "Displays a sidebar navigation widget from links that you select.",
  icon: UCDIcons.renderBlockIcon('subnav'),
  category: 'widgets',
  keywords: [ 'navigation', 'menu', 'nav' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    links: {
      type: 'array',
      default: []
    },
    showTitle: {
      type: 'boolean',
      default: false
    },
    titleLabel: {
      type: 'string',
      default: ''
    },
    titleLink: {
      type: 'object',
      default: {}
    },
  },
  edit: Edit
};

export default { name, settings };