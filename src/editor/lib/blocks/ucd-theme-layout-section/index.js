import { UCDIcons, Save } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/layout-section';
const settings = {
  api_version: 2,
	title: "Section",
	description: "Add a stylized section to the page, including a background color, image, or watercolor effect.",
	icon: UCDIcons.renderPublic('fa-section'),
	category: 'ucd-layout',
	keywords: [ 'background', 'color', 'image', 'photo' ],
  supports: {
    "html": false,
    "anchor": true,
    "customClassName": false
  },
  attributes: {
    anchor: {
      type: "string",
      default: ""
    },
    disableForceContrast: {
      type: "boolean",
      default: false
    },
    backgroundColor: {
      type: "object",
      default: {}
    },
    imageId: {
      type: "number",
      default: 0
    },
    imageFilm: {
      type: "boolean",
      default: false
    },
    imageFilmPercent: {
      type: "number",
      default: 25
    },
    imageBrandFilm:{
      type: "boolean",
      default: false
    },
    imageBrandFilmColor: {
      type: "string",
      default: ""
    },
    imageBrandFilmOpacity: {
      type: "number",
      default: 25
    },
    imageTextColor: {
      type: "string",
      default: ""
    },
    useGutters: {
      type: "boolean",
      default: true
    },
    gutterModifier: {
      type: "string",
      default: ""
    },
    hasWaterColor: {
      type: "boolean",
      default: false
    },
    waterColorPattern: {
      type: "number",
      default: 1
    },
    waterColorColor: {
      type: "string",
      default: "blue"
    },
    width: {
      type: "string",
      default: ""
    },
    floatWidth: {
      type: "number",
      default: 33
    },
    darkBackground: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
  save: Save
};

export default { name, settings };
