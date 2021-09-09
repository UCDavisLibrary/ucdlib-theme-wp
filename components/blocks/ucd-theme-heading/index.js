import { html } from "../../utils";
import Edit from './edit';
import styleClasses from "./styles";

const name = 'ucd-theme/heading';
const settings = {
  api_version: 2,
	title: "Section Heading",
	description: "Introduce new sections and organize content to help users understand your page structure.",
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
    anchor: {
      type: "string",
      default: ""
    }

  },
	edit: Edit,
  styles: styleClasses
};

export default { name, settings };