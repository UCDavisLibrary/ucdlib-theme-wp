import image from "./image";
import list from "./list";
import quote from "./quote";
import separator from "./separator";
import table from "./table";

import { addCustomStyles, unregisterStyles, defaultClassName } from "./utils";

export const coreBlockStyles = [
//  image,
  list,
  quote,
  separator,
  table
];

export const modifyCoreBlocks = () => {

  coreBlockStyles.forEach(coreBlock => {
    addCustomStyles(coreBlock);
    unregisterStyles(coreBlock);
    defaultClassName(coreBlock);
  })
}