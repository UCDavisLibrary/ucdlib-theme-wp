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
    postId: {
      type: 'number',
      default: 0
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
    },
    textAlign: {
      type: "string",
      default: "left"
    },
  },
	edit: Edit,
    styles: styleClasses
};

export default { name, settings };