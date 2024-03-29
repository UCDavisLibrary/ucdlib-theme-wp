import classnames from 'classnames';
import { html, BlockSettings, SelectUtils } from "../../utils";
import { ImagePicker, ToolbarLinkPicker } from "../../block-components";
import { useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const blockProps = useBlockProps();
  const Image = SelectUtils.image(attributes.imageId);

  // set up image picker
  const onSelectImage = (image) => {
    setAttributes({imageId: image.id});
  }
  const onRemoveImage = () => {
    setAttributes({imageId: 0});
  }

  const imgSrc = Image ? Image.source_url : BlockSettings.getImageByAspectRatio(attributes.aspectRatio);
  
  let captionText;
  if ( attributes.caption.customText ) {
    captionText = attributes.caption.customText;
  } else if ( Image && Image.caption.rendered ) {
    captionText = Image.caption.rendered.replace(/(<([^>]+)>)/gi, "");
  } 

  const aspectRatioControls = ["4x3", "16x9"].map(ar => 
    Object({
      title: ar, 
      isDisabled: ar === attributes.aspectRatio, 
      onClick: () => setAttributes({aspectRatio: ar})
    })
  )
  const classes = classnames({
    'u-background-image': true,
    [`aspect--${attributes.aspectRatio}`]: true
  })

  // set up link picker
  const onHrefChange = (value) => {
    let attrs = {
      href: value.url,
      newTab: value.opensInNewTab ? true : false,
      postId: 0
    }
    if ( value.kind == 'post-type' ){
      attrs.postId = value.id;
    } else if ( value.kind == 'taxonomy' ) {
      attrs.taxId = value.id 
    }
    setAttributes(attrs);
  }
  const hrefContent = (() => {
    let value = {opensInNewTab: attributes.newTab, url: ""};
    if ( attributes.href ) {
      value.url = attributes.href;
    } 
    return value;
  })();

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
      <${ToolbarDropdownMenu} 
        icon=${html`<span>${attributes.aspectRatio}</span>`}
        label="Change Aspect Ratio"
        controls=${aspectRatioControls}
      />
      <${ToolbarLinkPicker} onChange=${onHrefChange} value=${hrefContent} />
      </${BlockControls}>
      <${InspectorControls}>
        <${ImagePicker} 
          imageId=${attributes.imageId}
          image=${Image}
          onSelect=${onSelectImage}
          onRemove=${onRemoveImage}
          captionOptions=${attributes.caption}
          onCaptionChange=${(caption) => setAttributes({caption})}
          panelAttributes=${{title: 'Select an Image'}}
        />
      </${InspectorControls}>
      <figure style=${{display:'block'}}>
        <div className=${classes} style=${{backgroundImage: `url(${imgSrc})`}}></div>
        ${ (attributes.caption.show && captionText) && html`
          <figcaption style=${{display:'block'}}>${captionText}</figcaption>
        `}
      </figure>
      
      

    </div>
  `;
}