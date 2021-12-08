import { UCDIcons } from "../../utils";
import Edit from './edit';
import styleClasses from "./styles";

const name = 'ucd-theme/button-link';
const settings = {
  api_version: 2,
	title: "Button Link",
	description: "Link to a webpage with a stylized button",
	icon: UCDIcons.render("outboundLink"),
	category: 'ucd-links',
	keywords: [ 'button', 'link' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    content: {
      type: 'string',
      default: ''
    },
    href: {
      type: 'string',
      default: ""
    },
    newTab: {
      type: 'boolean',
      default: false
    },
    size: {
      type: 'string',
      default: ""
    },
    shape: {
      type: 'string',
      default: ''
    },
    display: {
      type: 'string',
      default: ''
    },
    className: {
      type: "string",
      default: ""
    }
  },
	edit: Edit,
    styles: styleClasses
};

export default { name, settings };