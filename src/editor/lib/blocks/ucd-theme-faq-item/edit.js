import { html } from "../../utils";
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  const classes = classnames({
    [`list--${attributes.listStyle}`]: true,
  });

  return html`
  <div ...${ blockProps }>
    <ul className=${classes}>
      <li>
        <${RichText}
          tagName="div"
          value=${attributes.question}
          onChange=${(v) => setAttributes({question: v})}
          withoutInteractiveFormatting
          allowedFormats=${[]}
          placeholder="Enter a question"
        />
      </li>
      <li>
        <${InnerBlocks} />
      </li>
    </ul>
  </div>
  `
}
