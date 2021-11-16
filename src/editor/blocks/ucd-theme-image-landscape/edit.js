import classnames from 'classnames';
import { html, BlockSettings, SelectUtils } from "../../utils";
import { ImagePicker } from "../../block-components";
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

  const imgSrc = Image ? Image.source_url : BlockSettings.getImageByAspectRatio(attributes.aspectRatio)

  const aspectRatioControls = ["4x3", "16x9"].map(ar => 
    Object({
      title: ar, 
      isDisabled: ar === attributes.aspectRatio, 
      onClick: () => setAttributes({aspectRatio: ar})
    })
  )
  const classes = classnames({
    [`aspect--${attributes.aspectRatio}`]: true
  })

  return html`
    <div ...${ blockProps }>
      <${BlockControls} group="block">
      <${ToolbarDropdownMenu} 
        icon=${html`<span>${attributes.aspectRatio}</span>`}
        label="Change Aspect Ratio"
        controls=${aspectRatioControls}
      />
      </${BlockControls}>
      <${InspectorControls}>
        <${ImagePicker} 
          imageId=${attributes.imageId}
          image=${Image}
          onSelect=${onSelectImage}
          onRemove=${onRemoveImage}
          panelAttributes=${{title: 'Select an Image'}}
        />
      </${InspectorControls}>
      <div className=${classes}>
        <img src=${imgSrc} loading="lazy" />
      </div>

    </div>
  `;
}