import { decodeEntities } from "@wordpress/html-entities";

/**
 * Utility class for dealing with entities that are returned from Select statements
 * i.e. select('core').getEntityRecord(), select('core').getEntityRecords()
 */
export default class EntityUtils {
  
  /**
   * Returns a helper object with mapping from Objects that implement
   * the `IHasNameAndId` interface. The returned object is used for
   * integration with `FormTokenField` component.
   * TODO: move out of index
   *
   * @param {IHasNameAndId[]} entities The entities to extract of helper object.
   * @return {QueryEntitiesInfo} The object with the entities information.
   */
  static getEntitiesInfo( entities ){
    const mapping = entities?.reduce(
      ( accumulator, entity ) => {
        const { mapById, mapByName, mapBySlug, names } = accumulator;
        mapById[ entity.id ] = entity;
        mapByName[ entity.name ] = entity;
        mapBySlug[ entity.slug] = entity;
        names.push( entity.name );
        return accumulator;
      },
      { mapById: {}, mapByName: {}, mapBySlug: {}, names: [] }
    );
    return {
      entities,
      ...mapping,
    };
  };

  static decodeEntity( entity ){
    if ( !entity ) return entity;
    if ( entity.name ) entity.name = decodeEntities(entity.name);

    return entity;
  }


}