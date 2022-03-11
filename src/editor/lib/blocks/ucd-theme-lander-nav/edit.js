import { html, BlockSettings } from "../../utils";
import { useBlockProps,  InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { OrderPicker } from "../../block-components";

const img = BlockSettings.getImage('media-link');

const mediaLink = (title, body, key="0", hideImage=false) => html`
  <div className="media-link" key=${key}>
    ${!hideImage && html`
      <div className="media-link__figure u-background-image" style=${{'backgroundImage': `url(${img})`}}></div>
    `}
    <div className="media-link__body">
      <h3 className="media-link__title">${title}</h3>
      <p>${body}</p>
    </div>
  </div>
`;

const siteNavHelpText = "If selected and if current page is in the main site nav, displayed links will be from the site nav.";

const mediaLinkContent = [
  {title: 'A child page', body: 'If this page has any children, they will be rendered in a list.'},
  {title: 'Another child page', body: 'The excerpt for this child page will be displayed here.'}
]

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  return html`
  <div ...${ blockProps }>
    <${InspectorControls}>
      <${PanelBody} title="Display">
        <${ToggleControl} 
            label="Hide featured image"
            checked=${attributes.hideImage}
            onChange=${() => setAttributes({hideImage: !attributes.hideImage})}
          />
        <${ToggleControl} 
          label="Use Links from Site Navigation"
          help=${siteNavHelpText}
          checked=${attributes.lookInWpMenu}
          onChange=${() => setAttributes({lookInWpMenu: !attributes.lookInWpMenu})}
        />
        ${!attributes.lookInWpMenu && html`
          <${OrderPicker} 
            value=${{order: attributes.order, orderBy: attributes.orderBy}}
            onChange=${(v) => setAttributes(v)}
            postType='page'
          />
        `}
      </${PanelBody}>
    </${InspectorControls}>
    ${mediaLinkContent.map((c, i) => mediaLink(c.title, c.body, i, attributes.hideImage))}
  </div>
  `
}