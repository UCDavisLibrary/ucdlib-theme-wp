import { html } from "../../utils";
import Edit from './edit';
import styleClasses from "./styles";

const name = 'ucd-theme/button-link';
const settings = {
  api_version: 2,
	title: "Button Link",
	description: "Link to a webpage with a stylized button",
	icon: html`<iron-icon icon='exit-to-app'></iron-icon>`,
	category: 'ucd-links',
	keywords: [ 'button', 'link' ],
  supports: {
    "html": false
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
    }
  },
	edit: Edit,
    styles: styleClasses
};

export default { name, settings };