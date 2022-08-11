import { html } from "../../utils";
import "./ucd-wp-faq-item";
import { useBlockProps, BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { useRef, useEffect } from "@wordpress/element";


export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const mainEleRef = useRef();

  // Wire up the main component
  const onMainEleUpdated = (e) => {
    const propName = e.detail.propName;
    const propValue = e.detail.propValue;
    const newAttrs = {};
    newAttrs[propName] = propValue;
    setAttributes(newAttrs);
  }

  useEffect(() => {
    let mainEle = null;
    if ( mainEleRef.current ) {
      mainEleRef.current.addEventListener('updated', onMainEleUpdated);
      mainEle = mainEleRef.current;
    }
    return () => {
      if ( mainEle ) {
        mainEle.removeEventListener('updated', onMainEleUpdated);
      }
    };
  });

  const mainEleProps = () => {
    let p = {ref: mainEleRef};
    if ( attributes.question ) p.question = attributes.question;
    p['list-style'] = attributes.listStyle;
    return p;
  }

  return html`
  <div ...${ blockProps }>
    <ucd-wp-faq-item ...${ mainEleProps() }>
      <div slot="question" contentEditable="true"></div>
      <div slot="answer">
          <${InnerBlocks} />
      </div>
    </ucd-wp-faq-item>

  </div>
  `
}