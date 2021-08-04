import { html } from "../../utils";
import { RichText, useBlockProps, BlockControls } from '@wordpress/block-editor';
import styleClasses from "./styles";

export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  let classes = styleClasses.map(c => {
    if ( styleIsApplied(c.name, blockProps.className) ) {
      return `heading--${c.name}`;
    }
    return "";
  })
  classes = classes.join(" ");
  
  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
      <select 
          value=${attributes.level}
          onChange=${(e) => setAttributes({level: parseInt(e.target.value)})}
          >
        ${getHeaderLevels().map(header => html`
          <option value=${header.level} key=${header.level}>${header.tag}</option>`
        )}
        </select>
      </${BlockControls}>
      <${RichText}  
        tagName=${'h'+ attributes.level}
        value=${attributes.content} 
        disableLineBreaks
        className=${classes}
        allowedFormats=${ [ 'core/link', 'ucd-theme/bold-heading' ] }
        onChange=${ (content) => setAttributes({content}) }
        placeholder='Write heading...'
        />
    </div>
  `;
}
  
const styleIsApplied = (styleName, classes) => {
  return classes.includes(`is-style-${styleName}`)
}

const getHeaderLevels = () => {
  return [1,2,3,4,5,6].map(level => {
    const tag = `h${level}`;
    return {tag, level};
})
}