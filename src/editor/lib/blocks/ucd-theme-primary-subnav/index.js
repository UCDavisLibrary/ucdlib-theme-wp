import { UCDIcons } from "../../utils";
import Edit from './edit';

const name = 'ucd-theme/primary-subnav';
const settings = {
  api_version: 2,
  title: "Primary Subnav",
  description: "Displays an auto-generated subnav for current page from its location in the primary nav",
  //icon: UCDIcons.render('link'), 
  category: 'widgets',
  keywords: [ 'navigation', 'menu' ],
  supports: {
    "html": false,
    "customClassName": false
  },
  edit: Edit
};

export default { name, settings };