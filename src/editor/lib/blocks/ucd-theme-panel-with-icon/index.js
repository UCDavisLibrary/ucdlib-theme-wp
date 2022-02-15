import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/panel-with-icon';
const settings = {
  api_version: 2,
	title: "Panel With Icon",
	description: "Place content within a panel that has an icon in its title",
	icon: UCDIcons.render('icons'),
	category: 'ucd-cards',
	keywords: [ "panel", 'icon', 'color', 'box' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    icon: {
      type: "string",
      default: "wp-editor:fa-star"
    },
    href: {
      type: "string",
      default: ""
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
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };