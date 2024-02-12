import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/alignable-promo';
const settings = {
  api_version: 2,
	title: "Alignable Promo",
	description: "Preview content on another webpage with a large section-like card.",
	icon: UCDIcons.renderPublic('fa-bullhorn'),
	category: 'ucd-cards',
	keywords: [ 'promotion', 'section', 'post', 'page', "link" ],
  supports: {
    "html": false,
    "customClassName": false
  },
  attributes: {
    imageId: {
      type: "number",
      default: 0
    },
    post: {
      type: "object",
      default: {}
    },
    href: {
      type: "string",
      default: ""
    },
    newTab: {
      type: "boolean",
      default: false
    },
    brandColor: {
      type: "string",
      default: ""
    },
    title: {
      type: "string",
      default: ""
    },
    subTitle: {
      type: "string",
      default: ""
    },
    alignment: {
      type: "string",
      default: "center"
    },
    excerpt: {
      type: "string",
      default: ""
    },
    primaryButtonText: {
      type: "string",
      default: "More Info"
    },
    secondaryButtonText: {
      type: "string",
      default: ""
    },
    secondaryButtonLink: {
      type: "string",
      default: ""
    },
    hideTitle: {
      type: "boolean",
      default: false
    },
    hideSubTitle: {
      type: "boolean",
      default: false
    },
    hideExcerpt: {
      type: "boolean",
      default: false
    },
    hidePrimaryButton: {
      type: "boolean",
      default: false
    },
    hideSecondaryButton: {
      type: "boolean",
      default: false
    }
  },
  edit: Edit,
};

export default { name, settings };
