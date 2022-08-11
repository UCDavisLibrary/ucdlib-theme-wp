import { html, SelectUtils, EntityUtils } from "../utils";
import { FormTokenField } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

function TermPicker({
  taxonomy,
  onChange,
  value
}){
  taxonomy = taxonomy ? taxonomy : '';
  const terms = SelectUtils.terms(taxonomy).map(EntityUtils.decodeEntity);
  const termsInfo = EntityUtils.getEntitiesInfo( terms );

  const Taxonomies = EntityUtils.getEntitiesInfo(SelectUtils.taxonomies());
  const label = Taxonomies.mapBySlug && Taxonomies.mapBySlug[taxonomy] ? Taxonomies.mapBySlug[taxonomy].name : '';

  const normalizedValue = value ? value : [];
  const sanitizedValue = normalizedValue.reduce(
		( accumulator, termId ) => {
			const term = termsInfo.mapById[ termId ];
			if ( term ) {
				accumulator.push( {
					id: termId,
					value: term.name,
				} );
			}
			return accumulator;
		},
		[]
	);

  const getIdByValue = ( entitiesMappedByName, termValue ) => {
		const id = termValue?.id || entitiesMappedByName[ termValue ]?.id;
		if ( id ) return id;
	};
  const onTermsChange = (newValue) => {
    const ids = Array.from(
			newValue.reduce( ( accumulator, term ) => {
				// Verify that new values point to existing entities.
				const id = getIdByValue( termsInfo.mapByName, term );
				if ( id ) accumulator.add( id );
				return accumulator;
			}, new Set() )
		);
    onChange( {taxonomy, terms: ids} );
  }


  return html`
    <${Fragment}>
      ${terms && html`
        <${FormTokenField}
          key=${ taxonomy }
          label=${ label }
          value=${ sanitizedValue }
          suggestions=${ termsInfo.names }
          onChange=${ onTermsChange }
        />
      `}
    </${Fragment}>
  `;
}

export default TermPicker