import { UCDIcons } from "../../utils";
import Edit from './edit';
import Save from "./save";

const name = 'ucd-theme/poster-list';
const settings = {
  api_version: 2,
	title: "Poster List",
	description: "Arrange a set of poster components in a grid",
	icon: UCDIcons.renderBlockIcon('poster-list'),
	category: 'ucd-layout',
	keywords: [ 'poster', 'link', 'image', 'post', 'page', "list", "grid", "column" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
  },
  edit: Edit,
  save: Save
};

export default { name, settings };