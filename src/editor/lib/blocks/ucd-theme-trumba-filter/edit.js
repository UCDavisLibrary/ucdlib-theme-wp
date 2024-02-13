import { html } from "../../utils";
import { useBlockProps } from '@wordpress/block-editor';

export default ( ) => {
  const blockProps = useBlockProps();

  return html`
    <div ...${ blockProps }>
      <section className="brand-textbox category-brand__background category-brand--redbud">
        Trumba is no longer available.
      </section>
    </div>
  `;
}
