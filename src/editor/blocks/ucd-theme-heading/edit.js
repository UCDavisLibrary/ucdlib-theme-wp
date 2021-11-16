import { html, StyleUtils } from "../../utils";
import { RichText, useBlockProps, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';

export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  let classes = StyleUtils.extractStyleModifiers(blockProps.className)
  classes = classes.split(" ").map(c => `heading--${c}`).join(" ");
  if ( attributes.textAlign === 'center') {
    classes += " u-text-align--center";
  } else if( attributes.textAlign === 'right') {
    classes += " u-text-align--right";
  }
  const levelControls = getHeaderLevels().map(level => Object({title: level.tag, onClick: () => {setAttributes({level: level.level})}}));
  
  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarDropdownMenu} icon=${html`<span>h${attributes.level}</span>`} label="Change header level" controls=${levelControls}/>
        <${AlignmentControl}
			    value=${ attributes.textAlign }
			    onChange=${ ( nextAlign ) => {setAttributes( { textAlign: nextAlign } );} }
		    />
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

const getHeaderLevels = () => {
  return [1,2,3,4,5,6].map(level => {
    const tag = `h${level}`;
    return {tag, level};
})
}