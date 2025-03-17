import { head } from "lodash";
import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/panel-with-icon';
const settings = {
  api_version: 2,
	title: "Panel With Icon",
	description: "Place content within a panel that has an icon in its title",
	icon: UCDIcons.renderBlockIcon('panel-with-icon'),
	category: 'ucd-cards',
	keywords: [ "panel", 'icon', 'color', 'box' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    icon: {
      type: "string",
      default: "ucd-public:fa-star"
    },
    href: {
      type: "string",
      default: ""
    },
    postId: {
      type: 'number',
      default: 0
    },
    taxId: {
      type: 'number',
      default: 0
    },
    moreText: {
      type: "string",
      default: "See More"
    },
    hideMoreLink: {
      type: "boolean",
      default: false
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
    padding: {
      type: "string",
      default: ""
    },
    headingLevel: {
      type: "number",
      default: 2
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };
