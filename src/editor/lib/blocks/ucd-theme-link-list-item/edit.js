import { html, SelectUtils } from "../../utils";
import { ToolbarPostReset, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';

export default ( props ) => {
  const { attributes, setAttributes, context } = props;
  const blockProps = useBlockProps();

  // retrieve needed wp data
  const {post, postTitle, postExcerpt} = SelectUtils.card(attributes);
  const title = attributes.title || postTitle || "";
  const excerpt = attributes.excerpt || postExcerpt || "";

  // set up post reset
  const onPostReset = (part) => {
    if ( part.slug === 'title') {
      setAttributes({title: ""});
    } else if (part.slug === 'excerpt') {
      setAttributes({excerpt: ""});
    }
  }
  const postParts = (() => {
    return [
      {slug: 'title', isDisabled: !attributes.title},
      {slug: 'excerpt', isDisabled: !attributes.excerpt}]
  })();

  // set up link picker
  const onHrefChange = (value) => {
    let attrs = {
      href: value.kind === 'post-type' ? "" : value.url,
      newTab: value.opensInNewTab ? true : false,
      post: value.kind === 'post-type' ? {id: value.id, type: value.type} : {}
    }
    setAttributes(attrs);
  }
  const hrefContent = (() => {
    let value = {opensInNewTab: attributes.newTab, url: ""};
    if ( attributes.href ) {
      value.url = attributes.href;
    } else if ( post && post.link ) {
      value.url = post.link;
      value.kind = 'post-type';
      value.type = post.type;
    }
    return value;
  })();

  const hideExcerpt = context['ucdLinkList/hideExcerpt'] || false;
  const brandColor = context['ucdLinkList/brandColor'] || "";

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
        <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
        ${post && html`
          <${ToolbarPostReset}
            postProps=${postParts}
            onChange=${onPostReset}
           />
        `}
      </${BlockControls}>
      <div className="ucd-link-list-item">
        <span className='icon-ucdlib category-brand--${brandColor}'>
          <ucdlib-icon icon="ucd-public:fa-circle-chevron-right"></ucdlib-icon>
          <span>
            <a className='ucd-link-list-item--title'>
              <${RichText}
                tagName="span"
                value=${title}
                withoutInteractiveFormatting
                allowedFormats=${[]}
                placeholder="Title"
                onChange=${ ( title ) => setAttributes({title}) }
              />
            </a>
            ${!hideExcerpt && html`
              <span className='ucd-link-list-item--excerpt'>
                <${RichText}
                  tagName="p"
                  value=${excerpt}
                  withoutInteractiveFormatting
                  allowedFormats=${[]}
                  placeholder="Excerpt"
                  onChange=${ ( excerpt ) => setAttributes({excerpt}) }
                />
              </span>
            `}
            </span>
          </span>
      </div>
    </div>
  `;
};
