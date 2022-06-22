import classnames from 'classnames';

import { html, UCDIcons, SelectUtils } from "../../utils";
import { useBlockProps,
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { ToolbarDropdownMenu } from '@wordpress/components';
import 'slick-carousel';

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
  }

  const imgPosts = SelectUtils.posts({include: attributes.images.map(i => i.id)}, 'attachment');
  const imgTitles = {};
  imgPosts.forEach(i => {
    imgTitles[i.id] = i.title.rendered;
  })

  useEffect( () => {
    (($) => {
      if ( !$ || !typeof $.fn.slick === 'function') return; 

      if ( $('.slideshow') && $('.slideshow').children().length > 0 ){
        $('.slideshow').slick('unslick');
      }

      const mainOptions = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        dots: true
      };
      $('.slideshow').slick(mainOptions);
      attributes.images.forEach(img => {
        const title = imgTitles[img.id];
        const hasTitle = title ? true : false;
        const hasCaption = img.caption ? true : false
        const html = `
          <div class="slideshow__item ${hasTitle ? 'slideshow__item--has-title' : ''}">
            <img src="${img.sizes.full.url}" alt="${img.alt}" width="${img.sizes.full.width}" height="${img.sizes.full.height}" />
            <div class="slideshow__text">
              ${hasTitle ? `<div class="slideshow__title">${title}</div>` : ''}
              ${hasCaption ? `<div class="slideshow__caption">${img.caption}</div>` : ``}
            </div>
          </div>
        `;
        $('.slideshow').slick('slickAdd', html)
      })
    })(jQuery)
	},  [JSON.stringify(attributes.images), JSON.stringify(imgPosts)] );

  return html`
    <div ...${ blockProps }>
      <div className="slideshow"></div>
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
