import { html, BlockSettings, SelectUtils } from "../../utils";
import "./ucd-wp-poster";
import { useRef, useEffect } from "@wordpress/element";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarButton, Dropdown } from "@wordpress/components";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // retrieve needed wp data
  const {customImage, post, postTitle, postExcerpt, postImage} = SelectUtils.card(attributes);

  const mainEleProps = () => {
    let p = {ref: mainEleRef};

    return p;
  }

  return html`
  <div ...${ blockProps }>
    <${BlockControls} group="block">
    </${BlockControls}>
    <ucd-wp-poster ...${ mainEleProps() }></ucd-wp-poster>
  </div>
  `;
}