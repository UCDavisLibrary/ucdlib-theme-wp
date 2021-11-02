import { html, SelectUtils } from "../../utils";
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
  TextControl
} from '@wordpress/components';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  let categories = SelectUtils.categories(attributes.showUncategorized);
  categories = categories ? categories : [];

  return html`
    <div ...${ blockProps }>
      <${InspectorControls}>
        <${PanelBody} title="Widget Settings">
          <${TextControl} 
            label="Widget Title"
            value=${attributes.title}
            onChange=${(title) => setAttributes({title})}
          />
          <${ToggleControl}
            label=${"Show 'Uncategorized' Category"}
            checked=${attributes.showUncategorized}
            onChange=${() => setAttributes({showUncategorized: !attributes.showUncategorized})}
          />
        </${PanelBody}>
      </${InspectorControls}>

      <div className="panel o-box">
        ${attributes.title && html`
          <h2 className="panel__title">${attributes.title}</h2>
        `}
        <ul className="category-filter">
          ${categories.map((c, i) => html`
            <li key=${`cat-${i}`} className="category-filter__list-item ${c.brandColor ? `category-brand--${c.brandColor}` : ''}">
              <a className="category-filter__link">${c.name}</a>
            </li>
          `)}
        </ul>
      </div>
    </div>
  `;
}
