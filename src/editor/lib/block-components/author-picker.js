import { html, SelectUtils, getEntitiesInfo } from "../utils";
import { FormTokenField } from '@wordpress/components';

// Control for picking an author(s) on the site. 
// Should be used in InspectorControls
/**
 * 
 * @param {String} value - comma-separated list of author ids
 * @param {function} onChange - Function that takes a comma-separated list of author ids
 * @returns 
 */
function AuthorPicker({
  value, 
  onChange
}){
  const authorsList = SelectUtils.authors();
  const authorsInfo = getEntitiesInfo( authorsList );
  /**
	 * We need to normalize the value because the block operates on a
	 * comma(`,`) separated string value and `FormTokenFiels` needs an
	 * array.
	 */
	const normalizedValue = ! value ? [] : value.toString().split( ',' );
	// Returns only the existing authors ids. This prevents the component
	// from crashing in the editor, when non existing ids are provided.
	const sanitizedValue = normalizedValue.reduce(
		( accumulator, authorId ) => {
			const author = authorsInfo.mapById[ authorId ];
			if ( author ) {
				accumulator.push( {
					id: authorId,
					value: author.name,
				} );
			}
			return accumulator;
		},
		[]
	);

  const getIdByValue = ( entitiesMappedByName, authorValue ) => {
		const id = authorValue?.id || entitiesMappedByName[ authorValue ]?.id;
		if ( id ) return id;
	};
	const onAuthorChange = ( newValue ) => {
		const ids = Array.from(
			newValue.reduce( ( accumulator, author ) => {
				// Verify that new values point to existing entities.
				const id = getIdByValue( authorsInfo.mapByName, author );
				if ( id ) accumulator.add( id );
				return accumulator;
			}, new Set() )
		);
		onChange( ids.join(',') );
	};

  return html`
  	<${FormTokenField}
			label='Authors'
			value=${ sanitizedValue }
			suggestions=${ authorsInfo.names }
			onChange=${ onAuthorChange }
		/>
  `
}

export default AuthorPicker