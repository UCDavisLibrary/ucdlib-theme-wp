import { html, StyleUtils, UCDIcons } from "../../utils";
import { ToolbarHeaderLevel } from "../../block-components";
import { RichText, useBlockProps, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import altStyles from "./styles";

export default ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();

  // support old method of storing alternative styles
  let classes = StyleUtils.extractStyleModifiers(blockProps.className);
  classes = classes.split(" ").map(c => c ? `heading--${c}`: '').join(" ");
  if ( !classes ) classes = 'heading--underline';

  classes = attributes.classSuffix ? `heading--${attributes.classSuffix}` : classes;
  const selectedStyle = classes.replace('heading--', '');
  if ( attributes.textAlign === 'center') {
    classes += " u-text-align--center";
  } else if( attributes.textAlign === 'right') {
    classes += " u-text-align--right";
  }

  const classOptions = altStyles.map(_in => {
    const out = {
      title: _in.label,
      onClick: () => setAttributes({classSuffix: _in.name})
    };
    if ( _in.name === selectedStyle ){
      out.icon = UCDIcons.render("selected", {style:{marginRight: "5px"}});
      out.isDisabled = true;
    }
    return out;
  });

  // set up header level picker
  const onHeaderLevelChange = (level) => {
    setAttributes({level});
  }

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarHeaderLevel}
          value=${attributes.level}
          onChange=${onHeaderLevelChange}
          defaultValue=${2}
          label="Set header level"
        />
        <${ToolbarDropdownMenu} icon=${UCDIcons.renderPublic('fa-paintbrush')} label="Change header style" controls=${classOptions}/>
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
        allowedFormats=${ [ 'core/link', 'core/bold', 'core/italic', 'ucd-theme/bold-heading' ] }
        onChange=${ (content) => setAttributes({content}) }
        placeholder='Write heading...'
        />
    </div>
  `;
}
