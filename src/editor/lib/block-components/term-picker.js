import { html, SelectUtils, getEntitiesInfo } from "../utils";
import { FormTokenField } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

function TermPicker({
  taxonomy,
  onChange,
  value
}){
  taxonomy = taxonomy ? taxonomy : '';
  const terms = SelectUtils.terms(taxonomy);
  const termsInfo = getEntitiesInfo( terms );
  console.log(taxonomy, terms);

  const normalizedValue = value ? value : [];
  const sanitizedValue = normalizedValue.reduce(
		( accumulator, termId ) => {
			const term = termInfo.mapById[ termId ];
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

  const onTermsChange = (newValue) => {
    console.log(newValue);
  }


  return html`
    <${Fragment}>
      ${terms && html`
        <${FormTokenField}
          key=${ taxonomy }
          label=${ taxonomy }
          value=${ sanitizedValue }
          suggestions=${ termsInfo.names }
          onChange=${ onTermsChange }
        />
      `}
    </${Fragment}>
  `;
}

export default TermPicker