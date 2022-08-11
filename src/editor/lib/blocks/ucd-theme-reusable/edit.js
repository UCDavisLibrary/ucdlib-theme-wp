import { html, SelectUtils } from "../../utils";
import { decodeEntities } from "@wordpress/html-entities";
import { ComboboxControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

export default ( props ) => {
  const blockProps = useBlockProps();
  const { attributes, setAttributes } = props;

  const reusableBlocks = SelectUtils.posts({context: 'view', per_page: 100, orderby: 'title', order: 'asc'}, 'wp_block');
  const options = reusableBlocks.map(b => {return {value: b.id, label: decodeEntities(b.title.raw)}})
  const [ filteredOptions, setFilteredOptions ] = useState( options );

  useEffect(() => {
    setFilteredOptions(options);
  }, [options.length])
  
  console.log(attributes.blockId);

  return html`
  <div ...${ blockProps }>
    <${ComboboxControl}
			label="Reusable Block"
			value=${ attributes.blockId }
			onChange=${ blockId => setAttributes({blockId}) }
			options=${ filteredOptions }
			onFilterValueChange=${ ( inputValue ) =>
				setFilteredOptions(
					options.filter( ( option ) =>
						option.label
							.toLowerCase()
							.startsWith( inputValue.toLowerCase() )
					)
				)
			}
		/>
  </div>
  `
}