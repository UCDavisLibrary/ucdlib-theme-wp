import { html, SelectUtils, UCDIcons } from "../../utils";
import { useBlockProps,
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import 'slick-carousel';
import { ToolbarButton } from "@wordpress/components";

export default ( props ) => {
  const { attributes, setAttributes } = props;
  const hasImages = attributes.hasImages || false;
  const blockProps = useBlockProps();
  const [ forcePostFetch, setForcePostFetch ] = useState( 0 );
  const sliderSelector = `#${blockProps.id} .slideshow`;
  const navSelector = `#${blockProps.id} .slider-nav`;

  const ALLOWED_MEDIA_TYPES = [ 'image' ];
  const uploadInstructions = attributes.hasImages ? 
    'Edit your slideshow gallery' : 
    'Start creating a gallery for your slideshow...'

  const onImageSelect = (images) => {
    setAttributes({images, hasImages: images.length > 0});
    setForcePostFetch( forcePostFetch + 1 );
  }

  const imgPosts = SelectUtils.posts({include: [...attributes.images.map(i => i.id), forcePostFetch]}, 'attachment');
  const imgTitles = {};
  imgPosts.forEach(i => {
    imgTitles[i.id] = i.title.rendered;
  })

  // initialize slideshow
  useEffect( () => {
    (($) => {
      if ( !$ || !typeof $.fn.slick === 'function') return;
      const mainOptions = {
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        dots: true,
        asNavFor: navSelector
      };
      $(sliderSelector).slick(mainOptions);

      $(navSelector).slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: sliderSelector,
        dots: false,
        centerMode: true,
        centerPadding: '70px',
        focusOnSelect: true,
        arrows: false
      });
    })(jQuery)
	},  [] );


  // update slides
  useEffect( () => {
    ( ($) => {
      if ( !$ || !typeof $.fn.slick === 'function') return;

      const s = $(sliderSelector);
      const n = $(navSelector);

      // remove existing slides
      if ( s && s.children().length > 0 ){
        const slideCount = s.slick('getSlick').slideCount
        for (let i = 0; i < slideCount; i++) {
          s.slick('slickRemove', null, false);
          n.slick('slickRemove', null, false);
        }
      } 

      // add slides
      attributes.images.forEach(img => {
        const title = imgTitles[img.id];
        const hasTitle = title ? true : false;
        const hasCaption = img.caption ? true : false
        const html = `
          <div class="slideshow__item ${hasTitle && attributes.showTitles? 'slideshow__item--has-title' : ''}">
            <img src="${img.sizes.full.url}" alt="${img.alt}" width="${img.sizes.full.width}" height="${img.sizes.full.height}" />
            <div class="slideshow__text">
              ${hasTitle && attributes.showTitles ? `<div class="slideshow__title">${title}</div>` : ''}
              ${hasCaption && attributes.showCaptions ? `<div class="slideshow__caption">${img.caption}</div>` : ``}
            </div>
          </div>
        `;
       s.slick('slickAdd', html);
      })

      // add nav thumbnails
      attributes.images.forEach(img => {
        const html = `
        <div class="slideshow__item">
          <img src="${img.sizes.full.url}" />
        </div>
        `;
        n.slick('slickAdd', html);
      })

    })(jQuery)
	},  
  [
    JSON.stringify(attributes.images), 
    JSON.stringify(imgPosts),
    attributes.showTitles,
    attributes.showCaptions
  ] );

  return html`
    <div ...${ blockProps }>
      <div className="slideshow"></div>
      <div className="slider-nav"></div>
      <${MediaPlaceholder} 
        accept="image/*"
			  allowedTypes=${ ALLOWED_MEDIA_TYPES }
        multiple
        addToGallery=${!hasImages}
        labels=${{title: 'Slideshow Images', instructions: uploadInstructions}}
        isAppender=${hasImages}
        value=${attributes.images}
        onSelect=${onImageSelect}
      />
      <${BlockControls} group="block">
        <${ToolbarButton} 
          label='Show Image Titles'
          icon=${UCDIcons.renderPublic('fa-heading')}
          isPressed=${attributes.showTitles}
          onClick=${() => setAttributes({showTitles: !attributes.showTitles})}
        />
        <${ToolbarButton} 
          label='Show Image Captions'
          icon=${UCDIcons.renderPublic('fa-closed-captioning')}
          isPressed=${attributes.showCaptions}
          onClick=${() => setAttributes({showCaptions: !attributes.showCaptions})}
        />
      </${BlockControls}>
    </div>
  `;
}
