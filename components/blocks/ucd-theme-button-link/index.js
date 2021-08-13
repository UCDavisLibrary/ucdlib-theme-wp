import { html } from "../../utils";
import Edit from './edit';

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
    }
  },
	edit: Edit
};

export default { name, settings };