import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from './save';

const name = 'ucd-theme/faq';
const settings = {
  api_version: 2,
	title: "FAQ Section",
	description: "Add a FAQ section where the answers are collapsable ",
	icon: UCDIcons.renderBlockIcon('faq-section'),
	category: 'text',
	keywords: [ 'question', 'answer', 'accordion', 'collapse', 'expand' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    listStyle: {
      type: 'string',
      default: 'accordion'
    }
  },
	edit: Edit,
  save: Save
};

export default { name, settings };