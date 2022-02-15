import priortyLink from "../ucd-theme-priority-link";
import hooks from "./hooks";

const name = 'ucd-theme/priority-links-item';
const settings = Object.assign({
  parent: [ 'ucd-theme/priority-links' ]
}, priortyLink.settings)

export default {name, settings, hooks}