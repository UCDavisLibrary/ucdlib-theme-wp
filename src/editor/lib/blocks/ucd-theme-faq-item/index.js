import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/faq-item';
const settings = {
  api_version: 2,
	title: "FAQ Item",
  parent: ["ucd-theme/faq"],
	description: "Add a question and answer to a faq section",
	icon: UCDIcons.renderBlockIcon('faq-individual'),
	category: 'text',
	keywords: [ 'question', 'answer', 'accordion', 'collapse', 'expand' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    question: {
      type: 'string',
      default: ''
    },
    listStyle: {
      type: 'string',
      default: 'accordion'
    }
  },
	edit: Edit,
  save: Save
};

export default { name, settings };
