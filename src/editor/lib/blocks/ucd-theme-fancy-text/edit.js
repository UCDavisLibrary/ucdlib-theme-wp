import { html } from "../../utils";
import { TextControl } from "@wordpress/components";
import { useBlockProps
} from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();

  return html`
    <div ...${ blockProps} >
      <${TextControl}
        label="your text"
        value=${attributes.text}
        onChange=${(text) => setAttributes({text})}
      />    
    </div>
  `
}