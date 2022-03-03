import { html } from "./html.js";
import StyleUtils from "./styles.js";
import UCDIcons from "./icon-defaults";
import BlockSettings from "./settings.js";
import SelectUtils from "./select.js";
import Mixin from "./mixin.js";
import {MainComponentElement} from "./main-component-element.js";

/**
 * Returns a helper object with mapping from Objects that implement
 * the `IHasNameAndId` interface. The returned object is used for
 * integration with `FormTokenField` component.
 * TODO: move out of index
 *
 * @param {IHasNameAndId[]} entities The entities to extract of helper object.
 * @return {QueryEntitiesInfo} The object with the entities information.
 */
const getEntitiesInfo = ( entities ) => {
  const mapping = entities?.reduce(
    ( accumulator, entity ) => {
      const { mapById, mapByName, names } = accumulator;
      mapById[ entity.id ] = entity;
      mapByName[ entity.name ] = entity;
      names.push( entity.name );
      return accumulator;
    },
    { mapById: {}, mapByName: {}, names: [] }
  );
  return {
    entities,
    ...mapping,
  };
};

export { 
  html, 
  StyleUtils,
  BlockSettings,
  SelectUtils,
  getEntitiesInfo,
  Mixin,
  MainComponentElement,
  UCDIcons };