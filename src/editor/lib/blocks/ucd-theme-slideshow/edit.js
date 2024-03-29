import { html, SelectUtils, UCDIcons } from "../../utils";
import { ToolbarSelectMenu } from "../../block-components";
import { useBlockProps,
  BlockControls,
  MediaPlaceholder,
  MediaReplaceFlow,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from "@wordpress/data";
import 'slick-carousel';
import { ToolbarButton } from "@wordpress/components";



export default ( props ) => {
  const { attributes, setAttributes } = props;
  const { invalidateResolution } = useDispatch('core/data');
  const hasImages = attributes.hasImages || false;
  const blockProps = useBlockProps();
  const sliderSelector = `#${blockProps.id} .slideshow`;
  const navSelector = `#${blockProps.id} .slider-nav`;

  const ALLOWED_MEDIA_TYPES = [ 'image' ];
  const uploadInstructions = attributes.hasImages ? 
    'Edit your slideshow gallery' : 
    'Start creating a gallery for your slideshow...'


  const imgQuery = {include: [...attributes.images.map(i => i.id)]};
  const imgPosts = SelectUtils.posts(imgQuery, 'attachment');
  const imgTitles = {};
  imgPosts.forEach(i => {
    imgTitles[i.id] = i.title.rendered;
  })

  const onImageSelect = (images) => {
    setAttributes({images, hasImages: images.length > 0});
    invalidateResolution('core', 'getEntityRecords', ['postType', 'attachment', imgQuery]);
  }

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
      const aspectRatio = attributes.aspectRatio != 'inherit' ? `aspect--${attributes.aspectRatio}` : '';

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
          <div>
            <div 
              class="slideshow__item ${aspectRatio} ${hasTitle && attributes.showTitles? 'slideshow__item--has-title' : ''}">
              <img src="${img.sizes.full.url}" class="${attributes.objectFit ? 'o-fit--cover' : ''}" alt="${img.alt}" width="${img.sizes.full.width}" height="${img.sizes.full.height}" />
              <div class="slideshow__text">
                ${hasTitle && attributes.showTitles ? `<div class="slideshow__title">${title}</div>` : ''}
                ${hasCaption && attributes.showCaptions ? `<div class="slideshow__caption">${img.caption}</div>` : ``}
              </div>
            </div>
          </div>
        `;
       s.slick('slickAdd', html);
      })

      // add nav thumbnails
      attributes.images.forEach(img => {
        const html = `
        <div>
          <div class="slideshow__item">
            <div class="${aspectRatio}">
              <img class="${attributes.objectFit ? 'o-fit--cover' : ''}" src="${img.sizes.full.url}" />
            </div>
          </div>
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
    attributes.showCaptions,
    attributes.aspectRatio,
    attributes.objectFit
  ] );


  const aspectRatioOptions = [
    {
      title: '16x9',
      slug: '16x9'
    },
    {
      title: '4x3',
      slug: '4x3'
    },
    {
      title: 'Inherit from Photo',
      slug: 'inherit'
    }
  ];

  const objectFitOptions = [
    {
      title: 'Contain',
      slug: ''
    },
    {
      title: 'Cover',
      slug: 'cover'
    }
  ];


  return html`
    <div ...${ blockProps }>
      <div className="slideshow ${attributes.aspectRatio ? 'has-aspect-ratio': ''}"></div>
      <div className="slider-nav ${attributes.aspectRatio ? 'has-aspect-ratio': ''}"></div>
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
        <${ToolbarSelectMenu} 
          label='Set Aspect Ratio'
          icon=${UCDIcons.renderPublic('fa-crop-simple')}
          options=${aspectRatioOptions}
          value=${attributes.aspectRatio}
          onChange=${v => setAttributes({aspectRatio: v.slug})}
        /> 
        ${attributes.aspectRatio != 'inherit' && html`
          <${ToolbarSelectMenu} 
            label='Set Object Fit'
            icon=${UCDIcons.renderPublic('fa-object-group')}
            options=${objectFitOptions}
            value=${attributes.objectFit}
            onChange=${v => setAttributes({objectFit: v.slug})}
          /> 
        `}
      </${BlockControls}>
    </div>
  `;
}
