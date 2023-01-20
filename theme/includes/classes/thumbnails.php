<?php
require_once( __DIR__ . '/views.php' );

/**
 * Sets thumbnail (featured image) sizes for this theme.
 * Theme support is declared in main site class
 * https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
 */
class UcdThemeThumbnails {
  public function __construct() {
    add_action( 'pre_update_option', array($this, 'modify_native_wp_sizes'), 10, 3 );
    //add_action( 'after_setup_theme', array($this, 'add_custom_sizes') );
    add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
  }

  public function add_custom_sizes(){
    // http://dev.webstyleguide.ucdavis.edu/redesign/?p=atoms-landscape-4x3
    add_image_size( 'landscape-4x3', 640, 480, true );

    // http://dev.webstyleguide.ucdavis.edu/redesign/?p=atoms-landscape-16x9
    add_image_size( 'landscape-16x9', 1280, 720, true );

  }

  public function modify_native_wp_sizes($value, $option, $old_value){

    $options = [
      "thumbnail_size_w" => 135,
      "thumbnail_size_h" => 135,
      "thumbnail_crop" => 1,
      "large_size_w" => 2000,
      "large_size_h" => 9999,
      "large_crop" => 0,
      "medium_size_w" => 1000,
      "medium_size_h" => 9999,
      "medium_crop" => 0
    ];

    if ( array_key_exists($option, $options) ) {
      $value = $options[$option];
    }

    return $value;

  }

  /**
   * Returns img tag attributes for a title banner
   */
  public function imgTitleBanner($image){
    if ( !is_a($image, 'Timber\Image') ) return false;
    $out = array(
      "srcset" => "",
      "sizes" => "",
      "src" => "",
      "alt" => $image->alt()
    );

    $desktop = $image->src('large');
    $mobile = $image->src('medium');
    if ( $desktop && $mobile ){
      $srcset = $mobile . " " . "1000w,";
      $srcset .= $desktop . " " . "2000w";
      $out['srcset'] = $srcset;
      $out['sizes'] = "(max-width: 1000px) 1000px,2000px";
      $out['src'] = $desktop;
      
    } else {
      $out['src'] = $image->src();
    }
    return $out;
  }

  public function add_to_twig($twig){
    $twig->addFunction( new Twig\TwigFunction( 'imgTitleBanner', array( $this, 'imgTitleBanner' ) ) );
    return $twig;
  }

  
}