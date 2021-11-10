import { html } from "../../utils";
import Edit from './edit';
import styleClasses from "./styles";

const name = 'ucd-theme/heading';
const settings = {
  api_version: 2,
	title: "Fancy Heading",
	description: "Add a section heading with a little extra pizazz.",
	icon: html`<iron-icon icon='bookmark'></iron-icon>`,
	category: 'text',
	keywords: [ 'heading', 'header' ],
  supports: {
    "html": false,
    "anchor": true
  },
  attributes: {
    content: {
      type: 'string',
      default: ''
    },
    level: {
      type: 'number',
      default: 2
    },
    textAlign: {
      type: "string",
      default: "left"
    },
    anchor: {
      type: "string",
      default: ""
    }

  },
	edit: Edit,
  styles: styleClasses
};

export default { name, settings };