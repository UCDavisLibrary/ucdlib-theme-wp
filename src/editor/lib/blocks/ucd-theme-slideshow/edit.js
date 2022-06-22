import classnames from 'classnames';

import { html, UCDIcons } from "../../utils";
import { useBlockProps,
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
} from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const hasImages = attributes.hasImages || false;
  const blockProps = useBlockProps();

  const ALLOWED_MEDIA_TYPES = [ 'image' ];
  const uploadInstructions = attributes.hasImages ? 
    'Upload image files or pick some from the media library' : 
    'Add or edit images'

  const onImageUpload = (images) => {
    setAttributes({images})
    console.log(images);
  }

  return html`
    <div ...${ blockProps }>
      <${MediaPlaceholder} 
        accept="image/*"
			  allowedTypes=${ ALLOWED_MEDIA_TYPES }
        multiple
        addToGallery=${hasImages}
        labels=${{title: 'Slideshow Images', instructions: uploadInstructions}}
        isAppender=${hasImages}
        value=${attributes.images}
        onSelect=${onImageUpload}
      />
      <div>${JSON.stringify(attributes.images)}</div>
      <${BlockControls} group="block">
      </${BlockControls}>
    </div>
  `;
}
