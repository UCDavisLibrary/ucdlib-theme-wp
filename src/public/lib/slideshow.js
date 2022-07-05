import $ from "jquery";
import 'slick-carousel';
(() => {
  const slideshowBlocks = $('.block-slideshow');
  if ( !slideshowBlocks.length ) return;
  slideshowBlocks.each(function(index){
    const block = $( this );
    const slideshowSelector = `slideshow-${index}`;
    const navSelector = `slider-nav-${index}`;
    block.children('.slideshow').attr('id', slideshowSelector);
    block.children('.slider-nav').attr('id', navSelector);
    const mainOptions = {
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      dots: true,
      asNavFor: '#' + navSelector
    };
    $('#' + slideshowSelector).slick(mainOptions);

    $('#' + navSelector).slick({
      lazyLoad: 'ondemand',
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '#' + slideshowSelector,
      dots: false,
      centerMode: true,
      centerPadding: '70px',
      focusOnSelect: true,
      arrows: false
    });
  })
})()